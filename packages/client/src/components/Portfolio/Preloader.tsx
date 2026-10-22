"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { Zap, Shield, Sparkles, ArrowRight, Activity } from "lucide-react";

export const Preloader: React.FC = () => {
  const isPreloaderActive = usePortfolioStore((s) => s.isPreloaderActive);
  const setPreloaderActive = usePortfolioStore((s) => s.setPreloaderActive);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM CORE...");

  useEffect(() => {
    // If reduced motion is requested, dismiss immediately
    if (
      animationIntensity === "off" ||
      (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setPreloaderActive(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPreloaderActive(false), 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 18) + 8;
        if (next < 30) {
          setStatusText("CALIBRATING 12 CSS VARIABLE THEMES...");
        } else if (next < 60) {
          setStatusText("LOADING MUHAMMAD ALI PORTFOLIO CATALOG...");
        } else if (next < 85) {
          setStatusText("ENGAGING 25 HZ AUTHORITATIVE SPATIAL GRID...");
        } else {
          setStatusText("JARVIS TELEMETRY READY. SYSTEM ONLINE.");
        }

        return Math.min(100, next);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [animationIntensity, setPreloaderActive]);

  if (!isPreloaderActive) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Initializing"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040711] text-slate-100 select-none p-6 transition-opacity duration-300"
    >
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Holographic Arc Reactor Spinner */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/50 animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/70 animate-[spin_5s_linear_infinite_reverse]" />
          <div className="w-12 h-12 rounded-full bg-sky-950/80 border border-sky-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)]">
            <Zap className="w-6 h-6 text-sky-400 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="text-xs font-mono tracking-widest text-sky-400 uppercase flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>ALI.BUILD // JARVIS OS v2.0</span>
          </div>
          <h1 className="text-xl font-black font-mono tracking-wider text-slate-100">
            MUHAMMAD ALI PORTFOLIO
          </h1>
          <p className="text-[11px] font-mono text-slate-400">
            PESHAWAR, PAKISTAN 🇵🇰 • FRONTEND DEVELOPER & CREATOR
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-slate-900 border border-sky-500/30 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="truncate max-w-[280px] text-left">{statusText}</span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Skip Button for Accessibility */}
        <div className="pt-2">
          <button
            onClick={() => setPreloaderActive(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-sky-300 hover:bg-slate-900/80 border border-slate-800 transition-all"
          >
            <span>SKIP INITIALIZATION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
