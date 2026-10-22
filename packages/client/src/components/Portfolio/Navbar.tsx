"use client";

import React, { useState } from "react";
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
  Code2,
  Menu,
  X,
  Cpu,
  Layers,
  Send,
  User
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = usePortfolioStore((s) => s.theme);
  const viewMode = usePortfolioStore((s) => s.viewMode);
  const isJarvisOpen = usePortfolioStore((s) => s.isJarvisOpen);
  const masterMute = usePortfolioStore((s) => s.masterMute);
  const setMasterMute = usePortfolioStore((s) => s.setMasterMute);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (viewMode !== "portfolio") {
      setViewMode("portfolio");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
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
            <div className="relative w-8 h-8 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] font-black text-sm shadow-md group-hover:border-[var(--accent-primary)] transition-all">
              <span className="animate-pulse">A</span>
              <div className="absolute inset-0 rounded-xl bg-[var(--accent-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-widest text-[var(--text-primary)] flex items-center gap-1.5 font-mono">
                <span>ALI.BUILD</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  JARVIS
                </span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                MUHAMMAD ALI // PESHAWAR 🇵🇰
              </div>
            </div>
          </button>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono text-[var(--text-secondary)]">
          <button onClick={() => scrollTo("about")} className="hover:text-[var(--accent-primary)] transition-colors">
            ABOUT
          </button>
          <button onClick={() => scrollTo("projects")} className="hover:text-[var(--accent-primary)] transition-colors">
            PROJECTS
          </button>
          <button onClick={() => scrollTo("architecture")} className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1 text-[var(--accent-primary)]">
            <Cpu className="w-3 h-3" />
            <span>FLAGSHIP</span>
          </button>
          <button onClick={() => scrollTo("skills")} className="hover:text-[var(--accent-primary)] transition-colors">
            SKILLS
          </button>
          <button onClick={() => scrollTo("services")} className="hover:text-[var(--accent-primary)] transition-colors">
            SERVICES
          </button>
          <button onClick={() => scrollTo("process")} className="hover:text-[var(--accent-primary)] transition-colors">
            WORKFLOW
          </button>
          <button onClick={() => scrollTo("experience")} className="hover:text-[var(--accent-primary)] transition-colors">
            JOURNEY
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-[var(--accent-primary)] transition-colors">
            CONTACT
          </button>
        </nav>

        {/* Right: Mode & Tool Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* View Mode Toggle: Portfolio vs Aetheria Biosphere */}
          <button
            onClick={() => setViewMode(viewMode === "portfolio" ? "biosphere" : "portfolio")}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
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
                <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--accent-primary)]" />
                <span className="hidden sm:inline">2.5D BIOSPHERE</span>
              </>
            )}
          </button>

          {/* Theme Studio Button (Alt + T) */}
          <button
            onClick={() => setCustomizerOpen(true)}
            className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-1.5"
            title="Open Theme Studio (Alt + T)"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden xl:inline text-xs font-mono">STUDIO</span>
          </button>

          {/* Master Mute Toggle */}
          <button
            onClick={() => setMasterMute(!masterMute)}
            className={`p-2 rounded-xl border transition-all ${
              masterMute
                ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            }`}
            title={masterMute ? "Unmute Audio" : "Mute All Audio"}
          >
            {masterMute ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* JARVIS Assistant Trigger */}
          <button
            onClick={() => setJarvisOpen(!isJarvisOpen)}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-bold bg-[var(--badge-bg)] border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-slate-950 transition-all flex items-center gap-1.5 shadow-[var(--hud-glow)]"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">JARVIS</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-4 space-y-2 text-left font-mono text-xs">
          <button onClick={() => scrollTo("about")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            ABOUT MUHAMMAD ALI
          </button>
          <button onClick={() => scrollTo("projects")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            CLIENT PROJECTS &amp; WORK
          </button>
          <button onClick={() => scrollTo("architecture")} className="block w-full py-2 text-[var(--accent-primary)] font-bold">
            FLAGSHIP 2.5D MULTIPLAYER ROADMAP
          </button>
          <button onClick={() => scrollTo("skills")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            SKILLS &amp; TECHNOLOGIES
          </button>
          <button onClick={() => scrollTo("services")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            DEVELOPMENT SERVICES
          </button>
          <button onClick={() => scrollTo("process")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            WORKFLOW &amp; PROCESS
          </button>
          <button onClick={() => scrollTo("experience")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            EXPERIENCE TIMELINE
          </button>
          <button onClick={() => scrollTo("testimonials")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            CLIENT TESTIMONIALS
          </button>
          <button onClick={() => scrollTo("contact")} className="block w-full py-2 hover:text-[var(--accent-primary)] font-bold">
            CONTACT &amp; WHATSAPP
          </button>
        </div>
      )}
    </header>
  );
};
