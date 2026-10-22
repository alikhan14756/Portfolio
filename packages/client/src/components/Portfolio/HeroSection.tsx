"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  Sparkles,
  ArrowRight,
  Bot,
  ExternalLink,
  MessageCircle,
  FileCode,
  ShieldCheck,
  Zap,
  Layers
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const { profile } = PORTFOLIO_DATA;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Telemetry & Headline */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold tracking-wider uppercase">
                {profile.availability}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)]">PAKISTAN 🇵🇰</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-mono text-[var(--accent-primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] inline-block"></span>
                <span>{profile.name} — {profile.role}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-[var(--text-primary)]">
                I Build Websites <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]">
                  That Convert.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                {profile.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2 shadow-[var(--hud-glow)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>HIRE ME ON WHATSAPP</span>
              </a>

              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-primary)]" />
              </button>

              <button
                onClick={() => setJarvisOpen(true)}
                className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm font-mono tracking-wider bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--accent-secondary)] hover:border-[var(--accent-secondary)] active:scale-95 transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>ASK JARVIS</span>
              </button>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[var(--border-color)]/60">
              {profile.stats.map((st, i) => (
                <div key={i} className="hud-panel p-3.5 rounded-xl text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-primary)]">
                    {st.value}
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Holographic JARVIS Arc Reactor & Telemetry HUD */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl hud-panel p-8 flex flex-col justify-between overflow-hidden">
              {/* Corner Sci-Fi HUD Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-primary)]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-primary)]" />

              {/* HUD Header */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-color)] pb-3">
                <span className="flex items-center gap-1.5 text-[var(--accent-primary)]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SYSTEM ACTIVE
                </span>
                <span>SYS.ID // 14756-ALI</span>
              </div>

              {/* Central Holographic Reactor Graphic */}
              <div className="relative my-auto flex items-center justify-center py-6">
                {/* Outer Ring */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed border-[var(--accent-primary)]/40 animate-[spin_40s_linear_infinite] flex items-center justify-center">
                  {/* Middle Ring */}
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[var(--accent-secondary)]/50 animate-[spin_25s_linear_infinite_reverse] flex items-center justify-center">
                    {/* Inner Core */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[var(--bg-card)] to-[var(--badge-bg)] border-2 border-[var(--accent-primary)] flex flex-col items-center justify-center shadow-[var(--hud-glow)]">
                      <Zap className="w-6 h-6 text-[var(--accent-primary)] animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-[var(--text-primary)] mt-1">
                        ARC-CORE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Concentric Ambient Glow */}
                <div className="absolute inset-0 bg-radial from-[var(--accent-primary)]/15 via-transparent to-transparent blur-xl pointer-events-none" />
              </div>

              {/* HUD Footer Telemetry */}
              <div className="space-y-2 pt-3 border-t border-[var(--border-color)] text-[11px] font-mono">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>SPECIALIZATION:</span>
                  <span className="text-[var(--accent-primary)] font-bold">WORDPRESS & FRONTEND</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>PAGESPEED BENCHMARK:</span>
                  <span className="text-emerald-400 font-bold">90+ OPTIMIZED</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>AUTHORITATIVE TICK:</span>
                  <span className="text-[var(--accent-secondary)] font-bold">25 HZ SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Technology Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)]/50 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-primary)] font-bold tracking-wider">CORE TECH:</span>
          {["WordPress", "Elementor Pro", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "WooCommerce", "Figma", "Git", "React", "Next.js", "Three.js"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
