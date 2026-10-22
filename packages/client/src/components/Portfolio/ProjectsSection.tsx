"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA, ProjectCaseStudy } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  FolderGit2,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles
} from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Client Work" | "Engineering Flagship" | "Playground">("All");
  const openCaseStudy = usePortfolioStore((s) => s.openCaseStudy);
  const setViewMode = usePortfolioStore((s) => s.setViewMode);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  const isMotionEnabled = animationIntensity !== "off";

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PRODUCTION SHOWCASE &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Featured Client Work &amp; Systems
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
              Verified commercial platforms driving measurable revenue, technical flagship multiplayer architectures, and interactive frontend experiments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] font-mono text-xs">
            {(["All", "Client Work", "Engineering Flagship", "Playground"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
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
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={isMotionEnabled ? { opacity: 0, y: 24 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={isMotionEnabled ? { y: -5, transition: { duration: 0.2 } } : {}}
              className="hud-panel rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden shadow-xl"
            >
              <div className="space-y-4">
                {/* Visual Asset if available */}
                {project.imageUrl && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[var(--border-color)]/60 bg-[var(--bg-secondary)] shadow-inner">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
                  </div>
                )}

                {/* Category & Tag Header */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--accent-primary)] font-semibold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--accent-secondary)] border border-[var(--border-color)]">
                    {project.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans line-clamp-3">
                  {project.overview}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--border-color)]/50">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="text-center p-2 rounded-xl bg-[var(--bg-secondary)]">
                      <div className="text-sm font-black font-mono text-[var(--accent-primary)]">
                        {m.value}
                      </div>
                      <div className="text-[9px] font-mono text-[var(--text-muted)] uppercase truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-[var(--border-color)]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => openCaseStudy(project)}
                  className="text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1 group/btn"
                >
                  <span>CASE STUDY DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.id === "aetheria-ecosystem" && (
                    <button
                      onClick={() => setViewMode("biosphere")}
                      className="p-2 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold hover:opacity-90 transition-all shadow-sm"
                      title="Launch Canvas"
                    >
                      <Compass className="w-4 h-4" />
                    </button>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                      title="Live Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                      title="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
