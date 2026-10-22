import Fastify from "fastify";
import cors from "@fastify/cors";
import { Server as SocketIOServer } from "socket.io";
import { CONSTANTS } from "@aetheria/common";
import { SpatialGrid } from "./simulation/SpatialGrid.js";
import { PhysicsEngine } from "./simulation/PhysicsEngine.js";
import { CycleDetector } from "./simulation/CycleDetector.js";
import { ClimateEngine } from "./simulation/ClimateEngine.js";
import { AiOverseer } from "./services/AiOverseer.js";
import { persistenceService } from "./services/Persistence.js";
import { SocketHandler } from "./sockets/SocketHandler.js";

const fastify = Fastify({ logger: false });

// Core Simulation Singletons
const grid = new SpatialGrid(CONSTANTS.GRID_CELL_SIZE);
const physics = new PhysicsEngine(grid);
const cycleDetector = new CycleDetector(grid, physics);
const climateEngine = new ClimateEngine();
const aiOverseer = new AiOverseer();

// Telemetry state
let lastLoopCheck = performance.now();
let eventLoopDelay = 0;
let lastTickDuration = 0;
let tickCount = 0;

// Event loop delay tracker
setInterval(() => {
  const now = performance.now();
  eventLoopDelay = Math.max(0, now - lastLoopCheck - 100);
  lastLoopCheck = now;
}, 100);

async function startServer() {
  await fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  });

  const port = Number(process.env.PORT) || 4000;
  const server = fastify.server;

  const io = new SocketIOServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ["websocket", "polling"]
  });

  const socketHandler = new SocketHandler(
    io,
    physics,
    grid,
    cycleDetector,
    climateEngine,
    aiOverseer
  );

  // Health check endpoint (Section 14.B)
  fastify.get("/health", async () => {
    const allOrganisms = physics.getAllOrganisms();
    const cycleMetrics = cycleDetector.getMetrics();
    return {
      status: "healthy",
      timestamp: Date.now(),
      uptimeSeconds: Math.round(process.uptime()),
      eventLoopDelayMs: Math.round(eventLoopDelay * 100) / 100,
      lastTickDurationMs: Math.round(lastTickDuration * 100) / 100,
      activeEntities: allOrganisms.length,
      climate: climateEngine.getClimate(),
      entropyScore: climateEngine.getEntropy(),
      tethersCount: cycleMetrics.tethersCount,
      closedFormations: cycleMetrics.closedFormations,
      vMax: CONSTANTS.V_MAX
    };
  });

  // REST endpoints for fossils and codex lore
  fastify.get("/api/fossils", async () => {
    return persistenceService.getAllActiveFossils();
  });

  fastify.get("/api/codex", async () => {
    return aiOverseer.getHistory();
  });

  // Authoritative 25 Hz Simulation Loop (dt = 40 ms)
  const TICK_INTERVAL_MS = 40;
  const dt = TICK_INTERVAL_MS / 1000;

  setInterval(() => {
    const tickStart = performance.now();
    tickCount++;

    // 1. Physics Engine step (forces, energy, clamps)
    physics.update(dt);

    // 2. Cycle & Tether Detection
    cycleDetector.update(Date.now());

    // 3. Climate Engine update (entropy scoring, hysteresis state machine)
    const orgs = physics.getAllOrganisms();
    const avgSpeed =
      orgs.length > 0
        ? orgs.reduce((sum, o) => sum + Math.sqrt(o.vx * o.vx + o.vy * o.vy), 0) / orgs.length
        : 0;
    const dispersion = grid.calculateSpatialDispersion();
    const eventMetrics = physics.getAndResetEventMetrics();
    const cycleMetrics = cycleDetector.getMetrics();

    const climateResult = climateEngine.update(
      dt,
      orgs.length,
      avgSpeed,
      dispersion,
      eventMetrics.shockwaveCount,
      cycleMetrics.tethersCount,
      cycleMetrics.closedFormations
    );

    if (climateResult.transitioned) {
      socketHandler.broadcastClimateUpdate(climateResult.climate, climateResult.entropyScore);
    }

    lastTickDuration = performance.now() - tickStart;
  }, TICK_INTERVAL_MS);

  // 20 Hz Client State Delta Dispatch (every 50 ms)
  setInterval(() => {
    socketHandler.broadcastStateDelta();
  }, 50);

  // Adaptive Cron for AI Overseer (checks every 15 minutes, or on demand)
  setInterval(async () => {
    const orgs = physics.getAllOrganisms();
    const entry = await aiOverseer.evaluateChronicle(
      climateEngine.getClimate(),
      climateEngine.getEntropy(),
      orgs.length
    );
    persistenceService.saveCodex(entry);
    socketHandler.broadcastCodexEntry(entry);
  }, 15 * 60 * 1000);

  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`[Aetheria Server] Running on http://localhost:${port}`);
}

startServer().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});

export { physics, grid, cycleDetector, climateEngine, aiOverseer };
