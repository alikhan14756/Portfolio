"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, ServiceItem } from "../../data/portfolioData";
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
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5" />
            <span>SOLUTIONS & PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Services & Value Proposition
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            Clean, high-performance web engineering focused on conversion rates, mobile usability, and measurable ROI.
          </p>
        </div>

        {/* Services 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {services.map((serv) => (
            <div key={serv.id} className="hud-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <span className="text-2xl font-black font-mono text-[var(--accent-primary)]">
                    {serv.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                    PRODUCTION PACKAGE
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {serv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {serv.description}
                </p>

                {/* Checklist */}
                <div className="space-y-2 pt-2">
                  {serv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]/60 flex items-center justify-between">
                <a
                  href={`https://wa.me/923055389967?text=${encodeURIComponent(
                    `Hi Ali, I am inquiring about your "${serv.title}" service.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--accent-primary)] hover:border-[var(--accent-primary)] flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  100% Guaranteed Satisfaction
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Project Estimator */}
        <div className="hud-panel p-6 sm:p-10 rounded-3xl space-y-8 text-left border-2 border-[var(--border-glow)]/40 relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--accent-primary)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-mono">
                INTERACTIVE PROJECT ESTIMATOR
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Configure your project requirements for an instant WhatsApp scope brief
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Service Type */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                01. SELECT SERVICE
              </span>
              <div className="space-y-2">
                {[
                  "Website Development",
                  "High-Converting Landing Pages",
                  "Website Redesign & Modernization",
                  "UI Implementation & Animation"
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedService(s)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                      selectedService === s
                        ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-md"
                        : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Timeline */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                02. TARGET TIMELINE
              </span>
              <div className="space-y-2">
                {[
                  "Urgent Sprint (3-5 Days)",
                  "Standard (1-2 Weeks)",
                  "Comprehensive (3-4 Weeks)"
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                      timeline === t
                        ? "bg-[var(--badge-bg)] border-[var(--accent-primary)] text-[var(--text-primary)] font-bold shadow-md"
                        : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                03. ADD-ON CAPABILITIES
              </span>
              <div className="space-y-2">
                {[
                  "WooCommerce E-Commerce",
                  "Speed Optimization 90+",
                  "WhatsApp Ordering Integration",
                  "Technical SEO Meta Schema"
                ].map((addon) => {
                  const active = addons.includes(addon);
                  return (
                    <button
                      key={addon}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono text-left flex items-center justify-between transition-all ${
                        active
                          ? "bg-[var(--badge-bg)] border-[var(--accent-secondary)] text-[var(--text-primary)] font-bold"
                          : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <span>{addon}</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          active ? "text-[var(--accent-secondary)]" : "text-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-5 rounded-2xl bg-[var(--bg-secondary)]/80 border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[var(--text-secondary)] text-center sm:text-left">
              <span className="text-[var(--accent-primary)] font-bold">READY TO COMMENCE: </span>
              {selectedService} • {timeline}
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-xs font-bold bg-[var(--accent-primary)] text-slate-950 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LAUNCH INQUIRY WITH ESTIMATE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
