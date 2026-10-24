"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { STYLE_PRESETS, StylePreset, StyleCategory, getStylePreset } from "../../data/stylePresets";
import {
  Sparkles,
  X,
  Search,
  Check,
  Heart,
  Eye,
  Sliders,
  Layers,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  Zap,
  ArrowRight,
  Shield,
  Palette,
  Type,
  Maximize2
} from "lucide-react";

export const StyleLabModal: React.FC = () => {
  const isStyleLabOpen = usePortfolioStore((s) => s.isStyleLabOpen);
  const setStyleLabOpen = usePortfolioStore((s) => s.setStyleLabOpen);
  const styleId = usePortfolioStore((s) => s.styleId);
  const setStyleId = usePortfolioStore((s) => s.setStyleId);
  const previewStyleId = usePortfolioStore((s) => s.previewStyleId);
  const setPreviewStyleId = usePortfolioStore((s) => s.setPreviewStyleId);
  const favoriteStyles = usePortfolioStore((s) => s.favoriteStyles);
  const toggleFavoriteStyle = usePortfolioStore((s) => s.toggleFavoriteStyle);

  // Independent Customizer Controls
  const accentOverride = usePortfolioStore((s) => s.accentOverride);
  const setAccentOverride = usePortfolioStore((s) => s.setAccentOverride);
  const typography = usePortfolioStore((s) => s.typography);
  const setTypography = usePortfolioStore((s) => s.setTypography);
  const borderRadius = usePortfolioStore((s) => s.borderRadius);
  const setBorderRadius = usePortfolioStore((s) => s.setBorderRadius);
  const panelOpacity = usePortfolioStore((s) => s.panelOpacity);
  const setPanelOpacity = usePortfolioStore((s) => s.setPanelOpacity);
  const glowStrength = usePortfolioStore((s) => s.glowStrength);
  const setGlowStrength = usePortfolioStore((s) => s.setGlowStrength);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const setAnimationIntensity = usePortfolioStore((s) => s.setAnimationIntensity);
  const animationSpeed = usePortfolioStore((s) => s.animationSpeed);
  const setAnimationSpeed = usePortfolioStore((s) => s.setAnimationSpeed);
  const resetDefaults = usePortfolioStore((s) => s.resetDefaults);
  const exportPreset = usePortfolioStore((s) => s.exportPreset);
  const importPreset = usePortfolioStore((s) => s.importPreset);

  // Local State
  const [activeTab, setActiveTab] = useState<"gallery" | "controls" | "mixer" | "io">("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedPreset, setCopiedPreset] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Filtered Styles
  const filteredStyles = useMemo(() => {
    return STYLE_PRESETS.filter((preset) => {
      const matchesSearch =
        preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;
      if (selectedCategory === "Favorites") return favoriteStyles.includes(preset.id);
      return preset.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory, favoriteStyles]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isStyleLabOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isStyleLabOpen]);

  if (!isStyleLabOpen) return null;

  const activePreset = getStylePreset(previewStyleId || styleId);

  const handleApply = (id: string) => {
    setStyleId(id);
    setPreviewStyleId(null);
  };

  const handleStartLivePreview = (id: string) => {
    setPreviewStyleId(id);
  };

  const handleCancelLivePreview = () => {
    setPreviewStyleId(null);
  };

  const handleExport = () => {
    const json = exportPreset();
    navigator.clipboard.writeText(json);
    setCopiedPreset(true);
    setTimeout(() => setCopiedPreset(false), 2500);
  };

  const handleImport = () => {
    setImportError(null);
    setImportSuccess(false);
    try {
      const ok = importPreset(importJson);
      if (ok) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError("Invalid preset format. Expected a valid version 2 preset JSON object.");
      }
    } catch {
      setImportError("Malformed JSON string. Please verify your preset syntax.");
    }
  };

  const categories = [
    "All",
    "Surface Archetype",
    "Layout & Architecture",
    "Motion & Kinetic",
    "Aesthetic & Culture",
    "Technical & Retro",
    "Favorites"
  ];

  const curatedAccents = [
    { label: "Cyan Core", hex: "#38bdf8" },
    { label: "Emerald Matrix", hex: "#22c55e" },
    { label: "Canary Gold", hex: "#facc15" },
    { label: "Hot Rose", hex: "#f43f5e" },
    { label: "Violet Prism", hex: "#a855f7" },
    { label: "Solar Amber", hex: "#f59e0b" },
    { label: "Pure Monochrome", hex: "#ffffff" }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="style-lab-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
    >
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[960px] flex flex-col style-dialog overflow-hidden text-[var(--text-primary)]">
        {/* Live Preview Persistent Banner */}
        {previewStyleId && (
          <div className="w-full bg-[var(--accent-primary)] text-slate-950 px-4 py-2 text-xs font-mono font-bold flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 animate-pulse" />
              <span>
                LIVE PREVIEWING: <strong>{activePreset.name.toUpperCase()}</strong> (Changes are temporary until applied)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApply(previewStyleId)}
                className="px-3 py-1 rounded bg-slate-950 text-white hover:bg-slate-800 transition-all font-bold"
              >
                Apply Style
              </button>
              <button
                onClick={handleCancelLivePreview}
                className="px-2.5 py-1 rounded bg-black/20 hover:bg-black/30 transition-all"
              >
                Cancel Preview
              </button>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-3 sm:px-6 sm:py-5 border-b border-[var(--border-color)] flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h2 id="style-lab-title" className="text-sm sm:text-lg font-bold font-mono tracking-tight truncate">
                    STYLE LAB // 28 STYLES
                  </h2>
                  <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] font-bold shrink-0">
                    AUTONOMOUS
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono hidden sm:block truncate mt-0.5">
                  Switch between 28 complete design systems with authentic layouts, materials, and fonts.
                </p>
              </div>
            </div>

            {/* Close / Minimize Button: shrink-0 so it NEVER overflows offscreen */}
            <button
              onClick={() => {
                if (previewStyleId) setPreviewStyleId(null);
                setStyleLabOpen(false);
              }}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shrink-0 active:scale-95 shadow-sm"
              title="Close Style Lab (ESC)"
              aria-label="Close Style Lab"
            >
              <X className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>

          {/* Navigation Tabs (Smooth horizontal scrolling on mobile, full flex on desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full pb-0.5">
            <div className="flex items-center p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-mono shrink-0">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                  activeTab === "gallery"
                    ? "bg-[var(--accent-primary)] text-slate-950 font-bold shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Gallery (28)
              </button>
              <button
                onClick={() => setActiveTab("controls")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                  activeTab === "controls"
                    ? "bg-[var(--accent-primary)] text-slate-950 font-bold shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Studio Controls
              </button>
              <button
                onClick={() => setActiveTab("mixer")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                  activeTab === "mixer"
                    ? "bg-[var(--accent-primary)] text-slate-950 font-bold shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Mixer &amp; Rules
              </button>
              <button
                onClick={() => setActiveTab("io")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                  activeTab === "io"
                    ? "bg-[var(--accent-primary)] text-slate-950 font-bold shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Import/Export
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: 28 DESIGN SYSTEMS GALLERY */}
        {activeTab === "gallery" && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Search & Filter Bar */}
            <div className="p-3 sm:px-6 border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-primary)]/40 shrink-0">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[var(--accent-primary)] text-slate-950 font-bold"
                        : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {cat === "Favorites" ? `★ Favorites (${favoriteStyles.length})` : cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 28 design styles..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>
            </div>

            {/* Gallery Grid */}
            <div
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start auto-rows-max overscroll-contain scroll-smooth"
              style={{ alignContent: "start", gridAutoRows: "max-content" }}
            >
              {filteredStyles.map((preset) => {
                const isActive = styleId === preset.id && !previewStyleId;
                const isPreviewing = previewStyleId === preset.id;
                const isFav = favoriteStyles.includes(preset.id);

                return (
                  <div
                    key={preset.id}
                    className={`rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden group ${
                      isActive
                        ? "border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30 bg-[var(--bg-card)] shadow-xl"
                        : isPreviewing
                        ? "border-amber-400 ring-2 ring-amber-400/40 bg-[var(--bg-card)] shadow-xl"
                        : "border-[var(--border-color)] bg-[var(--bg-card)]/60 hover:border-[var(--accent-primary)]/60 hover:bg-[var(--bg-card)]"
                    }`}
                  >
                    {/* Miniature Live Component Preview Card */}
                    <div
                      className="p-3.5 h-36 flex flex-col justify-between border-b relative overflow-hidden transition-all duration-300"
                      style={{
                        backgroundColor: preset.tokens.bgPrimary,
                        backgroundImage: preset.tokens.bgPattern,
                        backgroundSize: preset.tokens.bgPatternSize || "auto",
                        borderColor: preset.tokens.borderColor
                      }}
                    >
                      {/* Top Bar of Preview */}
                      <div className="flex items-center justify-between relative z-10">
                        <span
                          className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: preset.tokens.badgeBg,
                            color: preset.tokens.accentPrimary,
                            border: `1px solid ${preset.tokens.borderColor}`
                          }}
                        >
                          {preset.category}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavoriteStyle(preset.id);
                          }}
                          className={`p-1 rounded-full transition-colors ${
                            isFav ? "text-rose-500 fill-rose-500" : "text-white/40 hover:text-white"
                          }`}
                          title={isFav ? "Remove from favorites" : "Save as favorite"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Miniature Card Component */}
                      <div
                        className="p-2.5 rounded transition-all"
                        style={{
                          backgroundColor: preset.tokens.bgCard,
                          border: preset.tokens.cardBorder,
                          borderRadius: preset.tokens.cardRadius,
                          boxShadow: preset.tokens.cardShadow,
                          clipPath: preset.tokens.cardClip || "none",
                          backdropFilter: preset.tokens.backdropBlur
                        }}
                      >
                        <div
                          className="text-xs font-bold truncate"
                          style={{
                            fontFamily: preset.fontDisplay,
                            color: preset.tokens.textPrimary
                          }}
                        >
                          {preset.previewTokens.headline}
                        </div>
                        <div
                          className="text-[10px] truncate mt-0.5"
                          style={{ color: preset.tokens.textSecondary }}
                        >
                          {preset.previewTokens.cardSnippet}
                        </div>
                      </div>

                      {/* Miniature Action Button */}
                      <div className="flex items-center justify-between text-[9px] relative z-10">
                        <span
                          className="px-2 py-0.5 font-bold truncate"
                          style={{
                            backgroundColor: preset.tokens.accentPrimary,
                            color: preset.tokens.bgPrimary === "#000000" ? "#000000" : "#09090b",
                            borderRadius: preset.tokens.btnRadius
                          }}
                        >
                          {preset.previewTokens.buttonLabel}
                        </span>

                        <span
                          className="font-mono text-[9px]"
                          style={{ color: preset.tokens.textMuted }}
                        >
                          {preset.animationProfile.name}
                        </span>
                      </div>
                    </div>

                    {/* Preset Info & Actions */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm tracking-tight text-[var(--text-primary)]">
                            {preset.name}
                          </h3>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" /> ACTIVE
                            </span>
                          )}
                          {isPreviewing && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center gap-1 animate-pulse">
                              <Eye className="w-3 h-3" /> PREVIEW
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                          {preset.shortDesc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {preset.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)]/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="pt-2 border-t border-[var(--border-color)]/60 flex items-center gap-2">
                        <button
                          onClick={() => handleApply(preset.id)}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                            isActive
                              ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                              : "bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95"
                          }`}
                        >
                          {isActive ? "Applied System" : "Apply Style"}
                        </button>

                        <button
                          onClick={() =>
                            isPreviewing
                              ? handleCancelLivePreview()
                              : handleStartLivePreview(preset.id)
                          }
                          className={`p-1.5 rounded-xl border transition-all ${
                            isPreviewing
                              ? "bg-amber-400 text-slate-950 border-amber-400"
                              : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
                          }`}
                          title={isPreviewing ? "Cancel Preview" : "Live Preview on Page"}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INDEPENDENT CONTROLS & STUDIO */}
        {activeTab === "controls" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-4xl mx-auto w-full font-mono text-left overscroll-contain scroll-smooth">
            <div className="border-b border-[var(--border-color)] pb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--accent-primary)]" />
                INDEPENDENT DESIGN SYSTEM CALIBRATION
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Customize individual parameters without losing the overarching design system identity.
              </p>
            </div>

            {/* 1. Accent Color Override */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                ACCENT COLOR OVERRIDE
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {curatedAccents.map((acc) => (
                  <button
                    key={acc.hex}
                    onClick={() => setAccentOverride(acc.hex)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all"
                    style={{
                      borderColor: accentOverride === acc.hex ? acc.hex : "var(--border-color)",
                      backgroundColor: "var(--bg-primary)"
                    }}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: acc.hex }} />
                    <span className="text-[var(--text-primary)]">{acc.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => setAccentOverride("")}
                  className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Reset To Style Default
                </button>
              </div>
            </div>

            {/* 2. Typography Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                TYPOGRAPHY ARTIFACT
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "syne", name: "Syne (Display)" },
                  { id: "orbitron", name: "Orbitron (Sci-Fi)" },
                  { id: "inter", name: "Inter (Neutral)" },
                  { id: "jetbrains-mono", name: "JetBrains Mono" }
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setTypography(font.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      typography === font.id
                        ? "border-[var(--accent-primary)] bg-[var(--badge-bg)] text-[var(--accent-primary)] font-bold"
                        : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="text-xs">{font.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Card Geometry (Border Radius) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-primary)]">CARD SHAPE &amp; GEOMETRY</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "sharp", label: "Sharp / Brutal (0px)" },
                  { id: "rounded", label: "Balanced (16px)" },
                  { id: "pill", label: "Pill / Clay (32px)" }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBorderRadius(b.id as any)}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      borderRadius === b.id
                        ? "border-[var(--accent-primary)] bg-[var(--badge-bg)] text-[var(--accent-primary)] font-bold"
                        : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Animation Intensity & Reduced Motion */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-primary)] flex items-center justify-between">
                <span>ANIMATION INTENSITY (ACCESSIBILITY ENGINE)</span>
                <span className="text-[10px] text-[var(--accent-primary)] uppercase">
                  ACTIVE: {animationIntensity}
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: "full", label: "Full Motion" },
                  { id: "balanced", label: "Balanced" },
                  { id: "minimal", label: "Minimal" },
                  { id: "off", label: "Motion Off (Safe)" }
                ].map((anim) => (
                  <button
                    key={anim.id}
                    onClick={() => setAnimationIntensity(anim.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      animationIntensity === anim.id
                        ? "border-[var(--accent-primary)] bg-[var(--badge-bg)] text-[var(--accent-primary)] font-bold"
                        : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {anim.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Reset to Global Defaults */}
            <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
              <button
                onClick={resetDefaults}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-xs font-bold flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset To Default Architecture
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MIXER & COMPATIBILITY ENGINE */}
        {activeTab === "mixer" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-4xl mx-auto w-full font-mono text-left overscroll-contain">
            <div className="border-b border-[var(--border-color)] pb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                STYLE MIXER &amp; COMPATIBILITY ENGINE
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Combine layout arrangements with surface materials and kinetic reveals while preserving visual accessibility.
              </p>
            </div>

            {/* Popular Curated Combinations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Bento Grid + Glassmorphism",
                  desc: "Asymmetric information-dense compartments styled with frosted translucent glass depth.",
                  action: () => {
                    setStyleId("bento-grid");
                    setPanelOpacity("glass");
                    setBorderRadius("rounded");
                  }
                },
                {
                  title: "Neobrutalism + Kinetic Typography",
                  desc: "Heavy 3px solid ink outlines combined with oversized animated headline tracking.",
                  action: () => {
                    setStyleId("neobrutalism");
                    setTypography("syne");
                    setBorderRadius("sharp");
                  }
                },
                {
                  title: "Minimalism + Motion-Driven UI",
                  desc: "Clean generous whitespace paired with high-framerate spring-physics section entrances.",
                  action: () => {
                    setStyleId("minimalism");
                    setAnimationIntensity("full");
                  }
                },
                {
                  title: "Industrial CAD + Terminal Monospace",
                  desc: "Blueprint precision grids with JetBrains Mono code syntax and crosshair brackets.",
                  action: () => {
                    setStyleId("industrial-technical");
                    setTypography("jetbrains-mono");
                  }
                }
              ].map((combo, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[var(--accent-primary)]">{combo.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                      {combo.desc}
                    </p>
                  </div>
                  <button
                    onClick={combo.action}
                    className="py-1.5 px-3 rounded-xl bg-[var(--badge-bg)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-slate-950 font-bold text-xs transition-all self-start flex items-center gap-1.5"
                  >
                    <span>Load Hybrid Mix</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Accessibility & Readability Guard Notice */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                AUTOMATED READABILITY &amp; WCAG AA SAFEGUARD
              </div>
              <p className="text-amber-200/80 leading-relaxed">
                The Style Lab dynamically prevents invalid contrast collisions. If you apply a light mode design system
                (such as Neobrutalism or Editorial Luxury), dark background overlays and high-contrast text tokens are
                automatically calibrated to maintain WCAG AA readability compliance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: IMPORT / EXPORT PRESETS */}
        {activeTab === "io" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-4xl mx-auto w-full font-mono text-left">
            <div className="border-b border-[var(--border-color)] pb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Download className="w-4 h-4 text-[var(--accent-primary)]" />
                PRESET IMPORT &amp; EXPORT ENGINE
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Save your custom calibrated design system or share presets with teammates via validated JSON.
              </p>
            </div>

            {/* Export Section */}
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">EXPORT CURRENT CONFIGURATION</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Copies your active styleId, tokens, typography, and motion preferences as a valid version 2 preset.
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
                >
                  {copiedPreset ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{copiedPreset ? "Copied To Clipboard!" : "Copy Preset JSON"}</span>
                </button>
              </div>
            </div>

            {/* Import Section */}
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">IMPORT PRESET JSON</h4>
              <textarea
                rows={5}
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder='Paste your validated JSON preset here: { "version": 2, "styleId": "cyberpunk", ... }'
                className="w-full p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />

              {importError && (
                <div className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
                  {importError}
                </div>
              )}

              {importSuccess && (
                <div className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30">
                  Preset imported and applied successfully!
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={!importJson.trim()}
                className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40"
              >
                <Upload className="w-4 h-4" />
                <span>Validate &amp; Load Preset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
