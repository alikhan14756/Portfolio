"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioStore } from "../stores/usePortfolioStore";
import { Navbar } from "../components/Portfolio/Navbar";
import { HeroSection } from "../components/Portfolio/HeroSection";
import { ProjectsSection } from "../components/Portfolio/ProjectsSection";
import { SkillsSection } from "../components/Portfolio/SkillsSection";
import { ServicesSection } from "../components/Portfolio/ServicesSection";
import { ExperienceSection } from "../components/Portfolio/ExperienceSection";
import { TestimonialsSection } from "../components/Portfolio/TestimonialsSection";
import { ContactSection } from "../components/Portfolio/ContactSection";
import { CaseStudyDrawer } from "../components/Portfolio/CaseStudyDrawer";
import { ThemeCustomizerModal } from "../components/Portfolio/ThemeCustomizerModal";
import { JarvisAssistant } from "../components/Jarvis/JarvisAssistant";
import { PortfolioParticleBackground } from "../components/Canvas/PortfolioParticleBackground";

// Dynamic import with SSR disabled for 3D/Canvas components
const BiosphereCanvas = dynamic(
  () =>
    import("../components/Canvas/BiosphereCanvas").then(
      (mod) => mod.BiosphereCanvas
    ),
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

  // Sync theme attribute to HTML tag on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
      className={`min-h-screen w-full relative bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400 ${fontClass}`}
    >
      {/* 1. Global Navigation Bar */}
      <Navbar />

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
            <ProjectsSection />
            <SkillsSection />
            <ServicesSection />
            <ExperienceSection />
            <TestimonialsSection />
            <ContactSection />
          </div>

          {/* Footer */}
          <footer className="border-t border-[var(--border-color)] py-8 px-4 text-center text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)]/50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                © 2026 MUHAMMAD ALI. ALL RIGHTS RESERVED. // SOURCE: ALIBUILD.SITE
              </div>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <a
                  href="https://github.com/alikhan14756"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)]"
                >
                  GITHUB
                </a>
                <span>•</span>
                <a
                  href="https://wa.me/923055389967"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)]"
                >
                  WHATSAPP
                </a>
                <span>•</span>
                <span>PAKISTAN 🇵🇰</span>
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

      {/* Global Interactive Overlays */}
      <CaseStudyDrawer />
      <ThemeCustomizerModal />
      <JarvisAssistant />
    </main>
  );
}
