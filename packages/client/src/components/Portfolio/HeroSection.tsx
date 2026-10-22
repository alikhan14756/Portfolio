"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  Sparkles,
  ArrowRight,
  Bot,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Zap,
  Download,
  Terminal,
  Activity,
  Cpu
} from "lucide-react";

// Dynamic import with SSR disabled for 3D Three.js canvas
const JarvisHologramCore3D = dynamic(
  () => import("../Canvas/JarvisHologramCore3D").then((m) => m.JarvisHologramCore3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-[var(--accent-primary)]/40 animate-[spin_10s_linear_infinite]" />
      </div>
    )
  }
);

export const HeroSection: React.FC = () => {
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const theme = usePortfolioStore((s) => s.theme);
  const orbStyle = usePortfolioStore((s) => s.orbStyle);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const { profile } = PORTFOLIO_DATA;

  const [serverHealth, setServerHealth] = useState<{
    status: string;
    tickMs?: number;
    entities?: number;
  }>({
    status: "CLIENT ENGINE ACTIVE"
  });

  useEffect(() => {
    // Attempt health telemetry ping
    const fetchHealth = async () => {
      try {
        const res = await fetch("http://localhost:4000/health", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setServerHealth({
            status: "25 HZ FASTIFY CLUSTER",
            tickMs: data.lastTickDurationMs,
            entities: data.activeEntities
          });
        }
      } catch {
        setServerHealth({ status: "LOCAL BROWSER RUNTIME" });
      }
    };
    fetchHealth();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isMotionEnabled = animationIntensity !== "off";

  return (
    <section id="home" className="relative pt-12 pb-20 md:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="ambient-glow top-1/4 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Telemetry & Headline */}
          <motion.div
            initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold tracking-wider uppercase">
                {profile.availability}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)]">PESHAWAR, PAKISTAN 🇵🇰</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-mono text-[var(--accent-primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] inline-block" />
                <span>{profile.name} — {profile.role}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[var(--text-primary)]">
                I Build Websites <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]">
                  That Convert.
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl font-sans leading-relaxed">
                {profile.subheadline}
              </p>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2 shadow-[var(--hud-glow)]"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setJarvisOpen(true)}
                className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--accent-secondary)] hover:border-[var(--accent-secondary)] active:scale-95 transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>TALK TO AI</span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] active:scale-95 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>CONTACT ME</span>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
              <a
                href={profile.cvUrl}
                download="Muhammad_Ali_CV.pdf"
                className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
              <span>•</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>
              <span>•</span>
              <button
                onClick={() => scrollTo("architecture")}
                className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5 text-[var(--accent-secondary)] font-semibold"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Flagship 2.5D Sim</span>
              </button>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border-color)]/60">
              {profile.stats.map((st, i) => (
                <div key={i} className="hud-panel p-3.5 rounded-2xl text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-primary)]">
                    {st.value}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Holographic JARVIS Core & Telemetry HUD */}
          <motion.div
            initial={isMotionEnabled ? { opacity: 0, scale: 0.95 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-lg min-h-[460px] rounded-3xl hud-panel border-beam p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Corner Sci-Fi Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)]/70" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)]/70" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-primary)]/70" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)]/70" />

              {/* HUD Header */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-color)]/70 pb-3">
                <span className="flex items-center gap-1.5 text-[var(--accent-primary)] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  JARVIS 3D HOLOGRAPHIC CORE
                </span>
                <span>SYS.ID // 14756-ALI</span>
              </div>

              {/* Central 3D Holographic Quantum Core */}
              <div className="relative my-auto w-full h-72 sm:h-80 md:h-[340px] flex items-center justify-center">
                {orbStyle !== "off" ? (
                  <JarvisHologramCore3D />
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--badge-bg)] flex flex-col items-center justify-center">
                    <Zap className="w-8 h-8 text-[var(--accent-primary)]" />
                    <span className="text-xs font-mono text-[var(--text-primary)] mt-1 font-bold">ARC-CORE</span>
                  </div>
                )}
              </div>

              {/* HUD Footer: Genuine Telemetry */}
              <div className="space-y-2 pt-3 border-t border-[var(--border-color)]/70 text-[11px] font-mono">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>RUNTIME TELEMETRY:</span>
                  <span className="text-[var(--accent-primary)] font-bold">{serverHealth.status}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>ACTIVE THEME:</span>
                  <span className="text-[var(--accent-secondary)] font-bold uppercase">{theme}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>PAGESPEED BENCHMARK:</span>
                  <span className="text-emerald-400 font-bold">90+ OPTIMIZED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technology Marquee Bar */}
        <div className="pt-6 border-t border-[var(--border-color)]/50 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-primary)] font-bold tracking-wider uppercase">CORE STACK:</span>
          {["WordPress", "Elementor Pro", "WooCommerce", "HTML5 & CSS3", "JavaScript", "Tailwind CSS", "React 19", "Next.js 15", "Three.js / WebGL", "Fastify & Sockets"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
