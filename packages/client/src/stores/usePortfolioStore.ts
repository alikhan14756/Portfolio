import { create } from "zustand";
import { ProjectCaseStudy, PORTFOLIO_DATA } from "../data/portfolioData";
import { ALI_JARVIS_KNOWLEDGE } from "../data/aliJarvisKnowledge";
import { STYLE_PRESETS, getStylePreset } from "../data/stylePresets";

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
  styleId: string;
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
  favoriteStyles: string[];
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
  // Style Lab (28 Design Systems)
  styleId: string;
  previewStyleId: string | null;
  isStyleLabOpen: boolean;
  favoriteStyles: string[];

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

  // Case Study Drawer, Theme Studio & Style Lab Modals
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
  setStyleId: (id: string) => void;
  setPreviewStyleId: (id: string | null) => void;
  setStyleLabOpen: (open: boolean) => void;
  toggleFavoriteStyle: (id: string) => void;

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
  styleId: "claymorphism",
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
  masterMute: false,
  favoriteStyles: ["glassmorphism", "cyberpunk", "neobrutalism", "aurora", "bento-grid"]
};

const INITIAL_MESSAGES: JarvisMessage[] = [
  {
    id: "init_1",
    sender: "jarvis",
    text: "Assalamu Alaikum! I am Ali AI, Muhammad Ali's personal portfolio assistant and guide. I'm here to answer questions about Ali's real client projects, discuss web development services and rates, or instantly switch between 28 design themes. What would you like to explore?",
    timestamp: Date.now(),
    isAiGenerated: false
  }
];

export interface ConversationContext {
  lastDiscussedProject: string | null;
  lastDiscussedConcept: string | null;
  lastBotText: string;
}

export const convCtx: ConversationContext = {
  lastDiscussedProject: null,
  lastDiscussedConcept: null,
  lastBotText: INITIAL_MESSAGES[0].text
};

export function executeActionTag(actionTag: string | undefined, store: PortfolioStore) {
  if (!actionTag) return;

  if (actionTag === "OPEN_STYLE_LAB") {
    store.setStyleLabOpen(true);
    return;
  }

  if (actionTag.startsWith("STYLE_")) {
    const styleKey = actionTag.replace("STYLE_", "").toLowerCase();
    store.setStyleId(styleKey);
    return;
  }

  if (actionTag.startsWith("THEME_")) {
    const themeKey = actionTag.replace("THEME_", "").toLowerCase() as ThemeType;
    store.setTheme(themeKey);
    return;
  }

  if (actionTag.startsWith("PROJECT_")) {
    const idMap: Record<string, string> = {
      PROJECT_IVANALEXX: "ivanalexx",
      PROJECT_NEXCUREX: "nexcurex",
      PROJECT_ARSHAD: "arshad",
      PROJECT_VET: "vet",
      PROJECT_SHAH_SWEET: "shah-sweet",
      PROJECT_AETHERIA: "aetheria-ecosystem"
    };
    const projId = idMap[actionTag] || actionTag.replace("PROJECT_", "").toLowerCase();
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projId);
    if (proj) store.openCaseStudy(proj);
    return;
  }

  if (actionTag === "NAV_BIOSPHERE") {
    store.setViewMode("biosphere");
    return;
  }

  if (actionTag === "NAV_PORTFOLIO") {
    store.setViewMode("portfolio");
    return;
  }

  if (actionTag.startsWith("NAV_")) {
    const sectionName = actionTag.replace("NAV_", "").toLowerCase();
    if (typeof document !== "undefined") {
      const el = document.getElementById(sectionName);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  if (actionTag === "ACTION_REDUCED_MOTION_ON") {
    store.setAnimationIntensity("off");
    return;
  }

  if (actionTag === "ACTION_REDUCED_MOTION_OFF") {
    store.setAnimationIntensity("full");
    return;
  }

  if (actionTag === "ACTION_MUTE") {
    store.setMasterMute(true);
    return;
  }

  if (actionTag === "ACTION_UNMUTE") {
    store.setMasterMute(false);
    return;
  }

  if (actionTag === "DOWNLOAD_CV") {
    if (typeof window !== "undefined") {
      window.open("/Muhammad_Ali_CV.pdf", "_blank");
    }
    return;
  }
}

// Direct Google Gemini AI helper with automatic multi-model fallback and speed optimization
async function callGeminiDirectly(
  userText: string,
  history: Array<{ sender: string; text: string }>
): Promise<string | null> {
  const apiKey = (() => {
    try {
      if (typeof window !== "undefined") {
        const custom = localStorage.getItem("gemini_api_key") || localStorage.getItem("ali_ai_key");
        if (custom && custom.trim()) return custom.trim();
      }
      return typeof atob === "function"
        ? atob("QVEuQWI4Uk42SktqNVRqdzA4VDlyWEhKb0VTQlRwWHJmWnUwci1NWDU5YkhTQ01IM21YWWc=")
        : "";
    } catch {
      return "";
    }
  })();

  if (!apiKey) return null;

  const sysInstruction =
    "You are Ali AI, the intelligent, friendly, and expert AI assistant for Muhammad Ali's developer portfolio (alibuild.site). " +
    "About Muhammad Ali: Frontend Developer and BS Nursing (BSN) scholar based in Peshawar, Pakistan with 2+ years of verified commercial delivery. " +
    "Dual Discipline: His formal academic field is medical science (BS Nursing), which instills clinical precision, zero tolerance for errors, and deep user empathy. Coding and web development is his passionate craft & specialized hobby where he excels at engineering fast, modern, and high-converting client websites. " +
    "Real client projects: Ivana Studio (luxury fashion boutique e-commerce), Nexcurex (crypto fintech trading platform), Arshad Tiles (commercial ceramics distributor), VetCarePlus (veterinary clinic management portal), and Shah Sweet (artisan confectionery store). " +
    "Services & Pricing: High-Converting Landing Pages ($150-$350, 2-4 days), Custom Business WordPress Sites with Elementor Pro ($300-$600, 5-9 days), Full WooCommerce E-Commerce Stores ($500-$1,200+, 10-14 days), Speed & Core Web Vitals Optimization ($100-$250, 1-3 days). Hourly rate: $25-$40/hr. WhatsApp: +92 305 5389967. Email: alikhanwebdeveloper@gmail.com. " +
    "Core Skills: React 19, Next.js 15, TypeScript, Tailwind CSS, WordPress, Elementor Pro, WooCommerce, Framer Motion, GSAP, Three.js, REST APIs, and 98+ PageSpeed optimization. " +
    "Education: BS Nursing (BSN) in Progress (2025-Present), FSc Pre-Medical (Graduated 2025), Diploma in Information Technology (DIT, 2025-Present). " +
    "CRITICAL CAPABILITY: You are ALSO a brilliant, versatile, general-purpose AI assistant! You CAN and MUST answer ANY question the user asks — including smart glasses & wearable tech (like Ray-Ban Meta smart glasses, Apple Vision Pro), programming in any language, science, medical science, history, general knowledge, design advice, or life questions! " +
    "Style: Be engaging, warm, professional, and direct. Keep answers concise (2 to 4 sentences maximum) so they are easy to read in a portfolio chat popup. Never refer to yourself as Jarvis.";

  const historyPayload = history.slice(-4).map((m) => ({
    role: m.sender === "user" ? "user" : "model",
    parts: [{ text: m.text }]
  }));

  const candidateModels = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];

  for (const model of candidateModels) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: sysInstruction }] },
            contents: [
              ...historyPayload,
              { role: "user", parts: [{ text: userText }] }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350
            }
          }),
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply && reply.trim().length > 0) {
          return reply.trim();
        }
      }
    } catch {
      // Try next model if timeout or network issue occurs
    }
  }

  return null;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  ...DEFAULT_PRESET,
  viewMode: "portfolio",
  isPreloaderActive: false,
  activeDrawerProject: null,
  isCustomizerOpen: false,
  isStyleLabOpen: false,
  previewStyleId: null,

  isJarvisOpen: false,
  isVoiceMuted: false,
  isListening: false,
  isSpeaking: false,
  isAiGenerating: false,
  messages: INITIAL_MESSAGES,

  setStyleId: (styleId: string) => {
    set({ styleId });
    applyStyleToDOM(styleId, get().accentOverride);
    saveUserPrefs();
  },

  setPreviewStyleId: (previewStyleId: string | null) => {
    set({ previewStyleId });
    if (previewStyleId) {
      applyStyleToDOM(previewStyleId, get().accentOverride);
    } else {
      applyStyleToDOM(get().styleId, get().accentOverride);
    }
  },

  setStyleLabOpen: (isStyleLabOpen: boolean) => set({ isStyleLabOpen }),

  toggleFavoriteStyle: (id: string) => {
    set((state) => {
      const exists = state.favoriteStyles.includes(id);
      const next = exists
        ? state.favoriteStyles.filter((s) => s !== id)
        : [...state.favoriteStyles, id];
      return { favoriteStyles: next };
    });
    saveUserPrefs();
  },

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

    try {
      let botResponse: { text: string; actionTag?: string; isAiGenerated?: boolean };

      // 1. Generate local deterministic answer to check for direct UI commands or fallback
      const deterministic = generateDeterministicAnswer(text, get(), convCtx);

      // If the user issued a direct UI action command (switch style, switch theme, open project, nav), execute immediately
      const isStrictUiAction =
        deterministic.actionTag &&
        (deterministic.actionTag.startsWith("STYLE_") ||
         deterministic.actionTag.startsWith("THEME_") ||
         deterministic.actionTag.startsWith("PROJECT_") ||
         deterministic.actionTag.startsWith("NAV_") ||
         deterministic.actionTag.startsWith("ACTION_") ||
         deterministic.actionTag === "OPEN_STYLE_LAB" ||
         deterministic.actionTag === "DOWNLOAD_CV");

      if (isStrictUiAction) {
        botResponse = deterministic;
      } else {
        // 2. For questions, conversations, and general queries (Meta glasses, tech, pricing, skills, greetings):
        // Directly call Google Gemini AI in real-time
        const historyPayload = get().messages.slice(-6).map((m) => ({
          sender: m.sender,
          text: m.text
        }));

        const geminiText = await callGeminiDirectly(text, historyPayload);

        if (geminiText) {
          botResponse = {
            text: geminiText,
            actionTag: "AI_GENERATED",
            isAiGenerated: true
          };
        } else {
          // Instant safe fallback to local knowledge base
          botResponse = deterministic;
        }
      }

      // Automatically execute any requested theme change, project opening, or navigation
      executeActionTag(botResponse.actionTag, get());
      convCtx.lastBotText = botResponse.text;

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
      styleId: s.styleId,
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
      masterMute: s.masterMute,
      favoriteStyles: s.favoriteStyles
    };
    return JSON.stringify(preset, null, 2);
  },

  importPreset: (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data || data.version !== 2) return false;
      const store = get();
      if (data.styleId) store.setStyleId(data.styleId);
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
      if (data.favoriteStyles && Array.isArray(data.favoriteStyles)) {
        usePortfolioStore.setState({ favoriteStyles: data.favoriteStyles });
      }
      return true;
    } catch {
      return false;
    }
  }
}));

export function applyStyleToDOM(styleId: string, customAccent?: string) {
  if (typeof document === "undefined") return;
  const preset = getStylePreset(styleId);
  document.documentElement.setAttribute("data-style", styleId);
  document.documentElement.setAttribute("data-theme", styleId);

  // Sync background theme class and atmosphere attribute
  if (preset.themeMode === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.documentElement.setAttribute("data-theme-mode", "light");
    document.documentElement.setAttribute("data-atmosphere", "none");
  } else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.setAttribute("data-theme-mode", "dark");
    document.documentElement.setAttribute("data-atmosphere", "block");
  }

  if (customAccent && /^#[0-9A-Fa-f]{6}$/.test(customAccent)) {
    document.documentElement.style.setProperty("--accent-primary", customAccent);
    document.documentElement.style.setProperty("--border-glow", `${customAccent}99`);
  } else {
    document.documentElement.style.removeProperty("--accent-primary");
    document.documentElement.style.removeProperty("--border-glow");
  }
}

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
    const params = new URLSearchParams(window.location.search);
    const keyParam = params.get("set_ai_key") || params.get("gemini_key");
    if (keyParam) {
      localStorage.setItem("gemini_api_key", keyParam.trim());
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {}
    }

    const raw = localStorage.getItem("ali_jarvis_prefs_v2");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || data.version !== 2) return;
    const store = usePortfolioStore.getState();
    if (data.styleId) store.setStyleId(data.styleId);
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
    if (data.favoriteStyles && Array.isArray(data.favoriteStyles)) {
      usePortfolioStore.setState({ favoriteStyles: data.favoriteStyles });
    }
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
      styleId: s.styleId,
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
      masterMute: s.masterMute,
      favoriteStyles: s.favoriteStyles
    };
    localStorage.setItem("ali_jarvis_prefs_v2", JSON.stringify(data));
  } catch {
    // Ignore storage issues
  }
}

/**
 * Intelligent deterministic knowledge & conversational FAQ engine answering queries about Muhammad Ali
 */
function generateDeterministicAnswer(
  prompt: string,
  store: PortfolioStore,
  ctx: ConversationContext
): { text: string; actionTag?: string; isAiGenerated: boolean } {
  const p = prompt.toLowerCase().trim();

  // 1. ISLAMIC GREETINGS
  if (/\b(assalam|asalam|aslam|salam|slam|slm|aoa|walaykum|walaikum)\b/i.test(p) || p.includes("salam") || p.includes("alaikum") || p.includes("alaykum")) {
    return {
      text: "Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! (وَعَلَيْكُمُ ٱلسَّلَامُ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ) Welcome to Muhammad Ali's portfolio! How are you doing today? I am Ali AI, Ali's interactive portfolio assistant and guide. How can I help you? You can ask about Ali's real client projects, services, pricing, skills, or tell me to switch the theme!",
      actionTag: "GREETING_SALAM",
      isAiGenerated: false
    };
  }

  // 2. STANDARD GREETINGS ("Hi", "Hello", "Hey", "Good morning", "Good evening", "Can we talk")
  if (
    /^(hi|hello|hey|hiya|howdy|sup|yo|good\s*(morning|afternoon|evening|day)|greetings)\b/i.test(p) ||
    p.includes("can we talk") ||
    p.includes("are you there") ||
    p.includes("talk to me") ||
    p === "jarvis"
  ) {
    return {
      text: "Hello! Welcome to Muhammad Ali's portfolio. I am Ali AI, Muhammad Ali's personal assistant and guide. How can I assist you today? You can ask about Ali's commercial client work (like Ivana Studio and Nexcurex), explore web development services and rates, or tell me to switch styles like 'change theme to glassmorphism'!",
      actionTag: "GREETING",
      isAiGenerated: false
    };
  }

  
  // 3B. "WHAT IS YOUR FAVORITE THEME?"
  if (
    p.includes("favorite theme") ||
    p.includes("favourite theme") ||
    p.includes("best theme") ||
    p.includes("fav theme") ||
    p.includes("theme do you like") ||
    p.includes("which theme") ||
    p.includes("recommend a theme") ||
    p.includes("suggest a theme")
  ) {
    return {
      text: "My personal favorite theme is **Vaporwave** for its gorgeous Miami sunset pastel colors and **Liquid Glass** for its refreshing turquoise lagoon shine! I also really love **Claymorphism** for its soft 3D puffy cards and **Aurora UI** for its glowing northern lights waves. Which one would you like to see? You can say 'switch to vaporwave' or click any theme in the marquee bar above!",
      actionTag: "FAVORITE_THEME",
      isAiGenerated: false
    };
  }

  // 3. "HOW ARE YOU?"
  if (
    p.includes("how are you") ||
    p.includes("how r u") ||
    p.includes("how do you do") ||
    p.includes("how's it going") ||
    p.includes("how are things") ||
    p.includes("whats up") ||
    p.includes("what's up")
  ) {
    return {
      text: "I'm doing fantastic, thank you so much for asking! All systems are running smoothly and looking vibrant. How are you doing today? Can I show you some of Muhammad Ali's client projects or switch to your favorite theme? How are you doing today, and how can I help you explore Muhammad Ali's portfolio?",
      actionTag: "STATUS_NOMINAL",
      isAiGenerated: false
    };
  }

  // 4. "WHAT IS YOUR NAME?" / "WHO ARE YOU?"
  if (
    p.includes("what is your name") ||
    p.includes("what's your name") ||
    p.includes("your name") ||
    (p.includes("who are you") && !p.includes("who are you to")) ||
    p.includes("what are you")
  ) {
    return {
      text: "My name is Ali AI! I am Muhammad Ali's interactive portfolio companion and AI assistant. I'm here to help you explore Ali's client websites, inspect technical case studies, review pricing, and calibrate visual themes.",
      actionTag: "IDENTITY_JARVIS",
      isAiGenerated: false
    };
  }

  // 5. "WHO CREATED YOU?" / "WHO MADE YOU?"
  if (
    p.includes("who created you") ||
    p.includes("who made you") ||
    p.includes("who built you") ||
    p.includes("who developed you") ||
    p.includes("who programmed you")
  ) {
    return {
      text: "I was created, designed, and engineered by Muhammad Ali! He is a Senior Frontend Developer and Digital Creator based in Peshawar, Pakistan, as an interactive companion for his digital portfolio.",
      actionTag: "CREATOR_INFO",
      isAiGenerated: false
    };
  }

  // 6. "WHAT CAN YOU DO?"
  if (
    p.includes("what can you do") ||
    p.includes("what are your capabilities") ||
    p.includes("what do you do") ||
    p.includes("what are you capable of")
  ) {
    return {
      text: "I can assist you with:\n1. Discovering client projects: Ivana Studio (ivanalexx.com), Nexcurex (nexcurex.com), Arshad Tiles, VetCarePlus, and Shah Sweet.\n2. Checking pricing & timelines: Landing pages ($150-$350), WordPress sites ($300-$600), WooCommerce stores ($500-$1,200+).\n3. Visual customization: Switching between all 28 design styles (Claymorphism, Glassmorphism, Cyberpunk, Neobrutalism, etc.).\n4. Audio & accessibility: Toggle reduced motion or mute voice reading.\n5. Explaining web technologies: WordPress, Elementor, React, Three.js, and PageSpeed optimization.\n6. Direct contact: Routing you directly to Muhammad Ali on WhatsApp (+92 305 5389967).",
      actionTag: "CAPABILITIES",
      isAiGenerated: false
    };
  }

  // 7. "CAN YOU HELP ME?"
  if (
    p.includes("can you help me") ||
    p.includes("help me") ||
    p.includes("i need help") ||
    p.includes("assist me")
  ) {
    return {
      text: "I would be glad to help! What are you looking to do? You can:\n• Explore Ali's client case studies (Ivana Studio, Nexcurex, Arshad Tiles)\n• Inquire about website pricing and delivery timelines\n• Switch themes (try saying 'switch to cyberpunk' or 'make it lighter')\n• Contact Muhammad Ali directly on WhatsApp for a custom quote",
      actionTag: "HELP",
      isAiGenerated: false
    };
  }

  // 8. "THANK YOU"
  if (
    p.includes("thank") ||
    p.includes("thanks") ||
    p.includes("thx") ||
    p.includes("appreciate") ||
    p.includes("jazakallah")
  ) {
    return {
      text: "You're very welcome! It's my pleasure to assist you. If you have any questions about launching a new website with Ali or reviewing his code, just let me know.",
      actionTag: "THANK_YOU",
      isAiGenerated: false
    };
  }

  // 9. "GOODBYE"
  if (
    p.includes("bye") ||
    p.includes("goodbye") ||
    p.includes("see you") ||
    p.includes("see ya") ||
    p.includes("cya") ||
    p.includes("farewell") ||
    p.includes("take care")
  ) {
    return {
      text: "Goodbye! Thank you for visiting Muhammad Ali's portfolio. Feel free to reach out anytime on WhatsApp at +92 305 5389967 or email alikhanwebdeveloper@gmail.com. Have a wonderful day!",
      actionTag: "FAREWELL",
      isAiGenerated: false
    };
  }

  // 10. "TELL ME A JOKE"
  if (p.includes("joke") || p.includes("funny") || p.includes("make me laugh") || p.includes("humor")) {
    const jokes = [
      "Why do frontend developers prefer dark mode? Because light attracts bugs! Fortunately, Muhammad Ali ensures bug-free code across all 12 themes.",
      "There are 10 types of people in the world: those who understand binary, and those who don't! Ali happens to speak binary, JavaScript, and PHP fluently.",
      "Why did the web developer leave the restaurant? Because of the terrible table layout! Ali uses CSS Grid and Flexbox to keep everything perfectly aligned."
    ];
    const picked = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      text: picked,
      actionTag: "JOKE",
      isAiGenerated: false
    };
  }

  // 11. "TELL ME SOMETHING INTERESTING"
  if (
    p.includes("something interesting") ||
    p.includes("interesting fact") ||
    p.includes("fun fact") ||
    p.includes("tell me a fact")
  ) {
    return {
      text: "Here's something interesting: According to Google research, 53% of mobile visits are abandoned if pages take longer than 3 seconds to load. That is why Muhammad Ali prioritizes Core Web Vitals and asset compression, achieving 1.8s to 2.1s load speeds on projects like Arshad Tiles and VetCarePlus, which generated a +40% surge in inquiries!",
      actionTag: "INTERESTING_FACT",
      isAiGenerated: false
    };
  }

  // 12. "WHAT TIME IS IT?"
  if (
    p.includes("what time is it") ||
    p.includes("what's the time") ||
    p.includes("current time") ||
    p.includes("time now") ||
    p.includes("what is the time")
  ) {
    const visitorTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const pktTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit"
    });
    return {
      text: `Your current local time is ${visitorTime}. In Peshawar, Pakistan (where Muhammad Ali is based, PKT / UTC+5), the current time is ${pktTime}. Muhammad Ali operates across flexible global timezones for client collaboration!`,
      actionTag: "TIME_CHECK",
      isAiGenerated: false
    };
  }

  // 13. MULTI-TURN FOLLOW-UP: "CAN YOU REPEAT THAT?"
  if (
    p.includes("repeat that") ||
    p.includes("say that again") ||
    p.includes("what did you say") ||
    p.includes("can you repeat") ||
    p.includes("repeat please")
  ) {
    const prev = ctx.lastBotText || "I haven't said anything yet! How can I assist you with Muhammad Ali's portfolio today?";
    return {
      text: `Here is what I said earlier:\n\n"${prev}"`,
      actionTag: "REPEAT_LAST",
      isAiGenerated: false
    };
  }

  // 14. MULTI-TURN FOLLOW-UP: "PLEASE SUMMARIZE THAT"
  if (
    p.includes("summarize") ||
    p.includes("summary") ||
    p.includes("in short") ||
    p.includes("tldr") ||
    p.includes("tl;dr") ||
    p.includes("briefly")
  ) {
    if (ctx.lastDiscussedProject === "ivanalexx") {
      return {
        text: "Summary: Ivana Studio is a luxury video production portfolio built by Ali using WordPress & Elementor Pro, featuring cinematic video lightboxes, sub-2.2s loading, and high-conversion client inquiry forms.",
        actionTag: "SUMMARY_IVANALEXX",
        isAiGenerated: false
      };
    } else if (ctx.lastDiscussedProject === "nexcurex") {
      return {
        text: "Summary: Nexcurex is a modern fashion e-commerce storefront engineered by Ali on WooCommerce with dynamic discount codes (OFF20), product category filters, and a mobile-optimized checkout.",
        actionTag: "SUMMARY_NEXCUREX",
        isAiGenerated: false
      };
    } else if (ctx.lastDiscussedProject === "arshad") {
      return {
        text: "Summary: Arshad Tiles is a ceramic catalog site with direct WhatsApp order routing and a 2.1s load time that produced a CV-reported +40% surge in inquiries.",
        actionTag: "SUMMARY_ARSHAD",
        isAiGenerated: false
      };
    } else if (ctx.lastDiscussedProject === "vet") {
      return {
        text: "Summary: VetCarePlus is a veterinary clinic portal featuring online appointment requests, 1.8s load speed, and a CV-reported +35% appointment surge.",
        actionTag: "SUMMARY_VET",
        isAiGenerated: false
      };
    } else {
      return {
        text: "Summary: Muhammad Ali is a Peshawar-based Frontend Developer with 2+ years of verified commercial delivery specializing in custom WordPress/Elementor websites, WooCommerce e-commerce, and high-performance Web Vitals optimization.",
        actionTag: "SUMMARY_GENERAL",
        isAiGenerated: false
      };
    }
  }

  // 15. MULTI-TURN FOLLOW-UP: "CAN YOU EXPLAIN THIS SIMPLY?" / "I DON'T UNDERSTAND"
  if (
    p.includes("explain this simply") ||
    p.includes("explain simply") ||
    p.includes("i don't understand") ||
    p.includes("dont understand") ||
    p.includes("simple terms") ||
    p.includes("like i'm 5") ||
    p.includes("eli5")
  ) {
    if (ctx.lastDiscussedConcept && ALI_JARVIS_KNOWLEDGE.educationalConcepts[ctx.lastDiscussedConcept]) {
      return {
        text: `In simple terms: ${ALI_JARVIS_KNOWLEDGE.educationalConcepts[ctx.lastDiscussedConcept].beginner}`,
        actionTag: `EXPLAIN_${ctx.lastDiscussedConcept}`,
        isAiGenerated: false
      };
    }
    return {
      text: "Think of a website like a physical retail storefront: HTML builds the walls, CSS paints the decor, JavaScript adds the automatic sliding doors, and WordPress gives the shopkeeper an easy cash register to update merchandise without rebuilding the store! Ali builds every site so it is fast, welcoming, and easy for customers to buy from.",
      actionTag: "EXPLAIN_SIMPLE",
      isAiGenerated: false
    };
  }

  // 16. MULTI-TURN FOLLOW-UP: "TELL ME MORE"
  if (
    p.includes("tell me more") ||
    p.includes("more details") ||
    p.includes("expand") ||
    p.includes("elaborate") ||
    p.includes("go on")
  ) {
    if (ctx.lastDiscussedProject) {
      const proj = ALI_JARVIS_KNOWLEDGE.clientProjects.find((pr) => pr.id === ctx.lastDiscussedProject);
      if (proj) {
        return {
          text: `Here is a deeper look at ${proj.name}:\nRole: ${proj.role}\nTech Stack: ${proj.technologies.join(", ")}\nPerformance Metrics: ${proj.metrics}\nOverview: ${proj.detailedOverview}\n\nWould you like me to open the full case study drawer for ${proj.name}?`,
          actionTag: `PROJECT_${proj.id.toUpperCase()}`,
          isAiGenerated: false
        };
      }
    }
    return {
      text: "Muhammad Ali has 2+ years of verified commercial client delivery, working with both international creators (such as video director Ivana Alexx on Fiverr) and local retail enterprises (Nexcurex and Arshad Tiles). He is currently pursuing BS Nursing (BSN), bridging medical science discipline and empathy with passionate web engineering. Would you like to review his services, check pricing, or see specific project case studies?",
      actionTag: "TELL_ME_MORE",
      isAiGenerated: false
    };
  }

  // 17. MULTI-TURN FOLLOW-UP: "SHOW ME THAT PROJECT" / "OPEN THAT PROJECT"
  if (
    p.includes("show me that project") ||
    p.includes("open that project") ||
    p.includes("open project") ||
    p.includes("show project") ||
    p.includes("view that project")
  ) {
    const projId = ctx.lastDiscussedProject || "ivanalexx";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === projId);
    if (proj) {
      store.openCaseStudy(proj);
      return {
        text: `Opening the ${proj.title} case study drawer right now!`,
        actionTag: `PROJECT_${projId.toUpperCase()}`,
        isAiGenerated: false
      };
    }
  }

  // 18. QUICK THEME ADJUSTMENTS ("Make it darker", "Make it lighter")
  if (p.includes("make it darker") || p.includes("darker") || p.includes("dark mode")) {
    store.setTheme("jarvis-core");
    return {
      text: "Calibrated HUD to high-contrast dark theme (JARVIS CORE). Deep space navy with cyan luminescence.",
      actionTag: "THEME_jarvis-core",
      isAiGenerated: false
    };
  }

  if (p.includes("make it lighter") || p.includes("lighter") || p.includes("light mode") || p.includes("bright mode")) {
    store.setTheme("paper-studio");
    return {
      text: "Calibrated HUD to light theme (PAPER STUDIO). Editorial warm bone linen paper with slate typography and high daylight legibility.",
      actionTag: "THEME_paper-studio",
      isAiGenerated: false
    };
  }

  // 19. ACCESSIBILITY & AUDIO COMMANDS
  if (
    p.includes("reduced motion") ||
    p.includes("turn off animation") ||
    p.includes("disable animation") ||
    p.includes("stop animation") ||
    p.includes("less motion")
  ) {
    store.setAnimationIntensity("off");
    return {
      text: "Reduced motion mode activated. Canvas particle fields, 3D rotations, and layout transitions have been minimized for accessibility.",
      actionTag: "ACTION_REDUCED_MOTION_ON",
      isAiGenerated: false
    };
  }

  if (
    p.includes("turn on animation") ||
    p.includes("enable animation") ||
    p.includes("restore animation") ||
    p.includes("full motion")
  ) {
    store.setAnimationIntensity("full");
    return {
      text: "Full motion animation systems restored. Fluid particles, 3D reactor nodes, and reactive transforms are now active.",
      actionTag: "ACTION_REDUCED_MOTION_OFF",
      isAiGenerated: false
    };
  }

  if (p.includes("mute") || p.includes("stop speaking") || p.includes("silence") || p.includes("be quiet")) {
    store.setMasterMute(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    return {
      text: "Speech synthesis muted. Audio output is now silenced.",
      actionTag: "ACTION_MUTE",
      isAiGenerated: false
    };
  }

  if (p.includes("unmute") || p.includes("speak again") || p.includes("enable audio")) {
    store.setMasterMute(false);
    return {
      text: "Voice speech synthesis unmuted. Audio responses will be read aloud.",
      actionTag: "ACTION_UNMUTE",
      isAiGenerated: false
    };
  }

  // 20. STYLE LAB & SPECIFIC DESIGN SYSTEM SWITCHES (28 Presets)
  if (
    p.includes("style lab") ||
    p.includes("open styles") ||
    p.includes("design systems") ||
    p.includes("show styles")
  ) {
    store.setStyleLabOpen(true);
    return {
      text: "Opening the interactive Style Lab. You can browse and live-preview all 28 distinct modern design systems, from Glassmorphism and Neumorphism to Neobrutalism, Bento Grid, and Industrial Technical CAD.",
      actionTag: "OPEN_STYLE_LAB",
      isAiGenerated: false
    };
  }

  for (const preset of STYLE_PRESETS) {
    const matchId = preset.id.replace(/-/g, " ");
    const matchName = preset.name.toLowerCase();
    const hasName = p.includes(matchName) || p.includes(matchId) || p.includes(preset.id);
    const isCommand = /theme|style|change|switch|apply|use|set|activate|enable|make|turn|like|show|try|view|want/.test(p);
    const isShortQuery = p.split(/\s+/).length <= 4;

    if (hasName && (isCommand || isShortQuery)) {
      store.setStyleId(preset.id);
      return {
        text: `Design system calibrated to ${preset.name.toUpperCase()}!\n${preset.shortDesc}\n\nThe entire website has been restyled in real-time. You can also ask me to switch to other styles like Aurora, Neobrutalism, Cyberpunk, or Minimalist.`,
        actionTag: `STYLE_${preset.id}`,
        isAiGenerated: false
      };
    }
  }

  // 20b. SPECIFIC THEME SWITCHES (All 12 Themes)
  const themeMap: Record<string, ThemeType> = {
    "jarvis core": "jarvis-core",
    "jarvis": "jarvis-core",
    "iron red": "iron-red",
    "iron man": "iron-red",
    "cyberpunk neon": "cyberpunk-neon",
    "cyberpunk": "cyberpunk-neon",
    "matrix terminal": "matrix-terminal",
    "matrix": "matrix-terminal",
    "arctic glass": "arctic-glass",
    "arctic": "arctic-glass",
    "midnight purple": "midnight-purple",
    "midnight": "midnight-purple",
    "emerald professional": "emerald-professional",
    "emerald pro": "emerald-professional",
    "emerald": "emerald-professional",
    "solar gold": "solar-gold",
    "solar": "solar-gold",
    "ocean blue": "ocean-blue",
    "ocean": "ocean-blue",
    "rose neon": "rose-neon",
    "rose": "rose-neon",
    "paper studio": "paper-studio",
    "paper": "paper-studio",
    "monochrome": "monochrome"
  };

  for (const [key, themeVal] of Object.entries(themeMap)) {
    if (
      p.includes(`switch to ${key}`) ||
      p.includes(`theme ${key}`) ||
      p.includes(`set ${key}`) ||
      p.includes(`${key} theme`)
    ) {
      store.setTheme(themeVal);
      const desc = ALI_JARVIS_KNOWLEDGE.themeDescriptions[themeVal] || "Theme active.";
      return {
        text: `HUD visual theme calibrated to ${themeVal.toUpperCase()}.\n${desc}`,
        actionTag: `THEME_${themeVal}`,
        isAiGenerated: false
      };
    }
  }

  // 21. PROJECTS DEEP-DIVE
  if (p.includes("ivana") || p.includes("ivanalexx")) {
    ctx.lastDiscussedProject = "ivanalexx";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "ivanalexx");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Ivana Studio case study (ivanalexx.com). Designed and built with WordPress & Elementor Pro for an international video producer on Fiverr, featuring multi-format showreels, cinematic video lightboxes, sub-2.2s load speed, and direct client lead capture.",
      actionTag: "PROJECT_IVANALEXX",
      isAiGenerated: false
    };
  }

  if (p.includes("nexcurex")) {
    ctx.lastDiscussedProject = "nexcurex";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "nexcurex");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Nexcurex case study (nexcurex.com). A modern fashion e-commerce storefront featuring WooCommerce product categories, special edition discounts (OFF20), dynamic coupon codes, and a responsive mobile cart drawer.",
      actionTag: "PROJECT_NEXCUREX",
      isAiGenerated: false
    };
  }

  if (p.includes("arshad") || p.includes("tile")) {
    ctx.lastDiscussedProject = "arshad";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "arshad");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Arshad Tiles case study. Ali built a high-performance ceramic catalog site with a 2.1s average load time and 100% mobile responsiveness, resulting in a CV-reported +40% surge in customer inquiries through direct WhatsApp order integration.",
      actionTag: "PROJECT_ARSHAD",
      isAiGenerated: false
    };
  }

  if (p.includes("vet") || p.includes("hassan") || p.includes("clinic")) {
    ctx.lastDiscussedProject = "vet";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "vet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening VetCarePlus (Malik Hassan Veterinary Clinic) case study. Clean medical portal with online appointment booking, achieving a 1.8s load speed and a CV-reported +35% appointment surge.",
      actionTag: "PROJECT_VET",
      isAiGenerated: false
    };
  }

  if (p.includes("shah") || p.includes("sweet")) {
    ctx.lastDiscussedProject = "shah-sweet";
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "shah-sweet");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Shah-Sweet Store case study. Artisanal confectionery catalog engineered with mobile-first menu navigation and direct WhatsApp order messaging.",
      actionTag: "PROJECT_SHAH_SWEET",
      isAiGenerated: false
    };
  }

  if (
    p.includes("spatial") ||
    p.includes("multiplayer") ||
    p.includes("ecosystem") ||
    p.includes("aetheria") ||
    p.includes("biosphere")
  ) {
    ctx.lastDiscussedProject = "aetheria-ecosystem";
    if (p.includes("switch") || p.includes("go to") || p.includes("activate")) {
      store.setViewMode("biosphere");
      return {
        text: "Activating real-time 2.5D Aetheria Biosphere. Engaging 25 Hz authoritative Fastify physics, 60 WU spatial Moore grid, Hermite spline interpolation, synaptic tethers, and procedural audio synthesis.",
        actionTag: "NAV_BIOSPHERE",
        isAiGenerated: false
      };
    }
    const proj = PORTFOLIO_DATA.projects.find((pr) => pr.id === "aetheria-ecosystem");
    if (proj) store.openCaseStudy(proj);
    return {
      text: "Opening Aetheria 2.5D Collaborative Biosphere flagship case study. Built with Fastify 25 Hz authoritative physics, 60 WU spatial grid, Hermite spline interpolation, synaptic tethers, and climate state machine.",
      actionTag: "PROJECT_AETHERIA",
      isAiGenerated: false
    };
  }

  // 22. EDUCATIONAL CONCEPTS (WordPress vs React, Three.js, Responsive Design, PageSpeed)
  if (p.includes("wordpress") || p.includes("elementor")) {
    ctx.lastDiscussedConcept = "wordpress-elementor";
    return {
      text: "WordPress powers over 40% of the entire web. Ali builds custom WordPress websites using Elementor Pro, which gives clients full visual control to edit content easily, paired with custom CSS and asset dequeuing to ensure sub-2-second load times.",
      actionTag: "CONCEPT_WORDPRESS",
      isAiGenerated: false
    };
  }

  if (p.includes("threejs") || p.includes("three.js") || p.includes("webgl") || p.includes("3d")) {
    ctx.lastDiscussedConcept = "threejs-webgl";
    return {
      text: "Three.js is a WebGL-powered 3D graphics library. On this portfolio, it powers the interactive 3D Arc Reactor Hologram and the real-time 2.5D Aetheria Biosphere simulation, rendering particles and meshes via custom GLSL shaders without bogging down browser performance.",
      actionTag: "CONCEPT_THREEJS",
      isAiGenerated: false
    };
  }

  if (p.includes("responsive") || p.includes("mobile friendly") || p.includes("mobile")) {
    ctx.lastDiscussedConcept = "responsive-design";
    return {
      text: "Responsive design ensures websites automatically adapt seamlessly across mobile phones, tablets, laptops, and 4K desktop screens using fluid grids, flexbox, and dynamic rem typography with zero layout shifts.",
      actionTag: "CONCEPT_RESPONSIVE",
      isAiGenerated: false
    };
  }

  if (p.includes("pagespeed") || p.includes("web vitals") || p.includes("speed") || p.includes("optimization")) {
    ctx.lastDiscussedConcept = "pagespeed-optimization";
    return {
      text: "PageSpeed optimization focuses on Google Core Web Vitals: Largest Contentful Paint (LCP < 2.5s) and Cumulative Layout Shift (CLS < 0.1). Ali optimizes websites through Brotli compression, WebP image conversion, asset minification, and critical CSS rendering.",
      actionTag: "CONCEPT_PAGESPEED",
      isAiGenerated: false
    };
  }

  // 23. PRICING, BUDGET & RATES FAQ
  if (
    p.includes("price") ||
    p.includes("cost") ||
    p.includes("rate") ||
    p.includes("how much") ||
    p.includes("budget") ||
    p.includes("quote") ||
    p.includes("fee") ||
    p.includes("charge")
  ) {
    return {
      text: "Muhammad Ali offers transparent, competitive pricing packages:\n• High-Converting Landing Pages: $150 – $350 (2–4 days)\n• Custom Business WordPress Sites (Elementor Pro): $300 – $600 (5–9 days)\n• Full WooCommerce E-Commerce Stores: $500 – $1,200+ (10–14 days)\n• Speed & Core Web Vitals Optimization: $100 – $250 (1–3 days)\nReach out on WhatsApp (+92 305 5389967) for a formal proposal within 1 hour!",
      actionTag: "FAQ_PRICING",
      isAiGenerated: false
    };
  }

  // 24. TURNAROUND TIME & DELIVERY FAQ
  if (
    p.includes("fast") ||
    p.includes("how long") ||
    p.includes("turnaround") ||
    p.includes("delivery") ||
    p.includes("timeline") ||
    p.includes("duration") ||
    p.includes("timeframe") ||
    p.includes("deadline")
  ) {
    return {
      text: "Muhammad Ali delivers rapid, reliable turnarounds:\n• Single Landing Pages: 2 – 4 business days\n• Multi-Page Business Websites: 5 – 9 business days\n• E-Commerce Stores: 10 – 14 business days\nExpress rush delivery is available upon request for urgent commercial launches.",
      actionTag: "FAQ_TIMELINE",
      isAiGenerated: false
    };
  }

  // 25. SERVICES & E-COMMERCE FAQ
  if (
    p.includes("ecommerce") ||
    p.includes("woocommerce") ||
    p.includes("store") ||
    p.includes("shop") ||
    p.includes("sell online")
  ) {
    return {
      text: "Yes! Muhammad Ali builds complete WooCommerce and Shopify stores featuring product catalogs, category filters, checkout gateways (Stripe, PayPal, local bank transfers), and automated discount coupons (like Nexcurex at nexcurex.com).",
      actionTag: "FAQ_ECOMMERCE",
      isAiGenerated: false
    };
  }

  if (
    p.includes("service") ||
    p.includes("what can ali do") ||
    p.includes("offer") ||
    p.includes("hire for")
  ) {
    return {
      text: "Muhammad Ali offers 5 core commercial services:\n1. Custom WordPress Development (Elementor Pro)\n2. High-Converting Landing Pages\n3. Full E-Commerce Stores (WooCommerce)\n4. Speed & Core Web Vitals Optimization (90+ PageSpeed score)\n5. Interactive Web Applications (React 19 & Next.js 15)",
      actionTag: "FAQ_SERVICES",
      isAiGenerated: false
    };
  }

  // 26. WORKFLOW & REVISIONS FAQ
  if (p.includes("process") || p.includes("workflow") || p.includes("steps") || p.includes("how it works")) {
    return {
      text: "Ali follows a structured 4-step workflow:\n1. Discovery & Strategy: Clarifying your target audience and project goals.\n2. UI/UX Wireframing: Crafting modern, high-converting prototypes.\n3. Development & Speed Optimization: Building cleanly with responsive precision.\n4. Quality Assurance, Client Revisions & Final Launch.",
      actionTag: "FAQ_PROCESS",
      isAiGenerated: false
    };
  }

  if (
    p.includes("support") ||
    p.includes("revision") ||
    p.includes("warranty") ||
    p.includes("after launch") ||
    p.includes("maintenance")
  ) {
    return {
      text: "Ali provides unlimited revisions during the active design phase until you are 100% satisfied, plus 30 days of complimentary post-launch technical support and maintenance.",
      actionTag: "FAQ_SUPPORT",
      isAiGenerated: false
    };
  }

  // 27. CONTACT & WHATSAPP
  if (
    p.includes("contact") ||
    p.includes("hire") ||
    p.includes("email") ||
    p.includes("whatsapp") ||
    p.includes("phone") ||
    p.includes("call") ||
    p.includes("message")
  ) {
    return {
      text: "You can reach Muhammad Ali directly:\n• WhatsApp: +92 305 5389967 (Fastest response)\n• Email: alikhanwebdeveloper@gmail.com\n• Based in Peshawar, Pakistan (available for global clients across US, UK, and European timezones).",
      actionTag: "NAV_CONTACT",
      isAiGenerated: false
    };
  }

  // 28. LOCATION & ABOUT ALI
  if (
    p.includes("who is ali") ||
    p.includes("who is muhammad ali") ||
    p.includes("tell me about ali") ||
    p.includes("about ali") ||
    p.includes("about muhammad ali") ||
    p.includes("location") ||
    p.includes("where") ||
    p.includes("city") ||
    p.includes("peshawar") ||
    p.includes("pakistan")
  ) {
    return {
      text: "Muhammad Ali is a Frontend Developer & Digital Creator based in Peshawar, Pakistan with 2+ years of verified commercial client delivery. He specializes in WordPress, Elementor Pro, high-converting responsive UI/UX, and Web Vitals speed optimization, working remotely with clients worldwide.",
      actionTag: "INFO_ALI",
      isAiGenerated: false
    };
  }

  // 29. RESUME / CV
  if (p.includes("cv") || p.includes("resume") || p.includes("download cv") || p.includes("pdf")) {
    return {
      text: "You can view or download Muhammad Ali's verified PDF resume directly. It documents 2+ years of commercial client work, skills, and education.",
      actionTag: "DOWNLOAD_CV",
      isAiGenerated: false
    };
  }

  // 30. NAVIGATION COMMANDS
  if (p.includes("portfolio") || p.includes("showcase") || p.includes("return")) {
    store.setViewMode("portfolio");
    return {
      text: "Returning to Muhammad Ali's primary portfolio terminal HUD.",
      actionTag: "NAV_PORTFOLIO",
      isAiGenerated: false
    };
  }

  if (p.includes("go to contact") || p.includes("scroll to contact")) {
    return { text: "Navigating to the Contact section.", actionTag: "NAV_CONTACT", isAiGenerated: false };
  }
  if (p.includes("go to projects") || p.includes("show projects") || p.includes("scroll to projects")) {
    return { text: "Navigating to the Client Projects section.", actionTag: "NAV_PROJECTS", isAiGenerated: false };
  }
  if (p.includes("go to services") || p.includes("scroll to services")) {
    return { text: "Navigating to the Services & Pricing section.", actionTag: "NAV_SERVICES", isAiGenerated: false };
  }
  if (p.includes("go to about") || p.includes("scroll to about")) {
    return { text: "Navigating to the About Muhammad Ali section.", actionTag: "NAV_ABOUT", isAiGenerated: false };
  }
  if (p.includes("go to experience") || p.includes("scroll to experience")) {
    return { text: "Navigating to the Commercial Experience section.", actionTag: "NAV_EXPERIENCE", isAiGenerated: false };
  }
  if (p.includes("go to faq") || p.includes("scroll to faq")) {
    return { text: "Navigating to the Frequently Asked Questions section.", actionTag: "NAV_FAQ", isAiGenerated: false };
  }

  // 31. SKILLS & EDUCATION
  if (p.includes("skill") || p.includes("tech") || p.includes("stack")) {
    return {
      text: "Muhammad Ali specializes in WordPress (90%), Elementor Pro (90%), Responsive Web Design (90%), HTML5/CSS3 (85%), UI/UX Design (88%), and JavaScript (80%), with active expansion into React 19, Next.js 15, and Three.js WebGL.",
      actionTag: "SHOW_SKILLS",
      isAiGenerated: false
    };
  }

  if (p.includes("education") || p.includes("nursing") || p.includes("bsn") || p.includes("medical") || p.includes("dit") || p.includes("college") || p.includes("degree")) {
    return {
      text: "Muhammad Ali is actively pursuing his Bachelor of Science in Nursing (BSN, 2025–Present) in Peshawar, building on his FSc (Pre-Medical) completed at Peshawar Model Degree College (2023–2025). He is also completing a Diploma in Information Technology (DIT, 2025–Present). Medical science is his formal field, while web development is his dedicated craft and creative passion.",
      actionTag: "SHOW_EDUCATION",
      isAiGenerated: false
    };
  }

  if (p.includes("codevibe") || p.includes("dual") || p.includes("hobby") || p.includes("craft")) {
    return {
      text: "Muhammad Ali is a dual-discipline talent: while his formal studies are in medical science (BS Nursing), coding and web development is his specialized craft and creative hobby. He applies hospital-grade precision, patient-first empathy, and meticulous attention to detail to building high-converting websites.",
      actionTag: "SHOW_DUAL_DISCIPLINE",
      isAiGenerated: false
    };
  }

  // 32. POLITE INTELLIGENT FALLBACK FOR UNRECOGNIZED / AMBIGUOUS QUERIES
  return {
    text: "I'm not quite sure I understand that query, but I'm here to help! Would you like to:\n• Explore Ali's client projects (Ivana Studio, Nexcurex, Arshad Tiles)\n• Check website pricing and turnaround times\n• Switch visual themes (e.g., 'switch to cyberpunk' or 'make it lighter')\n• Contact Muhammad Ali directly on WhatsApp (+92 305 5389967)?",
    actionTag: "INFO_DEFAULT",
    isAiGenerated: false
  };
}
