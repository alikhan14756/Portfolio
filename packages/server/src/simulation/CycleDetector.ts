import { Vector2, distance, CONSTANTS, EntityFlags } from "@aetheria/common";
import { SpatialGrid, GridEntity } from "./SpatialGrid.js";
import { PhysicsEngine } from "./PhysicsEngine.js";

interface Edge {
  u: string;
  v: string;
  formedAt: number;
  confirmed: boolean;
}

interface CandidateCycle {
  key: string;
  nodeIds: string[];
  firstDetectedAt: number;
  confirmed: boolean;
}

export class CycleDetector {
  private grid: SpatialGrid;
  private physics: PhysicsEngine;
  private edges: Map<string, Edge> = new Map();
  private candidateCycles: Map<string, CandidateCycle> = new Map();
  private activeFormationsCount = 0;
  private tethersCount = 0;

  constructor(grid: SpatialGrid, physics: PhysicsEngine) {
    this.grid = grid;
    this.physics = physics;
  }

  private edgeKey(a: string, b: string): string {
    return a < b ? `${a}:${b}` : `${b}:${a}`;
  }

  public update(now: number): void {
    const all = this.grid.getAllEntities();
    const activeIds = new Set(all.map((e) => e.id));

    // 1. Proximity Edge Management with Hysteresis
    // Connect <= 12.0 WU, Break > 16.5 WU
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const e1 = all[i];
        const e2 = all[j];
        const d = distance({ x: e1.x, y: e1.y }, { x: e2.x, y: e2.y });
        const key = this.edgeKey(e1.id, e2.id);
        const existing = this.edges.get(key);

        if (existing) {
          if (d > CONSTANTS.TETHER_BREAK_DISTANCE) {
            this.edges.delete(key);
          } else if (!existing.confirmed && now - existing.formedAt >= CONSTANTS.TETHER_CONFIRMATION_TIME_MS) {
            existing.confirmed = true;
          }
        } else if (d <= CONSTANTS.TETHER_CONNECT_DISTANCE) {
          this.edges.set(key, {
            u: e1.id,
            v: e2.id,
            formedAt: now,
            confirmed: false
          });
        }
      }
    }

    // Clean up disconnected entities
    for (const [key, edge] of this.edges) {
      if (!activeIds.has(edge.u) || !activeIds.has(edge.v)) {
        this.edges.delete(key);
      }
    }

    this.tethersCount = Array.from(this.edges.values()).filter((e) => e.confirmed).length;

    // Update entity tether flags
    const connectedNodeIds = new Set<string>();
    for (const edge of this.edges.values()) {
      if (edge.confirmed) {
        connectedNodeIds.add(edge.u);
        connectedNodeIds.add(edge.v);
      }
    }

    for (const entity of all) {
      const org = this.physics.getOrganism(entity.id);
      if (org) {
        if (connectedNodeIds.has(entity.id)) {
          org.flags |= EntityFlags.IN_TETHER;
        } else {
          org.flags &= ~EntityFlags.IN_TETHER;
        }
      }
    }

    // 2. Build Adjacency List from Confirmed Edges
    const adj: Map<string, string[]> = new Map();
    for (const edge of this.edges.values()) {
      if (!edge.confirmed) continue;
      if (!adj.has(edge.u)) adj.set(edge.u, []);
      if (!adj.has(edge.v)) adj.set(edge.v, []);
      adj.get(edge.u)!.push(edge.v);
      adj.get(edge.v)!.push(edge.u);
    }

    // 3. Find Chordless Cycles (k in [3, 6])
    const foundCycles: string[][] = [];
    const visited = new Set<string>();

    for (const startNode of adj.keys()) {
      this.findCyclesDFS(startNode, startNode, [startNode], adj, visited, foundCycles);
      visited.add(startNode);
    }

    // 4. Validate Convexity, Surface Area, and Persistence
    const currentCycleKeys = new Set<string>();

    for (const cycleNodes of foundCycles) {
      const k = cycleNodes.length;
      if (k < 3 || k > 6) continue;

      // Ensure canonical representation for deduplication
      const sorted = [...cycleNodes].sort();
      const cycleKey = sorted.join(":");
      currentCycleKeys.add(cycleKey);

      const positions = cycleNodes
        .map((id) => this.grid.getEntity(id))
        .filter((e): e is GridEntity => Boolean(e))
        .map((e) => ({ x: e.x, y: e.y }));

      if (positions.length !== k) continue;

      // Area using Shoelace formula
      const area = this.calculatePolygonArea(positions);
      if (area < 25.0) continue; // Area >= 25.0 WU^2

      // Convexity check: sum of interior angles = (k - 2) * PI +- 0.15 rad
      if (!this.checkConvexity(positions, k)) continue;

      // Persistence tracking: cycle must survive >= 1200 ms
      const existing = this.candidateCycles.get(cycleKey);
      if (existing) {
        if (!existing.confirmed && now - existing.firstDetectedAt >= 1200) {
          existing.confirmed = true;
          this.activeFormationsCount++;
          // Trigger shield creation
          this.physics.grantShield(cycleNodes, 8000);
        }
      } else {
        this.candidateCycles.set(cycleKey, {
          key: cycleKey,
          nodeIds: cycleNodes,
          firstDetectedAt: now,
          confirmed: false
        });
      }
    }

    // Prune broken cycles
    for (const [key, cycle] of this.candidateCycles) {
      if (!currentCycleKeys.has(key)) {
        this.candidateCycles.delete(key);
      }
    }
  }

  private findCyclesDFS(
    start: string,
    current: string,
    path: string[],
    adj: Map<string, string[]>,
    visited: Set<string>,
    results: string[][]
  ): void {
    if (path.length > 6) return;

    const neighbors = adj.get(current) || [];
    for (const n of neighbors) {
      if (n === start && path.length >= 3) {
        results.push([...path]);
        return;
      }
      if (!visited.has(n) && !path.includes(n)) {
        path.push(n);
        this.findCyclesDFS(start, n, path, adj, visited, results);
        path.pop();
      }
    }
  }

  private calculatePolygonArea(pts: Vector2[]): number {
    let area = 0;
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += pts[i].x * pts[j].y;
      area -= pts[j].x * pts[i].y;
    }
    return Math.abs(area) * 0.5;
  }

  private checkConvexity(pts: Vector2[], k: number): boolean {
    const targetSum = (k - 2) * Math.PI;
    let angleSum = 0;

    for (let i = 0; i < k; i++) {
      const prev = pts[(i - 1 + k) % k];
      const curr = pts[i];
      const next = pts[(i + 1) % k];

      const v1 = { x: prev.x - curr.x, y: prev.y - curr.y };
      const v2 = { x: next.x - curr.x, y: next.y - curr.y };

      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

      if (mag1 < 0.001 || mag2 < 0.001) return false;
      const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
      angleSum += Math.acos(cosAngle);
    }

    return Math.abs(angleSum - targetSum) <= 0.15;
  }

  public getMetrics(): { tethersCount: number; closedFormations: number } {
    return {
      tethersCount: this.tethersCount,
      closedFormations: this.activeFormationsCount
    };
  }
}
