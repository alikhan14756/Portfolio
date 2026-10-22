"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import {
  User,
  GraduationCap,
  Globe2,
  Video,
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  Terminal,
  Instagram
} from "lucide-react";

export const AboutSection: React.FC = () => {
  const { profile, education, languages, contentBrand } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)]">
            <User className="w-3.5 h-3.5" />
            <span>OPERATOR PROFILE // BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Meet Muhammad Ali
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-sans leading-relaxed">
            Frontend developer and digital creator based in Peshawar, Pakistan. Dedicated to crafting high-converting, responsive websites that combine aesthetic refinement with measurable business performance.
          </p>
        </div>

        {/* 3-Column Profile Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Core Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hud-panel p-6 sm:p-8 rounded-3xl space-y-6 text-left">
              <div className="flex items-center gap-4 pb-6 border-b border-[var(--border-color)]/60">
                <div className="w-16 h-16 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center relative shadow-md">
                  {/* Real Author Photo fallback */}
                  <img
                    src="/assets/author-pic.jpg"
                    alt="Muhammad Ali"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="text-xl font-mono font-bold text-[var(--accent-primary)]">
                    MA
                  </span>
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

              <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                <p>
                  I have spent the last 2+ years delivering client websites across commercial retail, healthcare, and digital media. From custom WordPress builds with Elementor Pro to dynamic JavaScript applications, my work bridges visual storytelling with sub-2.5s page load performance.
                </p>
                <p>
                  In addition to client engagements, I actively publish coding tutorials on CSS keyframe micro-interactions and JavaScript under my content brand <strong className="text-[var(--text-primary)] font-semibold">CodeVibe</strong>, helping fellow developers build engaging interfaces.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={profile.cvUrl}
                  download="Muhammad_Ali_CV.pdf"
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-[var(--hud-glow)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD VERIFIED CV</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] active:scale-95 transition-all flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>GITHUB REPOSITORIES</span>
                </a>
              </div>
            </div>

            {/* Content Brand: CodeVibe */}
            <div className="hud-panel p-6 rounded-3xl text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)]">
                  <Video className="w-4 h-4" />
                  <span>CONTENT CREATION BRAND</span>
                </div>
                <h4 className="text-lg font-bold font-mono text-[var(--text-primary)]">
                  {contentBrand.name} ({contentBrand.handle})
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  {contentBrand.focus} on {contentBrand.platforms}.
                </p>
              </div>
              <a
                href={contentBrand.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-1.5 shrink-0"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>FOLLOW @CODEVIBE.ANIM</span>
              </a>
            </div>
          </div>

          {/* Right Column: Education & Languages */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <div className="hud-panel p-6 sm:p-7 rounded-3xl space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] pb-2 border-b border-[var(--border-color)]/60">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC BACKGROUND</span>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 space-y-1.5">
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
                      <span>{edu.location}</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Card */}
            <div className="hud-panel p-6 sm:p-7 rounded-3xl space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] pb-2 border-b border-[var(--border-color)]/60">
                <Globe2 className="w-4 h-4" />
                <span>COMMUNICATION LANGUAGES</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]/60 text-center space-y-1">
                    <div className="text-sm font-bold font-mono text-[var(--text-primary)]">
                      {lang.language}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--accent-primary)]">
                      {lang.proficiency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
