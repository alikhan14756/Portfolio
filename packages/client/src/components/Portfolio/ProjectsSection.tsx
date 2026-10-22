"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, ProjectCaseStudy } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { ExternalLink, Github, ArrowUpRight, FolderGit2, CheckCircle2 } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Client Work" | "Playground">("All");
  const openCaseStudy = usePortfolioStore((s) => s.openCaseStudy);

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Featured Client Work & Systems
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              Real commercial websites driving measurable business growth, plus interactive frontend & canvas experiments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] self-start md:self-auto font-mono text-xs">
            {(["All", "Client Work", "Playground"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  filter === tab
                    ? "bg-[var(--accent-primary)] text-slate-950 shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="hud-panel rounded-2xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Category & Tags Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                    {project.tag}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-[var(--accent-secondary)] font-mono mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Solution Summary */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {project.solution}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-[var(--border-color)]/50 text-center font-mono">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[var(--bg-secondary)]/50 rounded-lg p-1.5">
                      <div className="text-xs font-black text-[var(--accent-primary)]">
                        {m.value}
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-5 mt-4 border-t border-[var(--border-color)]/40 flex items-center justify-between">
                <button
                  onClick={() => openCaseStudy(project)}
                  className="text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
