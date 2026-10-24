"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import {
  HelpCircle,
  ChevronDown,
  Bot,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Zap
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category: "General" | "Services & Pricing" | "Delivery & Process" | "Technical Stack";
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who is Muhammad Ali and what is his core background?",
    shortAnswer: "Frontend Developer & BS Nursing scholar based in Peshawar, Pakistan with 2+ years of verified commercial experience.",
    detailedAnswer: "Muhammad Ali is a frontend specialist and healthcare scholar currently pursuing a Bachelor of Science in Nursing (BSN) in Peshawar. While medical science is his formal field of study, coding and web development is his dedicated craft and specialized hobby. He specializes in WordPress with Elementor Pro, responsive UI/UX, and modern web applications with sub-2s load speeds. He brings clinical precision, rigorous attention to detail, and deep empathy to every client project.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "What verified commercial projects has Ali delivered?",
    shortAnswer: "Ivana Studio (ivanalexx.com), Nexcurex (nexcurex.com), Arshad Tiles, VetCarePlus, and Shah Sweet.",
    detailedAnswer: "Key commercial platforms include Ivana Studio (an international video producer portfolio built with WordPress & Elementor Pro), Nexcurex (a modern fashion e-commerce storefront with WooCommerce and discount engine), Arshad Tiles (e-commerce catalog with 2.1s load time and +40% CV-reported inquiry boost), and VetCarePlus (veterinary clinic portal with 1.8s load speed).",
    category: "General"
  },
  {
    id: "faq-3",
    question: "What are Ali's rates and website pricing?",
    shortAnswer: "Flexible, transparent quotes tailored to scope: Landing pages $150–$350, custom WordPress $300–$600, e-commerce $500–$1,200+.",
    detailedAnswer: "Every quote is based on specific requirements, design complexity, and integrations. Landing pages and conversion funnels range from $150–$350. Full custom multi-page business websites with Elementor Pro range from $300–$600. Comprehensive e-commerce stores (WooCommerce/Shopify) range from $500–$1,200+. You can receive an exact proposal within 1 hour on WhatsApp.",
    category: "Services & Pricing"
  },
  {
    id: "faq-4",
    question: "How fast can Ali deliver a website?",
    shortAnswer: "2–4 days for landing pages, 5–9 days for multi-page business sites, and 10–14 days for e-commerce stores.",
    detailedAnswer: "Ali works with structured project milestones. A single high-converting landing page is typically delivered within 2–4 business days. Standard multi-page business websites require 5–9 business days. Full e-commerce systems with payment gateway integration take 10–14 business days. Express rush delivery is available upon request.",
    category: "Delivery & Process"
  },
  {
    id: "faq-5",
    question: "Can Ali build full e-commerce stores and online shops?",
    shortAnswer: "Yes. Comprehensive WooCommerce and Shopify setups with catalog management and secure checkout.",
    detailedAnswer: "Ali designs and configures complete e-commerce ecosystems, including product categorizations, variable products, discount codes, cart optimization, payment gateway integrations (Stripe, PayPal, local bank transfers), and automated customer email confirmations (as proven on Nexcurex at nexcurex.com).",
    category: "Services & Pricing"
  },
  {
    id: "faq-6",
    question: "How does Ali optimize websites to achieve 90+ PageSpeed scores?",
    shortAnswer: "Next-gen WebP imagery, asset minification, critical CSS inlining, caching, and clean DOM architecture.",
    detailedAnswer: "Page speed directly drives conversion rates and SEO rankings. Ali optimizes Core Web Vitals (LCP, FID, CLS) by compressing visual assets, lazy-loading offscreen media, minifying CSS/JS payloads, utilizing server-level caching, and avoiding heavy bloated plugins. As seen on Arshad Tiles and VetCarePlus, average load times consistently achieve sub-2.1 seconds.",
    category: "Technical Stack"
  },
  {
    id: "faq-7",
    question: "What is Ali's design and development process?",
    shortAnswer: "A proven 4-stage workflow: 1) Strategy, 2) Wireframe UI/UX, 3) Development, 4) Launch & Quality Assurance.",
    detailedAnswer: "The workflow starts with a discovery session on your brand goals. Stage 2 produces responsive wireframes and Figma/Elementor design prototypes. Stage 3 completes full development, responsive breakpoints (mobile, tablet, desktop), and speed tuning. Stage 4 tests cross-browser compatibility, validates forms, and coordinates final deployment.",
    category: "Delivery & Process"
  },
  {
    id: "faq-8",
    question: "Does Ali provide revisions and post-launch support?",
    shortAnswer: "Unlimited revisions during design plus 30 days of complimentary post-launch technical warranty.",
    detailedAnswer: "Client satisfaction is guaranteed with unlimited revisions throughout the active design and development phases. Once the site is launched, Ali provides 30 days of complimentary technical support to answer questions, handle minor text/image updates, and ensure 100% uptime and functionality.",
    category: "Delivery & Process"
  },
  {
    id: "faq-9",
    question: "What technologies and tools does Ali specialize in?",
    shortAnswer: "WordPress, Elementor Pro, HTML5/CSS3, JavaScript, Tailwind CSS, React 19, Next.js 15, and Three.js.",
    detailedAnswer: "Core commercial skills include WordPress (90%), Elementor Pro (90%), Responsive Design (90%), HTML5 & CSS3 (85%), and UI/UX Design (88%). For advanced interactive web experiences, Ali leverages React 19, Next.js 15 App Router, TypeScript, Three.js WebGL, and Fastify Node.js backends.",
    category: "Technical Stack"
  },
  {
    id: "faq-10",
    question: "How can I contact Muhammad Ali directly?",
    shortAnswer: "Direct WhatsApp (+92 305 5389967) for instant replies, or email alikhanwebdeveloper@gmail.com.",
    detailedAnswer: "WhatsApp is the fastest channel with typical responses under 15 minutes. You can also send an email inquiry, connect on GitHub (@alikhan14756), or use the interactive contact form on this site. Ali collaborates remotely with international clients across US, UK, and European timezones.",
    category: "General"
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sendJarvisMessage = usePortfolioStore((s) => s.sendJarvisMessage);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const isMotionEnabled = animationIntensity !== "off";

  const categories = ["All", "General", "Services & Pricing", "Delivery & Process", "Technical Stack"];

  const filteredFaqs = FAQ_DATA.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAskJarvis = (question: string) => {
    setJarvisOpen(true);
    sendJarvisMessage(question);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto space-y-10 text-left">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE // FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Common Client Questions
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-sans">
            Clear, transparent answers about Muhammad Ali&apos;s commercial client work, delivery timelines, project pricing, and technical capabilities.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all active:scale-95 border ${
                activeCategory === cat
                  ? "bg-[var(--accent-primary)] text-slate-950 border-[var(--accent-primary)] shadow-sm font-bold"
                  : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={isMotionEnabled ? { opacity: 0, y: 16 } : false}
                whileInView={isMotionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="style-card overflow-hidden border border-[var(--border-color)]/80 transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-[var(--bg-secondary)]/50"
                >
                  <div className="space-y-1 pr-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-mono text-[var(--text-primary)]">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0 text-[var(--accent-primary)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed border-t border-[var(--border-color)]/40 space-y-4">
                        <p>{faq.detailedAnswer}</p>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-color)]/40">
                          <button
                            onClick={() => handleAskJarvis(faq.question)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-color)] text-xs font-mono text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all active:scale-95"
                          >
                            <Bot className="w-3.5 h-3.5" />
                            <span>Ask JARVIS about this</span>
                          </button>

                          <a
                            href="https://wa.me/923055389967"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Discuss on WhatsApp &rarr;</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
