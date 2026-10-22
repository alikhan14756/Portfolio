"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Activity } from "lucide-react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

export const ScrollTelemetryBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const theme = usePortfolioStore((s) => s.theme);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(100, Math.max(0, Math.round((scrollTop / totalScroll) * 100)));
        setScrollProgress(currentProgress);
        setIsVisible(scrollTop > 120);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Ultra-Fine 4K Gradient Scroll Line at Top of Screen */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] transition-all duration-75 shadow-[0_0_12px_var(--accent-primary)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating JARVIS Scroll Telemetry Pill at Bottom Right */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            onClick={scrollToTop}
            className="hud-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] hover:border-[var(--accent-primary)] active:scale-95 transition-all shadow-xl backdrop-blur-xl group"
            title="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] tracking-wider text-[var(--text-secondary)]">
              TOP
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
              {scrollProgress}%
            </span>
          </button>
        </div>
      )}
    </>
  );
};
