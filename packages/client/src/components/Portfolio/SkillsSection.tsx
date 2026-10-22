"use client";

import React from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { Cpu, Flame, Layers, Award } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { skills, learningRoadmap } = PORTFOLIO_DATA;
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const isMotionEnabled = animationIntensity !== "off";

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
            <span>TECHNICAL PROFICIENCY &amp; SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Skills &amp; Core Competencies
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
            Hardened skills developed across 2+ years of production WordPress, Elementor Pro, and custom frontend web engineering.
          </p>
        </motion.div>

        {/* Primary Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="hud-panel p-5 rounded-2xl space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] font-mono">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--accent-secondary)] uppercase">
                    {skill.category}
                  </span>
                </div>
                <span className="text-lg font-black font-mono text-[var(--accent-primary)]">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]/60">
                <motion.div
                  initial={isMotionEnabled ? { width: 0 } : { width: `${skill.level}%` }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[var(--hud-glow)]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Expanding / Learning Roadmap */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 24 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hud-panel p-6 sm:p-8 rounded-3xl space-y-6 text-left shadow-xl"
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
