import {
  Vector2,
  CONSTANTS,
  calculateAttractionForce,
  calculateShockwaveImpulse,
  clamp,
  EntityFlags
} from "@aetheria/common";
import { SpatialGrid, GridEntity } from "./SpatialGrid.js";

export interface ServerOrganism {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  flags: number;
  lastShockwaveTime: number;
  lastInputSeq: number;
  lastSeenTime: number;
  inShield: boolean;
  shieldExpiry: number;
}

export class PhysicsEngine {
  private grid: SpatialGrid;
  private organisms: Map<string, ServerOrganism> = new Map();
  private shockwaveEventsCount = 0;
  private attractionEventsCount = 0;

  constructor(grid: SpatialGrid) {
    this.grid = grid;
  }

  public registerOrganism(id: string, initialX = 0, initialY = 0): ServerOrganism {
    const org: ServerOrganism = {
      id,
      x: initialX,
      y: initialY,
      vx: 0,
      vy: 0,
      energy: CONSTANTS.E_MAX,
      flags: 0,
      lastShockwaveTime: 0,
      lastInputSeq: 0,
      lastSeenTime: Date.now(),
      inShield: false,
      shieldExpiry: 0
    };
    this.organisms.set(id, org);
    this.grid.updateEntity({
      id: org.id,
      x: org.x,
      y: org.y,
      vx: org.vx,
      vy: org.vy,
      flags: org.flags,
      cellKey: "",
      lastUpdate: Date.now()
    });
    return org;
  }

  public unregisterOrganism(id: string): void {
    this.organisms.delete(id);
    this.grid.removeEntity(id);
  }

  public getOrganism(id: string): ServerOrganism | undefined {
    return this.organisms.get(id);
  }

  public getAllOrganisms(): ServerOrganism[] {
    return Array.from(this.organisms.values());
  }

  /**
   * Process client movement packet with anti-abuse validation
   */
  public processClientInput(
    id: string,
    seq: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
    isAttracting: boolean,
    isShockwaveRequested: boolean
  ): { accepted: boolean; correctedPos?: Vector2 } {
    const org = this.organisms.get(id);
    if (!org) return { accepted: false };

    // Ignore stale packets
    if (seq <= org.lastInputSeq && org.lastInputSeq - seq < 1000) {
      return { accepted: false };
    }
    org.lastInputSeq = seq;
    org.lastSeenTime = Date.now();

    // Absolute speed clamp check: |v| > V_MAX * 1.5 triggers rejection & force sync
    const speed = Math.sqrt(vx * vx + vy * vy);
    const hardSpeedLimit = CONSTANTS.V_MAX * 1.5;

    if (speed > hardSpeedLimit) {
      return {
        accepted: false,
        correctedPos: { x: org.x, y: org.y }
      };
    }

    // Energy state
    const isDepleted = org.energy < CONSTANTS.E_DEPLETION_THRESHOLD;

    // Handle Shockwave request
    if (isShockwaveRequested && !isDepleted) {
      const now = Date.now();
      if (
        org.energy >= CONSTANTS.E_SHOCKWAVE_COST &&
        now - org.lastShockwaveTime >= CONSTANTS.SHOCKWAVE_COOLDOWN_MS
      ) {
        if (!org.inShield) {
          org.energy -= CONSTANTS.E_SHOCKWAVE_COST;
        }
        org.lastShockwaveTime = now;
        this.shockwaveEventsCount++;
        this.applyShockwaveImpulse(org);
      }
    }

    // Handle Attraction flag
    if (isAttracting && !isDepleted) {
      org.flags |= EntityFlags.IS_ATTRACTING;
      this.attractionEventsCount++;
    } else {
      org.flags &= ~EntityFlags.IS_ATTRACTING;
    }

    // Apply clamped speed
    const effectiveVMax = isDepleted
      ? CONSTANTS.V_MAX * CONSTANTS.SPEED_DEPLETED_MULTIPLIER
      : CONSTANTS.V_MAX;

    if (speed > effectiveVMax) {
      org.vx = (vx / speed) * effectiveVMax;
      org.vy = (vy / speed) * effectiveVMax;
    } else {
      org.vx = vx;
      org.vy = vy;
    }

    org.x = x;
    org.y = y;

    if (isDepleted) {
      org.flags |= EntityFlags.DEPLETED_ENERGY_MODE;
    } else {
      org.flags &= ~EntityFlags.DEPLETED_ENERGY_MODE;
    }

    this.grid.updateEntity({
      id: org.id,
      x: org.x,
      y: org.y,
      vx: org.vx,
      vy: org.vy,
      flags: org.flags,
      cellKey: "",
      lastUpdate: Date.now()
    });

    return { accepted: true };
  }

  /**
   * Propagates shockwave impulse radially to all entities within R_blast (30 WU)
   */
  private applyShockwaveImpulse(source: ServerOrganism): void {
    const neighbors = this.grid.getMooreNeighborhoodEntities(source.x, source.y);
    for (const neighbor of neighbors) {
      if (neighbor.id === source.id) continue;
      const targetOrg = this.organisms.get(neighbor.id);
      if (!targetOrg) continue;

      const impulse = calculateShockwaveImpulse(
        { x: source.x, y: source.y },
        { x: targetOrg.x, y: targetOrg.y }
      );

      targetOrg.vx += impulse.x;
      targetOrg.vy += impulse.y;
    }
  }

  /**
   * Authoritative simulation tick (25 Hz, dt = 40 ms)
   */
  public update(dt: number): void {
    const now = Date.now();

    for (const org of this.organisms.values()) {
      // Check formation shield expiry
      if (org.inShield && now >= org.shieldExpiry) {
        org.inShield = false;
        org.flags &= ~EntityFlags.IN_CLOSED_FORMATION;
      }

      // Energy regeneration & drain
      if (org.inShield) {
        // Infinite energy during shield
        org.energy = CONSTANTS.E_MAX;
      } else {
        const isAttracting = (org.flags & EntityFlags.IS_ATTRACTING) !== 0;
        if (isAttracting) {
          org.energy = Math.max(0, org.energy - CONSTANTS.E_ATTRACT_DRAIN * dt);
        } else {
          org.energy = Math.min(CONSTANTS.E_MAX, org.energy + CONSTANTS.E_PASSIVE_REGEN * dt);
        }
      }

      // Gravitational attraction physics on nearby entities
      if ((org.flags & EntityFlags.IS_ATTRACTING) !== 0) {
        const neighbors = this.grid.getMooreNeighborhoodEntities(org.x, org.y);
        for (const n of neighbors) {
          if (n.id === org.id) continue;
          const targetOrg = this.organisms.get(n.id);
          if (!targetOrg) continue;

          const force = calculateAttractionForce(
            { x: org.x, y: org.y },
            { x: targetOrg.x, y: targetOrg.y }
          );

          targetOrg.vx += force.x * dt;
          targetOrg.vy += force.y * dt;
        }
      }

      // Update grid entity
      this.grid.updateEntity({
        id: org.id,
        x: org.x,
        y: org.y,
        vx: org.vx,
        vy: org.vy,
        flags: org.flags,
        cellKey: "",
        lastUpdate: now
      });
    }
  }

  public grantShield(entityIds: string[], durationMs = 8000): void {
    const expiry = Date.now() + durationMs;
    for (const id of entityIds) {
      const org = this.organisms.get(id);
      if (org) {
        org.inShield = true;
        org.shieldExpiry = expiry;
        org.flags |= EntityFlags.IN_CLOSED_FORMATION;
      }
    }
  }

  public getAndResetEventMetrics(): { shockwaveCount: number; attractCount: number } {
    const res = {
      shockwaveCount: this.shockwaveEventsCount,
      attractCount: this.attractionEventsCount
    };
    this.shockwaveEventsCount = 0;
    this.attractionEventsCount = 0;
    return res;
  }
}
