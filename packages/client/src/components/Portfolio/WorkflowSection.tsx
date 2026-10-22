"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { GitBranch, CheckCircle2, ArrowRight, Layers } from "lucide-react";

export const WorkflowSection: React.FC = () => {
  const { process } = PORTFOLIO_DATA;

  return (
    <section id="process" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>EXECUTION PROTOCOL // WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            How I Build High-Performing Websites
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-sans">
            A systematic four-phase engineering and delivery workflow that guarantees on-time delivery, pixel perfection, and measurable business growth.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((p, idx) => (
            <div
              key={idx}
              className="hud-panel p-6 sm:p-7 rounded-3xl text-left space-y-4 flex flex-col justify-between relative group hover:border-[var(--accent-primary)] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-[var(--accent-primary)]">
                    {p.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold font-mono text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-[var(--border-color)]/60 space-y-2">
                <div className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  KEY DELIVERABLES:
                </div>
                <div className="space-y-1.5">
                  {p.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
