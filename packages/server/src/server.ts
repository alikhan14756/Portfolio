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

  // Contact form submission endpoint with validation and anti-spam protection
  const recentSubmissions = new Map<string, number>();

  fastify.post("/api/contact", async (request, reply) => {
    try {
      const ContactSchema = (await import("zod")).z.object({
        name: (await import("zod")).z.string().min(2, "Name must be at least 2 characters").max(100),
        email: (await import("zod")).z.string().email("Please provide a valid email address"),
        projectType: (await import("zod")).z.string().optional(),
        message: (await import("zod")).z.string().min(10, "Message must be at least 10 characters").max(2000),
        honeypot: (await import("zod")).z.string().max(0).optional()
      });

      const body = ContactSchema.parse(request.body);

      // Honeypot anti-spam check
      if (body.honeypot && body.honeypot.length > 0) {
        return reply.status(400).send({ success: false, error: "Spam detected" });
      }

      // IP rate limit (max 1 message per 30 seconds per IP)
      const ip = request.ip;
      const lastSent = recentSubmissions.get(ip) || 0;
      if (Date.now() - lastSent < 30000) {
        return reply.status(429).send({
          success: false,
          error: "Rate limit exceeded. Please wait 30 seconds before sending another message."
        });
      }
      recentSubmissions.set(ip, Date.now());

      console.log(`[Contact Submission] From: ${body.name} (${body.email}) - Type: ${body.projectType || 'General'}`);
      console.log(`[Message]: ${body.message}`);

      return reply.send({
        success: true,
        message: "Thank you, your inquiry has been received! Muhammad Ali will reply to you within 24 hours.",
        timestamp: Date.now()
      });
    } catch (err: any) {
      return reply.status(400).send({
        success: false,
        error: err.errors ? err.errors[0]?.message : (err.message || "Invalid submission")
      });
    }
  });

  // AI Assistant endpoint with deterministic fallbacks and safe action tags
  fastify.post("/api/ai/chat", async (request, reply) => {
    try {
      const z = (await import("zod")).z;
      const schema = z.object({
        message: z.string().min(1).max(500)
      });
      const { message } = schema.parse(request.body);
      const lower = message.toLowerCase();

      // Check for theme switches
      const themeMatches = [
        { key: "cyberpunk", tag: "THEME_cyberpunk-neon", name: "CYBERPUNK NEON" },
        { key: "matrix", tag: "THEME_matrix-terminal", name: "MATRIX TERMINAL" },
        { key: "iron", tag: "THEME_iron-red", name: "IRON RED" },
        { key: "arctic", tag: "THEME_arctic-glass", name: "ARCTIC GLASS" },
        { key: "purple", tag: "THEME_midnight-purple", name: "MIDNIGHT PURPLE" },
        { key: "emerald", tag: "THEME_emerald-professional", name: "EMERALD PRO" },
        { key: "solar", tag: "THEME_solar-gold", name: "SOLAR GOLD" },
        { key: "ocean", tag: "THEME_ocean-blue", name: "OCEAN BLUE" },
        { key: "rose", tag: "THEME_rose-neon", name: "ROSE NEON" },
        { key: "paper", tag: "THEME_paper-studio", name: "PAPER STUDIO" },
        { key: "monochrome", tag: "THEME_monochrome", name: "MONOCHROME" },
        { key: "jarvis", tag: "THEME_jarvis-core", name: "JARVIS CORE" }
      ];

      for (const tm of themeMatches) {
        if (lower.includes(tm.key) && (lower.includes("theme") || lower.includes("switch") || lower.includes("set"))) {
          return reply.send({
            success: true,
            reply: `Calibrating visual HUD theme to ${tm.name}.`,
            actionTag: tm.tag,
            isAiGenerated: true
          });
        }
      }

      // Check for navigation & portfolio commands
      if (lower.includes("biosphere") || lower.includes("simulation") || lower.includes("canvas")) {
        return reply.send({
          success: true,
          reply: "Navigating to Aetheria 2.5D Collaborative Biosphere with real-time 25 Hz authoritative physics.",
          actionTag: "NAV_BIOSPHERE",
          isAiGenerated: true
        });
      }

      if (lower.includes("ivana") || lower.includes("ivanalexx")) {
        return reply.send({
          success: true,
          reply: "Ivana Studio (ivanalexx.com) is an international video production portfolio built with WordPress & Elementor Pro, featuring multi-format showreels and direct client lead capture.",
          actionTag: "PROJECT_IVANALEXX",
          isAiGenerated: true
        });
      }

      if (lower.includes("nexcurex")) {
        return reply.send({
          success: true,
          reply: "Nexcurex (nexcurex.com) is an e-commerce fashion storefront featuring product categories, special edition discounts (OFF20), and WooCommerce responsive shopping.",
          actionTag: "PROJECT_NEXCUREX",
          isAiGenerated: true
        });
      }

      if (lower.includes("arshad") || lower.includes("tile")) {
        return reply.send({
          success: true,
          reply: "Arshad Tiles is a business showcase website with 2.1s load time and 100% mobile friendliness, resulting in a CV-reported +40% increase in customer inquiries.",
          actionTag: "PROJECT_ARSHAD",
          isAiGenerated: true
        });
      }

      if (lower.includes("vet") || lower.includes("clinic")) {
        return reply.send({
          success: true,
          reply: "VetCarePlus (Malik Hassan Veterinary Clinic) features digital service listings and an online appointment request engine with 1.8s load times (CV-reported).",
          actionTag: "PROJECT_VET",
          isAiGenerated: true
        });
      }

      // Default contextual response
      return reply.send({
        success: true,
        reply: "Muhammad Ali is a Frontend Developer & Digital Creator based in Peshawar, Pakistan. He has delivered 15+ websites for businesses like Ivana Studio, Nexcurex, and Arshad Tiles with 100% satisfaction.",
        actionTag: "INFO_DEFAULT",
        isAiGenerated: true
      });
    } catch (err: any) {
      return reply.status(400).send({
        success: false,
        error: err.message || "Invalid request payload"
      });
    }
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
