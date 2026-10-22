import { Server, Socket } from "socket.io";
import { MovementPacketSchema, MovementPacket, CONSTANTS } from "@aetheria/common";
import { PhysicsEngine } from "../simulation/PhysicsEngine.js";
import { SpatialGrid } from "../simulation/SpatialGrid.js";
import { CycleDetector } from "../simulation/CycleDetector.js";
import { ClimateEngine } from "../simulation/ClimateEngine.js";
import { AiOverseer } from "../services/AiOverseer.js";
import { persistenceService } from "../services/Persistence.js";

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

export class SocketHandler {
  private io: Server;
  private physics: PhysicsEngine;
  private grid: SpatialGrid;
  private cycleDetector: CycleDetector;
  private climateEngine: ClimateEngine;
  private aiOverseer: AiOverseer;
  private rateLimits: Map<string, RateLimitTracker> = new Map();
  private readonly MAX_PACKETS_PER_SEC = 30;

  constructor(
    io: Server,
    physics: PhysicsEngine,
    grid: SpatialGrid,
    cycleDetector: CycleDetector,
    climateEngine: ClimateEngine,
    aiOverseer: AiOverseer
  ) {
    this.io = io;
    this.physics = physics;
    this.grid = grid;
    this.cycleDetector = cycleDetector;
    this.climateEngine = climateEngine;
    this.aiOverseer = aiOverseer;

    this.initSocketEvents();
  }

  private isRateLimited(ip: string): boolean {
    const now = Date.now();
    let tracker = this.rateLimits.get(ip);

    if (!tracker || now >= tracker.resetTime) {
      tracker = { count: 1, resetTime: now + 1000 };
      this.rateLimits.set(ip, tracker);
      return false;
    }

    tracker.count++;
    return tracker.count > this.MAX_PACKETS_PER_SEC;
  }

  private initSocketEvents(): void {
    this.io.on("connection", (socket: Socket) => {
      const clientIp = socket.handshake.address || socket.id;
      const organism = this.physics.registerOrganism(socket.id);

      // Send initial handshake state
      socket.emit("HANDSHAKE", {
        id: socket.id,
        climate: this.climateEngine.getClimate(),
        entropyScore: this.climateEngine.getEntropy(),
        fossils: persistenceService.getAllActiveFossils(),
        codexHistory: this.aiOverseer.getHistory()
      });

      // Broadcast join event
      socket.broadcast.emit("ENTITY_JOINED", {
        id: socket.id,
        x: organism.x,
        y: organism.y
      });

      // Client Movement Packet Handler
      socket.on("MOVEMENT", (rawPayload: unknown) => {
        // Enforce 30 pkts/s rate limit
        if (this.isRateLimited(clientIp)) {
          return; // Silent drop
        }

        // Zod validation
        const parsed = MovementPacketSchema.safeParse(rawPayload);
        if (!parsed.success) {
          return; // Reject malformed payloads
        }

        const data: MovementPacket = parsed.data;
        const result = this.physics.processClientInput(
          socket.id,
          data.seq,
          data.x,
          data.y,
          data.vx,
          data.vy,
          data.isAttracting,
          data.isShockwaveRequested
        );

        if (!result.accepted && result.correctedPos) {
          // Force sync client coordinate
          socket.emit("FORCE_SYNC", result.correctedPos);
        }

        this.aiOverseer.recordEvent(1);
      });

      socket.on("disconnect", () => {
        this.physics.unregisterOrganism(socket.id);
        this.rateLimits.delete(clientIp);
        this.io.emit("ENTITY_LEFT", { id: socket.id });
      });
    });
  }

  /**
   * Dispatches 20 Hz packed delta updates to clients based on 3x3 Moore neighborhood
   */
  public broadcastStateDelta(): void {
    const allEntities = this.physics.getAllOrganisms();
    if (allEntities.length === 0) return;

    for (const socket of this.io.sockets.sockets.values()) {
      const clientOrg = this.physics.getOrganism(socket.id);
      if (!clientOrg) continue;

      // Spatial interest management: only send entities in 3x3 Moore neighborhood
      const neighbors = this.grid.getMooreNeighborhoodEntities(clientOrg.x, clientOrg.y);

      // Packed delta payload: [entityId, x, y, vx, vy, flags]
      const deltaList = neighbors.map((n) => {
        const org = this.physics.getOrganism(n.id);
        return {
          id: n.id,
          x: Math.round(n.x * 100) / 100,
          y: Math.round(n.y * 100) / 100,
          vx: Math.round(n.vx * 100) / 100,
          vy: Math.round(n.vy * 100) / 100,
          flags: org ? org.flags : 0
        };
      });

      socket.emit("GRID_DELTA", {
        t: Date.now(),
        entities: deltaList
      });
    }
  }

  public broadcastClimateUpdate(climate: string, entropy: number): void {
    this.io.emit("CLIMATE_STATE", { climate, entropyScore: entropy });
  }

  public broadcastCodexEntry(entry: unknown): void {
    this.io.emit("NEW_CODEX_ENTRY", entry);
  }
}
