import { create } from "zustand";
import { ProjectCaseStudy, PORTFOLIO_DATA } from "../data/portfolioData";

export type ThemeType =
  | "jarvis-core"
  | "iron-man"
  | "cyberpunk"
  | "matrix"
  | "arctic-glass"
  | "midnight-purple"
  | "emerald-pro"
  | "solar-gold"
  | "ocean-blue"
  | "rose-neon"
  | "paper-studio"
  | "monochrome";

export type LayoutMode = "hud-grid" | "cockpit" | "streamlined" | "terminal";
export type TypographyOption = "syne" | "jetbrains-mono" | "inter" | "orbitron";
export type ParticleEffectOption = "curl-noise" | "matrix-rain" | "starfield" | "hex-grid";
export type AnimationIntensity = "full" | "balanced" | "minimal";

export interface JarvisMessage {
  id: string;
  sender: "jarvis" | "user";
  text: string;
  timestamp: number;
  actionTag?: string;
}

export interface PortfolioStore {
  // Theme & Appearance Customization
  theme: ThemeType;
  layout: LayoutMode;
  typography: TypographyOption;
  particleEffect: ParticleEffectOption;
  animationIntensity: AnimationIntensity;

  // View Mode: Portfolio Showcase vs. Full 2.5D Biosphere Canvas
  viewMode: "portfolio" | "biosphere";

  // Case Study Drawer
  activeDrawerProject: ProjectCaseStudy | null;
  isCustomizerOpen: boolean;

  // JARVIS AI Assistant State
  isJarvisOpen: boolean;
  isVoiceMuted: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  messages: JarvisMessage[];

  // Actions
  setTheme: (t: ThemeType) => void;
  setLayout: (l: LayoutMode) => void;
  setTypography: (ty: TypographyOption) => void;
  setParticleEffect: (p: ParticleEffectOption) => void;
  setAnimationIntensity: (ai: AnimationIntensity) => void;
  setViewMode: (vm: "portfolio" | "biosphere") => void;
  openCaseStudy: (project: ProjectCaseStudy) => void;
  closeCaseStudy: () => void;
  setCustomizerOpen: (open: boolean) => void;
  setJarvisOpen: (open: boolean) => void;
  setVoiceMuted: (muted: boolean) => void;
  setIsListening: (listening: boolean) => void;
  setIsSpeaking: (speaking: boolean) => void;
  sendJarvisMessage: (text: string) => void;
  executeCommand: (cmd: string) => void;
}

const INITIAL_MESSAGES: JarvisMessage[] = [
  {
    id: "init_1",
    sender: "jarvis",
    text: "Greetings. I am J.A.R.V.I.S., autonomous interface for Muhammad Ali. I can brief you on Ali's 15+ client projects, live case studies, technical competencies, or contact channels. How may I assist your mission?",
    timestamp: Date.now()
  }
];

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  theme: "jarvis-core",
  layout: "hud-grid",
  typography: "syne",
  particleEffect: "curl-noise",
  animationIntensity: "full",

  viewMode: "portfolio",
  activeDrawerProject: null,
  isCustomizerOpen: false,

  isJarvisOpen: false,
  isVoiceMuted: false,
  isListening: false,
  isSpeaking: false,
  messages: INITIAL_MESSAGES,

  setTheme: (theme) => {
    set({ theme });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    saveUserPrefs();
  },

  setLayout: (layout) => {
    set({ layout });
    saveUserPrefs();
  },

  setTypography: (typography) => {
    set({ typography });
    saveUserPrefs();
  },

  setParticleEffect: (particleEffect) => {
    set({ particleEffect });
    saveUserPrefs();
  },

  setAnimationIntensity: (animationIntensity) => {
    set({ animationIntensity });
    saveUserPrefs();
  },

  setViewMode: (viewMode) => set({ viewMode }),
  openCaseStudy: (activeDrawerProject) => set({ activeDrawerProject }),
  closeCaseStudy: () => set({ activeDrawerProject: null }),
  setCustomizerOpen: (isCustomizerOpen) => set({ isCustomizerOpen }),
  setJarvisOpen: (isJarvisOpen) => set({ isJarvisOpen }),
  setVoiceMuted: (isVoiceMuted) => set({ isVoiceMuted }),
  setIsListening: (isListening) => set({ isListening }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),

  sendJarvisMessage: (text: string) => {
    const userMsg: JarvisMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: Date.now()
    };

    set((state) => ({ messages: [...state.messages, userMsg] }));

    // Execute JARVIS answer engine
    setTimeout(() => {
      const response = generateJarvisAnswer(text, get());
      const botMsg: JarvisMessage = {
        id: `jar_${Date.now()}`,
        sender: "jarvis",
        text: response.text,
        timestamp: Date.now(),
        actionTag: response.actionTag
      };

      set((state) => ({ messages: [...state.messages, botMsg] }));

      // Optional TTS voice synthesis if voice not muted
      if (!get().isVoiceMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(response.text.slice(0, 200));
        utterance.rate = 1.05;
        utterance.pitch = 0.95;
        set({ isSpeaking: true });
        utterance.onend = () => set({ isSpeaking: false });
        utterance.onerror = () => set({ isSpeaking: false });
        window.speechSynthesis.speak(utterance);
      }
    }, 400);
  },

  executeCommand: (cmd: string) => {
    const lower = cmd.toLowerCase().trim();
    const store = get();

    if (lower.includes("biosphere") || lower.includes("canvas") || lower.includes("simulation")) {
      store.setViewMode("biosphere");
      return;
    }
    if (lower.includes("portfolio") || lower.includes("showcase")) {
      store.setViewMode("portfolio");
      return;
    }
    if (lower.includes("theme")) {
      const themes: ThemeType[] = [
        "jarvis-core", "iron-man", "cyberpunk", "matrix",
        "arctic-glass", "midnight-purple", "emerald-pro", "solar-gold",
        "ocean-blue", "rose-neon", "paper-studio", "monochrome"
      ];
      const match = themes.find((t) => lower.includes(t.replace("-", " ")) || lower.includes(t));
      if (match) store.setTheme(match);
      return;
    }
  }
}));

function saveUserPrefs() {
  if (typeof window === "undefined") return;
  const state = usePortfolioStore.getState();
  try {
    localStorage.setItem(
      "ali_jarvis_prefs",
      JSON.stringify({
        theme: state.theme,
        layout: state.layout,
        typography: state.typography,
        particleEffect: state.particleEffect,
        animationIntensity: state.animationIntensity
      })
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Intelligent project-aware knowledge base answering queries about Muhammad Ali
 */
function generateJarvisAnswer(
  prompt: string,
  store: PortfolioStore
): { text: string; actionTag?: string } {
  const p = prompt.toLowerCase();

  // 1. Navigation & Actions
  if (p.includes("biosphere") || p.includes("canvas") || p.includes("simulation") || p.includes("2.5d")) {
    store.setViewMode("biosphere");
    return {
      text: "Activating real-time 2.5D Aetheria Biosphere. Engaging 25 Hz authoritative physics, particle swarms, and procedural audio synthesis.",
      actionTag: "NAV_BIOSPHERE"
    };
  }

  if (p.includes("portfolio") || p.includes("showcase") || p.includes("return")) {
    store.setViewMode("portfolio");
    return {
      text: "Returning to Muhammad Ali's primary portfolio terminal HUD.",
      actionTag: "NAV_PORTFOLIO"
    };
  }

  // Theme switches via voice / chat
  const themeMap: Record<string, ThemeType> = {
    "iron man": "iron-man",
    "cyberpunk": "cyberpunk",
    "matrix": "matrix",
    "arctic": "arctic-glass",
    "midnight": "midnight-purple",
    "emerald": "emerald-pro",
    "solar": "solar-gold",
    "ocean": "ocean-blue",
    "rose": "rose-neon",
    "paper": "paper-studio",
    "monochrome": "monochrome",
    "jarvis": "jarvis-core"
  };

  for (const [key, themeVal] of Object.entries(themeMap)) {
    if (p.includes(`switch to ${key}`) || p.includes(`theme ${key}`) || p.includes(`set ${key}`)) {
      store.setTheme(themeVal);
      return {
        text: `HUD reconfigured. Active theme calibrated to ${themeVal.toUpperCase()}.`,
        actionTag: `THEME_${themeVal}`
      };
    }
  }

  // 2. Specific Project Queries
  if (p.includes("ivanalexx") || p.includes("fiverr")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "ivanalexx");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "ivanalexx.com is a premier personal brand platform engineered for Ivanalexx, a top-rated Fiverr video producer and director. Built with WordPress, Elementor Pro, and speed optimization for conversion.",
      actionTag: "PROJECT_IVANALEXX"
    };
  }

  if (p.includes("arshad") || p.includes("tile")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "arshad");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Arshad Tiles is an artisanal ceramic showcase website. Ali increased customer inquiries by 40% and reduced load times to 2.1s with 90+ PageSpeed score.",
      actionTag: "PROJECT_ARSHAD"
    };
  }

  if (p.includes("vet") || p.includes("hassan") || p.includes("clinic")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "vet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Malik Hassan Veterinary is a clinic portal featuring digital service listings and WhatsApp online booking, generating a 35% increase in appointments.",
      actionTag: "PROJECT_VET"
    };
  }

  if (p.includes("shah") || p.includes("sweet")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "sweet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Shah-Sweet Store features an artisanal confectionery catalog with WooCommerce readiness and instant WhatsApp ordering for customers.",
      actionTag: "PROJECT_SWEET"
    };
  }

  // 3. Projects overview
  if (p.includes("project") || p.includes("work") || p.includes("portfolio")) {
    return {
      text: `Ali has delivered 15+ successful projects with 100% client satisfaction. Key commercial works include ivanalexx.com, Arshad Tiles, Malik Hassan Veterinary, and Shah-Sweet Store, alongside interactive JavaScript & Canvas experiments.`,
      actionTag: "SHOW_PROJECTS"
    };
  }

  // 4. Skills & Tech Stack
  if (p.includes("skill") || p.includes("stack") || p.includes("tech") || p.includes("wordpress") || p.includes("elementor")) {
    return {
      text: "Muhammad Ali specializes in WordPress (90%), Elementor Pro (90%), Responsive Web Design (90%), HTML5/CSS3 (85%), JavaScript (80%), and UI/UX Design (88%), actively expanding into React, Next.js, and Three.js.",
      actionTag: "SHOW_SKILLS"
    };
  }

  // 5. Contact & Hiring
  if (p.includes("contact") || p.includes("hire") || p.includes("email") || p.includes("whatsapp") || p.includes("rate") || p.includes("price")) {
    return {
      text: "Ali is currently available for freelance projects and full-stack engagements. You can reach him directly via WhatsApp at +92 305 5389967 or email at alikhanwebdeveloper@gmail.com.",
      actionTag: "SHOW_CONTACT"
    };
  }

  // 6. Experience & Journey
  if (p.includes("experience") || p.includes("journey") || p.includes("about") || p.includes("who is")) {
    return {
      text: "Muhammad Ali is a Frontend Web Developer & Digital Creator based in Pakistan with 2+ years of experience. He started in 2024 mastering HTML/CSS/JS, built commercial platforms throughout 2025, and is building cutting-edge web applications in 2026.",
      actionTag: "SHOW_EXPERIENCE"
    };
  }

  // 7. Testimonials
  if (p.includes("testimonial") || p.includes("review") || p.includes("client")) {
    return {
      text: "Clients praise Ali's reliability and precision. Business owner Arshad Khan reports a 40% inquiry boost, and Dr. Usman highlights streamlined clinic appointments with 100% mobile responsiveness.",
      actionTag: "SHOW_TESTIMONIALS"
    };
  }

  // Default JARVIS reply
  return {
    text: "Understood. Ali specializes in custom WordPress development, high-converting landing pages, website redesigns, and frontend animations. Ask me to open any case study, show skills, switch themes, or route an inquiry directly to Ali's WhatsApp."
  };
}
