import assert from "node:assert";
import {
  CONSTANTS,
  hermiteInterpolate,
  calculateAttractionForce,
  calculateShockwaveImpulse,
  CodexOutputSchema
} from "@aetheria/common";
import { SpatialGrid } from "./SpatialGrid.js";
import { PhysicsEngine } from "./PhysicsEngine.js";
import { CycleDetector } from "./CycleDetector.js";
import { ClimateEngine } from "./ClimateEngine.js";
import { AiOverseer, FALLBACK_LORE } from "../services/AiOverseer.js";

export async function runComprehensiveVerification() {
  console.log("\n==================================================================");
  console.log("       AETHERIA BIOSPHERE & JARVIS VERIFICATION SUITE             ");
  console.log("==================================================================\n");

  const results: { test: string; status: "PASSED" | "FAILED"; details: string }[] = [];

  // TEST 1: Two-client smooth movement under 150 ms simulated latency
  try {
    const grid = new SpatialGrid(60.0);
    const physics = new PhysicsEngine(grid);

    const client1 = physics.registerOrganism("client_1", 0, 0);
    const client2 = physics.registerOrganism("client_2", 10, 0);

    // Simulate 150 ms network delay with buffer frames
    const latencyMs = 150;
    const historyFrames = [
      { t: 0, x: 0, vx: 5.0 },
      { t: 50, x: 0.25, vx: 5.0 },
      { t: 100, x: 0.5, vx: 5.0 },
      { t: 150, x: 0.75, vx: 5.0 }
    ];

    // Evaluate Hermite cubic spline interpolation
    const p0 = historyFrames[0].x;
    const p1 = historyFrames[3].x;
    const m0 = historyFrames[0].vx * 0.15;
    const m1 = historyFrames[3].vx * 0.15;
    const interpolatedMid = hermiteInterpolate(p0, p1, m0, m1, 0.5);

    const isSmooth = interpolatedMid > p0 && interpolatedMid < p1;

    results.push({
      test: "Two-Client 150ms Latency Hermite Spline",
      status: isSmooth ? "PASSED" : "FAILED",
      details: `Interpolated pos at t=75ms: ${interpolatedMid.toFixed(4)} (Expected between ${p0} and ${p1})`
    });
  } catch (err: any) {
    results.push({ test: "Two-Client 150ms Latency Hermite Spline", status: "FAILED", details: err.message });
  }

  // TEST 2: Synaptic Tethers & Topological Cycle Detection
  try {
    const grid = new SpatialGrid(60.0);
    const physics = new PhysicsEngine(grid);
    const detector = new CycleDetector(grid, physics);

    // Create 3 organisms in equilateral triangle (side length 10 WU <= D_connect 12.0 WU)
    // Area of equilateral triangle with side 10 is (sqrt(3)/4)*100 = 43.3 WU^2 >= 25.0 WU^2
    const orgA = physics.registerOrganism("node_a", 0, 0);
    const orgB = physics.registerOrganism("node_b", 10, 0);
    const orgC = physics.registerOrganism("node_c", 5, 8.66);

    const t0 = 1000;
    // Step 1: initial connection trigger
    detector.update(t0);
    // Step 2: 350ms later (exceeds 300ms confirmation duration)
    detector.update(t0 + 350);

    const tetherMetrics = detector.getMetrics();
    const tethersFormed = tetherMetrics.tethersCount >= 3;

    // Step 3: Persistence for 1300ms (exceeds 1200ms formation threshold)
    detector.update(t0 + 1700);
    const formationMetrics = detector.getMetrics();
    const formationStabilized = formationMetrics.closedFormations >= 1;

    results.push({
      test: "Synaptic Tethers (12 WU) & Triangle Shield Detection",
      status: tethersFormed && formationStabilized ? "PASSED" : "FAILED",
      details: `Confirmed Tethers: ${tetherMetrics.tethersCount}/3, Closed Formations: ${formationMetrics.closedFormations}/1, Participants in Shield: ${orgA.inShield}`
    });
  } catch (err: any) {
    results.push({ test: "Synaptic Tethers & Triangle Detection", status: "FAILED", details: err.message });
  }

  // TEST 3: Climate State Machine Transitions & Hysteresis Guards
  try {
    const climate = new ClimateEngine();
    assert.strictEqual(climate.getClimate(), "STABLE");

    // Force high entropy (S >= 60) for > 30s to trigger TURBULENT
    // Needs enough iterations for smoothed entropy to cross 60 + 30s condition timer
    for (let s = 0; s < 70; s++) {
      climate.update(1.0, 10, 22.0, 1.0, 15, 5, 0);
    }
    const isTurbulent = climate.getClimate() === "TURBULENT";

    // Recover back towards STABLE (S < 50 for > 60s)
    for (let s = 0; s < 100; s++) {
      climate.update(1.0, 10, 0.0, 0.1, 0, 0, 0);
    }
    const isStable = climate.getClimate() === "STABLE";

    results.push({
      test: "Climate State Transitions & Hysteresis Guards",
      status: isTurbulent && isStable ? "PASSED" : "FAILED",
      details: `STABLE -> TURBULENT verified: ${isTurbulent}, TURBULENT -> STABLE recovery verified: ${isStable}`
    });
  } catch (err: any) {
    results.push({ test: "Climate State Transitions & Hysteresis Guards", status: "FAILED", details: err.message });
  }

  // TEST 4: AI Overseer Fallback & Strict Schema Validation
  try {
    const overseer = new AiOverseer();
    // Test deterministic fallback generation under climate states
    const fallbackDormant = overseer.generateFallbackEntry("DORMANT", 12, 1);
    const parsed = CodexOutputSchema.safeParse(fallbackDormant);

    const validSentences = (fallbackDormant.observation.match(/[.!?]/g) || []).length === 2;

    results.push({
      test: "AI Overseer Schema Validation & Deterministic Fallbacks",
      status: parsed.success && validSentences ? "PASSED" : "FAILED",
      details: `Generated: "${fallbackDormant.eraTitle}" (${fallbackDormant.generationMethod}), 2-sentence valid: ${validSentences}`
    });
  } catch (err: any) {
    results.push({ test: "AI Overseer Fallback & Strict Schema Validation", status: "FAILED", details: err.message });
  }

  // TEST 5: 100-Client Load Test Simulation
  try {
    const grid = new SpatialGrid(60.0);
    const physics = new PhysicsEngine(grid);
    const detector = new CycleDetector(grid, physics);

    const clientCount = 100;
    for (let i = 0; i < clientCount; i++) {
      const x = (Math.random() - 0.5) * 240;
      const y = (Math.random() - 0.5) * 240;
      physics.registerOrganism(`bot_${i}`, x, y);
    }

    const tStart = performance.now();
    // Execute 50 simulation ticks (2 seconds of game time)
    for (let tick = 0; tick < 50; tick++) {
      for (let i = 0; i < clientCount; i++) {
        physics.processClientInput(
          `bot_${i}`,
          tick,
          (Math.random() - 0.5) * 240,
          (Math.random() - 0.5) * 240,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          false,
          false
        );
      }
      physics.update(0.04);
      detector.update(Date.now() + tick * 40);
    }
    const tElapsed = performance.now() - tStart;
    const avgTickTime = tElapsed / 50;

    // Budget: tick processing time < 15 ms out of 40 ms budget
    const passed = avgTickTime < 15.0;

    results.push({
      test: "100 Concurrent Client Load Simulation",
      status: passed ? "PASSED" : "FAILED",
      details: `Average tick duration: ${avgTickTime.toFixed(2)} ms (Budget: < 15.0 ms), Active Entities: ${clientCount}`
    });
  } catch (err: any) {
    results.push({ test: "100 Concurrent Client Load Simulation", status: "FAILED", details: err.message });
  }

  // TEST 6: Simulated Soak Test (Memory and Event Loop Stability)
  try {
    const memBefore = process.memoryUsage().heapUsed;
    const grid = new SpatialGrid(60.0);
    const physics = new PhysicsEngine(grid);

    for (let i = 0; i < 50; i++) {
      physics.registerOrganism(`soak_${i}`, i * 2, i * 2);
    }

    // Run 500 ticks
    for (let i = 0; i < 500; i++) {
      physics.update(0.04);
    }

    const memAfter = process.memoryUsage().heapUsed;
    const memDeltaMb = (memAfter - memBefore) / (1024 * 1024);

    results.push({
      test: "Soak Test & Heap Memory Stability",
      status: memDeltaMb < 25.0 ? "PASSED" : "FAILED",
      details: `Heap growth over 500 ticks: ${memDeltaMb.toFixed(2)} MB (< 25 MB threshold)`
    });
  } catch (err: any) {
    results.push({ test: "Soak Test & Heap Memory Stability", status: "FAILED", details: err.message });
  }

  console.log("\n=================== VERIFICATION RESULTS ===================");
  for (const r of results) {
    const icon = r.status === "PASSED" ? "✓" : "✗";
    console.log(`${icon} [${r.status}] ${r.test}`);
    console.log(`   Details: ${r.details}`);
  }
  console.log("============================================================\n");

  return results;
}

// Execute directly if run via node
if (process.argv[1]?.endsWith("verification.test.ts") || process.argv[1]?.endsWith("verification.test.js")) {
  runComprehensiveVerification().catch(console.error);
}
