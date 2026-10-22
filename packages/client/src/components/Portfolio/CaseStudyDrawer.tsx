"use client";

import React from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  X,
  ExternalLink,
  Github,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Zap,
  Tag,
  Briefcase,
  Layers,
  Smartphone,
  ShieldCheck
} from "lucide-react";

export const CaseStudyDrawer: React.FC = () => {
  const activeProject = usePortfolioStore((s) => s.activeDrawerProject);
  const closeCaseStudy = usePortfolioStore((s) => s.closeCaseStudy);

  if (!activeProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${activeProject.title} Case Study`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={closeCaseStudy}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto hud-panel rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{activeProject.category} // CASE STUDY SPECIFICATION</span>
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
            className="p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client & Date Pill */}
        <div className="flex flex-wrap items-center gap-3">
          {activeProject.client && (
            <div className="p-2.5 px-3.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] font-bold">CLIENT:</span>
              <span>{activeProject.client}</span>
            </div>
          )}
          {activeProject.date && (
            <div className="p-2.5 px-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono">
              <span>TIMELINE: {activeProject.date}</span>
            </div>
          )}
          <div className="p-2.5 px-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>STATUS: {activeProject.status}</span>
          </div>
        </div>

        {/* Visual Asset or Mockup */}
        {activeProject.imageUrl && (
          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-inner">
            <img
              src={activeProject.imageUrl}
              alt={activeProject.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
              Verified Project Visual Asset
            </div>
          </div>
        )}

        {/* Overview & Business Goals */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
            PROJECT OVERVIEW &amp; OBJECTIVES
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            {activeProject.overview}
          </p>
          {activeProject.businessGoals && (
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed italic border-l-2 border-[var(--accent-primary)]/60 pl-3">
              <strong className="text-[var(--text-primary)] not-italic">Strategic Goals: </strong>
              {activeProject.businessGoals}
            </p>
          )}
        </div>

        {/* Scope & Contribution */}
        <div className="space-y-2 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>MUHAMMAD ALI&apos;S SCOPE &amp; CONTRIBUTION</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            {activeProject.scopeContribution}
          </p>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hud-panel p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>THE CORE CHALLENGE</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              {activeProject.challenge}
            </p>
          </div>

          <div className="hud-panel p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>THE ENGINEERING SOLUTION</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              {activeProject.solution}
            </p>
          </div>
        </div>

        {/* Results & Verified Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-primary)] uppercase">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED RESULTS &amp; EVIDENCE</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-normal">
              *Items tagged CV-Reported sourced from verified CV
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeProject.metrics.map((m, i) => (
              <div key={i} className="hud-panel p-3.5 rounded-xl text-center space-y-1">
                <div className="text-xl sm:text-2xl font-black font-mono text-[var(--accent-primary)]">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  {m.label}
                  {m.isCvReported && (
                    <span className="block text-[8px] text-amber-400/90 font-sans mt-0.5">
                      (CV-Reported)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {activeProject.resultsEvidence && (
            <p className="text-xs text-[var(--text-secondary)] font-sans pt-1">
              {activeProject.resultsEvidence}
            </p>
          )}
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/60">
          <div className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
            TECHNOLOGY STACK USED:
          </div>
          <div className="flex flex-wrap gap-2">
            {activeProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>OPEN LIVE WEBSITE</span>
              </a>
            )}

            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] active:scale-95 transition-all flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>VIEW REPOSITORY</span>
              </a>
            )}
          </div>

          <button
            onClick={closeCaseStudy}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
