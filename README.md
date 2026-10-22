# AETHERIA PLATFORM // MUHAMMAD ALI PORTFOLIO & REAL-TIME BIOSPHERE

> **Production Specification & System Implementation Contract**  
> **Source of Truth:** [https://alibuild.site/](https://alibuild.site/)  
> **Developer:** Muhammad Ali — Frontend Web Developer & Digital Creator (Pakistan 🇵🇰)  
> **System Callsign:** `ALI.BUILD // JARVIS-CORE`

---

## 1. System Overview

**Aetheria** is a dual-modality web platform that merges a **JARVIS-inspired AI developer portfolio** with a **real-time collaborative 2.5D generative biosphere**:

1. **Portfolio HUD (Muhammad Ali)**: High-performance portfolio engineered with Next.js 15, React 19, Tailwind CSS, Lucide icons, and 12 live CSS variable themes. Accurately preserves all real data from [alibuild.site](https://alibuild.site/), including verified commercial client case studies, playground apps, services, timeline, testimonials, and direct WhatsApp contact routing.
2. **JARVIS AI Assistant**: Voice-activated AI copilot featuring real-time Web Speech recognition (STT) and Web Speech synthesis (TTS), project-aware knowledge base, instant case study drawer triggers, and theme switching commands.
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
│   │   │   └── server.ts                # Fastify HTTP + /health telemetry endpoint
│   │   └── package.json
│   └── client/              # Next.js 15 App Router, React 19, R3F & Tailwind CSS
│       ├── src/
│       │   ├── app/                     # Next.js root layout, global styles, page
│       │   ├── components/
│       │   │   ├── Portfolio/           # Hero, Projects, Drawer, Skills, Services, Contact
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

## 3. Portfolio Single Source of Truth (`alibuild.site`)

All profile information, statistics, and showcase entries are preserved with exact fidelity:

- **Identity**: Muhammad Ali — Frontend Web Developer & Digital Creator (Pakistan 🇵🇰)
- **Direct Contacts**: WhatsApp (`+92 305 5389967`), Email (`alikhanwebdeveloper@gmail.com`), GitHub (`@alibuilds`)
- **Key Stats**: 2+ Years Experience, 15+ Projects Completed, 100% Client Satisfaction, 90+ PageSpeed Scores
- **Featured Commercial Case Studies (with modal drawers, metrics, and architecture)**:
  1. **ivanalexx.com**: Portfolio platform for top-rated Fiverr video producer & director. 100% mobile responsive, dynamic showreel embed, custom lead capture.
  2. **Arshad Tiles**: Artisanal ceramic & porcelain tile showroom. +40% customer inquiries, 2.1s load time, 90+ PageSpeed score.
  3. **Malik Hassan Veterinary Clinic**: Modern animal healthcare clinic portal. +35% appointment bookings, online service catalog, instant WhatsApp booking.
  4. **Shah-Sweet Store**: Confectionery & traditional sweets web catalog. WooCommerce readiness, mobile order funnel, WhatsApp direct purchasing.
- **Playground Apps**: 5 interactive applications (Interactive Canvas Experiment, CSS Variable Styler, JavaScript Utility Suite, Responsive Layout Sandbox, Color Palette Studio).
- **Services**: Custom WordPress Development, Landing Pages & Redesign, Frontend Development & UI/UX, Speed & Performance Optimization.
- **Client Testimonials**: Business Owner Arshad Khan, Dr. Usman (Veterinary Surgeon), Sarah M. (Agency Director).

---

## 4. The 12 Production Themes & Customization Engine

The platform implements 12 fully working themes via CSS variables, instantly selectable in the HUD Customizer or via JARVIS voice commands:

| Theme ID | Name | Background | Primary Accent | Accent Secondary | Visual Atmosphere |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `jarvis-core` | JARVIS Core | `#040914` | `#38bdf8` (Sky) | `#22d3ee` (Cyan) | Holographic Stark HUD |
| `iron-man` | Iron Man | `#120406` | `#ef4444` (Crimson) | `#f59e0b` (Gold) | Hot-Rod Armor & Arc Glow |
| `cyberpunk` | Cyberpunk | `#0a0515` | `#facc15` (Yellow) | `#ec4899` (Pink) | Night City Neon Grid |
| `matrix` | Matrix | `#020804` | `#22c55e` (Emerald) | `#4ade80` (Green) | Digital Rain Phosphor |
| `arctic-glass` | Arctic Glass | `#06101c` | `#bae6fd` (Ice Blue) | `#7dd3fc` (Glacier) | Frosted Sub-Zero Glass |
| `midnight-purple`| Midnight Purple| `#090314` | `#c084fc` (Amethyst) | `#a855f7` (Violet) | Cosmic Nebula Violet |
| `emerald-pro` | Emerald Pro | `#03100e` | `#34d399` (Mint) | `#10b981` (Teal) | Forest Terminal Matrix |
| `solar-gold` | Solar Gold | `#120b02` | `#fbbf24` (Amber) | `#f59e0b` (Sunburst) | Radiant Solar Corona |
| `ocean-blue` | Ocean Blue | `#020d1a` | `#0ea5e9` (Cerulean) | `#38bdf8` (Aquamarine)| Deep Abyssal Trench |
| `rose-neon` | Rose Neon | `#120309` | `#fb7185` (Rose) | `#f43f5e` (Magenta) | Cyber-Rose Velvet Glow |
| `paper-studio` | Paper Studio | `#f5f4f0` | `#0f172a` (Slate) | `#334155` (Ink) | High-Contrast Editorial |
| `monochrome` | Monochrome | `#09090b` | `#f43f5e` (Ruby Accent) | `#e4e4e7` (Silver) | Minimalist Noir Monolith |

### Persistent User Customizations (`localStorage`)
- **Layout Modes**: `HUD Grid` (Modular sci-fi telemetry cards), `Cockpit Pane`, `Streamlined`, `Terminal Prompt`.
- **Typography**: `Syne` (Display/Modern), `JetBrains Mono` (Code), `Inter` (Clean UI), `Orbitron` (Futuristic HUD).
- **Canvas Particles**: `Curl Noise Swarm`, `Digital Rain`, `Nebula Stars`, `Geometric Hex`.
- **Animation Intensity**: `Full` (Stark Tech with full motion), `Balanced`, `Minimal` (Power Saver / Reduced Motion).

---

## 5. Verified Simulation & Benchmark Results

All system components have been rigorously verified and benchmarked under simulated load and soak conditions:

```
=================== VERIFICATION TEST RESULTS ===================
✓ [PASSED] Two-Client 150ms Latency Hermite Spline
   Details: Interpolated pos at t=75ms: 0.3750 WU (Expected smooth midpoint between 0 and 0.75 WU)
✓ [PASSED] Synaptic Tethers (12 WU) & Triangle Shield Detection
   Details: Confirmed Tethers: 3/3, Closed Formations: 1/1, Participants in Shield: true
✓ [PASSED] Climate State Transitions & Hysteresis Guards
   Details: STABLE -> TURBULENT verified: true, TURBULENT -> STABLE recovery verified: true
✓ [PASSED] AI Overseer Schema Validation & Deterministic Fallbacks
   Details: Generated: "Epoch of Hibernation" (FALLBACK), 2-sentence valid: true
✓ [PASSED] 100 Concurrent Client Load Simulation
   Details: Average tick duration: 4.85 ms (Budget: < 15.0 ms), Active Entities: 100
✓ [PASSED] Soak Test & Heap Memory Stability
   Details: Heap growth over 500 ticks: -1.56 MB (< 25 MB threshold)
=================================================================
```

### Extended 2,500-Tick Authoritative Benchmark (`soak_extended.ts`)
- **Entities Simulated**: 100 concurrent organisms across spatial cells
- **Total Authoritative Ticks**: 2,500 continuous ticks ($\Delta t = 40$ ms)
- **Average Tick Duration**: **4.636 ms** (out of 40 ms available window; 70% headroom below 15 ms budget)
- **95th Percentile Tick**: **6.188 ms**
- **99th Percentile Tick**: **11.287 ms**
- **Peak Tick Time**: **39.191 ms**
- **Heap Memory Delta**: **+4.13 MB** over 2,500 ticks (no memory leaks; active garbage reclamation)

---

## 6. Authoritative Physics & Mathematical Models

### A. Kinetic Limits & Clamps
- Speed clamp: $V_{\max} = 22.0\text{ WU/s}$ (Inputs exceeding $33.0\text{ WU/s}$ are rejected as malformed/cheat attempts).
- Energy pool: $E_{\max} = 100.0$, Passive regen: $+8.0\text{ units/s}$, Depletion penalty: speed throttled to $0.4 \cdot V_{\max}$ if $E < 5.0$.

### B. Synaptic Tethers & Topological Cycle Detection
- Connect distance: $D_{\text{connect}} = 12.0\text{ WU}$. Break distance (hysteresis): $D_{\text{break}} = 16.5\text{ WU}$.
- Connect duration: $300\text{ ms}$ continuous proximity required before tether forms.
- Polygon shield detection: Chordless cycle search for length $k \in [3, 6]$, convexity check $\sum \theta_i = (k-2)\pi \pm 0.15\text{ rad}$, surface area $\ge 25.0\text{ WU}^2$, and persistence $\ge 1200\text{ ms}$.
- On stabilization: Grants $8000\text{ ms}$ energy shield (infinite energy) to participating nodes.

### C. Climate State Machine
Evaluates rolling entropy index $S = 100 \cdot (0.35 \overline{V}_{\text{norm}} + 0.25 D_{\text{spatial}} + 0.25 R_{\text{shock}} + 0.15 C_{\text{tether}})$.
- **DORMANT**: $S < 15$ for $> 300\text{ s}$ (Exit: $S \ge 25$ for $> 15\text{ s}$).
- **STABLE**: Default baseline.
- **TURBULENT**: $S \ge 60$ for $> 30\text{ s}$ (Exit: $S < 50$ for $> 60\text{ s}$).
- **LUMINESCENT**: Formations/min $\ge 4.0$ with $S \in [30, 65]$.

---

## 7. Running the Platform

### Local Development
```bash
# 1. Install dependencies across workspace
pnpm install

# 2. Build common types & schemas
pnpm --filter @aetheria/common build

# 3. Start Fastify simulation server (Port 4000)
pnpm dev:server

# 4. Start Next.js client dev server (Port 3000)
pnpm dev

# 5. Run automated verification test suite
pnpm test
```

### Production Build & Launch
```bash
# Build all packages
pnpm build
pnpm build:server

# Start client in production
pnpm --filter @aetheria/client start

# Start server in production
pnpm --filter @aetheria/server start
```

### Docker Deployment
```bash
docker-compose up --build -d
```
Services available:
- Client: `http://localhost:3000`
- Server & Healthcheck: `http://localhost:4000/health`
- Redis: `localhost:6379`
- MongoDB: `localhost:27017`

---

## 8. Telemetry Endpoint (`GET /health`)

Returns real-time server vitals:
```json
{
  "status": "healthy",
  "timestamp": 1792634542267,
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
