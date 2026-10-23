"use client";

import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { getThemeArchetype } from "../../utils/themeArchetypes";
import { Cpu, Flame, Layers, Award, Terminal, Heart, Zap, Sparkles } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { skills, learningRoadmap } = PORTFOLIO_DATA;
  const styleId = usePortfolioStore((s) => s.styleId);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const config = getThemeArchetype(styleId);
  const isMotionEnabled = animationIntensity !== "off";

  // Render Skills UI depending on the theme archetype
  const renderSkillsGrid = () => {
    switch (config.skillsStyle) {
      // 1. Tactile 3D Clay Pills
      case "clay-pills":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={isMotionEnabled ? { opacity: 0, y: 15 } : false}
                whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[8px_12px_24px_rgba(0,0,0,0.08),inset_2px_2px_6px_rgba(255,255,255,0.7),inset_-2px_-2px_6px_rgba(0,0,0,0.04)] space-y-4 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-[var(--badge-bg)] text-lg flex items-center justify-center shadow-inner">
                      🧁
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--text-primary)] font-mono">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--accent-secondary)] uppercase">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono font-black text-[var(--accent-primary)] shadow-sm">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-3.5 rounded-full bg-[var(--bg-secondary)] p-0.5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]">
                  <motion.div
                    initial={isMotionEnabled ? { width: 0 } : { width: `${skill.level}%` }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-sm"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        );

      // 2. Neumorphic Debossed Concave
      case "neumorphic-concave":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-6 rounded-[24px] bg-[var(--bg-card)] shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)] font-mono">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] text-xs font-mono font-bold text-[var(--accent-primary)]">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-3 rounded-full shadow-[inset_3px_3px_6px_rgba(0,0,0,0.12),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] p-0.5">
                  <div
                    className="h-full rounded-full bg-[var(--accent-primary)] shadow-sm"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      // 3. Neobrutalist High-Contrast Blocks
      case "brutalist-blocks":
      case "swiss-grid":
      case "raw-monochrome":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-5 bg-[var(--bg-card)] border-4 border-black shadow-[6px_6px_0px_#000] space-y-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#000] transition-all"
              >
                <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                  <div>
                    <h3 className="font-black text-sm text-[var(--text-primary)] font-mono uppercase tracking-tight">
                      {skill.name}
                    </h3>
                    <span className="inline-block px-1.5 py-0.5 bg-[#fef08a] text-black text-[9px] font-mono font-bold uppercase mt-1 border border-black">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xl font-black font-mono text-black bg-[var(--accent-primary)] px-2 py-0.5 border-2 border-black">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-5 bg-white border-2 border-black p-0.5">
                  <div
                    className="h-full brutalist-hazard-fill border border-black"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      // 4. Cyberpunk & Telemetry Matrix
      case "cyber-matrix":
      case "cad-blueprint":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-4 bg-black/70 border border-[var(--accent-primary)]/50 rounded shadow-[0_0_15px_rgba(6,182,212,0.15)] space-y-2.5 font-mono"
              >
                <div className="flex items-center justify-between text-xs text-[var(--accent-primary)] border-b border-[var(--accent-primary)]/30 pb-1.5">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    ADDR_0x{((idx + 1) * 16).toString(16).toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[var(--text-secondary)]">
                  <span>CATEGORY: {skill.category}</span>
                  <span className="text-[var(--accent-primary)] font-bold">{skill.level}% [NOMINAL]</span>
                </div>

                <div className="w-full bg-slate-900 border border-slate-700 h-3 flex gap-0.5 p-0.5">
                  {Array.from({ length: 20 }).map((_, barIdx) => {
                    const filled = barIdx / 20 < skill.level / 100;
                    return (
                      <div
                        key={barIdx}
                        className={`flex-1 h-full ${
                          filled
                            ? "bg-[var(--accent-primary)] shadow-[0_0_5px_var(--accent-primary)]"
                            : "bg-slate-800"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );

      // 5. Terminal ASCII / Phosphor CRT / Amber CRT
      case "terminal-ascii":
      case "amber-crt":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left font-mono">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-4 bg-black border border-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-primary)] rounded space-y-2"
              >
                <div className="text-xs text-[var(--accent-primary)] font-bold flex justify-between">
                  <span>+-- [{skill.name}]</span>
                  <span>[{skill.level}%]</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">
                  STATUS: OK // PKG_ID: {idx + 101}
                </div>
                <div className="text-xs text-[var(--accent-primary)] tracking-widest">
                  [{Array.from({ length: 12 }).map((_, i) => (i < Math.floor((skill.level / 100) * 12) ? "■" : "·")).join("")}]
                </div>
              </div>
            ))}
          </div>
        );

      // 6. Retro Pixel 8-Bit Character RPG Stats
      case "retro-xp":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left font-mono">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-5 bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)] uppercase">
                      ⚔️ {skill.name}
                    </h3>
                    <span className="text-[9px] text-[var(--accent-primary)]">
                      RANK: S-TIER • {skill.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--badge-bg)] text-xs font-bold text-[var(--accent-primary)] border border-[var(--border-color)]">
                    LVL {skill.level}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                    <span>EXP GAUGE</span>
                    <span>{skill.level} / 100 PTS</span>
                  </div>
                  <div className="w-full h-4 bg-black border-2 border-[var(--border-color)] p-0.5 flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, bi) => (
                      <div
                        key={bi}
                        className={`flex-1 h-full ${
                          bi < Math.floor(skill.level / 10)
                            ? "bg-[var(--accent-primary)]"
                            : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      // 7. Bento Grid Modular Spotlight Tiles
      case "bento-tiles":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 text-left">
            {skills.map((skill, idx) => {
              const isFeatured = idx === 0 || idx === 1;
              const colSpan = isFeatured ? "lg:col-span-6" : "lg:col-span-4";

              return (
                <div
                  key={skill.name}
                  className={`${colSpan} style-card p-6 flex flex-col justify-between space-y-4`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-1 rounded-full bg-[var(--badge-bg)] text-[10px] font-mono text-[var(--accent-secondary)] uppercase">
                        {skill.category}
                      </span>
                      <h3 className="font-bold text-base text-[var(--text-primary)] font-mono mt-2">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center font-mono font-black text-xs text-[var(--accent-primary)] shadow-sm">
                      {skill.level}%
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent-primary)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );

      // 8. Frosted Glass / Liquid Glass / Aurora / Holographic
      case "glass-radar":
      case "liquid-prism":
      case "aurora-wave":
      case "holographic-foil":
      case "gradient-blobs":
      case "tilt-3d":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl space-y-4 hover:border-white/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white font-sans">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-cyan-300 font-mono uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-base font-bold font-mono text-cyan-300">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      // 9. Vaporwave & Y2K Glowing Sunset Bars
      case "vaporwave-neon":
      case "y2k-chrome":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-5 bg-black/60 border border-pink-500/50 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.25)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-pink-300 font-mono tracking-wider">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-2.5 rounded bg-purple-950/80 p-0.5 border border-pink-500/40">
                  <div
                    className="h-full rounded bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_12px_#ec4899]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      // 10. Organic Biophilic Leaves
      case "organic-leaves":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-6 rounded-[28px_8px_28px_8px] bg-[var(--bg-card)] border border-emerald-500/30 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">
                      🌿 {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      // 11. Editorial Minimalist Index Table
      default:
        return (
          <div className="divide-y divide-[var(--border-color)]/70 border-y border-[var(--border-color)] text-left">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-secondary)]/40 px-3 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] w-8">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:w-1/2">
                  <div className="w-full h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--text-primary)] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--text-primary)] w-10 text-right">
                    {skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>{config.skillsHeaderTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Skills &amp; Technical Capabilities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
            {config.skillsHeaderSubtitle}
          </p>
        </motion.div>

        {/* Dynamic Theme-Specific Skills Grid */}
        {renderSkillsGrid()}

        {/* Currently Expanding / Learning Roadmap */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 24 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="style-card p-6 sm:p-8 space-y-6 text-left"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--border-color)]/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--badge-bg)] text-[var(--accent-primary)]">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--text-primary)] font-mono">
                  ACTIVE RESEARCH &amp; STACK EXPANSION
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  Technologies actively being mastered for advanced client requirements
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
              2026 ROADMAP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {learningRoadmap.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--text-primary)]">{item.name}</span>
                  <span className="text-[var(--accent-primary)]">{item.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-primary)]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
