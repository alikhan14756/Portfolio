"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA, ServiceItem } from "../../data/portfolioData";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  Wrench,
  CheckCircle2,
  Calculator,
  ArrowRight,
  MessageCircle,
  Sparkles
} from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { services, profile } = PORTFOLIO_DATA;
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const isMotionEnabled = animationIntensity !== "off";

  // Interactive Project Estimator state
  const [selectedService, setSelectedService] = useState<string>("Website Development");
  const [timeline, setTimeline] = useState<string>("Standard (1-2 Weeks)");
  const [addons, setAddons] = useState<string[]>(["Speed Optimization 90+"]);

  const toggleAddon = (item: string) => {
    setAddons((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Ali! I would like to get a quote for:\n` +
      `• Service: ${selectedService}\n` +
      `• Timeline: ${timeline}\n` +
      `• Features: ${addons.join(", ") || "Standard"}\n\nLet's discuss my project!`
    );
    return `https://wa.me/923055389967?text=${text}`;
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5" />
            <span>SOLUTIONS &amp; VALUE PROPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Services &amp; Development Packages
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
            Clean, high-performance web engineering focused on conversion rates, mobile usability, and measurable ROI.
          </p>
        </motion.div>

        {/* Services 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {services.map((serv, idx) => (
            <motion.div
              key={serv.id}
              initial={isMotionEnabled ? { opacity: 0, y: 24 } : false}
              whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={isMotionEnabled ? { y: -4, transition: { duration: 0.2 } } : {}}
              className="style-card p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3">
                  <span className="text-2xl font-black font-mono text-[var(--accent-primary)]">
                    {serv.number}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--accent-secondary)] border border-[var(--border-color)]">
                    AVAILABLE NOW
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                  {serv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                  {serv.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    KEY DELIVERABLES:
                  </div>
                  {serv.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]/60">
                <a
                  href={`https://wa.me/923055389967?text=${encodeURIComponent(`Hi Ali, I am interested in your ${serv.title} service!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline"
                >
                  <span>INQUIRE ABOUT THIS PACKAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Instant Project Estimator */}
        <motion.div
          initial={isMotionEnabled ? { opacity: 0, y: 24 } : false}
          whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="style-card p-6 sm:p-10 space-y-8 text-left relative overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b border-[var(--border-color)]/60 pb-4">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--accent-primary)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-mono text-[var(--text-primary)]">
                INTERACTIVE PROJECT ESTIMATOR
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                Configure your project requirements and connect directly with Ali on WhatsApp
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select Service */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-[var(--accent-primary)] font-bold uppercase">
                1. SELECT SERVICE TYPE
              </label>
              <div className="space-y-2">
                {[
                  "Custom WordPress Website",
                  "High-Converting Landing Page",
                  "Website Redesign & Speedup",
                  "E-Commerce Online Store"
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedService(s)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                      selectedService === s
                        ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-md"
                        : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Timeline */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-[var(--accent-primary)] font-bold uppercase">
                2. DESIRED TIMELINE
              </label>
              <div className="space-y-2">
                {[
                  "Fast Delivery (3-5 Days)",
                  "Standard (1-2 Weeks)",
                  "Comprehensive (2-4 Weeks)"
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                      timeline === t
                        ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-md"
                        : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-[var(--accent-primary)] font-bold uppercase">
                3. KEY DELIVERABLES
              </label>
              <div className="space-y-2">
                {[
                  "Speed Optimization 90+",
                  "Direct WhatsApp CTA",
                  "Figma to Code Exact",
                  "Mobile Touch Optimized"
                ].map((add) => {
                  const active = addons.includes(add);
                  return (
                    <button
                      key={add}
                      onClick={() => toggleAddon(add)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono text-left flex items-center justify-between transition-all ${
                        active
                          ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-md"
                          : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <span>{add}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimator Summary CTA */}
          <div className="pt-6 border-t border-[var(--border-color)]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)]">SELECTED CONFIGURATION:</div>
              <div className="text-sm font-bold font-mono text-[var(--text-primary)] mt-0.5">
                {selectedService} • {timeline}
              </div>
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-mono text-xs font-bold tracking-wider bg-[var(--accent-primary)] text-slate-950 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[var(--hud-glow)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>REQUEST QUOTE VIA WHATSAPP</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
