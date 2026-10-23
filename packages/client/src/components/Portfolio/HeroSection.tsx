"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { getThemeArchetype } from "../../utils/themeArchetypes";
import {
  Sparkles,
  ArrowRight,
  Bot,
  MessageCircle,
  Download,
  Terminal as TerminalIcon,
  Activity,
  Cpu,
  Heart,
  Zap,
  Globe,
  Star,
  Clock,
  Battery,
  ShieldCheck,
  Disc,
  Radio,
  Flame,
  CheckCircle2,
  Award,
  Layers,
  Minus,
  Maximize2,
  X,
  Volume2,
  Compass
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const styleId = usePortfolioStore((s) => s.styleId);
  const { profile } = PORTFOLIO_DATA;
  const config = getThemeArchetype(styleId);

  // Live Clock for Peshawar time in Bento/Terminal/NASA
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        }).format(now);
        setTimeStr(formatted);
      } catch (e) {
        setTimeStr("03:30:00 PM");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // =========================================================================
  // 1. TERMINAL / MATRIX (Pure Green Phosphor Hacker CLI)
  // =========================================================================
  if (config.id === "terminal-matrix") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="bg-black/90 border-2 border-[var(--accent-primary)] rounded-t-xl px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[var(--accent-primary)] shadow-[0_0_20px_var(--accent-primary)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-bold tracking-wider">root@muhammad-ali:~ (zsh - 60fps)</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden sm:inline">PKT: {timeStr || "12:00:00 PM"}</span>
              <span className="text-emerald-400 font-bold animate-pulse">● 0 PACKETS DROPPED</span>
            </div>
          </div>

          <div className="bg-black/95 border-x-2 border-b-2 border-[var(--accent-primary)] rounded-b-xl p-6 sm:p-10 font-mono shadow-[0_0_35px_var(--accent-primary)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 text-left text-[var(--accent-primary)]">
                <div className="space-y-4">
                  <div className="text-xs text-[var(--accent-primary)]/80 flex items-center gap-2">
                    <span>&gt; sysinfo --user=ali --verbose</span>
                    <span className="terminal-cursor w-2 h-4 bg-[var(--accent-primary)] inline-block" />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] tracking-wider">
                    [IDENTIFIER: MUHAMMAD ALI] // ROLE: SENIOR FRONTEND DEVELOPER
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    {config.headlinePrefix} <br />
                    <span className="text-[var(--accent-primary)] drop-shadow-[0_0_15px_var(--accent-primary)]">
                      {config.headlineHighlight}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed pt-1 max-w-xl">
                    {config.subheadline}
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollTo("projects")}
                      className="px-5 py-3 bg-[var(--accent-primary)] text-black font-black text-xs tracking-wider border border-[var(--accent-primary)] shadow-[0_0_15px_var(--accent-primary)] hover:bg-white hover:text-black transition-all flex items-center gap-2"
                    >
                      <span>$ ./view_projects.sh</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setJarvisOpen(true)}
                      className="px-5 py-3 bg-black text-[var(--accent-primary)] font-bold text-xs tracking-wider border border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition-all flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      <span>$ ./connect_ali_ai</span>
                    </button>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="px-5 py-3 bg-black text-white font-bold text-xs tracking-wider border border-white/30 hover:border-white transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>$ cat contact.txt</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--accent-primary)]/30 text-xs">
                    {profile.stats.map((st, i) => (
                      <div key={i} className="p-3 bg-black border border-[var(--accent-primary)]/50 rounded">
                        <div className="text-xl sm:text-2xl font-black text-white">{st.value}</div>
                        <div className="text-[10px] text-[var(--accent-primary)] tracking-widest uppercase mt-0.5">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Box: CRT Monitor Bezel - MATCHING HEIGHT & PERFECTLY ALIGNED */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full p-4 bg-black border-2 border-[var(--accent-primary)] rounded-lg shadow-[0_0_25px_var(--accent-primary)]">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--accent-primary)]/40 text-[10px] text-[var(--accent-primary)] font-mono">
                  <span>[TARGET_LOCK: ALI_FRONTEND]</span>
                  <span className="text-emerald-400 animate-pulse">● LIVE STREAM</span>
                </div>
                <div className="relative overflow-hidden my-auto py-2 flex items-center justify-center">
                  <img
                    src="/muhammad_ali_hero.png"
                    alt="Muhammad Ali - Frontend Developer"
                    className="max-h-[420px] w-auto object-contain filter drop-shadow-[0_0_25px_var(--accent-primary)]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--accent-primary)]/10 to-transparent h-12 w-full animate-[scanlineSweep_4s_linear_infinite]" />
                </div>
                <div className="p-2 bg-black border border-[var(--accent-primary)] text-center text-[10px] font-mono text-[var(--accent-primary)]">
                  STATUS: DEPLOYED &bull; UPTIME: 2+ YRS &bull; LATENCY: 0.8MS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. RETRO-FUTURISM (1960s NASA Apollo Mission Control)
  // =========================================================================
  if (config.id === "retro-futurism") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 font-mono">
          <div className="p-3 bg-amber-950/80 border-2 border-amber-500 rounded-t-xl flex items-center justify-between text-xs text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-amber-500 animate-ping inline-block" />
              <span>APOLLO GUIDANCE COMPUTER // FLIGHT MANIFEST: ALI-2026</span>
            </div>
            <span>TRAJECTORY: ORBITAL LEO // CAPCOM: NOMINAL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-10 bg-amber-950/40 border-2 border-amber-500/80 rounded-b-xl flex flex-col justify-between h-full space-y-6 text-left text-amber-100">
              <div className="space-y-4">
                <div className="text-xs text-amber-400 tracking-widest uppercase">
                  [MISSION CONTROL: PESHAWAR TRACKING STATION]
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 leading-tight uppercase">
                  {config.headlinePrefix} <br />
                  <span className="text-amber-500 underline decoration-amber-500">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-amber-200/90 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 bg-amber-500 text-black font-black text-xs uppercase tracking-wider border-2 border-amber-500 hover:bg-amber-400 shadow-[0_0_15px_#f59e0b] transition-all flex items-center gap-2"
                  >
                    <span>INITIATE LAUNCH (PROJECTS)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 bg-black text-amber-400 border border-amber-500 font-bold text-xs uppercase tracking-wider hover:bg-amber-500/20 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>RADIO COMMS (AI)</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 bg-black text-amber-300 border border-amber-500/60 font-bold text-xs uppercase tracking-wider hover:border-amber-400 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CREW DIRECTORY</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-500/40">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-amber-950/70 border border-amber-500/60">
                      <div className="text-2xl font-black text-amber-400">{st.value}</div>
                      <div className="text-[10px] text-amber-300 uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: NASA Flight Screen - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-5 bg-amber-950/50 border-2 border-amber-500 rounded-xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/40 text-[10px] text-amber-400">
                <span>FLIGHT COMMANDER: MUHAMMAD ALI</span>
                <span>STATUS: 100% READY</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center relative">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[420px] w-auto object-contain filter drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  loading="eager"
                />
              </div>
              <div className="p-2 bg-amber-950 border border-amber-500 text-center text-xs text-amber-400 uppercase">
                COMMUNICATIONS LINK: NOMINAL // 0 ERRORS
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 3. NEOBRUTALISM (Yellow & Black Chunky Hazard Architecture)
  // =========================================================================
  if (config.id === "neobrutalism") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="w-full bg-[#facc15] border-4 border-black shadow-[6px_6px_0px_#000] overflow-hidden py-2 -rotate-1 select-none">
            <div className="hazard-tape-track flex items-center gap-6 font-mono font-black text-black text-xs sm:text-sm uppercase tracking-widest">
              <span>⚡ 100% PRODUCTION READY</span>
              <span>★ NO BORING TEMPLATES</span>
              <span>⚡ WORDPRESS &amp; ELEMENTOR EXPERT</span>
              <span>★ REACT &amp; NEXT.JS SPEED</span>
              <span>⚡ 100% PRODUCTION READY</span>
              <span>★ NO BORING TEMPLATES</span>
              <span>⚡ WORDPRESS &amp; ELEMENTOR EXPERT</span>
              <span>★ REACT &amp; NEXT.JS SPEED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Left Box: Brutalist Content Frame */}
            <div className="lg:col-span-7 brutalist-hero-frame p-6 sm:p-10 flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-black text-[#facc15] font-mono font-black text-xs uppercase border-2 border-black">
                    MUHAMMAD ALI
                  </span>
                  <span className="px-3 py-1 bg-[var(--accent-primary)] text-white font-mono font-black text-xs uppercase border-2 border-black">
                    FRONTEND DEVELOPER
                  </span>
                  <span className="px-3 py-1 bg-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                    📍 PESHAWAR, PK
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-[0.98] tracking-tighter uppercase">
                  {config.headlinePrefix} <br />
                  <span className="bg-[#facc15] text-black px-2 inline-block border-2 border-black shadow-[4px_4px_0px_#000] mt-1">
                    {config.headlineHighlight}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] font-mono font-medium leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-4 bg-black text-white font-mono font-black text-sm tracking-wider border-3 border-black shadow-[6px_6px_0px_var(--accent-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
                  >
                    <span>SEE MY WORK</span>
                    <ArrowRight className="w-5 h-5 text-[#facc15]" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-6 py-4 bg-[#facc15] text-black font-mono font-black text-sm tracking-wider border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
                  >
                    <Bot className="w-5 h-5" />
                    <span>TALK TO AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-4 bg-white text-black font-mono font-black text-sm tracking-wider border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>HIRE ME</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-4 border-black">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
                      <div className="text-2xl sm:text-3xl font-black font-mono text-black">{st.value}</div>
                      <div className="text-[10px] font-mono font-black uppercase text-gray-700 tracking-wider">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Pop-Art Frame - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 brutalist-hero-frame p-6 bg-[#facc15] flex flex-col justify-between h-full relative">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black font-mono font-black text-xs uppercase text-black">
                <span>PORTRAIT // PK-2026</span>
                <span className="flex items-center gap-1 bg-black text-[#facc15] px-2 py-0.5 border border-black">
                  <Star className="w-3.5 h-3.5 fill-[#facc15]" />
                  <span>VERIFIED PRO</span>
                </span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center p-2 bg-white border-3 border-black shadow-[6px_6px_0px_#000]">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto mx-auto object-contain filter contrast-110"
                  loading="eager"
                />
              </div>
              <div className="w-full p-2 text-center font-mono text-xs font-black uppercase text-black brutalist-hazard-fill border-2 border-black">
                HIGH CONVERSION &bull; 100% HAND-CRAFTED &bull; ZERO FLUFF
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 4. SWISS / INTERNATIONAL TYPOGRAPHIC STYLE (Modernist Grid & Swiss Cross)
  // =========================================================================
  if (config.id === "swiss-style") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between p-3 border-b-2 border-black text-xs font-mono font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-lg font-black">+</span>
              <span>SWISS INTERNATIONAL STYLE // MÜLLER-BROCKMANN SYSTEM</span>
            </div>
            <span>ORDNUNG &bull; RATIONALITÄT &bull; PRÄZISION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            {/* Left Box: Swiss Grid Typography */}
            <div className="lg:col-span-7 swiss-hero-frame p-8 sm:p-12 flex flex-col justify-between h-full space-y-8 text-left bg-white text-black">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-red-600 tracking-widest uppercase">
                  01 // CAPABILITIES &amp; OVERVIEW
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[0.96]">
                  {config.headlinePrefix} <br />
                  <span className="text-red-600">{config.headlineHighlight}</span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-800 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t-2 border-black">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
                  >
                    <span>02 // VIEW WORKS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-7 py-4 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-red-500" />
                    <span>03 // AI AGENT</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-7 py-4 border-2 border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors flex items-center gap-2"
                  >
                    <span>04 // INQUIRE</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-300">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="text-left">
                      <div className="text-3xl font-black text-black">0{i + 1}.</div>
                      <div className="text-xl font-black text-red-600">{st.value}</div>
                      <div className="text-[10px] font-mono uppercase text-neutral-600">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Swiss Photo Block - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 swiss-hero-frame p-8 bg-neutral-100 flex flex-col justify-between h-full border-3 border-black">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black text-xs font-mono font-bold">
                <span>05 // MUHAMMAD ALI</span>
                <span className="text-red-600 font-black">+ VERIFIED</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto mx-auto object-contain filter grayscale contrast-125"
                  loading="eager"
                />
              </div>
              <div className="pt-3 border-t-2 border-black flex justify-between text-xs font-mono text-neutral-700">
                <span>PESHAWAR, PAKISTAN</span>
                <span>2+ YRS EXPERIENCE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 5. HIGH-CONTRAST MONOCHROME (Pure B&W Film Noir)
  // =========================================================================
  if (config.id === "high-contrast-monochrome") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between p-3 border-2 border-white bg-black text-white text-xs font-mono font-bold tracking-widest uppercase">
            <span>● 100% HIGH-CONTRAST MONOCHROME // ZERO HALFTONE LOSS</span>
            <span>DENSITY: 100% INK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            {/* Left Box: Inverted Dark Monolith */}
            <div className="lg:col-span-7 monochrome-hero-frame p-8 sm:p-12 flex flex-col justify-between h-full space-y-8 text-left bg-black text-white border-4 border-white shadow-[8px_8px_0px_#fff]">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-white text-black font-mono font-black text-xs uppercase">
                  MUHAMMAD ALI &bull; SENIOR DEVELOPER
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.98] uppercase">
                  {config.headlinePrefix} <br />
                  <span className="bg-white text-black px-2 inline-block mt-1">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-300 font-mono leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t-2 border-white">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-8 py-4 bg-white text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2"
                  >
                    <span>[EXPLORE CODE]</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-7 py-4 border-2 border-white text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>[CONNECT AI]</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-7 py-4 border-2 border-white text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                  >
                    <span>[DISPATCH INQUIRY]</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-white">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 border-2 border-white">
                      <div className="text-2xl font-black font-mono text-white">{st.value}</div>
                      <div className="text-[10px] font-mono uppercase text-neutral-400">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Pure White Inversion - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 monochrome-hero-frame p-8 bg-white text-black flex flex-col justify-between h-full border-4 border-white shadow-[8px_8px_0px_#fff]">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black font-mono font-black text-xs">
                <span>PORTRAIT // INVERTED</span>
                <span>STATUS: MASTER</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto mx-auto object-contain filter grayscale contrast-200"
                  loading="eager"
                />
              </div>
              <div className="p-2 bg-black text-white text-center font-mono font-bold text-xs uppercase">
                100% INK EFFICIENCY &bull; 0% COMPROMISE
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 6. Y2K AESTHETIC (Spinning Holographic CD-ROM & Winamp Mini)
  // =========================================================================
  if (config.id === "y2k-aesthetic") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 font-mono">
          <div className="flex items-center justify-between p-3 bg-pink-500/20 backdrop-blur-md border-2 border-pink-400 rounded-2xl text-xs text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <div className="flex items-center gap-2">
              <Disc className="w-4 h-4 text-cyan-300 animate-spin" />
              <span className="font-black tracking-widest">★ WINAMP 2000 // TRACK: MUHAMMAD_ALI.MP3 (320kbps) ★</span>
            </div>
            <span className="text-cyan-300 font-bold hidden sm:inline">STEREO 44.1kHz</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-xl border-2 border-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.35)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/30 border border-pink-400 rounded-full text-xs text-pink-300 font-bold">
                  <span>💿</span>
                  <span>CYBER MILLENNIUM // WEB 1.0 SPEED</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 leading-tight">
                  {config.headlinePrefix} <br />
                  <span className="text-pink-400 drop-shadow-[0_0_20px_#ec4899]">{config.headlineHighlight}</span>
                </h1>
                <p className="text-sm sm:text-base text-pink-100 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_#ec4899] hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>PLAY SHOWCASE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 bg-black/80 text-cyan-300 border border-cyan-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-500/20 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span>TALK TO ALI AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 bg-black/80 text-pink-300 border border-pink-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-pink-500/20 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>PAGE ME</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-pink-500/40">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-pink-950/40 border border-pink-400/50">
                      <div className="text-2xl font-black text-pink-300">{st.value}</div>
                      <div className="text-[10px] text-cyan-300 uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Y2K CD Player & Portrait - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-black/70 backdrop-blur-xl border-2 border-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.35)] flex flex-col justify-between h-full relative">
              <div className="flex items-center justify-between pb-2 border-b border-pink-500/40 text-xs text-pink-300">
                <span>DISC 01: FRONTEND HITS</span>
                <span className="text-cyan-300">RPM: 7200</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center relative">
                {/* Spinning Holographic CD Disc behind portrait */}
                <div className="absolute w-60 h-60 y2k-cd-disc opacity-40 blur-sm pointer-events-none" />
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[420px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(236,72,153,0.6)] relative z-10"
                  loading="eager"
                />
              </div>
              <div className="p-2.5 rounded-xl bg-pink-500/30 border border-pink-400 text-center text-xs text-cyan-300 font-bold">
                ★ 100% CD-QUALITY WEB ARCHITECTURE ★
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 7. SKEUOMORPHISM (Windows 98 Desktop OS Window)
  // =========================================================================
  if (config.id === "skeuomorphism") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 font-sans">
          {/* Win98 Desktop Window */}
          <div className="win98-window-frame p-1 rounded-sm">
            {/* Title Bar */}
            <div className="win98-title-bar px-3 py-1.5 flex items-center justify-between font-bold text-xs select-none">
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span>C:\Program Files\Muhammad_Ali\Portfolio.exe</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="win98-btn w-5 h-5 flex items-center justify-center text-black font-bold">_</button>
                <button className="win98-btn w-5 h-5 flex items-center justify-center text-black font-bold">□</button>
                <button className="win98-btn w-5 h-5 flex items-center justify-center text-black font-bold">✕</button>
              </div>
            </div>

            {/* Menu Ribbon */}
            <div className="px-3 py-1 bg-[#c0c0c0] border-b border-[#808080] flex gap-4 text-xs text-black select-none">
              <span className="underline">F</span>ile
              <span className="underline">E</span>dit
              <span className="underline">V</span>iew
              <span className="underline">P</span>rojects
              <span className="underline">H</span>elp
            </div>

            {/* Window Content Grid */}
            <div className="p-4 sm:p-8 bg-[#dfdfdf] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 p-6 bg-white border-2 border-[#808080] shadow-[inset_2px_2px_4px_#000] flex flex-col justify-between h-full space-y-6 text-left text-black">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold text-blue-900 flex items-center gap-2">
                    <span>⚡ APPLICATION LOADED SUCCESSFULLY</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
                    {config.headlinePrefix} <br />
                    <span className="text-blue-800">{config.headlineHighlight}</span>
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
                    {config.subheadline}
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-neutral-300">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollTo("projects")}
                      className="win98-btn px-6 py-3 font-bold text-xs uppercase tracking-wider shadow text-black flex items-center gap-2"
                    >
                      <span>RUN SHOWCASE.EXE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setJarvisOpen(true)}
                      className="win98-btn px-5 py-3 font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      <span>START AI ASSISTANT</span>
                    </button>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="win98-btn px-5 py-3 font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>CONTACT.HLP</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-200">
                    {profile.stats.map((st, i) => (
                      <div key={i} className="p-2 bg-[#dfdfdf] border border-[#808080]">
                        <div className="text-xl font-black font-mono text-blue-900">{st.value}</div>
                        <div className="text-[10px] font-mono uppercase text-neutral-600">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Box: Photo Viewer Window - MATCHING HEIGHT & PERFECTLY ALIGNED */}
              <div className="lg:col-span-5 p-4 bg-white border-2 border-[#808080] shadow-[inset_2px_2px_4px_#000] flex flex-col justify-between h-full">
                <div className="text-xs font-mono font-bold text-neutral-600 pb-2 border-b border-neutral-300 flex justify-between">
                  <span>PREVIEW: ALI_PHOTO.BMP</span>
                  <span>100% ZOOM</span>
                </div>
                <div className="my-auto py-2 flex items-center justify-center">
                  <img
                    src="/muhammad_ali_hero.png"
                    alt="Muhammad Ali - Frontend Developer"
                    className="max-h-[420px] w-auto object-contain filter drop-shadow-md"
                    loading="eager"
                  />
                </div>
                <div className="p-2 bg-[#c0c0c0] border border-[#808080] text-center text-xs font-mono text-black font-bold">
                  OBJECT STATUS: 0 ERRORS DETECTED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 8. EDITORIAL LUXURY (Haute-Couture Vogue Cover)
  // =========================================================================
  if (config.id === "editorial-luxury") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between p-3 border-y border-amber-500/40 text-xs font-serif tracking-widest uppercase text-amber-700 dark:text-amber-300">
            <span>VOLUME 2026 // ISSUE N° 08 // HAUTE-COUTURE WEB ENGINEERING</span>
            <span>EDITION LUXE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            <div className="lg:col-span-7 editorial-hero-frame p-8 sm:p-14 flex flex-col justify-between h-full space-y-8 text-left bg-[var(--bg-card)]">
              <div className="space-y-4">
                <div className="text-xs font-mono tracking-widest text-amber-600 uppercase">
                  &mdash; PROFILE &amp; MONOGRAPH
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--text-primary)] leading-[1.02]">
                  {config.headlinePrefix} <br />
                  <span className="italic font-light text-amber-600 dark:text-amber-400">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[var(--border-color)]">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-8 py-4 bg-amber-600 text-white font-serif tracking-wider text-xs uppercase hover:bg-black transition-colors flex items-center gap-2"
                  >
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-7 py-4 border border-amber-600 text-amber-600 font-serif tracking-wider text-xs uppercase hover:bg-amber-50 transition-colors flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>CONSULT AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-7 py-4 border border-[var(--border-color)] text-[var(--text-primary)] font-serif tracking-wider text-xs uppercase hover:border-black transition-colors flex items-center gap-2"
                  >
                    <span>PRIVATE INQUIRY</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]/60">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="text-left">
                      <div className="text-2xl sm:text-3xl font-serif text-amber-600 dark:text-amber-400">{st.value}</div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Editorial Portrait Frame - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 editorial-hero-frame p-8 flex flex-col justify-between h-full bg-[var(--bg-card)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] text-xs font-serif text-[var(--text-muted)]">
                <span>COVER PORTRAIT // MUHAMMAD ALI</span>
                <span className="italic">PESHAWAR</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[460px] w-auto mx-auto object-contain filter contrast-105"
                  loading="eager"
                />
              </div>
              <div className="pt-3 border-t border-[var(--border-color)] flex justify-between text-xs font-serif text-amber-600 dark:text-amber-400">
                <span>CREATIVE CRAFTSMANSHIP</span>
                <span>EXCELLENCE IN DESIGN</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 9. VAPORWAVE (Synthwave Moving 3D Grid & Neon Sun)
  // =========================================================================
  if (config.id === "vaporwave") {
    return (
      <section id="home" className="relative pt-8 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="synthwave-grid-floor" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-md border border-pink-500/40 rounded-xl text-xs font-mono text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="font-bold tracking-widest">REC ● [00:24:88] // SP MODE</span>
            </div>
            <span className="text-cyan-400 font-bold tracking-wider">最高フロントエンド // CYBER 2000</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-black/60 backdrop-blur-xl border-2 border-pink-500/50 shadow-[0_0_35px_rgba(236,72,153,0.3)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500 text-xs font-mono text-pink-300">
                  <span>🌴</span>
                  <span>RETROWAVE SYNTH // MUHAMMAD ALI</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 leading-[1.05] tracking-tight">
                  {config.headlinePrefix} <br />
                  <span className="drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] text-pink-400">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-pink-200/90 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_#ec4899] hover:shadow-[0_0_35px_#ec4899] transition-all flex items-center gap-2"
                  >
                    <span>ENTER THE GRID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 bg-black/80 text-cyan-300 border border-cyan-400 font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-500/20 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span>TALK TO ALI AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 bg-black/80 text-pink-300 border border-pink-400 font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-pink-500/20 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>INITIATE COMMS</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-pink-500/40">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 rounded-lg bg-pink-950/30 border border-pink-500/40">
                      <div className="text-2xl font-black font-mono text-pink-300">{st.value}</div>
                      <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Neon Sun & Portrait - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-6 rounded-2xl border-2 border-pink-500/60 bg-black/50 backdrop-blur-md shadow-[0_0_35px_rgba(236,72,153,0.4)] flex flex-col justify-between h-full relative">
              <div className="flex items-center justify-between pb-2 border-b border-pink-500/40 text-[11px] font-mono text-cyan-300">
                <span>MUHAMMAD ALI &bull; CYBER SURFER</span>
                <span className="px-2 py-0.5 bg-pink-500 text-white text-[9px] font-black rounded">★ 1984 ★</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center relative">
                <div className="absolute w-64 h-64 rounded-full bg-gradient-to-t from-pink-500 via-orange-400 to-yellow-300 synthwave-neon-sun blur-xl opacity-80 pointer-events-none -z-10" />
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(236,72,153,0.6)]"
                  loading="eager"
                />
              </div>
              <div className="w-full text-center font-mono text-[11px] text-pink-300 border-t border-pink-500/40 pt-2">
                AESTHETIC VIBES &bull; 60FPS SYNTHWAVE EXPERIENCE
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 10. CYBERPUNK (Tactical HUD & Jumping EQ Bars)
  // =========================================================================
  if (config.id === "cyberpunk") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between px-4 py-2 bg-black/90 border border-yellow-400/70 text-xs font-mono text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-yellow-400 animate-ping inline-block" />
              <span className="font-bold tracking-widest">// NETRUNNER OS v4.2 // SECURITY CLEARANCE: LEVEL 5</span>
            </div>
            <div className="flex items-end gap-1 h-5">
              <span className="w-1 bg-yellow-400 eq-bar-1" />
              <span className="w-1 bg-yellow-400 eq-bar-2" />
              <span className="w-1 bg-yellow-400 eq-bar-3" />
              <span className="w-1 bg-yellow-400 eq-bar-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-10 bg-black/85 border border-[var(--accent-primary)] rounded-lg shadow-[0_0_30px_var(--accent-primary)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent-primary)]">
                  <span className="px-2 py-0.5 bg-[var(--accent-primary)] text-black font-bold">OPERATOR</span>
                  <span>MUHAMMAD ALI // SENIOR CREATOR</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight uppercase">
                  {config.headlinePrefix} <br />
                  <span className="text-[var(--accent-primary)] drop-shadow-[0_0_20px_var(--accent-primary)]">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 bg-[var(--accent-primary)] text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_20px_var(--accent-primary)] hover:bg-white transition-all flex items-center gap-2"
                  >
                    <span>ENGAGE PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 bg-black text-[var(--accent-primary)] border border-[var(--accent-primary)] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-primary)]/20 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>AI SYNAPSE</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 bg-black text-white border border-white/40 font-mono font-bold text-xs uppercase tracking-wider hover:border-white transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>COMM CHANNEL</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--accent-primary)]/30">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-black/90 border border-[var(--accent-primary)]/60">
                      <div className="text-2xl font-black font-mono text-[var(--accent-primary)]">{st.value}</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Radar Targeting Frame - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-6 bg-black/90 border-2 border-[var(--accent-primary)] rounded shadow-[0_0_35px_var(--accent-primary)] flex flex-col justify-between h-full relative">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--accent-primary)]/40 text-[10px] font-mono text-[var(--accent-primary)]">
                <span>LAT: 34.01°N &bull; LNG: 71.52°E</span>
                <span className="font-bold text-yellow-400">[TARGET ACQUIRED]</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center relative">
                <div className="absolute w-[340px] h-[340px] cyber-radar-ring pointer-events-none opacity-50" />
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] w-auto mx-auto object-contain filter drop-shadow-[0_0_30px_var(--accent-primary)] relative z-10"
                  loading="eager"
                />
              </div>
              <div className="p-1.5 bg-black border border-[var(--accent-primary)] text-center font-mono text-[10px] text-[var(--accent-primary)]">
                OVERCLOCK: 100% &bull; SHIELD: ACTIVE &bull; THREAT: NONE
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 11. INDUSTRIAL TECHNICAL / CAD BLUEPRINT (Technical Drafting Blueprint)
  // =========================================================================
  if (config.id === "industrial-technical") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden cad-blueprint-grid">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 font-mono">
          <div className="p-3 bg-cyan-950/80 border-2 border-cyan-400 text-xs text-cyan-300 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-cyan-400 inline-block animate-ping" />
              <span>DWG NO: ALI-2026-ARCH // SPEC: ULTRA-PERFORMANCE UI</span>
            </div>
            <span>SCALE: 1:1 // UNIT: PIXELS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-10 bg-cyan-950/60 border-2 border-dashed border-cyan-400/80 flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                  [PROJECT MANIFEST: MUHAMMAD ALI]
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-cyan-100 leading-tight tracking-tight uppercase">
                  {config.headlinePrefix} <br />
                  <span className="text-cyan-400 underline decoration-cyan-400 underline-offset-8">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-cyan-200/90 font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:bg-white transition-all flex items-center gap-2"
                  >
                    <span>EXECUTE BLUEPRINT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold text-xs uppercase tracking-wider hover:bg-cyan-900 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>CONSULT AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 bg-cyan-950 text-cyan-300 border border-cyan-400/60 font-bold text-xs uppercase tracking-wider hover:border-cyan-400 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ORDER SPEC</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cyan-400/50">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-cyan-950/80 border border-cyan-400">
                      <div className="text-2xl font-black text-cyan-300">{st.value}</div>
                      <div className="text-[10px] text-cyan-400/80 uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: CAD Drawing Sheet - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-5 border-2 border-dashed border-cyan-400 bg-cyan-950/50 rounded flex flex-col justify-between h-full text-cyan-300">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-400/40 text-[10px]">
                <span>↔ 480mm HEADROOM</span>
                <span>TOLERANCE ±0.01</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] w-auto mx-auto object-contain filter drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  loading="eager"
                />
              </div>
              <div className="w-full pt-2 border-t border-cyan-400/60 flex justify-between text-[10px]">
                <span>ENGINEER: MUHAMMAD ALI</span>
                <span>STATUS: APPROVED</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 12. RETRO PIXEL (8-Bit Arcade Cabinet)
  // =========================================================================
  if (config.id === "retro-pixel") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 font-mono">
          <div className="p-3 bg-[var(--bg-card)] border-4 border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[var(--accent-primary)] shadow-lg">
            <div className="flex items-center gap-3">
              <span className="arcade-blink text-amber-400">★ INSERT COIN ★</span>
              <span>CREDIT(S): 99</span>
            </div>
            <div className="flex items-center gap-2">
              <span>HP:</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
              <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
              <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
              <span className="ml-3 arcade-blink text-emerald-400">1P READY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 style-card p-6 sm:p-10 border-4 border-[var(--border-color)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-primary)] uppercase">
                  <span>[CHARACTER SELECT: MUHAMMAD ALI]</span>
                  <span className="text-amber-400">LVL 99 FRONTEND MAGE</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tight uppercase">
                  {config.headlinePrefix} <br />
                  <span className="text-[var(--accent-primary)] drop-shadow-[0_4px_0px_rgba(0,0,0,0.8)]">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 style-btn-primary font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <span>▶ START QUEST (PROJECTS)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 style-btn-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>💬 TALK TO NPC (AI)</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 style-btn-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>GUILD INVITE</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-[var(--border-color)]">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-color)]">
                      <div className="text-2xl font-black text-[var(--accent-primary)]">{st.value}</div>
                      <div className="text-[10px] text-[var(--text-secondary)] uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Arcade Stage Screen - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 style-card p-6 border-4 border-[var(--border-color)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-color)] text-[11px] font-bold text-[var(--accent-primary)]">
                <span>STAGE 01: PESHAWAR</span>
                <span>TIME: ∞</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center relative overflow-hidden bg-black/40 rounded border-2 border-[var(--border-color)]">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[420px] sm:max-h-[460px] w-auto object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)]"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded">
                  PLAYER 1
                </div>
              </div>
              <div className="text-center bg-[var(--badge-bg)] p-2 rounded border border-[var(--border-color)] text-xs font-bold text-[var(--text-secondary)] uppercase">
                ⚔️ 15+ QUESTS CLEARED &bull; MASTER CRAFTSMAN
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 13. CLAYMORPHISM (Bouncy 3D Pastel Worlds)
  // =========================================================================
  if (config.id === "claymorphism") {
    return (
      <section id="home" className="relative pt-8 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--badge-bg)] border-2 border-[var(--border-color)] text-xs font-mono font-bold text-[var(--accent-primary)] shadow-[6px_6px_14px_rgba(0,0,0,0.06)]">
                  <span>👋</span>
                  <span>{config.badgeText}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-[var(--accent-primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
                  <span>{profile.name} — {profile.role}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[var(--text-primary)]">
                  {config.headlinePrefix} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-amber-500">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-7 py-4 rounded-3xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-xs font-mono tracking-wider shadow-[0_14px_28px_rgba(124,58,237,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>EXPLORE MY WORK</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-6 py-4 rounded-3xl bg-[var(--bg-card)] text-[var(--accent-primary)] border-2 border-[var(--border-color)] font-bold text-xs font-mono tracking-wider shadow-[8px_8px_16px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>MEET ALI AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-4 rounded-3xl bg-[var(--bg-card)] text-[var(--text-primary)] border-2 border-[var(--border-color)] font-bold text-xs font-mono tracking-wider shadow-[8px_8px_16px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>LET&apos;S TALK</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t-2 border-[var(--border-color)]/60">
                  {profile.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] shadow-[8px_8px_18px_rgba(0,0,0,0.06),inset_2px_2px_4px_rgba(255,255,255,0.8)]"
                    >
                      <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-primary)]">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--text-secondary)] font-bold uppercase mt-1">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Clay Pedestal - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 clay-hero-pedestal p-6 sm:p-8 flex flex-col justify-between h-full relative select-none">
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 shadow-[8px_8px_20px_rgba(236,72,153,0.3)] clay-orb-1 z-20 flex items-center justify-center text-lg">
                ✨
              </div>
              <div className="absolute top-1/2 -right-6 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-[8px_8px_20px_rgba(6,182,212,0.3)] clay-orb-2 z-20 flex items-center justify-center text-lg">
                🚀
              </div>
              <div className="absolute -bottom-4 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 shadow-[8px_8px_20px_rgba(245,158,11,0.3)] clay-orb-3 z-20 flex items-center justify-center text-lg">
                💡
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-primary)] pb-2 border-b border-[var(--border-color)]">
                <span>🧁 3D TACTILE PEDESTAL</span>
                <span className="text-emerald-500 font-bold">ONLINE</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[460px] sm:max-h-[500px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  loading="eager"
                />
              </div>
              <div className="w-full pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-primary)]">
                <span>📍 PESHAWAR, PAKISTAN</span>
                <span className="text-emerald-500">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 14. NEUMORPHISM (Soft Concave Debossed Precision)
  // =========================================================================
  if (config.id === "neumorphism") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Soft Embossed Card */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-[36px] bg-[var(--bg-card)] shadow-[16px_16px_32px_rgba(0,0,0,0.08),-16px_-16px_32px_rgba(255,255,255,0.85)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--bg-card)] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] text-xs font-mono font-bold text-[var(--accent-primary)]">
                  {config.badgeText}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
                  {config.headlinePrefix} <br />
                  <span className="text-[var(--accent-primary)]">{config.headlineHighlight}</span>
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-7 py-3.5 rounded-2xl bg-[var(--bg-card)] shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] font-mono font-bold text-xs text-[var(--accent-primary)] tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>EXPLORE PROJECTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-6 py-3.5 rounded-2xl bg-[var(--bg-card)] shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] font-mono font-bold text-xs text-[var(--text-primary)] tracking-wider transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>TALK TO AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-3.5 rounded-2xl bg-[var(--bg-card)] shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] font-mono font-bold text-xs text-[var(--text-primary)] tracking-wider transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CONTACT</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border-color)]">
                  {profile.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[var(--bg-card)] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.06),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]"
                    >
                      <div className="text-2xl font-black font-mono text-[var(--accent-primary)]">{st.value}</div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Debossed Frame - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-8 rounded-[36px] bg-[var(--bg-card)] shadow-[16px_16px_32px_rgba(0,0,0,0.08),-16px_-16px_32px_rgba(255,255,255,0.85)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-primary)] pb-2 border-b border-[var(--border-color)]">
                <span>⚪ SOFT EMBOSS</span>
                <span>DEBOSSED PRECISION</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto mx-auto object-contain filter drop-shadow-md"
                  loading="eager"
                />
              </div>
              <div className="p-2 rounded-full bg-[var(--bg-card)] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] text-center text-xs font-mono text-[var(--accent-primary)] font-bold">
                PHYSICAL EXTRUSION &bull; CALM SHADOWS
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 15. BENTO GRID (Multi-Widget Command Center)
  // =========================================================================
  if (config.id === "bento-grid") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">{config.badgeText}</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{timeStr || "03:30:00 PM"} PKT</span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-emerald-500">
                <Battery className="w-3.5 h-3.5" />
                <span>100% ONLINE</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 style-card p-6 sm:p-10 flex flex-col justify-between h-full text-left space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--accent-primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                  <span>{profile.name} — {profile.role}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[var(--text-primary)]">
                  {config.headlinePrefix} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]">
                    {config.headlineHighlight}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--border-color)]/50">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3.5 style-btn-primary font-bold text-xs font-mono tracking-wider shadow-lg flex items-center gap-2"
                  >
                    <span>EXPLORE PROJECTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-5 py-3.5 style-btn-secondary font-bold text-xs font-mono tracking-wider flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>TALK TO AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-5 py-3.5 style-btn-secondary font-bold text-xs font-mono tracking-wider flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>CONTACT ME</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Spotlight Card - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 style-card p-6 flex flex-col justify-between h-full relative overflow-hidden text-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--accent-primary)] pb-2 border-b border-[var(--border-color)]/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VERIFIED FRONTEND CREATOR</span>
                </span>
                <span>🇵🇰 PESHAWAR</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[380px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
              <div className="w-full pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>Core: WordPress &amp; React</span>
                <span className="text-[var(--accent-primary)] font-bold">2+ Yrs Experience</span>
              </div>
            </div>

            {profile.stats.map((st, i) => (
              <div key={i} className="lg:col-span-3 style-card p-5 text-left flex flex-col justify-between">
                <div className="text-3xl font-black font-mono text-[var(--accent-primary)]">
                  {st.value}
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 16. ORGANIC BIOPHILIC (Natural Curved Leaf Symmetry)
  // =========================================================================
  if (config.id === "organic-biophilic") {
    return (
      <section id="home" className="relative pt-6 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-[40px_16px_40px_16px] bg-[var(--bg-card)] border-2 border-emerald-500/30 shadow-[0_15px_35px_rgba(16,185,129,0.15)] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400 text-xs font-mono text-emerald-300 font-bold">
                  <span>🌿</span>
                  <span>SUSTAINABLE &bull; ZERO-CARBON WEB CRAFTSMANSHIP</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
                  {config.headlinePrefix} <br />
                  <span className="text-emerald-500">{config.headlineHighlight}</span>
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
                  {config.subheadline}
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-emerald-500/30">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-7 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition-all flex items-center gap-2"
                  >
                    <span>EXPLORE NATURAL UI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setJarvisOpen(true)}
                    className="px-6 py-3.5 rounded-full bg-[var(--bg-card)] border border-emerald-500/50 text-emerald-400 font-bold text-xs uppercase tracking-wider hover:bg-emerald-950/50 transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>CONSULT AI</span>
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-3.5 rounded-full border border-emerald-500/30 text-[var(--text-primary)] font-bold text-xs uppercase tracking-wider hover:border-emerald-500 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CONNECT</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-500/30">
                  {profile.stats.map((st, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-2xl font-black font-mono text-emerald-400">{st.value}</div>
                      <div className="text-[10px] font-mono text-emerald-300/80 uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Biophilic Leaf Frame - MATCHING HEIGHT & PERFECTLY ALIGNED */}
            <div className="lg:col-span-5 p-8 rounded-[16px_40px_16px_40px] bg-[var(--bg-card)] border-2 border-emerald-500/30 shadow-[0_15px_35px_rgba(16,185,129,0.15)] flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pb-2 border-b border-emerald-500/30">
                <span>BIOPHILIC HARMONY</span>
                <span>PESHAWAR &bull; PK</span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[440px] sm:max-h-[480px] w-auto mx-auto object-contain filter drop-shadow-[0_15px_25px_rgba(16,185,129,0.25)]"
                  loading="eager"
                />
              </div>
              <div className="p-2 rounded-full bg-emerald-950/80 border border-emerald-400 text-center text-xs font-mono text-emerald-300 font-bold">
                ORGANIC SYMMETRY &bull; LIVING CODE
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 17. STANDARD / LIQUID GLASS / AURORA / PRISMATIC HERO (Default for remaining)
  // =========================================================================
  return (
    <section id="home" className="relative pt-6 pb-20 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="ambient-glow top-1/4 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column Box */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 text-left">
            <div className="space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-[11px] sm:text-xs font-mono text-[var(--accent-primary)] shadow-sm max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold tracking-wider uppercase">
                  {config.badgeText}
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-xs sm:text-sm font-mono text-[var(--accent-primary)] font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] inline-block" />
                  <span>{profile.name} — {profile.role}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[var(--text-primary)]">
                  {config.headlinePrefix} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]">
                    {config.headlineHighlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl font-sans leading-relaxed">
                  {config.subheadline}
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-6 py-3.5 style-btn-primary font-bold text-xs sm:text-sm font-mono tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setJarvisOpen(true)}
                  className="px-5 py-3.5 style-btn-secondary font-bold text-xs sm:text-sm font-mono tracking-wider flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>TALK TO AI</span>
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="px-5 py-3.5 style-btn-secondary font-bold text-xs sm:text-sm font-mono tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>CONTACT ME</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
                <a
                  href={profile.cvUrl}
                  download="Muhammad_Ali_CV.pdf"
                  className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
                <span>•</span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1.5"
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border-color)]/60">
                {profile.stats.map((st, i) => (
                  <div key={i} className="style-card p-3 sm:p-3.5 text-left min-w-0">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-primary)]">
                      {st.value}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Box - MATCHING HEIGHT & PERFECTLY ALIGNED */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full relative select-none">
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/25 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="liquid-prism-glow relative group p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-xs font-mono text-white/80 pb-2 border-b border-white/10">
                <span>PRISMATIC REFRACTION</span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FLUID ENGINE</span>
                </span>
              </div>
              <div className="my-auto py-2 flex items-center justify-center">
                <img
                  src="/muhammad_ali_hero.png"
                  alt="Muhammad Ali - Frontend Developer"
                  className="max-h-[460px] sm:max-h-[500px] w-auto mx-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-center text-xs font-sans font-medium text-white shadow-lg flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Refractive Precision &amp; Fluid Interfaces</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Stack Pill Ribbon */}
        <div className="pt-6 border-t border-[var(--border-color)]/50 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-primary)] font-bold tracking-wider uppercase">CORE STACK:</span>
          {["WordPress", "Elementor Pro", "WooCommerce", "HTML5 & CSS3", "JavaScript", "Tailwind CSS", "React 19", "Next.js 15", "Three.js / WebGL", "Fastify & Sockets"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
