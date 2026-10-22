"use client";

import React from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  Cpu,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  Database,
  Bot,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";

export const FlagshipRoadmapSection: React.FC = () => {
  const setViewMode = usePortfolioStore((s) => s.setViewMode);

  const gates = [
    {
      gate: "GATE 2 // MULTIPLAYER FOUNDATION",
      status: "VERIFIED IN ENGINE",
      isPassed: true,
      phase: "Phase 2",
      title: "Authoritative Physics & Spatial Partitioning",
      description:
        "Authoritative 25 Hz simulation loop (40ms dt), 20 Hz client state delta dispatch, 60 WU Moore spatial neighborhood grid, and Hermite cubic spline interpolation with 100ms jitter buffer.",
      metrics: "Verified: Smooth midpoint at t=75ms (0.3750 WU) under simulated 150ms latency with zero teleportation."
    },
    {
      gate: "GATE 3 // TOPOLOGY & CLIMATE",
      status: "VERIFIED IN ENGINE",
      isPassed: true,
      phase: "Phase 3",
      title: "Synaptic Tethers & Climate State Machine",
      description:
        "Synaptic tethers (12 WU connect / 16.5 WU break), topological chordless cycle DFS (k in [3, 6]), convex polygon energy shield (8000ms), and composite entropy index S with hysteresis between LUMINESCENT, STABLE, and DORMANT.",
      metrics: "Verified: 3/3 confirmed tethers, 1/1 stabilized shield, STABLE -> TURBULENT -> STABLE transitions confirmed."
    },
    {
      gate: "GATE 4 // HARDENED AI OVERSEER",
      status: "VERIFIED IN ENGINE",
      isPassed: true,
      phase: "Phase 4",
      title: "AI Chronicle Cron & Deterministic Fallbacks",
      description:
        "15-minute adaptive chronicle scheduler with strict runtime Zod validation, poetic 2-sentence constraint, per-IP socket rate limits (30 pkts/s), speed clamps (V_max = 22 WU/s, absolute reject > 33 WU/s), and master mute controls.",
      metrics: "Verified: 100% Zod schema match, 2-sentence fallback generation under simulated API outages."
    },
    {
      gate: "GATE 5 // LOAD & SOAK STABILITY",
      status: "MEASURED BENCHMARK",
      isPassed: true,
      phase: "Phase 5",
      title: "100 Concurrent Client Load & Soak Profile",
      description:
        "Multi-tier quality manager (25k particles Tier 1 down to 2.5k Tier 3), 100 concurrent client bot load, Docker containerization, and Fastify /health telemetry endpoint.",
      metrics: "Measured: 4.636 ms average tick time (Budget: < 15.0 ms), 2,500-tick soak test with 4.13 MB net heap delta."
    }
  ];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left border-b border-[var(--border-color)]/60 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL FLAGSHIP ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Aetheria 2.5D Collaborative Biosphere
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-sans">
              An authoritative multiplayer engine and procedural generative ecosystem executing on an unbounded 2.5D Cartesian plane.
            </p>
          </div>

          <button
            onClick={() => setViewMode("biosphere")}
            className="px-6 py-3.5 rounded-2xl font-mono text-xs sm:text-sm font-bold bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2.5 shadow-lg shadow-[var(--hud-glow)] shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>LAUNCH 2.5D BIOSPHERE CANVAS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Gate Engineering Verification Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gates.map((g, idx) => (
            <div key={idx} className="hud-panel p-6 sm:p-8 rounded-3xl text-left space-y-4 relative overflow-hidden">
              {/* Corner Sci-Fi bracket */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)]/40" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-[var(--text-muted)] uppercase">
                  {g.gate}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  {g.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-mono text-[var(--text-primary)]">
                  {g.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed mt-1.5">
                  {g.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/70 text-xs font-mono text-[var(--accent-primary)] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{g.metrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Architecture Telemetry Spec Bar */}
        <div className="hud-panel p-6 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono">
          <div className="border-r border-[var(--border-color)]/50 pr-4">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">PHYSICS TIMESTEP</div>
            <div className="text-lg sm:text-xl font-black text-[var(--accent-primary)] mt-0.5">25 HZ FIXED</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Delta t = 40 ms</div>
          </div>
          <div className="border-r border-[var(--border-color)]/50 pr-4">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">SPATIAL PARTITION</div>
            <div className="text-lg sm:text-xl font-black text-[var(--accent-primary)] mt-0.5">60 WU GRID</div>
            <div className="text-[11px] text-[var(--text-secondary)]">3x3 Moore culling</div>
          </div>
          <div className="border-r border-[var(--border-color)]/50 pr-4">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">TETHER DISTANCE</div>
            <div className="text-lg sm:text-xl font-black text-[var(--accent-primary)] mt-0.5">12.0 WU</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Break at 16.5 WU</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase">KINETIC CLAMP</div>
            <div className="text-lg sm:text-xl font-black text-[var(--accent-primary)] mt-0.5">22.0 WU/S</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Reject &gt; 33.0 WU/s</div>
          </div>
        </div>
      </div>
    </section>
  );
};
