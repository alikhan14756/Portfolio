"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import {
  Send,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  Copy,
  Download,
  AlertCircle,
  Loader2,
  ShieldCheck
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "WordPress Website",
    message: "",
    honeypot: "" // Anti-spam field
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Client-side validation
    if (formData.name.trim().length < 2) {
      setStatusMessage({ type: "error", text: "Please provide a valid name (at least 2 characters)." });
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatusMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatusMessage({ type: "error", text: "Please provide project details (at least 10 characters)." });
      return;
    }

    setLoading(true);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${serverUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: data.message || "Thank you! Muhammad Ali has received your message and will respond shortly."
        });
        setFormData({ name: "", email: "", projectType: "WordPress Website", message: "", honeypot: "" });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Unable to submit inquiry. Please use direct WhatsApp contact below."
        });
      }
    } catch {
      // Offline fallback: allow direct WhatsApp routing
      setStatusMessage({
        type: "success",
        text: "Connecting inquiry directly to Muhammad Ali's verified WhatsApp..."
      });
      setTimeout(() => {
        const text = encodeURIComponent(
          `Hi Ali! My name is ${formData.name} (${formData.email}).\n` +
          `• Project Type: ${formData.projectType}\n` +
          `• Inquiry: ${formData.message}`
        );
        window.open(`https://wa.me/923055389967?text=${text}`, "_blank");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] uppercase tracking-widest">
            <Send className="w-3.5 h-3.5" />
            <span>DIRECT ENGAGEMENT // INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl font-sans">
            Let&apos;s build a fast, high-converting digital platform for your business. Available for freelance projects, WordPress developments, and full-stack engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Direct Card */}
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="style-card p-6 flex items-center justify-between group hover:border-emerald-400/80 transition-all block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    FASTEST RESPONSE
                  </div>
                  <div className="text-base font-bold font-mono text-[var(--text-primary)] mt-0.5">
                    WhatsApp Direct
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono">
                    {profile.whatsapp}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                CHAT NOW &rarr;
              </span>
            </a>

            {/* Email Card */}
            <div className="style-card p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    DIRECT EMAIL
                  </div>
                  <div className="text-base font-bold font-mono text-[var(--text-primary)] mt-0.5">
                    Email Inbox
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono">
                    {profile.email}
                  </div>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                title="Copy Email"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & CV Download Card */}
            <div className="style-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    PHYSICAL BASE
                  </div>
                  <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                    {profile.location}
                  </div>
                </div>
              </div>

              <a
                href={profile.cvUrl}
                download="Muhammad_Ali_CV.pdf"
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-2 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD CV</span>
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="style-card p-6 sm:p-8 space-y-4">
              {/* Status Alert Banner */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl text-xs font-mono flex items-start gap-3 border ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Honeypot Anti-Spam Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-muted)]">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 style-input text-xs font-mono placeholder-[var(--surface-input-placeholder)] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--text-muted)]">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 style-input text-xs font-mono placeholder-[var(--surface-input-placeholder)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">PROJECT CATEGORY</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 style-input text-xs font-mono focus:outline-none transition-colors"
                >
                  <option value="WordPress Website">Custom WordPress Development</option>
                  <option value="Landing Page">High-Converting Landing Page</option>
                  <option value="Website Redesign">Website Redesign & Modernization</option>
                  <option value="E-Commerce Store">WooCommerce E-Commerce Store</option>
                  <option value="Frontend Application">Frontend React / Next.js Application</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[var(--text-muted)]">PROJECT SCOPE & DETAILS *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your goals, requirements, desired timeline, or existing site..."
                  className="w-full px-4 py-3 style-input text-xs font-mono placeholder-[var(--surface-input-placeholder)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 style-btn-primary font-mono text-xs font-bold tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING TELEMETRY...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT INQUIRY TO MUHAMMAD ALI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
