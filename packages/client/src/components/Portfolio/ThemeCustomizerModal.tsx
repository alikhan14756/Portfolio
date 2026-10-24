"use client";

import React, { useState, useEffect } from "react";
import {
  usePortfolioStore,
  ThemeType,
  LayoutMode,
  TypographyOption,
  ParticleEffectOption,
  ParticleDensity,
  AnimationIntensity,
  AnimationSpeed,
  BorderRadiusOption,
  PanelOpacity,
  GlowStrength
} from "../../stores/usePortfolioStore";
import {
  X,
  Sliders,
  Check,
  Palette,
  Layout,
  Type,
  Sparkles,
  Activity,
  Volume2,
  VolumeX,
  Download,
  Upload,
  RotateCcw,
  Eye,
  Grid,
  Tv,
  MousePointer
} from "lucide-react";

export const ThemeCustomizerModal: React.FC = () => {
  const isCustomizerOpen = usePortfolioStore((s) => s.isCustomizerOpen);
  const setCustomizerOpen = usePortfolioStore((s) => s.setCustomizerOpen);

  const theme = usePortfolioStore((s) => s.theme);
  const setTheme = usePortfolioStore((s) => s.setTheme);

  const accentOverride = usePortfolioStore((s) => s.accentOverride);
  const setAccentOverride = usePortfolioStore((s) => s.setAccentOverride);

  const layout = usePortfolioStore((s) => s.layout);
  const setLayout = usePortfolioStore((s) => s.setLayout);

  const typography = usePortfolioStore((s) => s.typography);
  const setTypography = usePortfolioStore((s) => s.setTypography);

  const borderRadius = usePortfolioStore((s) => s.borderRadius);
  const setBorderRadius = usePortfolioStore((s) => s.setBorderRadius);

  const panelOpacity = usePortfolioStore((s) => s.panelOpacity);
  const setPanelOpacity = usePortfolioStore((s) => s.setPanelOpacity);

  const glowStrength = usePortfolioStore((s) => s.glowStrength);
  const setGlowStrength = usePortfolioStore((s) => s.setGlowStrength);

  const particleEffect = usePortfolioStore((s) => s.particleEffect);
  const setParticleEffect = usePortfolioStore((s) => s.setParticleEffect);

  const particleDensity = usePortfolioStore((s) => s.particleDensity);
  const setParticleDensity = usePortfolioStore((s) => s.setParticleDensity);

  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const setAnimationIntensity = usePortfolioStore((s) => s.setAnimationIntensity);

  const animationSpeed = usePortfolioStore((s) => s.animationSpeed);
  const setAnimationSpeed = usePortfolioStore((s) => s.setAnimationSpeed);

  const showGridLines = usePortfolioStore((s) => s.showGridLines);
  const setShowGridLines = usePortfolioStore((s) => s.setShowGridLines);

  const showScanlines = usePortfolioStore((s) => s.showScanlines);
  const setShowScanlines = usePortfolioStore((s) => s.setShowScanlines);

  const cursorSpotlight = usePortfolioStore((s) => s.cursorSpotlight);
  const setCursorSpotlight = usePortfolioStore((s) => s.setCursorSpotlight);

  const masterMute = usePortfolioStore((s) => s.masterMute);
  const setMasterMute = usePortfolioStore((s) => s.setMasterMute);

  const resetDefaults = usePortfolioStore((s) => s.resetDefaults);
  const exportPreset = usePortfolioStore((s) => s.exportPreset);
  const importPreset = usePortfolioStore((s) => s.importPreset);

  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isCustomizerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCustomizerOpen]);

  // Keyboard shortcut listener (Alt + T or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === "t") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p")) {
        e.preventDefault();
        setCustomizerOpen(!isCustomizerOpen);
      }
      if (e.key === "Escape" && isCustomizerOpen) {
        setCustomizerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCustomizerOpen, setCustomizerOpen]);

  if (!isCustomizerOpen) return null;

  const themesList: { id: ThemeType; name: string; swatch: string; tag: string }[] = [
    { id: "jarvis-core", name: "JARVIS Core", swatch: "from-sky-400 to-cyan-500", tag: "Holographic Arc" },
    { id: "iron-red", name: "Iron Red", swatch: "from-red-500 to-amber-500", tag: "Charcoal & Crimson" },
    { id: "cyberpunk-neon", name: "Cyberpunk Neon", swatch: "from-yellow-400 to-pink-500", tag: "Night City Violet" },
    { id: "matrix-terminal", name: "Matrix Terminal", swatch: "from-green-500 to-emerald-400", tag: "Phosphor CRT" },
    { id: "arctic-glass", name: "Arctic Glass", swatch: "from-sky-200 to-blue-300", tag: "Translucent Glacier" },
    { id: "midnight-purple", name: "Midnight Purple", swatch: "from-purple-500 to-violet-400", tag: "Lavender Gradient" },
    { id: "emerald-professional", name: "Emerald Pro", swatch: "from-emerald-400 to-teal-500", tag: "Refined Corporate" },
    { id: "solar-gold", name: "Solar Gold", swatch: "from-amber-400 to-orange-500", tag: "Luxury Warm Gold" },
    { id: "ocean-blue", name: "Ocean Blue", swatch: "from-blue-500 to-teal-400", tag: "Clean Technical" },
    { id: "rose-neon", name: "Rose Neon", swatch: "from-rose-500 to-pink-400", tag: "Plum & Velvet" },
    { id: "paper-studio", name: "Paper Studio", swatch: "from-stone-300 to-slate-700", tag: "Editorial Bone" },
    { id: "monochrome", name: "Monochrome", swatch: "from-zinc-400 to-zinc-900", tag: "Pure Noir Silver" }
  ];

  const handleExport = () => {
    const json = exportPreset();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ali-jarvis-theme-v2.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importPreset(content);
      setImportStatus(success ? "Preset successfully applied!" : "Invalid preset file format.");
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="JARVIS Theme Studio"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={() => setCustomizerOpen(false)}
    >
      <div
        className="relative max-w-3xl w-full max-h-[88vh] overflow-y-auto scroll-smooth style-card p-4 sm:p-8 space-y-6 text-left overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between border-b border-[var(--border-color)] pb-3.5 sm:pb-4 gap-2 w-full min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[var(--badge-bg)] text-[var(--accent-primary)] shadow-sm shrink-0">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-base sm:text-2xl font-black text-[var(--text-primary)] font-mono truncate">
                  THEME STUDIO
                </h2>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] shrink-0">
                  ALT + T
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-mono truncate mt-0.5 hidden xs:block">
                12 Working Themes &amp; Calibration
              </p>
            </div>
          </div>

          <button
            onClick={() => setCustomizerOpen(false)}
            className="p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--badge-bg)] border border-[var(--border-color)] transition-all shrink-0 active:scale-95 shadow-sm"
            title="Close Theme Studio"
            aria-label="Close Theme Studio"
          >
            <X className="w-5 h-5 text-[var(--text-primary)]" />
          </button>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/30">
            {importStatus}
          </div>
        )}

        {/* 1. Theme Palette Grid (All 12 Themes) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" />
              <span>12 WORKING THEMES ({themesList.length} PRESETS)</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-normal">
              Active: {theme}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {themesList.map((t) => {
              const active = theme === t.id || (theme === "iron-man" && t.id === "iron-red") || (theme === "cyberpunk" && t.id === "cyberpunk-neon") || (theme === "matrix" && t.id === "matrix-terminal") || (theme === "emerald-pro" && t.id === "emerald-professional");
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
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

        {/* 2. Custom Accent Color Hex Override */}
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
            <span>CUSTOM ACCENT COLOR OVERRIDE</span>
            {accentOverride && (
              <button
                onClick={() => setAccentOverride("")}
                className="text-[10px] text-[var(--accent-primary)] underline font-normal"
              >
                Clear Override
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={accentOverride || "#38bdf8"}
              onChange={(e) => setAccentOverride(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              title="Pick Accent Color"
            />
            <input
              type="text"
              placeholder="#38bdf8"
              value={accentOverride}
              onChange={(e) => setAccentOverride(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] w-36 uppercase"
            />
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Overrides primary accent &amp; HUD glow across all panels
            </span>
          </div>
        </div>

        {/* 3. Layout, Typography & Geometry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--border-color)]/60">
          {/* Typography */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Type className="w-3.5 h-3.5" />
              <span>TYPOGRAPHY PAIRING</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "syne", label: "Syne (Display)" },
                { id: "jetbrains-mono", label: "JetBrains (Code)" },
                { id: "inter", label: "Inter (Clean)" },
                { id: "orbitron", label: "Orbitron (Sci-Fi)" }
              ].map((ty) => (
                <button
                  key={ty.id}
                  onClick={() => setTypography(ty.id as TypographyOption)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono text-center transition-all ${
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

          {/* Border Radius */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Layout className="w-3.5 h-3.5" />
              <span>CORNER RADIUS</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "sharp", label: "Sharp" },
                { id: "rounded", label: "Rounded" },
                { id: "pill", label: "Pill" }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setBorderRadius(r.id as BorderRadiusOption)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono text-center transition-all ${
                    borderRadius === r.id
                      ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Opacity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Eye className="w-3.5 h-3.5" />
              <span>PANEL OPACITY</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "solid", label: "Solid" },
                { id: "glass", label: "Glass" },
                { id: "frosted", label: "Frosted" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPanelOpacity(p.id as PanelOpacity)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono text-center transition-all ${
                    panelOpacity === p.id
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

        {/* 4. Motion & Atmospheric Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-color)]/60">
          {/* Animation Intensity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>ANIMATION INTENSITY</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "full", label: "Full" },
                { id: "balanced", label: "Balanced" },
                { id: "minimal", label: "Minimal" },
                { id: "off", label: "Off" }
              ].map((ai) => (
                <button
                  key={ai.id}
                  onClick={() => setAnimationIntensity(ai.id as AnimationIntensity)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono text-center transition-all ${
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

          {/* Animation Speed */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>ANIMATION SPEED</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "slow", label: "0.75x" },
                { id: "normal", label: "1.0x" },
                { id: "fast", label: "1.25x" }
              ].map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setAnimationSpeed(sp.id as AnimationSpeed)}
                  className={`py-1.5 px-2 rounded-xl border text-[11px] font-mono text-center transition-all ${
                    animationSpeed === sp.id
                      ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold"
                      : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Atmospheric Overlays & Accessibility Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-color)]/60">
          <button
            onClick={() => setShowGridLines(!showGridLines)}
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              showGridLines
                ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)]"
                : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5" />
              <span>Grid Lines</span>
            </span>
            <span className="text-[10px] font-bold">{showGridLines ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setShowScanlines(!showScanlines)}
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              showScanlines
                ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)]"
                : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5" />
              <span>Scanlines</span>
            </span>
            <span className="text-[10px] font-bold">{showScanlines ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setCursorSpotlight(!cursorSpotlight)}
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              cursorSpotlight
                ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)]"
                : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5" />
              <span>Spotlight</span>
            </span>
            <span className="text-[10px] font-bold">{cursorSpotlight ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setMasterMute(!masterMute)}
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              masterMute
                ? "bg-rose-500/15 border-rose-500 text-rose-300"
                : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {masterMute ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>Master Mute</span>
            </span>
            <span className="text-[10px] font-bold">{masterMute ? "MUTED" : "LIVE"}</span>
          </button>
        </div>

        {/* 6. Footer: Presets Import/Export & Reset */}
        <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
              title="Export appearance preset as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT JSON</span>
            </button>

            <label className="px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>IMPORT JSON</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>

            <button
              onClick={resetDefaults}
              className="px-3 py-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
              title="Reset theme and visual parameters to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>
          </div>

          <button
            onClick={() => setCustomizerOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold hover:opacity-90 active:scale-95 transition-all shadow-md w-full sm:w-auto text-xs font-mono text-center flex items-center justify-center gap-2"
          >
            <span>APPLY &amp; MINIMIZE STUDIO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
