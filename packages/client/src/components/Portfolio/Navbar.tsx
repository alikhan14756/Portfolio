"use client";

import React, { useState } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  Sparkles,
  Bot,
  Menu,
  X,
  Cpu
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = usePortfolioStore((s) => s.theme);
  const isJarvisOpen = usePortfolioStore((s) => s.isJarvisOpen);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const setStyleLabOpen = usePortfolioStore((s) => s.setStyleLabOpen);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none transition-colors duration-300 style-nav">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 sm:gap-2.5 text-left group min-w-0"
            aria-label="Muhammad Ali Home"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[var(--surface-badge)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] font-black text-xs sm:text-sm tracking-tighter shadow-sm group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_12px_var(--accent-primary)] transition-all shrink-0">
              <span className="font-mono font-black tracking-tight">MA</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-xs sm:text-sm tracking-wide text-[var(--text-primary)] flex items-center gap-1 sm:gap-1.5 font-display min-w-0">
                <span className="text-xs sm:text-base font-black truncate">Muhammad Ali</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded style-badge font-bold shrink-0 hidden sm:inline-block">
                  CREATOR
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono hidden md:block truncate">
                FRONTEND DEVELOPER // PESHAWAR
              </div>
            </div>
          </button>
        </div>

        {/* Center: Navigation Links (Desktop >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-mono text-[var(--text-secondary)]">
          <button onClick={() => scrollTo("about")} className="hover:text-[var(--accent-primary)] transition-colors">
            ABOUT
          </button>
          <button onClick={() => scrollTo("projects")} className="hover:text-[var(--accent-primary)] transition-colors">
            PROJECTS
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
          <button onClick={() => scrollTo("faq")} className="hover:text-[var(--accent-primary)] transition-colors">
            FAQ
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-[var(--accent-primary)] transition-colors font-bold text-[var(--accent-primary)]">
            CONTACT
          </button>
        </nav>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Primary Style Lab Button (Always accessible) */}
          <button
            onClick={() => setStyleLabOpen(true)}
            className="px-2 sm:px-3 py-1.5 rounded-xl style-btn-primary text-xs font-mono font-bold flex items-center gap-1 sm:gap-1.5 shadow-md active:scale-95 shrink-0"
            title="Open Style Lab: Switch between 28+ Modern Design Systems (Alt + S)"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span className="font-bold hidden xs:inline">STYLE LAB</span>
            <span className="font-bold xs:hidden">STYLES</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-black/20 text-current font-black">28</span>
          </button>

          {/* ALI AI Launcher Button */}
          <button
            onClick={() => setJarvisOpen(!isJarvisOpen)}
            className="px-2 sm:px-3 py-1.5 rounded-xl font-mono text-xs font-bold style-btn-secondary flex items-center gap-1 sm:gap-1.5 shadow-sm active:scale-95 shrink-0"
            title="Toggle Ali AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
            <span className="hidden sm:inline">ALI AI</span>
          </button>

          {/* Mobile Menu Hamburger (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[var(--surface-input)] border border-[var(--border-color)] text-[var(--text-primary)] shrink-0"
            title="Toggle Navigation Menu"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-color)] bg-[var(--surface-nav)] backdrop-blur-2xl px-4 py-4 space-y-2 text-left font-mono text-xs animate-in slide-in-from-top-2">
          <button onClick={() => scrollTo("about")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            ABOUT MUHAMMAD ALI
          </button>
          <button onClick={() => scrollTo("projects")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            CLIENT PROJECTS &amp; WORK
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
          <button onClick={() => scrollTo("faq")} className="block w-full py-2 hover:text-[var(--accent-primary)]">
            FAQ &amp; QUESTIONS
          </button>
          <button onClick={() => scrollTo("contact")} className="block w-full py-2 text-[var(--accent-primary)] font-bold">
            CONTACT &amp; WHATSAPP
          </button>
        </div>
      )}
    </header>
  );
};
