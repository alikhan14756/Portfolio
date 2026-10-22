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
import { ALI_JARVIS_KNOWLEDGE } from "./data/aliJarvisKnowledge.js";

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

  // AI Assistant endpoint with deterministic conversational policy & safe action tags
  fastify.post("/api/ai/chat", async (request, reply) => {
    try {
      const z = (await import("zod")).z;
      const schema = z.object({
        message: z.string().min(1).max(500),
        history: z.array(z.object({ sender: z.string(), text: z.string() })).optional()
      });
      const { message, history } = schema.parse(request.body);
      const lower = message.toLowerCase().trim();

      // Retrieve last bot message for repeat / context
      const lastBotMessage = history
        ?.slice()
        .reverse()
        .find((h) => h.sender === "jarvis" || h.sender === "bot")?.text;

      // 1. ISLAMIC GREETINGS
      if (/^(assalam|salam|aoa|assalam[- ]?o[- ]?alaikum|assalamu\s*alaikum|asalam)\b/i.test(lower)) {
        return reply.send({
          success: true,
          reply: "Wa Alaikum Assalam! Welcome to Muhammad Ali's digital portfolio. I am ALI JARVIS, Ali's friendly portfolio assistant. How may I assist you today? You can ask about Ali's client websites (like Ivana Studio and Nexcurex), pricing packages, delivery timelines, or ask me to switch themes.",
          actionTag: "GREETING_SALAM",
          isAiGenerated: true
        });
      }

      // 2. STANDARD GREETINGS ("Hi", "Hello", "Hey", "Good morning", "Good evening")
      if (/^(hi|hello|hey|hiya|howdy|sup|yo|good\s*(morning|afternoon|evening|day)|greetings)\b/i.test(lower)) {
        return reply.send({
          success: true,
          reply: "Hello! I am ALI JARVIS, Muhammad Ali's personal portfolio guide and friendly AI assistant. How can I assist you today? You can ask about Ali's commercial client work (like Ivana Studio and Nexcurex), explore web development services and rates, or try out different visual themes!",
          actionTag: "GREETING",
          isAiGenerated: true
        });
      }

      // 3. "HOW ARE YOU?"
      if (
        lower.includes("how are you") ||
        lower.includes("how r u") ||
        lower.includes("how do you do") ||
        lower.includes("how's it going") ||
        lower.includes("how are things") ||
        lower.includes("whats up") ||
        lower.includes("what's up")
      ) {
        return reply.send({
          success: true,
          reply: "I'm doing great, thank you for asking! All systems are operating smoothly at 60 FPS. How are you doing today, and how can I help you explore Muhammad Ali's portfolio?",
          actionTag: "STATUS_NOMINAL",
          isAiGenerated: true
        });
      }

      // 4. "WHAT IS YOUR NAME?" / "WHO ARE YOU?"
      if (
        lower.includes("what is your name") ||
        lower.includes("what's your name") ||
        lower.includes("your name") ||
        (lower.includes("who are you") && !lower.includes("who are you to")) ||
        lower.includes("what are you")
      ) {
        return reply.send({
          success: true,
          reply: "My name is ALI JARVIS! I am Muhammad Ali's personal portfolio guide and friendly AI assistant. I'm here to help you explore Ali's client websites, inspect technical case studies, review pricing, and calibrate visual themes.",
          actionTag: "IDENTITY_JARVIS",
          isAiGenerated: true
        });
      }

      // 5. "WHO CREATED YOU?" / "WHO MADE YOU?"
      if (
        lower.includes("who created you") ||
        lower.includes("who made you") ||
        lower.includes("who built you") ||
        lower.includes("who developed you") ||
        lower.includes("who programmed you")
      ) {
        return reply.send({
          success: true,
          reply: "I was created and engineered by Muhammad Ali, a Frontend Developer and Digital Creator based in Peshawar, Pakistan, as an interactive companion for his digital portfolio.",
          actionTag: "CREATOR_INFO",
          isAiGenerated: true
        });
      }

      // 6. "WHAT CAN YOU DO?"
      if (
        lower.includes("what can you do") ||
        lower.includes("what are your capabilities") ||
        lower.includes("what do you do") ||
        lower.includes("what are you capable of")
      ) {
        return reply.send({
          success: true,
          reply: "I can assist you with:\n1. Discovering client projects: Ivana Studio (ivanalexx.com), Nexcurex (nexcurex.com), Arshad Tiles, VetCarePlus, and the Aetheria 2.5D simulation.\n2. Checking pricing & timelines: Landing pages ($150–$350), WordPress sites ($300–$600), WooCommerce stores ($500–$1,200+).\n3. Visual customization: Switching between all 12 themes (Cyberpunk, Matrix, Paper Studio, Arctic Glass, etc.).\n4. Audio & accessibility: Toggle reduced motion or mute voice reading.\n5. Explaining web technologies: WordPress, Elementor, React, Three.js, and PageSpeed optimization.\n6. Direct contact: Routing you directly to Muhammad Ali on WhatsApp (+92 305 5389967).",
          actionTag: "CAPABILITIES",
          isAiGenerated: true
        });
      }

      // 7. "CAN YOU HELP ME?"
      if (
        lower.includes("can you help me") ||
        lower.includes("help me") ||
        lower.includes("i need help") ||
        lower.includes("assist me")
      ) {
        return reply.send({
          success: true,
          reply: "I would be glad to help! What are you looking to do? You can:\n• Explore Ali's client case studies (Ivana Studio, Nexcurex, Arshad Tiles)\n• Inquire about website pricing and delivery timelines\n• Switch themes (try saying 'switch to cyberpunk' or 'make it lighter')\n• Contact Muhammad Ali directly on WhatsApp for a custom quote",
          actionTag: "HELP",
          isAiGenerated: true
        });
      }

      // 8. "THANK YOU"
      if (
        lower.includes("thank") ||
        lower.includes("thanks") ||
        lower.includes("thx") ||
        lower.includes("appreciate") ||
        lower.includes("jazakallah")
      ) {
        return reply.send({
          success: true,
          reply: "You're very welcome! It's my pleasure to assist you. If you have any questions about launching a new website with Ali or reviewing his code, just let me know.",
          actionTag: "THANK_YOU",
          isAiGenerated: true
        });
      }

      // 9. "GOODBYE"
      if (
        lower.includes("bye") ||
        lower.includes("goodbye") ||
        lower.includes("see you") ||
        lower.includes("see ya") ||
        lower.includes("cya") ||
        lower.includes("farewell") ||
        lower.includes("take care")
      ) {
        return reply.send({
          success: true,
          reply: "Goodbye! Thank you for visiting Muhammad Ali's portfolio. Feel free to reach out anytime on WhatsApp at +92 305 5389967 or email alikhanwebdeveloper@gmail.com. Have a wonderful day!",
          actionTag: "FAREWELL",
          isAiGenerated: true
        });
      }

      // 10. "TELL ME A JOKE"
      if (lower.includes("joke") || lower.includes("funny") || lower.includes("make me laugh") || lower.includes("humor")) {
        const jokes = [
          "Why do frontend developers prefer dark mode? Because light attracts bugs! Fortunately, Muhammad Ali ensures bug-free code across all 12 themes.",
          "There are 10 types of people in the world: those who understand binary, and those who don't! Ali happens to speak binary, JavaScript, and PHP fluently.",
          "Why did the web developer leave the restaurant? Because of the terrible table layout! Ali uses CSS Grid and Flexbox to keep everything perfectly aligned."
        ];
        const picked = jokes[Math.floor(Math.random() * jokes.length)];
        return reply.send({
          success: true,
          reply: picked,
          actionTag: "JOKE",
          isAiGenerated: true
        });
      }

      // 11. "TELL ME SOMETHING INTERESTING"
      if (
        lower.includes("something interesting") ||
        lower.includes("interesting fact") ||
        lower.includes("fun fact") ||
        lower.includes("tell me a fact")
      ) {
        return reply.send({
          success: true,
          reply: "Here's something interesting: According to Google research, 53% of mobile visits are abandoned if pages take longer than 3 seconds to load. That is why Muhammad Ali prioritizes Core Web Vitals and asset compression, achieving 1.8s to 2.1s load speeds on projects like Arshad Tiles and VetCarePlus, which generated a +40% surge in inquiries!",
          actionTag: "INTERESTING_FACT",
          isAiGenerated: true
        });
      }

      // 12. "WHAT TIME IS IT?"
      if (
        lower.includes("what time is it") ||
        lower.includes("what's the time") ||
        lower.includes("current time") ||
        lower.includes("time now") ||
        lower.includes("what is the time")
      ) {
        const pktTime = new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit"
        });
        return reply.send({
          success: true,
          reply: `In Peshawar, Pakistan (where Muhammad Ali is based, PKT / UTC+5), the current time is ${pktTime}. Muhammad Ali operates across flexible global timezones for client collaboration!`,
          actionTag: "TIME_CHECK",
          isAiGenerated: true
        });
      }

      // 13. MULTI-TURN FOLLOW-UP: "CAN YOU REPEAT THAT?"
      if (
        lower.includes("repeat that") ||
        lower.includes("say that again") ||
        lower.includes("what did you say") ||
        lower.includes("can you repeat") ||
        lower.includes("repeat please")
      ) {
        const prev = lastBotMessage || "I haven't said anything yet! How can I assist you with Muhammad Ali's portfolio today?";
        return reply.send({
          success: true,
          reply: `Here is what I said earlier:\n\n"${prev}"`,
          actionTag: "REPEAT_LAST",
          isAiGenerated: true
        });
      }

      // 14. MULTI-TURN FOLLOW-UP: "PLEASE SUMMARIZE THAT"
      if (
        lower.includes("summarize") ||
        lower.includes("summary") ||
        lower.includes("in short") ||
        lower.includes("tldr") ||
        lower.includes("tl;dr") ||
        lower.includes("briefly")
      ) {
        return reply.send({
          success: true,
          reply: "Summary: Muhammad Ali is a Peshawar-based Frontend Developer with 2+ years of verified commercial delivery specializing in custom WordPress/Elementor websites, WooCommerce e-commerce, and high-performance Web Vitals optimization.",
          actionTag: "SUMMARY_GENERAL",
          isAiGenerated: true
        });
      }

      // 15. MULTI-TURN FOLLOW-UP: "CAN YOU EXPLAIN THIS SIMPLY?" / "I DON'T UNDERSTAND"
      if (
        lower.includes("explain this simply") ||
        lower.includes("explain simply") ||
        lower.includes("i don't understand") ||
        lower.includes("dont understand") ||
        lower.includes("simple terms") ||
        lower.includes("like i'm 5") ||
        lower.includes("eli5")
      ) {
        return reply.send({
          success: true,
          reply: "Think of a website like a physical retail storefront: HTML builds the walls, CSS paints the decor, JavaScript adds the automatic sliding doors, and WordPress gives the shopkeeper an easy cash register to update merchandise without rebuilding the store! Ali builds every site so it is fast, welcoming, and easy for customers to buy from.",
          actionTag: "EXPLAIN_SIMPLE",
          isAiGenerated: true
        });
      }

      // 16. MULTI-TURN FOLLOW-UP: "TELL ME MORE"
      if (
        lower.includes("tell me more") ||
        lower.includes("more details") ||
        lower.includes("expand") ||
        lower.includes("elaborate") ||
        lower.includes("go on")
      ) {
        return reply.send({
          success: true,
          reply: "Muhammad Ali has 2+ years of verified commercial client delivery, working with both international creators (such as video director Ivana Alexx on Fiverr) and local retail enterprises (Nexcurex and Arshad Tiles). He also runs CodeVibe (@codevibe.anim) sharing creative frontend tutorials. Would you like to review his services, check pricing, or see specific project case studies?",
          actionTag: "TELL_ME_MORE",
          isAiGenerated: true
        });
      }

      // 17. QUICK THEME ADJUSTMENTS ("Make it darker", "Make it lighter")
      if (lower.includes("make it darker") || lower.includes("darker") || lower.includes("dark mode")) {
        return reply.send({
          success: true,
          reply: "Calibrated HUD to high-contrast dark theme (JARVIS CORE). Deep space navy with cyan luminescence.",
          actionTag: "THEME_jarvis-core",
          isAiGenerated: true
        });
      }

      if (lower.includes("make it lighter") || lower.includes("lighter") || lower.includes("light mode") || lower.includes("bright mode")) {
        return reply.send({
          success: true,
          reply: "Calibrated HUD to light theme (PAPER STUDIO). Editorial warm bone linen paper with slate typography and high daylight legibility.",
          actionTag: "THEME_paper-studio",
          isAiGenerated: true
        });
      }

      // 18. ACCESSIBILITY & AUDIO COMMANDS
      if (
        lower.includes("reduced motion") ||
        lower.includes("turn off animation") ||
        lower.includes("disable animation") ||
        lower.includes("stop animation") ||
        lower.includes("less motion")
      ) {
        return reply.send({
          success: true,
          reply: "Reduced motion mode activated. Canvas particle fields, 3D rotations, and layout transitions have been minimized for accessibility.",
          actionTag: "ACTION_REDUCED_MOTION_ON",
          isAiGenerated: true
        });
      }

      if (
        lower.includes("turn on animation") ||
        lower.includes("enable animation") ||
        lower.includes("restore animation") ||
        lower.includes("full motion")
      ) {
        return reply.send({
          success: true,
          reply: "Full motion animation systems restored. Fluid particles, 3D reactor nodes, and reactive transforms are now active.",
          actionTag: "ACTION_REDUCED_MOTION_OFF",
          isAiGenerated: true
        });
      }

      if (lower.includes("mute") || lower.includes("stop speaking") || lower.includes("silence") || lower.includes("be quiet")) {
        return reply.send({
          success: true,
          reply: "Speech synthesis muted. Audio output is now silenced.",
          actionTag: "ACTION_MUTE",
          isAiGenerated: true
        });
      }

      if (lower.includes("unmute") || lower.includes("speak again") || lower.includes("enable audio")) {
        return reply.send({
          success: true,
          reply: "Voice speech synthesis unmuted. Audio responses will be read aloud.",
          actionTag: "ACTION_UNMUTE",
          isAiGenerated: true
        });
      }

      // 19. SPECIFIC THEME SWITCHES (All 12 Themes)
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
        if (
          lower.includes(tm.key) &&
          (lower.includes("theme") || lower.includes("switch") || lower.includes("set"))
        ) {
          return reply.send({
            success: true,
            reply: `Calibrating visual HUD theme to ${tm.name}.`,
            actionTag: tm.tag,
            isAiGenerated: true
          });
        }
      }

      // 20. PROJECTS DEEP-DIVE
      if (lower.includes("ivana") || lower.includes("ivanalexx")) {
        return reply.send({
          success: true,
          reply: "Opening Ivana Studio case study (ivanalexx.com). Designed and built with WordPress & Elementor Pro for an international video producer on Fiverr, featuring multi-format showreels, cinematic video lightboxes, sub-2.2s load speed, and direct client lead capture.",
          actionTag: "PROJECT_IVANALEXX",
          isAiGenerated: true
        });
      }

      if (lower.includes("nexcurex")) {
        return reply.send({
          success: true,
          reply: "Opening Nexcurex case study (nexcurex.com). A modern fashion e-commerce storefront featuring WooCommerce product categories, special edition discounts (OFF20), dynamic coupon codes, and a responsive mobile cart drawer.",
          actionTag: "PROJECT_NEXCUREX",
          isAiGenerated: true
        });
      }

      if (lower.includes("arshad") || lower.includes("tile")) {
        return reply.send({
          success: true,
          reply: "Opening Arshad Tiles case study. Ali built a high-performance ceramic catalog site with a 2.1s average load time and 100% mobile responsiveness, resulting in a CV-reported +40% surge in customer inquiries through direct WhatsApp order integration.",
          actionTag: "PROJECT_ARSHAD",
          isAiGenerated: true
        });
      }

      if (lower.includes("vet") || lower.includes("clinic") || lower.includes("hassan")) {
        return reply.send({
          success: true,
          reply: "Opening VetCarePlus (Malik Hassan Veterinary Clinic) case study. Clean medical portal with online appointment booking, achieving a 1.8s load speed and a CV-reported +35% appointment surge.",
          actionTag: "PROJECT_VET",
          isAiGenerated: true
        });
      }

      if (lower.includes("shah") || lower.includes("sweet")) {
        return reply.send({
          success: true,
          reply: "Opening Shah-Sweet Store case study. Artisanal confectionery catalog engineered with mobile-first menu navigation and direct WhatsApp order messaging.",
          actionTag: "PROJECT_SHAH_SWEET",
          isAiGenerated: true
        });
      }

      if (
        lower.includes("spatial") ||
        lower.includes("multiplayer") ||
        lower.includes("ecosystem") ||
        lower.includes("aetheria") ||
        lower.includes("biosphere")
      ) {
        if (lower.includes("switch") || lower.includes("go to") || lower.includes("activate")) {
          return reply.send({
            success: true,
            reply: "Activating real-time 2.5D Aetheria Biosphere. Engaging 25 Hz authoritative Fastify physics, 60 WU spatial Moore grid, Hermite spline interpolation, synaptic tethers, and procedural audio synthesis.",
            actionTag: "NAV_BIOSPHERE",
            isAiGenerated: true
          });
        }
        return reply.send({
          success: true,
          reply: "Opening Aetheria 2.5D Collaborative Biosphere flagship case study. Built with Fastify 25 Hz authoritative physics, 60 WU spatial grid, Hermite spline interpolation, synaptic tethers, and climate state machine.",
          actionTag: "PROJECT_AETHERIA",
          isAiGenerated: true
        });
      }

      // 21. EDUCATIONAL CONCEPTS
      if (lower.includes("wordpress") || lower.includes("elementor")) {
        return reply.send({
          success: true,
          reply: "WordPress powers over 40% of the entire web. Ali builds custom WordPress websites using Elementor Pro, which gives clients full visual control to edit content easily, paired with custom CSS and asset dequeuing to ensure sub-2-second load times.",
          actionTag: "CONCEPT_WORDPRESS",
          isAiGenerated: true
        });
      }

      if (lower.includes("threejs") || lower.includes("three.js") || lower.includes("webgl") || lower.includes("3d")) {
        return reply.send({
          success: true,
          reply: "Three.js is a WebGL-powered 3D graphics library. On this portfolio, it powers the interactive 3D Arc Reactor Hologram and the real-time 2.5D Aetheria Biosphere simulation, rendering particles and meshes via custom GLSL shaders without bogging down browser performance.",
          actionTag: "CONCEPT_THREEJS",
          isAiGenerated: true
        });
      }

      if (lower.includes("pagespeed") || lower.includes("web vitals") || lower.includes("speed") || lower.includes("optimization")) {
        return reply.send({
          success: true,
          reply: "PageSpeed optimization focuses on Google Core Web Vitals: Largest Contentful Paint (LCP < 2.5s) and Cumulative Layout Shift (CLS < 0.1). Ali optimizes websites through Brotli compression, WebP image conversion, asset minification, and critical CSS rendering.",
          actionTag: "CONCEPT_PAGESPEED",
          isAiGenerated: true
        });
      }

      // 22. PRICING & TURNAROUND FAQ
      if (
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("rate") ||
        lower.includes("budget") ||
        lower.includes("how much") ||
        lower.includes("quote")
      ) {
        return reply.send({
          success: true,
          reply: "Muhammad Ali offers transparent, competitive pricing packages:\n• High-Converting Landing Pages: $150 – $350 (2–4 days)\n• Custom Business WordPress Sites (Elementor Pro): $300 – $600 (5–9 days)\n• Full WooCommerce E-Commerce Stores: $500 – $1,200+ (10–14 days)\n• Speed & Core Web Vitals Optimization: $100 – $250 (1–3 days)\nReach out on WhatsApp (+92 305 5389967) for a formal proposal within 1 hour!",
          actionTag: "FAQ_PRICING",
          isAiGenerated: true
        });
      }

      if (
        lower.includes("fast") ||
        lower.includes("how long") ||
        lower.includes("timeline") ||
        lower.includes("turnaround") ||
        lower.includes("deadline")
      ) {
        return reply.send({
          success: true,
          reply: "Muhammad Ali delivers rapid, reliable turnarounds:\n• Single Landing Pages: 2 – 4 business days\n• Multi-Page Business Websites: 5 – 9 business days\n• E-Commerce Stores: 10 – 14 business days\nExpress rush delivery is available upon request for urgent commercial launches.",
          actionTag: "FAQ_TIMELINE",
          isAiGenerated: true
        });
      }

      // 23. SERVICES & CONTACT
      if (
        lower.includes("contact") ||
        lower.includes("hire") ||
        lower.includes("whatsapp") ||
        lower.includes("email") ||
        lower.includes("phone")
      ) {
        return reply.send({
          success: true,
          reply: "You can reach Muhammad Ali directly:\n• WhatsApp: +92 305 5389967 (Fastest response)\n• Email: alikhanwebdeveloper@gmail.com\n• Based in Peshawar, Pakistan (available for global clients across US, UK, and European timezones).",
          actionTag: "NAV_CONTACT",
          isAiGenerated: true
        });
      }

      if (
        lower.includes("who is ali") ||
        lower.includes("who is muhammad ali") ||
        lower.includes("tell me about ali") ||
        lower.includes("location") ||
        lower.includes("peshawar") ||
        lower.includes("pakistan")
      ) {
        return reply.send({
          success: true,
          reply: "Muhammad Ali is a Frontend Developer & Digital Creator based in Peshawar, Pakistan 🇵🇰 with 2+ years of verified commercial client delivery. He specializes in WordPress, Elementor Pro, high-converting responsive UI/UX, and Web Vitals speed optimization, working remotely with clients worldwide.",
          actionTag: "INFO_ALI",
          isAiGenerated: true
        });
      }

      if (lower.includes("cv") || lower.includes("resume") || lower.includes("pdf")) {
        return reply.send({
          success: true,
          reply: "You can view or download Muhammad Ali's verified PDF resume directly. It documents 2+ years of commercial client work, skills, and education.",
          actionTag: "DOWNLOAD_CV",
          isAiGenerated: true
        });
      }

      // Default contextual response
      return reply.send({
        success: true,
        reply: "I'm not quite sure I understand that query, but I'm here to help! Would you like to:\n• Explore Ali's client projects (Ivana Studio, Nexcurex, Arshad Tiles)\n• Check website pricing and turnaround times\n• Switch visual themes (e.g., 'switch to cyberpunk' or 'make it lighter')\n• Contact Muhammad Ali directly on WhatsApp (+92 305 5389967)?",
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
