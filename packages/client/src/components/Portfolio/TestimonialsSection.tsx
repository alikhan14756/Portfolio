"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { MessageSquareQuote, Star, ShieldCheck } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = PORTFOLIO_DATA;

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>CLIENT ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            What Clients Say
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            Real feedback from business owners and founders who entrusted their digital presence to Ali.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="hud-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[var(--border-color)]/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center font-black font-mono text-sm text-[var(--accent-primary)]">
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
