"use client";

import React from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  X,
  ExternalLink,
  Github,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  Zap,
  Tag
} from "lucide-react";

export const CaseStudyDrawer: React.FC = () => {
  const activeProject = usePortfolioStore((s) => s.activeDrawerProject);
  const closeCaseStudy = usePortfolioStore((s) => s.closeCaseStudy);

  if (!activeProject) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={closeCaseStudy}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto hud-panel rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{activeProject.category} // CASE STUDY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              {activeProject.title}
            </h2>
            <p className="text-xs text-[var(--accent-secondary)] font-mono">
              {activeProject.subtitle}
            </p>
          </div>

          <button
            onClick={closeCaseStudy}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Note if present */}
        {activeProject.client && (
          <div className="p-3 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono">
            <span className="text-[var(--accent-primary)] font-bold">CLIENT: </span>
            <span>{activeProject.client}</span>
          </div>
        )}

        {/* Challenge & Solution Blocks */}
        <div className="space-y-4">
          {/* Challenge */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/70 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold font-mono text-rose-400 uppercase tracking-wider">
                The Challenge
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {activeProject.challenge}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/70 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold font-mono text-emerald-400 uppercase tracking-wider">
                The Solution & Architecture
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {activeProject.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            MEASURED IMPACT
          </span>
          <div className="grid grid-cols-3 gap-3">
            {activeProject.metrics.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center font-mono">
                <div className="text-xl font-black text-[var(--accent-primary)]">
                  {m.value}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            BUILT WITH
          </span>
          <div className="flex flex-wrap gap-2">
            {activeProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] text-xs font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live Action Buttons */}
        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-[var(--accent-primary)] text-slate-950 flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <span>OPEN LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center gap-2 hover:border-[var(--accent-primary)] active:scale-95 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          <button
            onClick={closeCaseStudy}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            Dismiss [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
