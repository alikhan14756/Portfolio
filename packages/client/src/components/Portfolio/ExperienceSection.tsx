"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { Milestone, Calendar, CheckCircle } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Milestone className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            My Journey & Milestones
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            From learning vanilla web standards from scratch to delivering robust client platforms and building high-performance systems.
          </p>
        </div>

        {/* Timeline Nodes */}
        <div className="relative border-l-2 border-[var(--border-color)] ml-4 sm:ml-8 space-y-8 text-left">
          {experience.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Pulse Node Marker */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--bg-primary)] transition-all ${
                  item.status === "Current"
                    ? "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse"
                    : "border-[var(--accent-primary)] group-hover:scale-125"
                }`}
              />

              <div className="hud-panel p-5 sm:p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                    {item.year}
                  </span>
                  <span
                    className={`text-[10px] font-mono tracking-wider uppercase ${
                      item.status === "Current" ? "text-emerald-400 font-bold" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {item.status === "Current" ? "● ACTIVE EXPANSION" : "COMPLETED"}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
