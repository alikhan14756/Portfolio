import { SpatialGrid } from "./SpatialGrid.js";
import { PhysicsEngine } from "./PhysicsEngine.js";
import { CycleDetector } from "./CycleDetector.js";
import { ClimateEngine } from "./ClimateEngine.js";

async function runExtendedSoakBenchmark() {
  console.log("=== RUNNING EXTENDED SOAK & LOAD BENCHMARK ===");
  const grid = new SpatialGrid(60.0);
  const physics = new PhysicsEngine(grid);
  const cycleDetector = new CycleDetector(grid, physics);
  const climate = new ClimateEngine();

  const ENTITY_COUNT = 100;
  for (let i = 0; i < ENTITY_COUNT; i++) {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    physics.registerOrganism(`soak_entity_${i}`, x, y);
  }

  // Force GC if available or record initial baseline
  if (global.gc) global.gc();
  const initialMem = process.memoryUsage();
  console.log(`Initial Heap Used: ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);

  const TOTAL_TICKS = 2500; // Equivalent to 100 seconds of continuous 25 Hz authoritative simulation
  let maxTickTime = 0;
  let totalTickTime = 0;
  const tickSamples: number[] = [];

  const startBenchmark = performance.now();

  for (let tick = 0; tick < TOTAL_TICKS; tick++) {
    const t0 = performance.now();

    // 1. Process client inputs (movement, forces)
    for (let i = 0; i < ENTITY_COUNT; i++) {
      physics.processClientInput(
        `soak_entity_${i}`,
        tick,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        tick % 40 === 0, // occasional attraction
        tick % 80 === 0  // occasional shockwave
      );
    }

    // 2. Step physics
    physics.update(0.04);

    // 3. Step cycle detector
    cycleDetector.update(Date.now() + tick * 40);

    // 4. Step climate
    const orgs = physics.getAllOrganisms();
    climate.update(0.04, orgs.length, 5.0, 0.5, 1, 3, 1);

    const elapsed = performance.now() - t0;
    totalTickTime += elapsed;
    if (elapsed > maxTickTime) maxTickTime = elapsed;
    tickSamples.push(elapsed);

    if (tick % 500 === 0 && tick > 0) {
      const currentMem = process.memoryUsage();
      console.log(
        `[Tick ${tick}/${TOTAL_TICKS}] Avg Tick: ${(totalTickTime / tick).toFixed(2)} ms | Current Heap: ${(
          currentMem.heapUsed / 1024 / 1024
        ).toFixed(2)} MB`
      );
    }
  }

  const totalTimeElapsed = performance.now() - startBenchmark;
  const avgTickTime = totalTickTime / TOTAL_TICKS;
  const finalMem = process.memoryUsage();
  const heapDeltaMb = (finalMem.heapUsed - initialMem.heapUsed) / (1024 * 1024);

  // Compute 95th percentile
  tickSamples.sort((a, b) => a - b);
  const p95 = tickSamples[Math.floor(TOTAL_TICKS * 0.95)];
  const p99 = tickSamples[Math.floor(TOTAL_TICKS * 0.99)];

  console.log("\n=== SOAK BENCHMARK REPORT ===");
  console.log(`Entities Simulated: ${ENTITY_COUNT}`);
  console.log(`Total Simulation Ticks: ${TOTAL_TICKS}`);
  console.log(`Wall Clock Time for ${TOTAL_TICKS} ticks: ${(totalTimeElapsed / 1000).toFixed(2)} s`);
  console.log(`Average Authoritative Tick: ${avgTickTime.toFixed(3)} ms`);
  console.log(`95th Percentile Tick: ${p95.toFixed(3)} ms`);
  console.log(`99th Percentile Tick: ${p99.toFixed(3)} ms`);
  console.log(`Max Tick Duration: ${maxTickTime.toFixed(3)} ms (Budget: 40 ms)`);
  console.log(`Initial Heap: ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Final Heap: ${(finalMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Net Heap Growth: ${heapDeltaMb.toFixed(2)} MB`);
  console.log("=========================================\n");
}

runExtendedSoakBenchmark().catch(console.error);
