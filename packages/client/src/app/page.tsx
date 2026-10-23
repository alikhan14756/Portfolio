"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioStore, loadUserPrefs, applyStyleToDOM } from "../stores/usePortfolioStore";
import { Preloader } from "../components/Portfolio/Preloader";
import { Navbar } from "../components/Portfolio/Navbar";
import { QuickThemeBar } from "../components/Portfolio/QuickThemeBar";
import { ScrollTelemetryBar } from "../components/Portfolio/ScrollTelemetryBar";
import { HeroSection } from "../components/Portfolio/HeroSection";
import { AboutSection } from "../components/Portfolio/AboutSection";
import { ProjectsSection } from "../components/Portfolio/ProjectsSection";
import { SkillsSection } from "../components/Portfolio/SkillsSection";
import { ServicesSection } from "../components/Portfolio/ServicesSection";
import { WorkflowSection } from "../components/Portfolio/WorkflowSection";
import { ExperienceSection } from "../components/Portfolio/ExperienceSection";
import { TestimonialsSection } from "../components/Portfolio/TestimonialsSection";
import { ContactSection } from "../components/Portfolio/ContactSection";
import { FAQSection } from "../components/Portfolio/FAQSection";
import { CaseStudyDrawer } from "../components/Portfolio/CaseStudyDrawer";
import { ThemeCustomizerModal } from "../components/Portfolio/ThemeCustomizerModal";
import { StyleLabModal } from "../components/Portfolio/StyleLabModal";
import { FloatingThemeWidget } from "../components/Portfolio/FloatingThemeWidget";
import { JarvisAssistant } from "../components/Jarvis/JarvisAssistant";
import { PortfolioParticleBackground } from "../components/Canvas/PortfolioParticleBackground";

// Dynamic imports with SSR disabled for 3D/Canvas components
const BiosphereCanvas = dynamic(
  () => import("../components/Canvas/BiosphereCanvas").then((mod) => mod.BiosphereCanvas),
  { ssr: false }
);

const HUDOverlay = dynamic(
  () => import("../components/HUD/HUDOverlay").then((mod) => mod.HUDOverlay),
  { ssr: false }
);

const EntryPortal = dynamic(
  () => import("../components/UI/EntryPortal").then((mod) => mod.EntryPortal),
  { ssr: false }
);

export default function Home() {
  const viewMode = usePortfolioStore((s) => s.viewMode);
  const theme = usePortfolioStore((s) => s.theme);
  const typography = usePortfolioStore((s) => s.typography);
  const layout = usePortfolioStore((s) => s.layout);
  const showScanlines = usePortfolioStore((s) => s.showScanlines);
  const showGridLines = usePortfolioStore((s) => s.showGridLines);
  const styleId = usePortfolioStore((s) => s.styleId);
  const previewStyleId = usePortfolioStore((s) => s.previewStyleId);
  const accentOverride = usePortfolioStore((s) => s.accentOverride);

  // Restore persisted preferences & sync theme attributes
  useEffect(() => {
    loadUserPrefs();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlStyle = params.get("style");
      if (urlStyle) {
        usePortfolioStore.getState().setStyleId(urlStyle);
      }
      const urlTheme = params.get("theme");
      if (urlTheme) {
        usePortfolioStore.getState().setTheme(urlTheme as any);
      }
      const urlAssistant = params.get("assistant") || params.get("jarvis");
      if (urlAssistant === "open" || urlAssistant === "1" || urlAssistant === "true") {
        usePortfolioStore.getState().setJarvisOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    const active = previewStyleId || styleId || "jarvis-hologram";
    applyStyleToDOM(active, accentOverride);
  }, [styleId, previewStyleId, accentOverride]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        usePortfolioStore.getState().setStyleLabOpen(!usePortfolioStore.getState().isStyleLabOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "paper-studio") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.setAttribute("data-theme-mode", "light");
      document.documentElement.setAttribute("data-atmosphere", "none");
    }
  }, [theme]);

  // Map typography font classes
  const fontClass =
    typography === "jetbrains-mono"
      ? "font-mono"
      : typography === "orbitron"
      ? "font-mono tracking-wider"
      : typography === "inter"
      ? "font-sans"
      : "font-sans";

  return (
    <main
      className={`min-h-screen w-full relative bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 ${fontClass}`}
    >
      {/* 4K Top Scroll Telemetry & Progress Indicator */}
      <ScrollTelemetryBar />

      {/* Preloader with skip & reduced-motion fallback */}
      <Preloader />

      {/* Atmospheric Grid & Scanlines Overlays */}
      {showGridLines && (
        <div className="fixed inset-0 grid-bg-overlay pointer-events-none z-0 opacity-80" />
      )}
      {showScanlines && (
        <div className="fixed inset-0 scanline-overlay pointer-events-none z-30 opacity-60" />
      )}

      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Prominent Quick UI Style Switcher Bar (12 Distinct Themes) */}
      <QuickThemeBar />

      {viewMode === "portfolio" ? (
        /* --- MODE 1: JARVIS DEVELOPER PORTFOLIO --- */
        <div className="relative z-10">
          <PortfolioParticleBackground />

          <div
            className={
              layout === "cockpit"
                ? "max-w-6xl mx-auto px-4 py-6 border-x border-[var(--border-color)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm"
                : layout === "streamlined"
                ? "max-w-4xl mx-auto px-4 py-6"
                : layout === "terminal"
                ? "max-w-6xl mx-auto px-4 py-6 font-mono"
                : "w-full"
            }
          >
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ServicesSection />
            <WorkflowSection />
            <ExperienceSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
          </div>

          {/* Footer */}
          <footer className="border-t border-[var(--border-color)] py-8 px-4 text-center text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)]/50 relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                Â© 2026 MUHAMMAD ALI. ALL RIGHTS RESERVED. // SOURCE OF TRUTH: ALIBUILD.SITE
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[var(--text-secondary)]">
                <a
                  href="https://github.com/alikhan14756"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  GITHUB (@alikhan14756)
                </a>
                <span>â€¢</span>
                <a
                  href="https://wa.me/923055389967"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  WHATSAPP DIRECT
                </a>
                <span>â€¢</span>
                <a
                  href="https://instagram.com/codevibe.anim"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  @CODEVIBE.ANIM
                </a>
                <span>â€¢</span>
                <span>PESHAWAR, PAKISTAN ðŸ‡µðŸ‡°</span>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        /* --- MODE 2: REAL-TIME 2.5D AETHERIA BIOSPHERE CANVAS --- */
        <div className="fixed inset-0 top-16 z-10 w-full h-[calc(100vh-64px)] overflow-hidden">
          <BiosphereCanvas />
          <HUDOverlay />
          <EntryPortal />
        </div>
      )}

      {/* Persistent Floating Theme & Style Launcher */}
      <FloatingThemeWidget />

      {/* Global Interactive Overlays */}
      <CaseStudyDrawer />
      <ThemeCustomizerModal />
      <StyleLabModal />
      <JarvisAssistant />
    </main>
  );
}
