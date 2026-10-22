# AETHERIA: TECHNICAL SPECIFICATION & IMPLEMENTATION MASTER PROMPT

# ARCHITECTURAL EXECUTION CONTRACT: AETHERIA (CORE BIOSPHERE)
# REVISION: 2.0 (PRODUCTION SPECIFICATION)
# SYSTEM TARGET: REAL-TIME COLLABORATIVE 2.5D GENERATIVE ECOSYSTEM

---

## 1. SYSTEM IDENTITY & THE CORE INTERACTION LOOP
Aetheria is an infinite, shared, physics-driven digital ecosystem where web visitors do not navigate traditional pages. 
The system operates strictly on five interconnected loops:
1. EXPLORE: Users navigate an unbounded 2.5D procedural plane, encountering procedural flora, ancient fossils, and dynamic anomalies.
2. INTERACT: Deterministic forces (attraction, repulsion, velocity shear) emit local particle turbulence and trigger procedural audio synthesis.
3. COLLABORATE: 3+ entities forming closed topological cycles maintain geometric energy fields, producing rare emergent fossils and harmonic chords.
4. INFLUENCE: Collective interaction volume and entropy drive a server-side climate state machine (LUMINESCENT, STABLE, TURBULENT, DORMANT).
5. CHRONICLE: Historical events, extinct formations, and climate shifts are narrated asynchronously by an LLM-powered chronicler as persistent cultural lore.

---

## 2. PRODUCTION TECH STACK (ZERO ALTERNATIVES)
- CLIENT APPLICATION: Next.js (App Router), React 19, TypeScript (Strict Mode).
- VIEWPORT RENDERING: Three.js via React Three Fiber (R3F) + custom GLSL Shaders.
  - RULE: No particles rendered as individual React components. Use `InstancedMesh` and raw `BufferGeometry` with custom vertex/fragment shaders.
- CLIENT STATE: Zustand (transient simulation state outside React render cycles).
- CLIENT AUDIO: Web Audio API (Native, zero audio file assets) via an isolated procedural audio graph.
- UI & ACCESSIBILITY: Tailwind CSS, Motion for React (HUD overlay only; never Canvas elements).
- SERVER RUNTIME: Node.js (v20+ LTS) with Fastify and TypeScript.
- REAL-TIME TRANSPORT: Socket.IO (WebSockets with fallbacks).
  - PACKET ENCODING: JSON for handshake/events; delta-compressed arrays for state ticks.
- VOLATILE STORAGE & PUB/SUB: Redis (Session TTL, spatial indexing, multi-node Pub/Sub).
- PERSISTENT DATABASE: MongoDB with Mongoose (Snapshots, Fossils, Codex Lore, Ephemeral User Profiles).
- SCHEMA VALIDATION: Zod (Strict runtime validation on all Socket payloads, REST endpoints, and AI outputs).
- AUTOMATED TESTING: Vitest (Unit/Integration), Playwright (E2E Canvas & WebSocket testing).

---

## 3. SPATIAL MODEL & COORDINATE SYSTEM
- COORDINATE SPACE: Global 2.5D Continuous Cartesian Plane $(x, y \in \mathbb{R})$.
  - Units: Arbitrary World Units (WU). 1 WU $\approx$ 1 visual meter.
  - Z-Axis: Reserved strictly for visual parallax, lighting layers, and depth attenuation (range: $z \in [-10, 10]$).
  - All physics, collisions, distance queries, and spatial indexing execute exclusively in $(x, y)$.
- VIEWPORT & CAMERA: Orthographic camera with linear interpolation follow ($LERP = 0.08$) and clamped zoom:
  - World View Bounds: Camera zoom dynamically maps viewport width to $[80, 240]$ World Units.
- TETHER THRESHOLDS (WORLD UNITS):
  - Connect Distance: $D_{\text{connect}} = 12.0\text{ WU}$.
  - Break Distance (Hysteresis): $D_{\text{break}} = 16.5\text{ WU}$.
  - Connection Confirmation Duration: $300\text{ ms}$ continuous proximity.

---

## 4. MATHEMATICAL PHYSICS ENGINE & STABILITY LIMITS

### A. Local Authority vs. Server Authority
- Movement: Client calculates predictive local movement; Server validates velocity vectors and enforces world bounds/speed clamps.
- Forces & Formations: Server-authoritative. The server computes tether creation, cycle detection, energy drain, and shockwave propagation.

### B. Force Models (Deterministic)
1. Gravitational Attraction:
   $$F_{\text{attract}} = \min\left(F_{\max}, \frac{G \cdot M_1 \cdot M_2}{d^2 + \epsilon}\right)$$
   Where: $G = 120.0$, $F_{\max} = 45.0\text{ WU/s}^2$, Softening factor $\epsilon = 4.0\text{ WU}^2$.
   Effective Radius: $R_{\text{attract}} = 25.0\text{ WU}$. Clamped to zero beyond $R_{\text{attract}}$.

2. Shockwave Repulsion:
   $$F_{\text{repulse}}(d) = I_0 \cdot \left(1 - \frac{d}{R_{\text{blast}}}\right) \quad \text{for } d \le R_{\text{blast}}$$
   Where: Maximum impulse $I_0 = 80.0\text{ WU/s}$, Blast radius $R_{\text{blast}} = 30.0\text{ WU}$.

### C. Kinetic Safeguards & Energy Budgets
- Speed Limits: $V_{\max} = 22.0\text{ WU/s}$. Acceleration limit: $A_{\max} = 60.0\text{ WU/s}^2$.
- Energy Pool:
  - Max Capacity: $E_{\max} = 100.0$. Passive Regen: $+8.0\text{ units/s}$.
  - Attraction Drain: $-15.0\text{ units/s}$. Shockwave Cost: $-45.0\text{ units flat}$ (Cooldown: $1.2\text{ s}$).
  - Depletion Penalty: If $E < 5.0$, all emitted forces collapse; organism speed scales down to $0.4 \cdot V_{\max}$.

---

## 5. CLIENT-SERVER REPLICATION & SPATIAL INTEREST MANAGEMENT

### A. Network Tick Rates
- Client Render Loop: RequestAnimationFrame (up to native 60–144 Hz).
- Client Input Dispatch: 20 Hz throttled delta updates (Vector2 position, Velocity, Intent Flags).
- Server Authoritative Tick: 25 Hz (Delta time $\Delta t = 40\text{ ms}$).
- Entity Sync Dispatch: 15–20 Hz (Adaptive per-client spatial prioritization).

### B. Spatial Partitioning & Interest Management
- World Partitioning: Spatial Grid with cell dimensions $60\text{ WU} \times 60\text{ WU}$.
- Subscriptions: Clients subscribe to their current cell + 8 surrounding Moore neighborhood cells ($3 \times 3$ grid = $180\text{ WU} \times 180\text{ WU}$ active zone).
- Packet Pruning: Entities outside the $3 \times 3$ grid are culled server-side. Entities in outer cells are downsampled to 5 Hz.
- Client Smoothing: Remote entities are rendered using Hermite spline interpolation with a rolling $100\text{ ms}$ jitter buffer.

---

## 6. SYNAPTIC TETHERS & TOPOLOGICAL CYCLE DETECTION

### A. Graph Representation
- The server maintains an undirected proximity graph $G = (V, E)$ per spatial grid cluster.
  - $V$: Active organisms in cluster.
  - $E$: Verified bidirectional connections ($d \le D_{\text{connect}}$).

### B. Polygon (Shield) Detection Algorithm
- On each server tick, for every connected component in $G$ with $\vert{}V\vert{} \ge 3$:
  1. Execute a modified cycle detection (DFS/Tarjan) to find chordless cycles of length $k \in [3, 6]$.
  2. A formation is validated if:
     - All internal angles satisfy convexity: $\sum \theta_i = (k - 2)\pi \pm 0.15\text{ rad}$.
     - Minimum surface area: Area $\ge 25.0\text{ WU}^2$.
     - Persistence: Cycle survives uninterrupted for $\ge 1200\text{ ms}$.
  3. Action on Confirmation:
     - Emit `FORMATION_STABILIZED` event with centroid coordinates.
     - Generate a persistent Energy Shield (Lifetime: $8000\text{ ms}$, grants infinite energy to participants).
     - Broadcast unique harmonic chord identifier to participants.

---

## 7. CLIMATE STATE MACHINE & BIOSPHERE ENTROPY

### A. Composite Entropy Metric
Global Biosphere Entropy Index ($S$) evaluated over a rolling 60-second window:
$$S = 100 \cdot (0.35 \cdot \overline{V}_{\text{norm}} + 0.25 \cdot D_{\text{spatial}} + 0.25 \cdot R_{\text{shock}} + 0.15 \cdot C_{\text{tether}})$$
Where all components are normalized to $[0, 1]$ against active population baselines.

### B. State Transition Rules (Hysteresis Guarded)
| State | Entry Condition | Exit Threshold | Environmental Effect |
| :--- | :--- | :--- | :--- |
| **DORMANT** | $S < 15$ for $> 300\text{ s}$ | $S \ge 25$ for $> 15\text{ s}$ | Desaturation (HSL saturation $\times 0.2$), background particle velocity $\times 0.15$, Sub-bass drone ($55\text{ Hz}$). |
| **STABLE** | Default baseline | $S > 60$ or $S < 15$ | Neutral bioluminescence, balanced particle flow, Mid-frequency harmonics. |
| **TURBULENT** | $S \ge 60$ for $> 30\text{ s}$ | $S < 50$ for $> 60\text{ s}$ | High chromatic aberration, chaotic particle vectors, minor turbulence impulses. |
| **LUMINESCENT** | Formations/min $\ge 4.0$ & $S \in [30, 65]$ | Formations/min $< 1.5$ | High-intensity bloom, golden/cyan palettes, Lydian mode arpeggiation. |

---

## 8. HARDENED AI OVERSEER CONTRACT & FALLBACK ENGINE

### A. Execution Policy
- Invocation: Adaptive Cron. Fires every 15 minutes ONLY if $\Delta \text{Events} \ge 50$ since last run. If inactive, logs fallback dormancy record.
- Security: API Keys isolated strictly to server environment variables. Zero client exposure.
- Authority Boundary: The LLM produces cultural/historical artifacts only. It is strictly forbidden from directly setting game state, velocities, or coordinates.

### B. Strict Schema & System Prompt
The LLM call MUST use JSON mode with runtime Zod schema parsing:

```typescript
export const CodexOutputSchema = z.object({
  eraTitle: z.string().min(3).max(60),
  observation: z.string().min(20).max(400).refine(
    (val) => (val.match(/[.!?]/g) || []).length === 2,
    { message: "Observation must contain exactly two sentences." }
  )
});
```

System prompt:
```
ROLE: Global Overseer of Aetheria (digital ecosystem).
INPUT: Validated, aggregated environmental metrics digest.
RULES:
1. Return a pure JSON object matching the schema: {"eraTitle": string, "observation": string}.
2. Exactly two sentences. Poetic, detached, scientifically evocative tone.
3. Base observations purely on the metrics digest (velocity, tethers, shockwaves, entropy).
4. Do NOT reference real-world events, users, usernames, or technical stack details.
5. Do NOT include Markdown formatting or code fences.
```

### C. Fallback Matrix
If LLM API times out (> 5000 ms), rate limits, or fails schema validation:
Emit pre-compiled deterministic lore based on current climate state (e.g., FALLBACK_DORMANT_04: "The current subsided into crystalline silence. Cold structures rested beneath the inert ether.").
Flag record in database as generationMethod: "FALLBACK".

---

## 9. MONGODB SCHEMAS, INDEXES & DATA RETENTION
```typescript
// 1. Biosphere Snapshot Collection
const BiosphereSnapshotSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, index: true },
  activeEntities: { type: Number, required: true },
  entropyScore: { type: Number, required: true, min: 0, max: 100 },
  climateStatus: { 
    type: String, 
    enum: ['LUMINESCENT', 'STABLE', 'TURBULENT', 'DORMANT'], 
    required: true 
  },
  metricsDigest: {
    averageSpeed: Number,
    attractionCount: Number,
    repulsionCount: Number,
    tethersFormed: Number,
    closedFormations: Number
  },
  simulationVersion: { type: String, required: true }
});
BiosphereSnapshotSchema.index({ timestamp: -1 }, { expireAfterSeconds: 86400 * 30 }); // 30-day retention

// 2. Fossil Collection (Significant Historical Relics)
const FossilSchema = new mongoose.Schema({
  regionId: { type: String, required: true, index: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  geometryType: { type: String, enum: ['TRIANGLE', 'QUAD', 'POLYGON_CYCLE'], required: true },
  vertices: [{ x: Number, y: Number }],
  hue: { type: Number, required: true },
  intensity: { type: Number, default: 1.0 },
  triggerEvent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date, required: true, index: true }
});
FossilSchema.index({ regionId: 1, expiresAt: 1 });
FossilSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Native MongoDB TTL

// 3. Codex History Collection
const CodexSchema = new mongoose.Schema({
  eraTitle: { type: String, required: true, maxlength: 60 },
  observation: { type: String, required: true, maxlength: 400 },
  climateAtGeneration: { type: String, required: true },
  metricsSnapshot: {
    entropyScore: Number,
    activeEntities: Number
  },
  generationMethod: { type: String, enum: ['AI', 'FALLBACK'], required: true },
  promptVersion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: -1 }
});

// 4. Anonymous Ephemeral User Session
const UserSessionSchema = new mongoose.Schema({
  clientGeneratedId: { type: String, required: true, unique: true }, // WebCrypto UUID v4
  firstSeenAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now, index: true },
  preferences: {
    reducedMotion: { type: Boolean, default: false },
    soundEnabled: { type: Boolean, default: true }
  }
});
UserSessionSchema.index({ lastSeenAt: -1 }, { expireAfterSeconds: 86400 * 90 }); // 90-day retention
```

---

## 10. REAL-TIME PROTOCOL DATA DEFINITIONS

### A. Client -> Server Payloads (Zod Validated)
```typescript
export const MovementPacket = z.object({
  seq: z.number().int(),
  x: z.number().finite().min(-10000).max(10000),
  y: z.number().finite().min(-10000).max(10000),
  vx: z.number().finite().min(-30).max(30),
  vy: z.number().finite().min(-30).max(30),
  isAttracting: z.boolean(),
  isShockwaveRequested: z.boolean()
});
```

### B. Server -> Client State Broadcasts
Packed delta array emitted every 40 ms (`GRID_DELTA`):
`[entityId (shortInt), posX (float32), posY (float32), velocityAngle (uint8), flags (uint8)]`

Flags Bitmask:
- Bit 0: Is Attracting
- Bit 1: In Tether
- Bit 2: In Closed Formation Shield
- Bit 3: Depleted Energy Mode

---

## 11. AUDIO ENGINE SPECIFICATION (NATIVE WEB AUDIO API)
- Activation: Unlocks strictly on first explicit user gesture (`ENTER THE BIOSPHERE` overlay).
- Spatial Voice Allocation:
  - Max Concurrent Voices: 12 voices total (Polyphony limiter).
  - Distance Attenuation: Exponential falloff based on Euclidean distance to local organism (Gain = 0 if $d > 45\text{ WU}$).
- Musical Mapping:
  - Scale: D Lydian Pentatonic (D, E, F#, A, B).
  - Y-Position to Pitch:
    $$f = f_{\min} \cdot \left(\frac{f_{\max}}{f_{\min}}\right)^{\text{clamp}(y_{\text{norm}}, 0, 1)}$$
    Where: $f_{\min} = 146.83\text{ Hz}$ (D3), $f_{\max} = 587.33\text{ Hz}$ (D5). Frequencies are snapped to scale notes.
  - X-Position to Stereo Panning: `StereoPannerNode.pan` mapped linearly $[-1.0, 1.0]$.
- Accessibility Controls:
  - Dedicated master mute toggle.
  - Master volume slider.
  - Silent Mode preference persistence in LocalStorage (`aetheria_prefs`).

---

## 12. SECURITY, SANITIZATION & PRIVACY
- Privacy Boundary: ZERO keystroke characters, search strings, or browser fingerprints are transmitted or logged. User identity is an ephemeral WebCrypto UUID stored in `localStorage`.
- Input Defense & Anti-Abuse:
  - Absolute speed clamping: If client sends $|v| > V_{\max} \cdot 1.5$, position is rejected and client is force-synced to server coordinate.
  - Rate Limiting: 30 Socket packets/sec maximum per client IP. Excess triggers silent packet dropping.
  - Shockwave Abuse: Server-side cooldown timestamp enforcement (1.2 s).
- Content Security: All LLM outputs are stripped of HTML tags, sanitized via DOMPurify before UI mounting, and rendered strictly as plaintext.

---

## 13. ADAPTIVE PERFORMANCE BUDGETS & MOBILE SPECIFICATION
Device-Adaptive Quality Controller:
- Tier 1:
  - 25,000 active instanced particles
  - Post-processing bloom: Dual-pass UnrealBloom
  - Background fluid shader: Full three-octave FBM
  - Remote entity polyphony: 12 voices
- Tier 2 (Standard/Laptop):
  - 8,000 active particles
  - Single-pass Gaussian
  - 1-octave FBM
  - 6 voices
- Tier 3 (Mobile/Tablet):
  - 2,500 active particles
  - Bloom completely disabled
  - Static procedural texture
  - 3 voices
- Quality Downgrade Trigger: If client FPS drops below 45 for $> 3.0\text{ seconds}$, downgrade visual tier automatically.
- Touch Screen Controls:
  - Virtual Joystick / Touch drag for movement.
  - Tap + Hold: Engage Gravitational Singularity.
  - Double Tap: Fire Shockwave.

---

## 14. INFRASTRUCTURE, HEALTH & CAPACITY TARGETS
### A. Infrastructure Topology
- Frontend: Edge-deployed static Next.js assets on Vercel/Cloudflare Pages.
- Game Server: Node.js/Fastify long-lived process on Fly.io, Railway, or AWS ECS.
- Storage: MongoDB Atlas (M10+) with automated daily snapshots; Redis Cloud instance.
- Environment Separation: Development, Staging, and Production with strictly isolated database keys.

### B. Health Telemetry & Metrics
- Server Loop Lag: Monitor `eventLoopDelay` (Target: < 10 ms).
- Authoritative Simulation Tick Time: Alert if tick processing time exceeds 15 ms (out of 40 ms budget).
- Sentry integration on client and server to track WebGL context loss and socket drop rates.

---

## 15. PROJECT FILE DIRECTORY STRUCTURE
```text
aetheria-platform/
├── packages/
│   ├── common/                  # Shared TypeScript Interfaces, Zod Schemas & Math
│   │   ├── src/
│   │   │   ├── math.ts          # Vector2, distance, force calculations
│   │   │   ├── schemas.ts       # MovementPacket, CodexOutput Zod schemas
│   │   │   └── types.ts         # OrganismState, Climate, Fossil types
│   │   └── package.json
│   ├── client/                  # Next.js Application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Canvas/      # Scene, Organisms, ParticleField, Shaders
│   │   │   │   ├── HUD/         # Overlay, EntropyGauge, CodexTicker
│   │   │   │   └── UI/          # Accessibility, EntryPortal, AudioSliders
│   │   │   ├── engine/
│   │   │   │   ├── AudioSystem.ts    # Web Audio synthesis graph
│   │   │   │   └── QualityManager.ts # Dynamic tier-scaling monitor
│   │   │   ├── hooks/
│   │   │   │   ├── useSocket.ts      # Socket connection & message dispatch
│   │   │   │   └── useInterpolate.ts # Hermite interpolation for entities
│   │   │   └── stores/
│   │   │       └── useBiosphereStore.ts # Global Zustand reactive state
│   │   └── package.json
│   └── server/                  # Fastify Simulation Server
│       ├── src/
│       │   ├── simulation/
│       │   │   ├── SpatialGrid.ts    # 60x60 WU Moore-neighborhood manager
│       │   │   ├── PhysicsEngine.ts  # Deterministic authority, forces, clamps
│       │   │   ├── CycleDetector.ts  # Formation & closed-polygon algorithm
│       │   │   └── ClimateEngine.ts  # Entropy scoring & hysteresis transitions
│       │   ├── services/
│       │   │   ├── AiOverseer.ts     # Resilient LLM pipeline + fallbacks
│       │   │   └── Persistence.ts    # MongoDB batches & Redis sync
│       │   ├── models/               # Mongoose database schemas
│       │   ├── sockets/              # Socket.IO handlers & rate limiters
│       │   └── server.ts             # Entry point
│       └── package.json
└── package.json                 # Turborepo / NPM Workspaces root
```

---

## 16. PHASED EXECUTION ROADMAP
- **PHASE 1: The Living Canvas (Isolated Frontend MVP)**
  - Build Next.js project with Three.js (R3F).
  - Implement single local organism following pointer via smooth physics inertia.
  - Create 10,000 instanced particle field with GLSL curl-noise turbulence.
  - Implement click-attract and spacebar-repulse with deterministic force equations.
  - Integrate native Web Audio graph playing scale-quantized notes based on movement.
  - GATE 1 EXIT CRITERIA: 60 FPS rock-solid performance on reference desktop browser; zero console errors; satisfying standalone sensory feel.
- **PHASE 2: Spatial Multiplayer & Interpolation**
  - Scaffold Fastify server with Socket.IO and TypeScript.
  - Build the 25 Hz authoritative simulation loop with 20 Hz client dispatch.
  - Implement Spatial Grid partitioning (60 WU cells).
  - Implement client-side Hermite interpolation buffer.
  - Add synaptic tethers between entities within 12 WU and detect triangles.
  - GATE 2 EXIT CRITERIA: Two separate browser tabs can see each other move smoothly without teleportation under artificial 150 ms simulated latency.
- **PHASE 3: Collective Ecosystem & Persistence**
  - Connect MongoDB and Redis instances.
  - Implement Climate State Machine calculating composite entropy index S.
  - Implement closed-polygon energy shields and fossil persistence on entity disconnect/event.
  - Hook up dormancy state transitions with visual palette desaturation.
  - GATE 3 EXIT CRITERIA: Server smoothly transitions through LUMINESCENT, STABLE, and DORMANT states based on active user actions; fossils persist across page reloads.
- **PHASE 4: The Chronicler & Safety Systems**
  - Implement the AI Overseer with 15-minute adaptive scheduling and strict Zod validation.
  - Implement the deterministic fallback array when API keys are absent or requests fail.
  - Implement strict input rate limits, speed clamps, and payload size bounds on all socket events.
  - Build accessiblity controls: Master Mute, Reduced Motion mode, and Touch Screen joystick.
  - GATE 4 EXIT CRITERIA: AI entries are generated, persisted to MongoDB, and broadcasted to HUD ticker without breaking under simulated API connection drops.
- **PHASE 5: Production Hardening**
  - Implement dynamic quality downgrading for low-end mobile devices.
  - Run load tests with 100 headless bot clients simulating movement across multiple grid cells.
  - Finalize production Dockerfiles, health checks, and deployment configs.
  - GATE 5 EXIT CRITERIA: Zero memory leaks over a 2-hour continuous soak test; server CPU stays below 60% with 100 concurrent bot connections.
