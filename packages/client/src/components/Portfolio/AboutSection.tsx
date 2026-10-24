"use client";

import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { getThemeArchetype } from "../../utils/themeArchetypes";
import {
  User,
  GraduationCap,
  Globe2,
  Download,
  MapPin,
  Terminal,
  Sparkles,
  Star,
  BookOpen,
  Award,
  HeartPulse,
  Activity
} from "lucide-react";

export const AboutSection: React.FC = () => {
  const { profile, education, languages, contentBrand } = PORTFOLIO_DATA;
  const styleId = usePortfolioStore((s) => s.styleId);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const config = getThemeArchetype(styleId);
  const isMotionEnabled = animationIntensity !== "off";

  const getAboutBadge = () => {
    switch (config.id) {
      case "claymorphism":
        return "🧁 OPERATOR PROFILE // ABOUT ALI";
      case "neobrutalism":
        return "★ BIOGRAPHY // NO FLUFF RAW STATS ★";
      case "cyberpunk":
        return "OPERATOR_DOSSIER://SYS_IDENTITY_01";
      case "retro-pixel":
        return "🎮 CHARACTER BACKSTORY & QUEST LOG";
      case "bento-grid":
        return "MODULAR PROFILE & PROFESSIONAL STORY";
      case "glassmorphism":
        return "✦ LUMINOUS CREATOR BIOGRAPHY";
      case "vaporwave":
        return "🌴 AESTHETIC CREATOR VIBE // 1994 🌴";
      default:
        return "OPERATOR PROFILE // BIOGRAPHY";
    }
  };

  const renderAvatarFrame = () => {
    switch (config.id) {
      case "claymorphism":
        return "w-16 h-16 rounded-3xl bg-[var(--bg-secondary)] shadow-[4px_6px_14px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.7)] p-1 overflow-hidden shrink-0";
      case "neobrutalism":
        return "w-16 h-16 bg-[#facc15] border-4 border-black shadow-[4px_4px_0px_#000] p-0.5 overflow-hidden -rotate-2 shrink-0";
      case "cyberpunk":
        return "w-16 h-16 bg-black border-2 border-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-primary)] rounded p-1 overflow-hidden shrink-0";
      case "retro-pixel":
        return "w-16 h-16 bg-zinc-900 border-4 border-[var(--border-color)] p-1 overflow-hidden shrink-0";
      case "glassmorphism":
        return "w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-lg p-1 overflow-hidden shrink-0";
      default:
        return "w-16 h-16 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center relative shadow-md shrink-0";
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-left space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] shadow-sm">
            <User className="w-3.5 h-3.5" />
            <span>{getAboutBadge()}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Meet Muhammad Ali
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-sans leading-relaxed">
            Frontend developer and digital creator based in Peshawar, Pakistan. Dedicated to crafting high-converting, responsive websites that combine aesthetic refinement with measurable business performance.
          </p>
        </motion.div>

        {/* Balanced, Perfectly Aligned 2-Tier Grid System */}
        <div className="space-y-6">

          {/* Row 1: Profile Narrative & Academic Background (Matching Heights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Bio Card (Span 7) */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 style-card p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 h-full"
            >
              <div>
                <div className="flex items-center gap-4 pb-5 border-b border-[var(--border-color)]/60">
                  <div className={renderAvatarFrame()}>
                    <img
                      src="/muhammad_ali_hero.png"
                      alt="Muhammad Ali"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono text-[var(--text-primary)]">
                      Muhammad Ali
                    </h3>
                    <p className="text-xs font-mono text-[var(--accent-primary)] mt-0.5">
                      {profile.role}
                    </p>
                    <p className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                      <span>Peshawar, Khyber Pakhtunkhwa, Pakistan 🇵🇰</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans pt-5">
                  <p>
                    I am a dedicated frontend developer based in Peshawar with 2+ years of hands-on experience building modern, fast, and high-converting websites. Specializing in WordPress, Elementor Pro, responsive UI/UX, and modern web architectures, I build digital experiences that deliver real business growth.
                  </p>
                  <p>
                    Currently studying <strong className="text-[var(--text-primary)] font-semibold">Bachelor of Science in Nursing (BSN)</strong>, my academic foundation is in medical science and healthcare, while coding and software engineering is my passionate craft and creative hobby. This dual discipline provides a rare advantage: I bring hospital-grade precision, patient-centered empathy, and rigorous attention to detail into engineering high-performance web applications.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--border-color)]/50">
                <a
                  href={profile.cvUrl}
                  download="Muhammad_Ali_CV.pdf"
                  className="px-5 py-2.5 style-btn-primary font-mono text-xs font-bold active:scale-95 transition-all flex items-center gap-2 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD VERIFIED CV</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 style-btn-secondary font-mono text-xs font-bold active:scale-95 transition-all flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>GITHUB REPOSITORIES</span>
                </a>
              </div>
            </motion.div>

            {/* Right: Academic Background Card (Span 5) */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-5 style-card p-6 sm:p-7 flex flex-col justify-between text-left space-y-4 h-full"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]/60">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)]">
                    <GraduationCap className="w-4 h-4" />
                    <span>ACADEMIC BACKGROUND</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-4 pt-3">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          {edu.degree}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                          {edu.status}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] font-sans">
                        {edu.institution}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between pt-1">
                        <span>📍 {edu.location}</span>
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-mono text-[var(--text-muted)] pt-3 border-t border-[var(--border-color)]/50 flex items-center justify-between">
                <span>Formal Education Tracks</span>
                <span className="text-[var(--accent-primary)] font-bold">BSN &amp; DIT (In Progress)</span>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Dual Discipline Progress & Global Communication Languages */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Dual Discipline & Medical Progress Card (Span 7) */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-7 style-card p-6 flex flex-col justify-between gap-4 text-left h-full"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)]">
                    <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                    <span>DUAL DISCIPLINE // HEALTHCARE &amp; WEB CRAFT</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
                    BS NURSING PROGRESS
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-mono text-[var(--text-primary)]">
                  Medical Science Background × Web Engineering Passion
                </h4>

                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  I am actively pursuing a <strong className="text-[var(--text-primary)] font-semibold">Bachelor of Science in Nursing (BSN)</strong> in Peshawar. Studying healthcare has ingrained in me clinical patience, deep empathy, and zero tolerance for error. While medical science is my academic field, <strong className="text-[var(--text-primary)] font-semibold">coding and web development is my dedicated craft &amp; specialized hobby</strong> where I bring hospital-grade precision to building high-converting client websites.
                </p>

                {/* 3 Discipline Strengths */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 text-left space-y-1">
                    <div className="text-[11px] font-mono font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>🩺</span>
                      <span>Clinical Care</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-sans">
                      Patient empathy &amp; extreme attention to detail
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 text-left space-y-1">
                    <div className="text-[11px] font-mono font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>Web Craft</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-sans">
                      WordPress, Elementor Pro &amp; modern React
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 text-left space-y-1">
                    <div className="text-[11px] font-mono font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>🎯</span>
                      <span>Precision</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-sans">
                      Sub-2.5s speed &amp; high-converting UX
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)]/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5 text-[var(--accent-primary)] font-semibold">
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  <span>Status: Active BSN Undergraduate · Peshawar, KPK</span>
                </span>
                <span className="text-[var(--text-secondary)] font-medium">Delivering Commercial Projects Worldwide</span>
              </div>
            </motion.div>

            {/* Right: Languages Card (Span 5) */}
            <motion.div
              initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="lg:col-span-5 style-card p-6 flex flex-col justify-between text-left h-full"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]/60">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)]">
                  <Globe2 className="w-4 h-4" />
                  <span>COMMUNICATION LANGUAGES</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">3 FLUENT</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 text-center space-y-1"
                  >
                    <div className="text-sm font-bold font-mono text-[var(--text-primary)]">
                      {lang.language}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--accent-primary)] font-semibold">
                      {lang.proficiency}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
