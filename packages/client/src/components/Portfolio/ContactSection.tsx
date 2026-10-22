"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import {
  Send,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle,
  Copy,
  Sparkles
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "WordPress Website",
    message: ""
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Route to WhatsApp with the structured message
      const text = encodeURIComponent(
        `Hi Ali! My name is ${formData.name} (${formData.email}).\n` +
        `• Project: ${formData.projectType}\n` +
        `• Details: ${formData.message}`
      );
      window.open(`https://wa.me/923055389967?text=${text}`, "_blank");
      setSubmitted(false);
      setFormData({ name: "", email: "", projectType: "WordPress Website", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Send className="w-3.5 h-3.5" />
            <span>COMMUNICATION CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            Let's turn your ideas into high-converting digital assets. I'm available for freelance projects and custom development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Direct Card */}
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hud-panel p-6 rounded-2xl block group hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors">
                      WhatsApp Instant Chat
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      {profile.whatsapp}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  FASTEST ↗
                </span>
              </div>
            </a>

            {/* Email Card with 1-Click Copy */}
            <div className="hud-panel p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    Official Email
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    {profile.email}
                  </p>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] flex items-center gap-1.5 transition-all"
                title="Copy Email Address"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="hud-panel p-6 rounded-2xl flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--text-primary)]">
                  Primary Location
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Pakistan 🇵🇰 (Available Globally)
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="hud-panel p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                  PROJECT TRANSMISSION FORM
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  SECURE CHANNEL
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-secondary)]">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)]">Project Focus</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="WordPress Website">WordPress & Elementor Pro Website</option>
                  <option value="Landing Page">High-Converting Landing Page</option>
                  <option value="Website Redesign">Website Redesign & PageSpeed Optimization</option>
                  <option value="Frontend Development">Custom Frontend Development (React/Tailwind)</option>
                  <option value="Other Inquiry">Other Custom Engagement</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-secondary)]">Project Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your timeline, goals, and any specific requirements..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-xl font-mono text-xs font-bold bg-[var(--accent-primary)] text-slate-950 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[var(--hud-glow)] disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 animate-spin" />
                    <span>PREPARING TRANSMISSION...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT INQUIRY DIRECT TO WHATSAPP</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
