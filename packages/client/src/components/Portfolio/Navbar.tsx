"use client";

import React from "react";
import { usePortfolioStore, ThemeType } from "../../stores/usePortfolioStore";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import {
  Sparkles,
  Sliders,
  Bot,
  Radio,
  Volume2,
  VolumeX,
  Compass,
  Code2
} from "lucide-react";

export const Navbar: React.FC = () => {
  const theme = usePortfolioStore((s) => s.theme);
  const viewMode = usePortfolioStore((s) => s.viewMode);
  const isJarvisOpen = usePortfolioStore((s) => s.isJarvisOpen);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);

  const isMuted = useBiosphereStore((s) => s.isMuted);
  const setMuted = useBiosphereStore((s) => s.setMuted);

  const themeDisplayNames: Record<ThemeType, string> = {
    "jarvis-core": "JARVIS Core",
    "iron-man": "Iron Man",
    "cyberpunk": "Cyberpunk",
    "matrix": "Matrix",
    "arctic-glass": "Arctic Glass",
    "midnight-purple": "Midnight Purple",
    "emerald-pro": "Emerald Pro",
    "solar-gold": "Solar Gold",
    "ocean-blue": "Ocean Blue",
    "rose-neon": "Rose Neon",
    "paper-studio": "Paper Studio",
    "monochrome": "Monochrome"
  };

  const scrollTo = (id: string) => {
    if (viewMode !== "portfolio") {
      setViewMode("portfolio");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("portfolio")}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] font-black text-sm shadow-md group-hover:border-[var(--accent-primary)] transition-all">
              <span className="animate-pulse">A</span>
              <div className="absolute inset-0 rounded-lg bg-[var(--accent-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-widest text-[var(--text-primary)] flex items-center gap-1.5">
                <span>ALI.BUILD</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  JARVIS
                </span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                MUHAMMAD ALI // DEV
              </div>
            </div>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[var(--text-secondary)]">
          <button
            onClick={() => scrollTo("projects")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            SKILLS
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            SERVICES
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            JOURNEY
          </button>
          <button
            onClick={() => scrollTo("testimonials")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            CLIENTS
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            CONTACT
          </button>
        </nav>

        {/* Right: Mode & Tool Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Mode Toggle: Portfolio vs Aetheria Biosphere */}
          <button
            onClick={() => setViewMode(viewMode === "portfolio" ? "biosphere" : "portfolio")}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              viewMode === "biosphere"
                ? "bg-[var(--accent-primary)] text-slate-950 border-[var(--accent-primary)]"
                : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
            }`}
            title="Toggle between Developer Portfolio and Real-Time 2.5D Biosphere"
          >
            {viewMode === "biosphere" ? (
              <>
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PORTFOLIO</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">BIOSPHERE 2.5D</span>
              </>
            )}
          </button>

          {/* Theme Customizer Trigger */}
          <button
            onClick={() => setCustomizerOpen(true)}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] text-xs font-mono flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            title="Customizer: 12 Themes, Layouts & Particles"
          >
            <Sliders className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden lg:inline">{themeDisplayNames[theme]}</span>
          </button>

          {/* JARVIS Assistant Trigger */}
          <button
            onClick={() => setJarvisOpen(!isJarvisOpen)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              isJarvisOpen
                ? "bg-[var(--accent-secondary)] text-slate-950 border-[var(--accent-secondary)]"
                : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--accent-secondary)] hover:border-[var(--accent-secondary)]"
            }`}
            title="Open JARVIS AI Assistant"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JARVIS</span>
          </button>

          {/* Master Sound Toggle */}
          <button
            onClick={() => setMuted(!isMuted)}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shadow-md active:scale-95"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
