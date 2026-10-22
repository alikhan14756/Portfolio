"use client";

import React from "react";
import { usePortfolioStore, ThemeType } from "../../stores/usePortfolioStore";
import { Palette, Sliders, Sparkles } from "lucide-react";

interface ThemeOption {
  id: ThemeType;
  label: string;
  dotColor: string;
  badge: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: "jarvis-core", label: "JARVIS Core", dotColor: "#38bdf8", badge: "Cyan Arc" },
  { id: "iron-red", label: "Iron Red", dotColor: "#ef4444", badge: "Crimson" },
  { id: "cyberpunk-neon", label: "Cyberpunk", dotColor: "#facc15", badge: "Neon Gold" },
  { id: "matrix-terminal", label: "Matrix CRT", dotColor: "#22c55e", badge: "Phosphor" },
  { id: "arctic-glass", label: "Arctic Glass", dotColor: "#bae6fd", badge: "Glacier" },
  { id: "midnight-purple", label: "Midnight", dotColor: "#c084fc", badge: "Violet" },
  { id: "emerald-professional", label: "Emerald Pro", dotColor: "#34d399", badge: "Mint" },
  { id: "solar-gold", label: "Solar Gold", dotColor: "#fbbf24", badge: "Amber" },
  { id: "ocean-blue", label: "Ocean Blue", dotColor: "#0ea5e9", badge: "Azure" },
  { id: "rose-neon", label: "Rose Neon", dotColor: "#fb7185", badge: "Electric" },
  { id: "paper-studio", label: "Paper Studio", dotColor: "#0f172a", badge: "Light Editorial" },
  { id: "monochrome", label: "Noir Silver", dotColor: "#e4e4e7", badge: "Pure Noir" },
];

export const QuickThemeBar: React.FC = () => {
  const currentTheme = usePortfolioStore((s) => s.theme);
  const setTheme = usePortfolioStore((s) => s.setTheme);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);

  return (
    <div className="w-full border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/70 backdrop-blur-md px-4 py-2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-0.5">
        {/* Left Badge: Quick UI Style Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
            <Palette className="w-3 h-3 text-[var(--accent-primary)] animate-pulse" />
            <span className="hidden sm:inline">UI STYLE:</span>
            <span>12 THEMES</span>
          </div>
        </div>

        {/* Center: Scrollable Theme Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {THEME_OPTIONS.map((t) => {
            const isActive = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold flex items-center gap-1.5 shrink-0 transition-all active:scale-95 border ${
                  isActive
                    ? "bg-[var(--accent-primary)] text-slate-950 border-[var(--accent-primary)] shadow-md shadow-[var(--hud-glow)] font-bold"
                    : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/60"
                }`}
                title={`Switch UI Style to ${t.label} (${t.badge})`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: t.dotColor }}
                />
                <span className="whitespace-nowrap">{t.label}</span>
                {t.id === "paper-studio" && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono uppercase ${
                    isActive ? "bg-slate-900 text-white" : "bg-amber-400/20 text-amber-500 font-bold"
                  }`}>
                    LIGHT
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Full Theme Studio Customizer Trigger */}
        <div className="shrink-0">
          <button
            onClick={() => setCustomizerOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-[11px] font-mono font-bold text-[var(--accent-primary)] hover:border-[var(--accent-primary)] flex items-center gap-1.5 transition-all shrink-0 active:scale-95 shadow-sm"
            title="Open Deep Theme Studio (Alt + T)"
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden md:inline">STUDIO</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)]">
              Alt+T
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
