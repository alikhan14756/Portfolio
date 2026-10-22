"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { Cpu, Flame, Layers, Award } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { skills, learningRoadmap } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Skills & Core Competencies
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            Hardened skills developed across 2+ years of production WordPress, Elementor Pro, and custom frontend web engineering.
          </p>
        </div>

        {/* Primary Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {skills.map((skill) => (
            <div key={skill.name} className="hud-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
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
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-700 shadow-[var(--hud-glow)]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Currently Expanding / Learning Roadmap */}
        <div className="hud-panel p-6 sm:p-8 rounded-2xl space-y-6 text-left">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--border-color)] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[var(--badge-bg)] text-[var(--accent-primary)]">
                <Flame className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--text-primary)] font-mono">
                  ACTIVE EXPANSION STACK
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Advanced frontend & WebGL capabilities in active daily production
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ● REAL-TIME DEPLOYED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {learningRoadmap.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] space-y-2 text-center"
              >
                <div className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  {item.name}
                </div>
                <div className="text-sm font-black font-mono text-[var(--accent-primary)]">
                  {item.progress}%
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-card)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-primary)] rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
