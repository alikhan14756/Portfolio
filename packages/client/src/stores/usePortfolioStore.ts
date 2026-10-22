import { create } from "zustand";
import { ProjectCaseStudy, PORTFOLIO_DATA } from "../data/portfolioData";

export type ThemeType =
  | "jarvis-core"
  | "iron-red"
  | "iron-man"
  | "cyberpunk-neon"
  | "cyberpunk"
  | "matrix-terminal"
  | "matrix"
  | "arctic-glass"
  | "midnight-purple"
  | "emerald-professional"
  | "emerald-pro"
  | "solar-gold"
  | "ocean-blue"
  | "rose-neon"
  | "paper-studio"
  | "monochrome";

export type LayoutMode = "hud-grid" | "cockpit" | "streamlined" | "terminal";
export type TypographyOption = "syne" | "jetbrains-mono" | "inter" | "orbitron";
export type ParticleEffectOption = "curl-noise" | "matrix-rain" | "starfield" | "hex-grid" | "off";
export type ParticleDensity = "dense" | "medium" | "sparse" | "off";
export type AnimationIntensity = "full" | "balanced" | "minimal" | "off";
export type AnimationSpeed = "slow" | "normal" | "fast";
export type BorderRadiusOption = "sharp" | "rounded" | "pill";
export type PanelOpacity = "solid" | "glass" | "frosted";
export type GlowStrength = "off" | "subtle" | "high";
export type OrbStyle = "arc-reactor" | "pulsar" | "minimal-ring" | "off";

export interface AppearancePreset {
  version: 2;
  theme: ThemeType;
  accentOverride: string;
  layout: LayoutMode;
  typography: TypographyOption;
  borderRadius: BorderRadiusOption;
  panelOpacity: PanelOpacity;
  glowStrength: GlowStrength;
  particleEffect: ParticleEffectOption;
  particleDensity: ParticleDensity;
  animationIntensity: AnimationIntensity;
  animationSpeed: AnimationSpeed;
  orbStyle: OrbStyle;
  showGridLines: boolean;
  showScanlines: boolean;
  cursorSpotlight: boolean;
  soundEnabled: boolean;
  masterMute: boolean;
}

export interface JarvisMessage {
  id: string;
  sender: "jarvis" | "user";
  text: string;
  timestamp: number;
  actionTag?: string;
  isAiGenerated?: boolean;
}

export interface PortfolioStore {
  // Theme & Appearance Customization
  theme: ThemeType;
  accentOverride: string;
  layout: LayoutMode;
  typography: TypographyOption;
  borderRadius: BorderRadiusOption;
  panelOpacity: PanelOpacity;
  glowStrength: GlowStrength;
  particleEffect: ParticleEffectOption;
  particleDensity: ParticleDensity;
  animationIntensity: AnimationIntensity;
  animationSpeed: AnimationSpeed;
  orbStyle: OrbStyle;
  showGridLines: boolean;
  showScanlines: boolean;
  cursorSpotlight: boolean;
  soundEnabled: boolean;
  masterMute: boolean;

  // View Mode: Portfolio Showcase vs. Full 2.5D Biosphere Canvas
  viewMode: "portfolio" | "biosphere";

  // Preloader State
  isPreloaderActive: boolean;

  // Case Study Drawer & Theme Studio Modals
  activeDrawerProject: ProjectCaseStudy | null;
  isCustomizerOpen: boolean;

  // JARVIS AI Assistant State
  isJarvisOpen: boolean;
  isVoiceMuted: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isAiGenerating: boolean;
  messages: JarvisMessage[];

  // Actions
  setTheme: (t: ThemeType) => void;
  setAccentOverride: (hex: string) => void;
  setLayout: (l: LayoutMode) => void;
  setTypography: (ty: TypographyOption) => void;
  setBorderRadius: (br: BorderRadiusOption) => void;
  setPanelOpacity: (po: PanelOpacity) => void;
  setGlowStrength: (gs: GlowStrength) => void;
  setParticleEffect: (p: ParticleEffectOption) => void;
  setParticleDensity: (pd: ParticleDensity) => void;
  setAnimationIntensity: (ai: AnimationIntensity) => void;
  setAnimationSpeed: (as: AnimationSpeed) => void;
  setOrbStyle: (os: OrbStyle) => void;
  setShowGridLines: (show: boolean) => void;
  setShowScanlines: (show: boolean) => void;
  setCursorSpotlight: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMasterMute: (muted: boolean) => void;
  setPreloaderActive: (active: boolean) => void;

  setViewMode: (vm: "portfolio" | "biosphere") => void;
  openCaseStudy: (project: ProjectCaseStudy) => void;
  closeCaseStudy: () => void;
  setCustomizerOpen: (open: boolean) => void;
  setJarvisOpen: (open: boolean) => void;
  setVoiceMuted: (muted: boolean) => void;
  setIsListening: (listening: boolean) => void;
  setIsSpeaking: (speaking: boolean) => void;
  sendJarvisMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
  executeCommand: (cmd: string) => void;
  resetDefaults: () => void;
  exportPreset: () => string;
  importPreset: (jsonStr: string) => boolean;
}

const DEFAULT_PRESET: AppearancePreset = {
  version: 2,
  theme: "jarvis-core",
  accentOverride: "",
  layout: "hud-grid",
  typography: "syne",
  borderRadius: "rounded",
  panelOpacity: "glass",
  glowStrength: "high",
  particleEffect: "curl-noise",
  particleDensity: "medium",
  animationIntensity: "full",
  animationSpeed: "normal",
  orbStyle: "arc-reactor",
  showGridLines: true,
  showScanlines: true,
  cursorSpotlight: true,
  soundEnabled: false,
  masterMute: false
};

const INITIAL_MESSAGES: JarvisMessage[] = [
  {
    id: "init_1",
    sender: "jarvis",
    text: "Greetings. I am J.A.R.V.I.S., autonomous AI interface for Muhammad Ali (Peshawar, Pakistan). I can brief you on Ali's verified commercial client work (Ivana Studio, Nexcurex, Arshad Tiles), technical case studies, skills, or route inquiries directly to WhatsApp. How may I assist your mission?",
    timestamp: Date.now(),
    isAiGenerated: false
  }
];

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  ...DEFAULT_PRESET,
  viewMode: "portfolio",
  isPreloaderActive: true,
  activeDrawerProject: null,
  isCustomizerOpen: false,

  isJarvisOpen: false,
  isVoiceMuted: false,
  isListening: false,
  isSpeaking: false,
  isAiGenerating: false,
  messages: INITIAL_MESSAGES,

  setTheme: (theme) => {
    set({ theme });
    applyThemeToDOM(theme, get().accentOverride);
    saveUserPrefs();
  },

  setAccentOverride: (accentOverride) => {
    set({ accentOverride });
    applyThemeToDOM(get().theme, accentOverride);
    saveUserPrefs();
  },

  setLayout: (layout) => {
    set({ layout });
    saveUserPrefs();
  },

  setTypography: (typography) => {
    set({ typography });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-font", typography);
    }
    saveUserPrefs();
  },

  setBorderRadius: (borderRadius) => {
    set({ borderRadius });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-radius", borderRadius);
    }
    saveUserPrefs();
  },

  setPanelOpacity: (panelOpacity) => {
    set({ panelOpacity });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-panel-opacity", panelOpacity);
    }
    saveUserPrefs();
  },

  setGlowStrength: (glowStrength) => {
    set({ glowStrength });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-glow", glowStrength);
    }
    saveUserPrefs();
  },

  setParticleEffect: (particleEffect) => {
    set({ particleEffect });
    saveUserPrefs();
  },

  setParticleDensity: (particleDensity) => {
    set({ particleDensity });
    saveUserPrefs();
  },

  setAnimationIntensity: (animationIntensity) => {
    set({ animationIntensity });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-motion", animationIntensity === "off" ? "off" : "on");
    }
    saveUserPrefs();
  },

  setAnimationSpeed: (animationSpeed) => {
    set({ animationSpeed });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-anim-speed", animationSpeed);
    }
    saveUserPrefs();
  },

  setOrbStyle: (orbStyle) => {
    set({ orbStyle });
    saveUserPrefs();
  },

  setShowGridLines: (showGridLines) => {
    set({ showGridLines });
    saveUserPrefs();
  },

  setShowScanlines: (showScanlines) => {
    set({ showScanlines });
    saveUserPrefs();
  },

  setCursorSpotlight: (cursorSpotlight) => {
    set({ cursorSpotlight });
    saveUserPrefs();
  },

  setSoundEnabled: (soundEnabled) => {
    set({ soundEnabled });
    saveUserPrefs();
  },

  setMasterMute: (masterMute) => {
    set({ masterMute, isVoiceMuted: masterMute });
    saveUserPrefs();
  },

  setPreloaderActive: (isPreloaderActive) => set({ isPreloaderActive }),
  setViewMode: (viewMode) => set({ viewMode }),
  openCaseStudy: (activeDrawerProject) => set({ activeDrawerProject }),
  closeCaseStudy: () => set({ activeDrawerProject: null }),
  setCustomizerOpen: (isCustomizerOpen) => set({ isCustomizerOpen }),
  setJarvisOpen: (isJarvisOpen) => set({ isJarvisOpen }),
  setVoiceMuted: (isVoiceMuted) => set({ isVoiceMuted }),
  setIsListening: (isListening) => set({ isListening }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),

  clearConversation: () => {
    set({ messages: INITIAL_MESSAGES });
  },

  sendJarvisMessage: async (text: string) => {
    const userMsg: JarvisMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: Date.now()
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isAiGenerating: true
    }));

    // Server-side provider attempt or fallback knowledge engine
    try {
      let botResponse: { text: string; actionTag?: string; isAiGenerated?: boolean };

      // Optional server request
      const serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      try {
        const res = await fetch(`${serverUrl}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          botResponse = {
            text: data.reply || data.text,
            actionTag: data.actionTag,
            isAiGenerated: true
          };
        } else {
          botResponse = generateDeterministicAnswer(text, get());
        }
      } catch {
        // Fallback to local verified catalog
        botResponse = generateDeterministicAnswer(text, get());
      }

      const botMsg: JarvisMessage = {
        id: `jar_${Date.now()}`,
        sender: "jarvis",
        text: botResponse.text,
        timestamp: Date.now(),
        actionTag: botResponse.actionTag,
        isAiGenerated: botResponse.isAiGenerated ?? false
      };

      set((state) => ({
        messages: [...state.messages, botMsg],
        isAiGenerating: false
      }));

      // Voice synthesis
      if (
        !get().masterMute &&
        !get().isVoiceMuted &&
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(botResponse.text.slice(0, 240));
        utterance.rate = 1.05;
        utterance.pitch = 0.95;
        set({ isSpeaking: true });
        utterance.onend = () => set({ isSpeaking: false });
        utterance.onerror = () => set({ isSpeaking: false });
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      set({ isAiGenerating: false });
    }
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
    if (lower.includes("reduced motion") || lower.includes("turn off animations")) {
      store.setAnimationIntensity("off");
      return;
    }
    if (lower.includes("mute") || lower.includes("stop speaking")) {
      store.setMasterMute(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }
  },

  resetDefaults: () => {
    set({ ...DEFAULT_PRESET });
    applyThemeToDOM(DEFAULT_PRESET.theme, "");
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-font", DEFAULT_PRESET.typography);
      document.documentElement.setAttribute("data-radius", DEFAULT_PRESET.borderRadius);
      document.documentElement.setAttribute("data-panel-opacity", DEFAULT_PRESET.panelOpacity);
      document.documentElement.setAttribute("data-glow", DEFAULT_PRESET.glowStrength);
      document.documentElement.setAttribute("data-motion", "on");
      document.documentElement.setAttribute("data-anim-speed", DEFAULT_PRESET.animationSpeed);
    }
    saveUserPrefs();
  },

  exportPreset: () => {
    const s = get();
    const preset: AppearancePreset = {
      version: 2,
      theme: s.theme,
      accentOverride: s.accentOverride,
      layout: s.layout,
      typography: s.typography,
      borderRadius: s.borderRadius,
      panelOpacity: s.panelOpacity,
      glowStrength: s.glowStrength,
      particleEffect: s.particleEffect,
      particleDensity: s.particleDensity,
      animationIntensity: s.animationIntensity,
      animationSpeed: s.animationSpeed,
      orbStyle: s.orbStyle,
      showGridLines: s.showGridLines,
      showScanlines: s.showScanlines,
      cursorSpotlight: s.cursorSpotlight,
      soundEnabled: s.soundEnabled,
      masterMute: s.masterMute
    };
    return JSON.stringify(preset, null, 2);
  },

  importPreset: (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data || data.version !== 2) return false;
      const store = get();
      if (data.theme) store.setTheme(data.theme);
      if (data.accentOverride !== undefined) store.setAccentOverride(data.accentOverride);
      if (data.layout) store.setLayout(data.layout);
      if (data.typography) store.setTypography(data.typography);
      if (data.borderRadius) store.setBorderRadius(data.borderRadius);
      if (data.panelOpacity) store.setPanelOpacity(data.panelOpacity);
      if (data.glowStrength) store.setGlowStrength(data.glowStrength);
      if (data.particleEffect) store.setParticleEffect(data.particleEffect);
      if (data.particleDensity) store.setParticleDensity(data.particleDensity);
      if (data.animationIntensity) store.setAnimationIntensity(data.animationIntensity);
      if (data.animationSpeed) store.setAnimationSpeed(data.animationSpeed);
      if (data.orbStyle) store.setOrbStyle(data.orbStyle);
      if (data.showGridLines !== undefined) store.setShowGridLines(data.showGridLines);
      if (data.showScanlines !== undefined) store.setShowScanlines(data.showScanlines);
      if (data.cursorSpotlight !== undefined) store.setCursorSpotlight(data.cursorSpotlight);
      if (data.soundEnabled !== undefined) store.setSoundEnabled(data.soundEnabled);
      if (data.masterMute !== undefined) store.setMasterMute(data.masterMute);
      return true;
    } catch {
      return false;
    }
  }
}));

function applyThemeToDOM(theme: ThemeType, customAccent?: string) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "paper-studio") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }
  if (customAccent && /^#[0-9A-Fa-f]{6}$/.test(customAccent)) {
    document.documentElement.style.setProperty("--accent-primary", customAccent);
    document.documentElement.style.setProperty("--border-glow", `${customAccent}99`);
  } else {
    document.documentElement.style.removeProperty("--accent-primary");
    document.documentElement.style.removeProperty("--border-glow");
  }
}

export function loadUserPrefs() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("ali_jarvis_prefs_v2");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || data.version !== 2) return;
    const store = usePortfolioStore.getState();
    if (data.theme) store.setTheme(data.theme);
    if (data.accentOverride !== undefined) store.setAccentOverride(data.accentOverride);
    if (data.layout) store.setLayout(data.layout);
    if (data.typography) store.setTypography(data.typography);
    if (data.borderRadius) store.setBorderRadius(data.borderRadius);
    if (data.panelOpacity) store.setPanelOpacity(data.panelOpacity);
    if (data.glowStrength) store.setGlowStrength(data.glowStrength);
    if (data.particleEffect) store.setParticleEffect(data.particleEffect);
    if (data.particleDensity) store.setParticleDensity(data.particleDensity);
    if (data.animationIntensity) store.setAnimationIntensity(data.animationIntensity);
    if (data.animationSpeed) store.setAnimationSpeed(data.animationSpeed);
    if (data.orbStyle) store.setOrbStyle(data.orbStyle);
    if (data.showGridLines !== undefined) store.setShowGridLines(data.showGridLines);
    if (data.showScanlines !== undefined) store.setShowScanlines(data.showScanlines);
    if (data.cursorSpotlight !== undefined) store.setCursorSpotlight(data.cursorSpotlight);
    if (data.soundEnabled !== undefined) store.setSoundEnabled(data.soundEnabled);
    if (data.masterMute !== undefined) store.setMasterMute(data.masterMute);
  } catch {
    // Ignore storage issues
  }
}

function saveUserPrefs() {
  if (typeof window === "undefined") return;
  const s = usePortfolioStore.getState();
  try {
    const data: AppearancePreset = {
      version: 2,
      theme: s.theme,
      accentOverride: s.accentOverride,
      layout: s.layout,
      typography: s.typography,
      borderRadius: s.borderRadius,
      panelOpacity: s.panelOpacity,
      glowStrength: s.glowStrength,
      particleEffect: s.particleEffect,
      particleDensity: s.particleDensity,
      animationIntensity: s.animationIntensity,
      animationSpeed: s.animationSpeed,
      orbStyle: s.orbStyle,
      showGridLines: s.showGridLines,
      showScanlines: s.showScanlines,
      cursorSpotlight: s.cursorSpotlight,
      soundEnabled: s.soundEnabled,
      masterMute: s.masterMute
    };
    localStorage.setItem("ali_jarvis_prefs_v2", JSON.stringify(data));
  } catch {
    // Ignore storage issues
  }
}

/**
 * Deterministic local fallback knowledge engine answering queries about Muhammad Ali
 */
function generateDeterministicAnswer(
  prompt: string,
  store: PortfolioStore
): { text: string; actionTag?: string; isAiGenerated: boolean } {
  const p = prompt.toLowerCase();

  // Navigation commands
  if (p.includes("biosphere") || p.includes("canvas") || p.includes("simulation") || p.includes("2.5d")) {
    store.setViewMode("biosphere");
    return {
      text: "Activating real-time 2.5D Aetheria Biosphere. Engaging 25 Hz authoritative physics, spatial Moore grid, and procedural audio synthesis.",
      actionTag: "NAV_BIOSPHERE",
      isAiGenerated: false
    };
  }

  if (p.includes("portfolio") || p.includes("showcase") || p.includes("return")) {
    store.setViewMode("portfolio");
    return {
      text: "Returning to Muhammad Ali's primary portfolio terminal HUD.",
      actionTag: "NAV_PORTFOLIO",
      isAiGenerated: false
    };
  }

  if (p.includes("contact") || p.includes("hire") || p.includes("email") || p.includes("whatsapp")) {
    return {
      text: "Muhammad Ali is available for freelance projects and full-stack engagements. You can reach him on WhatsApp at +92 305 5389967 or email at alikhanwebdeveloper@gmail.com.",
      actionTag: "NAV_CONTACT",
      isAiGenerated: false
    };
  }

  // Theme switches via voice or chat
  const themeMap: Record<string, ThemeType> = {
    "iron red": "iron-red",
    "iron man": "iron-red",
    "cyberpunk": "cyberpunk-neon",
    "matrix": "matrix-terminal",
    "arctic": "arctic-glass",
    "midnight": "midnight-purple",
    "emerald": "emerald-professional",
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
        text: `HUD visual theme calibrated to ${themeVal.toUpperCase()}.`,
        actionTag: `THEME_${themeVal}`,
        isAiGenerated: false
      };
    }
  }

  // Projects deep-dive
  if (p.includes("ivana") || p.includes("ivanalexx")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "ivanalexx");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Ivana Studio case study (ivanalexx.com). Designed and built with WordPress & Elementor Pro for an international video producer on Fiverr, featuring multi-format showreels and direct client lead capture.",
      actionTag: "PROJECT_IVANALEXX",
      isAiGenerated: false
    };
  }

  if (p.includes("nexcurex")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "nexcurex");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Nexcurex case study (nexcurex.com). Modern e-commerce fashion storefront featuring product categories, special edition discounts (OFF20), and WooCommerce responsive shopping.",
      actionTag: "PROJECT_NEXCUREX",
      isAiGenerated: false
    };
  }

  if (p.includes("arshad") || p.includes("tile")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "arshad");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Arshad Tiles case study. Ali achieved a 2.1s average load time and 100% mobile friendliness with product showcases and direct WhatsApp inquiry integration (+40% inquiry increase reported on CV).",
      actionTag: "PROJECT_ARSHAD",
      isAiGenerated: false
    };
  }

  if (p.includes("vet") || p.includes("hassan") || p.includes("clinic")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "vet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening VetCarePlus (Malik Hassan Veterinary) case study. Clean medical portal with digital appointment requests, achieving 1.8s load speed and a 35% appointment surge (CV-reported).",
      actionTag: "PROJECT_VET",
      isAiGenerated: false
    };
  }

  if (p.includes("shah") || p.includes("sweet")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "shah-sweet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Shah-Sweet Store case study. Artisanal confectionery catalog engineered with mobile-first layouts and direct WhatsApp order messaging.",
      actionTag: "PROJECT_SHAH_SWEET",
      isAiGenerated: false
    };
  }

  if (p.includes("spatial") || p.includes("multiplayer") || p.includes("ecosystem") || p.includes("aetheria")) {
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "aetheria-ecosystem");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Aetheria 2.5D Collaborative Biosphere flagship case study. Built with Fastify 25 Hz authoritative physics, 60 WU spatial grid, Hermite spline interpolation, synaptic tethers, and climate state machine.",
      actionTag: "PROJECT_AETHERIA",
      isAiGenerated: false
    };
  }

  // Skills & Education
  if (p.includes("skill") || p.includes("tech") || p.includes("stack") || p.includes("wordpress") || p.includes("elementor")) {
    return {
      text: "Muhammad Ali specializes in WordPress (90%), Elementor Pro (90%), Responsive Web Design (90%), HTML5/CSS3 (85%), UI/UX Design (88%), and JavaScript (80%), with active expansion into React 19, Next.js 15, and Three.js.",
      actionTag: "SHOW_SKILLS",
      isAiGenerated: false
    };
  }

  if (p.includes("education") || p.includes("dit") || p.includes("college") || p.includes("peshawar")) {
    return {
      text: "Muhammad Ali is based in Peshawar, Pakistan. He completed his FSc (Pre-Medical) at Peshawar Model Degree College (2025) and is currently pursuing his Diploma of Information Technology (DIT, 2025–Present).",
      actionTag: "SHOW_EDUCATION",
      isAiGenerated: false
    };
  }

  if (p.includes("codevibe") || p.includes("instagram") || p.includes("content")) {
    return {
      text: "Muhammad Ali runs CodeVibe (@codevibe.anim on Instagram & TikTok), creating coding tutorials focused on creative CSS animations, JavaScript micro-interactions, and 2.5D web experiments.",
      actionTag: "SHOW_CODEVIBE",
      isAiGenerated: false
    };
  }

  // Default fallback
  return {
    text: "Understood. Muhammad Ali is a Frontend Developer & Digital Creator specializing in custom WordPress development, landing pages, and UI development. You can ask me to open any case study (Ivana Studio, Nexcurex, Arshad Tiles, VetCarePlus), calibrate themes, or contact Ali directly via WhatsApp.",
    actionTag: "INFO_DEFAULT",
    isAiGenerated: false
  };
}
