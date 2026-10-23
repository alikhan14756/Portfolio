"use client";

import React from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { Sparkles, Sliders } from "lucide-react";

export const FloatingThemeWidget: React.FC = () => {
  const setStyleLabOpen = usePortfolioStore((s) => s.setStyleLabOpen);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);
  const styleId = usePortfolioStore((s) => s.styleId);

  return (
    <aside
      aria-label="Quick Theme & Style Launcher"
      className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 select-none print:hidden pointer-events-auto"
    >
      {/* 28 Styles Launcher */}
      <button
        onClick={() => setStyleLabOpen(true)}
        className="px-3 py-2 style-btn-secondary text-[var(--text-primary)] font-mono text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all group"
        title="Open Style Lab: Switch between 28+ Modern Design Systems (Alt + S)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:rotate-12 transition-transform" />
        <span className="hidden xs:inline">28 STYLES</span><span className="xs:hidden">28</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded style-badge uppercase hidden sm:inline">
          {styleId}
        </span>
      </button>

      {/* 12 Themes Studio Launcher */}
      <button
        onClick={() => setCustomizerOpen(true)}
        className="hidden sm:flex px-3 py-2 style-btn-secondary font-mono text-xs font-bold items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all"
        title="Open Theme Studio: 12 Color Themes & Calibration (Alt + T)"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span>STUDIO</span>
      </button>
    </aside>
  );
};
