# AETHERIA PLATFORM // MUHAMMAD ALI PORTFOLIO & REAL-TIME BIOSPHERE

> **Master Specification & Implementation Documentation**  
> **Source of Truth:** [https://alibuild.site/](https://alibuild.site/) & Verified CV (`Muhammad_Ali_CV.pdf`)  
> **Operator:** Muhammad Ali — Frontend Developer & Digital Creator (Peshawar, Pakistan 🇵🇰)  
> **System Callsign:** `ALI.BUILD // JARVIS-CORE`

---

## 1. System Overview

**Aetheria** is a dual-modality web platform that merges a **JARVIS-inspired interactive developer portfolio** with a **real-time collaborative 2.5D generative biosphere**:

1. **Portfolio HUD (Muhammad Ali)**: High-performance portfolio engineered with Next.js 15, React 19, Tailwind CSS, Lucide icons, and 12 live CSS variable themes. Accurately preserves all verified data from [alibuild.site](https://alibuild.site/) and the CV, including commercial client case studies, playground apps, services, timeline, testimonials, and direct WhatsApp contact routing.
2. **JARVIS AI Assistant**: Voice-activated AI copilot featuring real-time Web Speech recognition (STT) and Web Speech synthesis (TTS), project-aware knowledge base, instant case study drawer triggers, and theme switching commands. Includes a deterministic fallback response catalog when external APIs are offline.
3. **Aetheria 2.5D Biosphere**: Unbounded 2.5D continuous Cartesian plane $(x, y \in \mathbb{R})$, rendered via Three.js (R3F) and custom GLSL curl-noise shaders on an `InstancedMesh`. Powered by a **25 Hz authoritative Fastify/Node.js physics engine**, **20 Hz Socket.IO state replication**, **60 WU spatial grid interest management**, **synaptic tethers**, **topological cycle detection**, **climate state machine**, and **hardened AI Overseer chronicle engine**.

---

## 2. Monorepo Architecture

The platform is structured as an optimized Turborepo monorepo:

```
d:\ALI KHAN\aetheria-platform\
├── packages/
│   ├── common/              # Shared TypeScript contracts, math models, and Zod schemas
│   │   ├── src/
│   │   │   ├── constants.ts # Fixed simulation limits (V_MAX=22, Connect=12 WU, etc.)
│   │   │   ├── math.ts      # Hermite spline, gravitational forces, Lydian quantizer
│   │   │   ├── schemas.ts   # MovementPacketSchema, CodexOutputSchema, UserPreferences
│   │   │   └── types.ts     # ClimateStatus, EntityFlags, OrganismState, Formations
│   │   └── package.json
│   ├── server/              # Authoritative Fastify & Socket.IO simulation engine
│   │   ├── src/
│   │   │   ├── simulation/
│   │   │   │   ├── SpatialGrid.ts       # 60 WU Moore neighborhood (3x3 grid)
│   │   │   │   ├── PhysicsEngine.ts     # 25 Hz authoritative loop, speed & energy clamps
│   │   │   │   ├── CycleDetector.ts     # Hysteresis tethers, cycle DFS, Shoelace area
│   │   │   │   ├── ClimateEngine.ts     # Composite entropy S & hysteresis state machine
│   │   │   │   ├── verification.test.ts # 6-part automated verification test suite
│   │   │   │   └── soak_extended.ts     # 2,500-tick extended soak benchmark
│   │   │   ├── services/
│   │   │   │   ├── AiOverseer.ts        # 15-min adaptive cron & deterministic fallbacks
│   │   │   │   └── Persistence.ts       # Fossil relics, snapshots, and lore codex
│   │   │   ├── sockets/
│   │   │   │   └── SocketHandler.ts     # 30 pkts/s rate limiter & 20 Hz delta sync
│   │   │   └── server.ts                # Fastify HTTP + /health, /api/contact, /api/ai/chat
│   │   └── package.json
│   └── client/              # Next.js 15 App Router, React 19, R3F & Tailwind CSS
│       ├── public/
│       │   ├── assets/                  # Original high-res project assets & images
│       │   ├── Muhammad_Ali_CV.pdf      # Verified downloadable CV
│       │   ├── robots.txt               # SEO Crawler directives
│       │   └── sitemap.xml              # Canonical sitemap for alibuild.site
│       ├── src/
│       │   ├── app/                     # Next.js root layout, global styles, page
│       │   ├── components/
│       │   │   ├── Portfolio/           # Hero, About, FlagshipRoadmap, Projects, Drawer, Skills, Services, Workflow, Contact
│       │   │   ├── Jarvis/              # JARVIS voice & text assistant modal
│       │   │   └── Canvas/              # R3F Biosphere, Organism, InstancedMesh particles
│       │   ├── engine/                  # Native Web Audio API procedural sound graph
│       │   ├── stores/                  # Zustand portfolio & transient biosphere stores
│       │   ├── data/                    # portfolioData.ts (Single source of truth)
│       │   └── styles/                  # themes.css (12 working CSS variable themes)
│       └── package.json
├── docker-compose.yml       # Production multi-container orchestration
├── Dockerfile.server        # Container recipe for Fastify simulation server
├── Dockerfile.client        # Container recipe for Next.js 15 client
└── README.md
```

---

## 3. Verified Portfolio & Project Catalog

All profile information, statistics, and showcase entries are preserved with exact fidelity:

- **Identity**: Muhammad Ali — Frontend Developer & Digital Creator (Peshawar, Khyber Pakhtunkhwa, Pakistan 🇵🇰)
- **Direct Contacts**: WhatsApp (`+92 305 5389967`), Email (`alikhanwebdeveloper@gmail.com`), GitHub (`@alikhan14756`), Location: Peshawar, Pakistan
- **Education**:
  - **FSc (Pre-Medical)**: Peshawar Model Degree College, Graduated 2025 · Peshawar, KPK
  - **Diploma in Information Technology (DIT)**: Technical Board, 2025 – Present (In Progress)
- **Languages**: Pashto (Native), Urdu (Fluent), English (Professional)
- **Content Brand**: CodeVibe (`@codevibe.anim` on Instagram & TikTok) — tutorials on creative CSS animations, JavaScript micro-interactions, and 2.5D web experiments
- **Verified Commercial Client Projects**:
  1. **Ivana Studio ([`https://ivanalexx.com/`](https://ivanalexx.com/))**: Ivan's Studios Videography. High-converting portfolio platform for an international video producer & director on Fiverr. Built with WordPress & Elementor Pro; features multi-format showreel embeds, 100% responsiveness, and conversion-optimized lead capture.
  2. **Nexcurex ([`https://nexcurex.com/`](https://nexcurex.com/))**: Modern e-commerce fashion & apparel storefront featuring seasonal collections, denim, footwear, accessories, promotional coupon funnels (`OFF20`), and WooCommerce responsive catalog integration.
  3. **Arshad Tiles ([`https://alikhan14756.github.io/Arshad-Tiles/`](https://alikhan14756.github.io/Arshad-Tiles/))**: Artisanal ceramic & porcelain tile showroom. Achieved **+40% customer inquiry surge**, **2.1s page load**, and **90+ Google PageSpeed score** (CV-reported).
  4. **VetCarePlus (Malik Hassan Veterinary Clinic)**: Modern animal healthcare clinic portal with digital medical service directory and direct WhatsApp appointment booking (**+35% booking increase**, CV-reported).
  5. **Shah-Sweet Store ([`https://alikhan14756.github.io/Shah-Sweet/`](https://alikhan14756.github.io/Shah-Sweet/))**: Confectionery & traditional sweets web catalog with WooCommerce readiness, mobile order funnel, and WhatsApp direct purchasing.
- **Engineering Flagship**:
  - **Aetheria 2.5D Collaborative Biosphere**: Authoritative multiplayer simulation with 25 Hz physics loop, 60 WU spatial grid, synaptic tethers, and climate entropy state machine.
- **Personal Experiments & Demonstrations**:
  - **CSS Animation Showcase**: 20+ creative micro-interaction effects, 98 performance score on Lighthouse.
  - **Ball Physics Engine**: Canvas 2D 60 FPS elastic collisions & gravitational simulation.
  - **QR Code Generator**: Custom responsive QR code generator and scanner tool.
  - **Quiz Application**: Interactive dynamic trivia platform with 500+ users (CV-reported).
- **Services**: Custom WordPress Development, Landing Pages That Convert, Website Redesign & Modernization, UI Implementation & Animation.
- **Process & Workflow**: 1. Discovery & Strategy $\rightarrow$ 2. UI/UX & Wireframing $\rightarrow$ 3. Development & Optimization $\rightarrow$ 4. Testing, Launch & Growth.

---

## 4. The 12 Production Themes & Theme Studio

The platform implements 12 fully working themes via CSS variables, switchable via the **Theme Studio (`Alt + T`)** or JARVIS voice commands:

| # | Theme ID | Display Name | Background | Primary Accent | Secondary Accent | Visual Identity |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `jarvis-core` | **JARVIS Core** | `#040914` | `#38bdf8` (Sky) | `#22d3ee` (Cyan) | Holographic Arc Stark HUD |
| 2 | `iron-red` | **Iron Red** | `#120406` | `#ef4444` (Crimson) | `#f59e0b` (Gold) | Charcoal, Metallic Red & Gold |
| 3 | `cyberpunk-neon`| **Cyberpunk Neon** | `#0a0515` | `#facc15` (Yellow) | `#ec4899` (Pink) | Night City Neon Cyberdeck |
| 4 | `matrix-terminal`| **Matrix Terminal**| `#020804` | `#22c55e` (Emerald) | `#4ade80` (Green) | CRT Digital Rain Phosphor |
| 5 | `arctic-glass` | **Arctic Glass** | `#06101c` | `#bae6fd` (Ice Blue) | `#7dd3fc` (Glacier) | Sub-Zero Frosted Glass |
| 6 | `midnight-purple`| **Midnight Purple**| `#090314` | `#c084fc` (Amethyst) | `#a855f7` (Violet) | Deep Cosmic Violet |
| 7 | `emerald-professional`| **Emerald Pro** | `#03100e` | `#34d399` (Mint) | `#10b981` (Teal) | High-Tech Forest Terminal |
| 8 | `solar-gold` | **Solar Gold** | `#120b02` | `#fbbf24` (Amber) | `#f59e0b` (Sunburst) | Radiant Solar Corona |
| 9 | `ocean-blue` | **Ocean Blue** | `#020d1a` | `#0ea5e9` (Cerulean) | `#38bdf8` (Aquamarine)| Abyssal Trench Luminescence |
| 10 | `rose-neon` | **Rose Neon** | `#120309` | `#fb7185` (Rose) | `#f43f5e` (Magenta) | Cyber-Rose Velvet Glow |
| 11 | `paper-studio` | **Paper Studio** | `#f5f4f0` | `#0f172a` (Slate) | `#334155` (Ink) | High-Contrast Editorial Bone |
| 12 | `monochrome` | **Monochrome** | `#09090b` | `#f43f5e` (Ruby Accent) | `#e4e4e7` (Silver) | Minimalist Noir Monolith |

### Theme Studio Features:
- Custom Hex Accent Color Picker (overrides `--accent-primary` across all panels).
- Corner Radius Selector (`sharp`, `rounded`, `pill`).
- Panel Opacity Settings (`solid`, `glass`, `frosted`).
- Glow Strength (`off`, `subtle`, `high`).
- Typography Pairing (`Syne`, `JetBrains Mono`, `Inter`, `Orbitron`).
- Animation Intensity (`full`, `balanced`, `minimal`, `off`).
- Animation Speed Multipliers (`0.75x`, `1.0x`, `1.25x`).
- Atmospheric Toggles (Grid lines, Scanlines, Cursor spotlight).
- Master Mute & UI sound controls.
- Export / Import versioned JSON appearance presets (`ali-jarvis-theme-v2.json`).
- Keyboard Shortcut: `Alt + T` toggles the studio from anywhere.

---

## 5. Measured Benchmark & Verification Results

All tests and benchmarks were executed and measured directly on the codebase (`pnpm test` and `pnpm tsx src/simulation/soak_extended.ts`):

```
=================== VERIFICATION TEST RESULTS ===================
✓ [PASSED] Two-Client 150ms Latency Hermite Spline
   Details: Interpolated pos at t=75ms: 0.3750 WU (Expected smooth midpoint between 0.0 and 0.75 WU)
✓ [PASSED] Synaptic Tethers (12 WU) & Triangle Shield Detection
   Details: Confirmed Tethers: 3/3, Closed Formations: 1/1, Participants in Shield: true
✓ [PASSED] Climate State Transitions & Hysteresis Guards
   Details: STABLE -> TURBULENT verified: true, TURBULENT -> STABLE recovery verified: true
✓ [PASSED] AI Overseer Schema Validation & Deterministic Fallbacks
   Details: Generated: "Epoch of Hibernation" (FALLBACK), 2-sentence valid: true
✓ [PASSED] 100 Concurrent Client Load Simulation
   Details: Average tick duration: 4.39 ms (Budget: < 15.0 ms), Active Entities: 100
✓ [PASSED] Soak Test & Heap Memory Stability
   Details: Heap growth over 500 ticks: -1.54 MB (Reclaimed by GC, < 25 MB threshold)
=================================================================
```

### Extended 2,500-Tick Authoritative Benchmark (`soak_extended.ts`)
- **Entities Simulated**: 100 concurrent active organisms across spatial grid cells
- **Total Authoritative Ticks**: 2,500 continuous ticks ($\Delta t = 40$ ms)
- **Wall Clock Duration for 2,500 ticks**: 11.59 seconds
- **Average Tick Duration**: **4.636 ms** (70% headroom below the 15.0 ms server simulation budget)
- **95th Percentile Tick**: **6.188 ms**
- **99th Percentile Tick**: **11.287 ms**
- **Peak Max Tick**: **39.191 ms** (within the 40 ms physics window)
- **Net Heap Delta**: **+4.13 MB** over 2,500 ticks (zero memory leaks detected)

---

## 6. Server Endpoints & Telemetry

The Fastify server on port 4000 provides:

1. **`GET /health`**: Real-time server telemetry:
   ```json
   {
     "status": "healthy",
     "timestamp": 1792637586572,
     "uptimeSeconds": 1420,
     "eventLoopDelayMs": 0.45,
     "lastTickDurationMs": 4.63,
     "activeEntities": 100,
     "climate": "STABLE",
     "entropyScore": 34.2,
     "tethersCount": 14,
     "closedFormations": 2,
     "vMax": 22.0
   }
   ```
2. **`POST /api/contact`**: Validated inquiry submission with anti-spam honeypot and per-IP rate limiting:
   ```json
   {
     "name": "Alex Morgan",
     "email": "alex@company.com",
     "projectType": "WordPress Website",
     "message": "We need a high-performance web redesign."
   }
   ```
3. **`POST /api/ai/chat`**: Autonomous JARVIS dialogue and action tag execution.

---

## 7. Execution Commands

```bash
# Navigate to workspace
cd "d:\ALI KHAN\aetheria-platform"

# Run automated tests
pnpm test

# Run extended soak benchmark
pnpm --filter @aetheria/server tsx src/simulation/soak_extended.ts

# Start Fastify server (Port 4000)
pnpm dev:server

# Start Next.js client (Port 3000)
pnpm dev

# Multi-container Docker deployment
docker-compose up --build -d
```
