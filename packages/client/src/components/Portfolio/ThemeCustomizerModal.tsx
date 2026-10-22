"use client";

import React from "react";
import {
  usePortfolioStore,
  ThemeType,
  LayoutMode,
  TypographyOption,
  ParticleEffectOption,
  AnimationIntensity
} from "../../stores/usePortfolioStore";
import { X, Sliders, Check, Palette, Layout, Type, Sparkles, Activity } from "lucide-react";

export const ThemeCustomizerModal: React.FC = () => {
  const isCustomizerOpen = usePortfolioStore((s) => s.isCustomizerOpen);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);

  const theme = usePortfolioStore((s) => s.theme);
  const setTheme = usePortfolioStore((s) => s.setTheme);

  const layout = usePortfolioStore((s) => s.layout);
  const setLayout = usePortfolioStore((s) => s.setLayout);

  const typography = usePortfolioStore((s) => s.typography);
  const setTypography = usePortfolioStore((s) => s.setTypography);

  const particleEffect = usePortfolioStore((s) => s.particleEffect);
  const setParticleEffect = usePortfolioStore((s) => s.setParticleEffect);

  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const setAnimationIntensity = usePortfolioStore((s) => s.setAnimationIntensity);

  if (!isCustomizerOpen) return null;

  const themesList: { id: ThemeType; name: string; swatch: string; tag: string }[] = [
    { id: "jarvis-core", name: "JARVIS Core", swatch: "from-sky-400 to-cyan-500", tag: "Holographic Arc" },
    { id: "iron-man", name: "Iron Man", swatch: "from-red-500 to-amber-500", tag: "Hot-Rod & Gold" },
    { id: "cyberpunk", name: "Cyberpunk", swatch: "from-yellow-400 to-pink-500", tag: "Night City Neon" },
    { id: "matrix", name: "Matrix", swatch: "from-green-500 to-emerald-400", tag: "Digital Rain" },
    { id: "arctic-glass", name: "Arctic Glass", swatch: "from-sky-200 to-blue-300", tag: "Frosted Glacier" },
    { id: "midnight-purple", name: "Midnight Purple", swatch: "from-purple-500 to-violet-400", tag: "Cosmic Amethyst" },
    { id: "emerald-pro", name: "Emerald Pro", swatch: "from-emerald-400 to-teal-500", tag: "Terminal Forest" },
    { id: "solar-gold", name: "Solar Gold", swatch: "from-amber-400 to-orange-500", tag: "Radiant Gold" },
    { id: "ocean-blue", name: "Ocean Blue", swatch: "from-blue-500 to-teal-400", tag: "Abyssal Sapphire" },
    { id: "rose-neon", name: "Rose Neon", swatch: "from-rose-500 to-pink-400", tag: "Velvet Magenta" },
    { id: "paper-studio", name: "Paper Studio", swatch: "from-stone-300 to-slate-700", tag: "Editorial Bone" },
    { id: "monochrome", name: "Monochrome", swatch: "from-zinc-400 to-zinc-900", tag: "Pure Noir Silver" }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={() => setCustomizerOpen(false)}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto hud-panel rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--accent-primary)]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono">
                JARVIS HUD CUSTOMIZER
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Real-time theme engine & spatial presentation calibration
              </p>
            </div>
          </div>

          <button
            onClick={() => setCustomizerOpen(false)}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Palette (12 Fully Working Themes) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
            <Palette className="w-3.5 h-3.5" />
            <span>12 WORKING THEMES ({themesList.length} PRESETS)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {themesList.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    active
                      ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] shadow-md"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-4 h-4 rounded-full bg-gradient-to-tr ${t.swatch} shadow-sm`} />
                    {active && <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono text-[var(--text-primary)]">
                      {t.name}
                    </div>
                    <div className="text-[9px] font-mono text-[var(--text-muted)] uppercase">
                      {t.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Layout Modes */}
        <div className="space-y-3 pt-2 border-t border-[var(--border-color)]/60">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
            <Layout className="w-3.5 h-3.5" />
            <span>LAYOUT MODE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "hud-grid", name: "HUD Grid" },
              { id: "cockpit", name: "Cockpit Pane" },
              { id: "streamlined", name: "Streamlined" },
              { id: "terminal", name: "Terminal Prompt" }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id as LayoutMode)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono font-semibold text-center transition-all ${
                  layout === l.id
                    ? "bg-[var(--accent-primary)] text-slate-950 border-[var(--accent-primary)]"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Typography & Particles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-color)]/60">
          {/* Typography */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Type className="w-3.5 h-3.5" />
              <span>TYPOGRAPHY</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "syne", label: "Syne (Display)" },
                { id: "jetbrains-mono", label: "JetBrains (Code)" },
                { id: "inter", label: "Inter (Clean)" },
                { id: "orbitron", label: "Orbitron (Sci-Fi)" }
              ].map((ty) => (
                <button
                  key={ty.id}
                  onClick={() => setTypography(ty.id as TypographyOption)}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-mono text-center transition-all ${
                    typography === ty.id
                      ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  }`}
                >
                  {ty.label}
                </button>
              ))}
            </div>
          </div>

          {/* Particles */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CANVAS PARTICLES</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "curl-noise", label: "Curl Noise Swarm" },
                { id: "matrix-rain", label: "Digital Rain" },
                { id: "starfield", label: "Nebula Stars" },
                { id: "hex-grid", label: "Geometric Hex" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setParticleEffect(p.id as ParticleEffectOption)}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-mono text-center transition-all ${
                    particleEffect === p.id
                      ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Animation Intensity */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/60">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>ANIMATION INTENSITY</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "full", label: "Full (Stark Tech)" },
              { id: "balanced", label: "Balanced" },
              { id: "minimal", label: "Minimal (Power Saver)" }
            ].map((ai) => (
              <button
                key={ai.id}
                onClick={() => setAnimationIntensity(ai.id as AnimationIntensity)}
                className={`py-1.5 px-2 rounded-lg border text-xs font-mono text-center transition-all ${
                  animationIntensity === ai.id
                    ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                }`}
              >
                {ai.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>Settings automatically saved to browser storage.</span>
          <button
            onClick={() => setCustomizerOpen(false)}
            className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            APPLY CONFIGURATION
          </button>
        </div>
      </div>
    </div>
  );
};
