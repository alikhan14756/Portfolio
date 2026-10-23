/**
 * STYLE LAB REGISTRY — 28+ GENUINE DESIGN SYSTEMS
 * Single source of truth for the complete multi-design-system architecture.
 * Extensible design: new styles can be registered here without application rewrites.
 */

export type StyleCategory =
  | "Surface Archetype"
  | "Layout & Architecture"
  | "Motion & Kinetic"
  | "Aesthetic & Culture"
  | "Technical & Retro";

export interface StylePreset {
  id: string;
  name: string;
  category: StyleCategory;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  themeMode: "dark" | "light" | "auto";
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  tokens: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    borderColor: string;
    borderGlow: string;
    accentPrimary: string;
    accentSecondary: string;
    accentTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    cardRadius: string;
    btnRadius: string;
    cardBorder: string;
    cardShadow: string;
    cardShadowHover?: string;
    backdropBlur: string;
    cardClip?: string;
    bgPattern: string;
    bgPatternSize?: string;
    hudGlow?: string;
    badgeBg: string;
    innerShadow?: string;
  };
  animationProfile: {
    name: string;
    easing: string;
    durationBase: number;
    entranceType:
      | "fade-up"
      | "scale-spring"
      | "cut-in"
      | "kinetic-slide"
      | "pixel-step"
      | "perspective-3d"
      | "glitch-flash"
      | "liquid-morph"
      | "editorial-mask";
    hoverInteraction:
      | "lift-shadow"
      | "tactile-press"
      | "bounce"
      | "tilt-3d"
      | "invert"
      | "glow-bloom"
      | "chrome-shimmer"
      | "none";
    ambientEffect:
      | "aurora"
      | "scanlines"
      | "noise"
      | "grid"
      | "blobs"
      | "stars"
      | "matrix-rain"
      | "blueprint"
      | "liquid-flow"
      | "none";
  };
  previewTokens: {
    headline: string;
    buttonLabel: string;
    cardAccentColor: string;
    cardSnippet: string;
  };
}

export const STYLE_PRESETS: StylePreset[] = [
  // 1. GLASSMORPHISM
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    category: "Surface Archetype",
    shortDesc: "Translucent frosted glass surfaces with layered depth and subtle luminous rims.",
    fullDesc:
      "Crafted with refined backdrop blur, multi-tier translucent elevation, crisp 1px borders, and soft prismatic light diffusion that keeps typography readable on deep space canvases.",
    tags: ["Translucent", "Backdrop Blur", "Layered Depth", "Light Rims"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f8fafc",
      bgSecondary: "#ffffff",
      bgCard: "rgba(255, 255, 255, 0.85)",
      borderColor: "#c7d2fe",
      borderGlow: "#6366f1",
      accentPrimary: "#6366f1",
      accentSecondary: "#8b5cf6",
      accentTertiary: "#06b6d4",
      textPrimary: "#1e1b4b",
      textSecondary: "#312e81",
      textMuted: "#64748b",
      cardRadius: "24px",
      btnRadius: "14px",
      cardBorder: "2px solid rgba(255, 255, 255, 0.95)",
      cardShadow: "0 16px 36px rgba(99, 102, 241, 0.14)",
      cardShadowHover: "0 24px 50px rgba(99, 102, 241, 0.22)",
      backdropBlur: "blur(20px)",
      bgPattern: "radial-gradient(circle at 10% 20%, #e0e7ff 0%, transparent 40%), radial-gradient(circle at 90% 80%, #fce7f3 0%, transparent 45%), radial-gradient(circle at 50% 50%, #cffafe 0%, transparent 40%), #f8fafc",
      bgPatternSize: "cover",
      badgeBg: "#e0e7ff"
    },
    animationProfile: {
      name: "Gentle Glass Drift",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.6,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "blobs"
    },
    previewTokens: {
      headline: "Frosted Glass",
      buttonLabel: "Explore Glass",
      cardAccentColor: "#38bdf8",
      cardSnippet: "Backdrop blur 20px with 1px luminous edge"
    }
  },

  // 2. NEUMORPHISM / SOFT UI
  {
    id: "neumorphism",
    name: "Neumorphism / Soft UI",
    category: "Surface Archetype",
    shortDesc: "Tactile extruded surfaces with dual soft shadows and accessible high-contrast accents.",
    fullDesc:
      "Emulates physical clay surfaces sculpted from the canvas itself. Features dual light and dark cast shadows, smooth concave press states, and crisp emerald-tinted contrast nodes.",
    tags: ["Soft Extrusion", "Dual Shadows", "Tactile Presses", "Clay Surface"],
    themeMode: "light",
    fontDisplay: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#e6ecf5",
      bgSecondary: "#ffffff",
      bgCard: "#e6ecf5",
      borderColor: "#cbd5e1",
      borderGlow: "#3b82f6",
      accentPrimary: "#3b82f6",
      accentSecondary: "#2563eb",
      accentTertiary: "#06b6d4",
      textPrimary: "#1e293b",
      textSecondary: "#334155",
      textMuted: "#64748b",
      cardRadius: "24px",
      btnRadius: "16px",
      cardBorder: "1px solid rgba(255, 255, 255, 0.8)",
      cardShadow: "-8px -8px 18px #ffffff, 8px 8px 18px #b8c4d6",
      cardShadowHover: "-10px -10px 22px #ffffff, 10px 10px 22px #a8b6cb",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#e6ecf5"
    },
    animationProfile: {
      name: "Tactile Depress",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      durationBase: 0.35,
      entranceType: "scale-spring",
      hoverInteraction: "tactile-press",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Soft Extrusion",
      buttonLabel: "Press Soft Button",
      cardAccentColor: "#34d399",
      cardSnippet: "Concave & convex sculpted surface physics"
    }
  },

  // 3. LIQUID GLASS
  {
    id: "liquid-glass",
    name: "Liquid Glass",
    category: "Surface Archetype",
    shortDesc: "Fluid translucent surfaces with light refraction cues and morphing liquid highlights.",
    fullDesc:
      "Combines viscous liquid morphology with glass refraction. Features animated chromatic liquid gradient borders, smooth fluid curvature, and elastic interactions.",
    tags: ["Liquid Refraction", "Chromatic Rims", "Morphing Gradients", "Fluidity"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#ecfeff",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(224, 242, 254, 0.8) 100%)",
      borderColor: "#a5f3fc",
      borderGlow: "#06b6d4",
      accentPrimary: "#06b6d4",
      accentSecondary: "#0284c7",
      accentTertiary: "#0d9488",
      textPrimary: "#083344",
      textSecondary: "#0e7490",
      textMuted: "#475569",
      cardRadius: "32px",
      btnRadius: "9999px",
      cardBorder: "2.5px solid rgba(255, 255, 255, 0.95)",
      cardShadow: "0 20px 45px rgba(6, 182, 212, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.95)",
      cardShadowHover: "0 28px 55px rgba(6, 182, 212, 0.28), inset 0 2px 4px rgba(255, 255, 255, 1)",
      backdropBlur: "blur(20px)",
      bgPattern: "radial-gradient(ellipse at 20% 20%, #cffafe 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #bae6fd 0%, transparent 50%), linear-gradient(135deg, #e0f2fe 0%, #ecfeff 100%)",
      bgPatternSize: "cover",
      badgeBg: "#cffafe"
    },
    animationProfile: {
      name: "Liquid Elastic Morph",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      durationBase: 0.7,
      entranceType: "liquid-morph",
      hoverInteraction: "tilt-3d",
      ambientEffect: "liquid-flow"
    },
    previewTokens: {
      headline: "Viscous Glass",
      buttonLabel: "Liquid Ripple",
      cardAccentColor: "#a78bfa",
      cardSnippet: "Chromatic refraction & viscous blur filters"
    }
  },

  // 4. CLAYMORPHISM
  {
    id: "claymorphism",
    name: "Claymorphism",
    category: "Surface Archetype",
    shortDesc: "Soft rounded 3D clay cards with dimensional inner glows and friendly buoyancy.",
    fullDesc:
      "Dimensional, friendly, and tactile. Features inflated pill shapes, dual internal lighting bevels, and responsive spring physics that feel like physical matte plastic or clay figurines.",
    tags: ["Inflated 3D", "Pill Geometry", "Inner Bevels", "Tactile Clay"],
    themeMode: "light",
    fontDisplay: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f3f0f9",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 246, 255, 0.92) 100%)",
      borderColor: "#ddd6fe",
      borderGlow: "#a78bfa",
      accentPrimary: "#7c3aed",
      accentSecondary: "#ec4899",
      accentTertiary: "#06b6d4",
      textPrimary: "#1e1147",
      textSecondary: "#4c1d95",
      textMuted: "#6b7280",
      cardRadius: "32px",
      btnRadius: "9999px",
      cardBorder: "2.5px solid rgba(255, 255, 255, 0.95)",
      cardShadow: "0 20px 40px -10px rgba(147, 130, 200, 0.25), inset 0 4px 8px rgba(255, 255, 255, 0.95), inset 0 -3px 6px rgba(190, 180, 220, 0.15)",
      cardShadowHover: "0 28px 50px -10px rgba(139, 92, 246, 0.35), inset 0 4px 8px rgba(255, 255, 255, 1)",
      backdropBlur: "none",
      bgPattern: "radial-gradient(at 15% 15%, #fce7f3 0px, transparent 50%), radial-gradient(at 85% 15%, #ede9fe 0px, transparent 50%), radial-gradient(at 50% 85%, #e0e7ff 0px, transparent 55%), #f5f3ff",
      bgPatternSize: "auto",
      badgeBg: "#ede9fe"
    },
    animationProfile: {
      name: "Buoyant Clay Spring",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      durationBase: 0.5,
      entranceType: "scale-spring",
      hoverInteraction: "bounce",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Inflated 3D Clay",
      buttonLabel: "Squish Button",
      cardAccentColor: "#7c3aed",
      cardSnippet: "Soft pastel lilac with inflated 3D puffy white cards"
    }
  },

  // 5. NEOBRUTALISM
  {
    id: "neobrutalism",
    name: "Neobrutalism",
    category: "Aesthetic & Culture",
    shortDesc: "Bold black outlines, high-contrast flat planes, sharp offset shadows, and expressive typography.",
    fullDesc:
      "Raw, unapologetic, and punchy. Implements thick 3px solid ink borders, 5px hard solid drop-shadows with zero blur, stark geometric framing, and bold canary yellow & hot coral accents.",
    tags: ["Bold Outlines", "Hard Shadows", "Zero Blur", "Graphic Contrast"],
    themeMode: "light",
    fontDisplay: "'Space Grotesk', system-ui, sans-serif",
    fontBody: "'Space Grotesk', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#fffbf0",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#000000",
      borderGlow: "#fde047",
      accentPrimary: "#fde047",
      accentSecondary: "#fb923c",
      accentTertiary: "#38bdf8",
      textPrimary: "#000000",
      textSecondary: "#1f2937",
      textMuted: "#4b5563",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "3.5px solid #000000",
      cardShadow: "6px 6px 0px #000000",
      cardShadowHover: "9px 9px 0px #000000",
      backdropBlur: "none",
      bgPattern: "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0, rgba(0, 0, 0, 0.03) 1px, transparent 0, transparent 16px)",
      bgPatternSize: "auto",
      badgeBg: "#fef08a"
    },
    animationProfile: {
      name: "Snappy Pop & Stamp",
      easing: "cubic-bezier(0, 0, 0.2, 1)",
      durationBase: 0.18,
      entranceType: "cut-in",
      hoverInteraction: "tactile-press",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "RAW BRUTALISM",
      buttonLabel: "STAMP IT",
      cardAccentColor: "#ffdf00",
      cardSnippet: "3px solid borders with 6px offset hard shadows"
    }
  },

  // 6. MINIMALISM
  {
    id: "minimalism",
    name: "Minimalism",
    category: "Layout & Architecture",
    shortDesc: "Generous whitespace, precise grids, restrained color, and understated micro-interactions.",
    fullDesc:
      "A lesson in functional purity. Strips away visual noise to elevate typography, photography, and real project metrics with whisper-thin 1px dividers, delicate slate accents, and calm pacing.",
    tags: ["Pure Function", "Generous Air", "Subtle Dividers", "Zen Focus"],
    themeMode: "light",
    fontDisplay: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#ffffff",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#e5e7eb",
      borderGlow: "#2563eb",
      accentPrimary: "#2563eb",
      accentSecondary: "#09090b",
      accentTertiary: "#6b7280",
      textPrimary: "#09090b",
      textSecondary: "#4b5563",
      textMuted: "#6b7280",
      cardRadius: "8px",
      btnRadius: "6px",
      cardBorder: "1px solid #e5e7eb",
      cardShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      cardShadowHover: "0 6px 16px rgba(0, 0, 0, 0.08)",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#f3f4f6"
    },
    animationProfile: {
      name: "Whisper Fade",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.45,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Zen Clarity",
      buttonLabel: "View Details",
      cardAccentColor: "#18181b",
      cardSnippet: "Precision layout with zero ornamental clutter"
    }
  },

  // 7. DARK MODE / MIDNIGHT UI
  {
    id: "dark-midnight",
    name: "Dark Mode / Midnight UI",
    category: "Surface Archetype",
    shortDesc: "Deep obsidian backgrounds, refined contrast, luminous accents, and cinematic lighting.",
    fullDesc:
      "A cinematic, eye-friendly midnight canvas engineered with true deep obsidian (#06080d), electric sapphire edge accents, and layered lighting that creates immersive visual depth without glare.",
    tags: ["Obsidian Canvas", "Sapphire Glow", "Cinematic Depth", "OLED Pure"],
    themeMode: "dark",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#030712",
      bgSecondary: "#ffffff",
      bgCard: "rgba(15, 23, 42, 0.8)",
      borderColor: "rgba(56, 189, 248, 0.3)",
      borderGlow: "#38bdf8",
      accentPrimary: "#38bdf8",
      accentSecondary: "#2563eb",
      accentTertiary: "#6366f1",
      textPrimary: "#f8fafc",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      cardRadius: "22px",
      btnRadius: "14px",
      cardBorder: "1.5px solid rgba(56, 189, 248, 0.3)",
      cardShadow: "0 16px 36px rgba(0, 0, 0, 0.6)",
      cardShadowHover: "0 22px 48px rgba(56, 189, 248, 0.3)",
      backdropBlur: "blur(16px)",
      bgPattern: "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.25) 0%, transparent 40%), #030712",
      bgPatternSize: "cover",
      badgeBg: "rgba(56, 189, 248, 0.2)"
    },
    animationProfile: {
      name: "Midnight Pulse",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.5,
      entranceType: "fade-up",
      hoverInteraction: "glow-bloom",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Midnight Deep",
      buttonLabel: "Activate Pulse",
      cardAccentColor: "#3b82f6",
      cardSnippet: "True OLED black with luminous sapphire rim"
    }
  },

  // 8. CYBERPUNK UI
  {
    id: "cyberpunk",
    name: "Cyberpunk UI",
    category: "Aesthetic & Culture",
    shortDesc: "High-contrast Night City aesthetic with electric yellow, hot magenta, chamfered cards, and digital scanlines.",
    fullDesc:
      "Infused with high-tech dystopia. Angled polygon clip paths, bright neon yellow (#facc15) and electric pink glows, HUD telemetry readouts, and controlled micro-glitch highlights.",
    tags: ["Night City", "Chamfered Geometry", "Electric Glow", "HUD Telemetry"],
    themeMode: "dark",
    fontDisplay: "'Orbitron', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'Orbitron', monospace",
    tokens: {
      bgPrimary: "#0f051d",
      bgSecondary: "#ffffff",
      bgCard: "rgba(20, 8, 38, 0.92)",
      borderColor: "#00f0ff",
      borderGlow: "#fcee0a",
      accentPrimary: "#fcee0a",
      accentSecondary: "#00f0ff",
      accentTertiary: "#ff0055",
      textPrimary: "#ffffff",
      textSecondary: "#e2e8f0",
      textMuted: "#94a3b8",
      cardRadius: "4px",
      btnRadius: "0px",
      cardBorder: "2px solid #00f0ff",
      cardShadow: "0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(255, 0, 85, 0.15)",
      cardShadowHover: "0 0 35px rgba(0, 240, 255, 0.55), inset 0 0 20px rgba(255, 0, 85, 0.25)",
      backdropBlur: "blur(12px)",
      bgPattern: "radial-gradient(circle at 15% 20%, rgba(252, 238, 10, 0.25) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(0, 240, 255, 0.25) 0%, transparent 40%), #0f051d",
      bgPatternSize: "cover",
      badgeBg: "rgba(252, 238, 10, 0.2)"
    },
    animationProfile: {
      name: "Cyber Glitch & Trace",
      easing: "steps(4, jump-end)",
      durationBase: 0.25,
      entranceType: "glitch-flash",
      hoverInteraction: "glow-bloom",
      ambientEffect: "scanlines"
    },
    previewTokens: {
      headline: "CYBER_OVERDRIVE",
      buttonLabel: "JACK IN",
      cardAccentColor: "#facc15",
      cardSnippet: "Chamfered polygon edges with neon laser borders"
    }
  },

  // 9. AURORA UI
  {
    id: "aurora",
    name: "Aurora UI",
    category: "Surface Archetype",
    shortDesc: "Flowing borealis color ribbons, atmospheric luminescence, and gentle multi-hue radiance.",
    fullDesc:
      "Inspired by northern polar light phenomena. Features luminous organic ribbons in emerald teal, celestial purple, and arctic cyan drifting across deep velvet horizons.",
    tags: ["Borealis Waves", "Luminous Ribbons", "Soft Radiance", "Ethereal Depth"],
    themeMode: "dark",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#0c122c",
      bgSecondary: "#ffffff",
      bgCard: "rgba(15, 23, 42, 0.82)",
      borderColor: "rgba(56, 189, 248, 0.4)",
      borderGlow: "#10b981",
      accentPrimary: "#10b981",
      accentSecondary: "#38bdf8",
      accentTertiary: "#a855f7",
      textPrimary: "#ffffff",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      cardRadius: "24px",
      btnRadius: "16px",
      cardBorder: "1.5px solid rgba(56, 189, 248, 0.4)",
      cardShadow: "0 20px 45px rgba(16, 185, 129, 0.2), 0 0 25px rgba(168, 85, 247, 0.2)",
      cardShadowHover: "0 25px 60px rgba(56, 189, 248, 0.35), 0 0 35px rgba(16, 185, 129, 0.3)",
      backdropBlur: "blur(20px)",
      bgPattern: "radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.45) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(168, 85, 247, 0.45) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(56, 189, 248, 0.45) 0%, transparent 55%), #0c122c",
      bgPatternSize: "cover",
      badgeBg: "rgba(16, 185, 129, 0.2)"
    },
    animationProfile: {
      name: "Aurora Atmospheric Drift",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.8,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "aurora"
    },
    previewTokens: {
      headline: "Aurora Borealis",
      buttonLabel: "Drift Lights",
      cardAccentColor: "#2dd4bf",
      cardSnippet: "Emerald teal and violet radiant wave synthesis"
    }
  },

  // 10. BENTO GRID
  {
    id: "bento-grid",
    name: "Bento Grid",
    category: "Layout & Architecture",
    shortDesc: "Modular asymmetric compartments, information-dense tiles, and coordinated responsive layout.",
    fullDesc:
      "Inspired by traditional Japanese bento compartments. Arranges projects, client metrics, skills, and tools into an intelligent, asymmetric grid where every panel has a distinct hierarchy.",
    tags: ["Modular Hierarchy", "Asymmetric Tiles", "Information Dense", "Modern Apple"],
    themeMode: "light",
    fontDisplay: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f8fafc",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#e2e8f0",
      borderGlow: "#2563eb",
      accentPrimary: "#2563eb",
      accentSecondary: "#06b6d4",
      accentTertiary: "#f59e0b",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      cardRadius: "18px",
      btnRadius: "12px",
      cardBorder: "1.5px solid #e2e8f0",
      cardShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
      cardShadowHover: "0 12px 30px rgba(37, 99, 235, 0.12)",
      backdropBlur: "none",
      bgPattern: "repeating-linear-gradient(0deg, rgba(226, 232, 240, 0.6) 0px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(226, 232, 240, 0.6) 0px, transparent 1px, transparent 24px), #f8fafc",
      bgPatternSize: "24px 24px",
      badgeBg: "#eff6ff"
    },
    animationProfile: {
      name: "Staggered Bento Reveal",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.5,
      entranceType: "scale-spring",
      hoverInteraction: "lift-shadow",
      ambientEffect: "grid"
    },
    previewTokens: {
      headline: "Modular Bento",
      buttonLabel: "Tile Action",
      cardAccentColor: "#38bdf8",
      cardSnippet: "Asymmetric masonry tiles with crisp rounded corners"
    }
  },

  // 11. SKEUOMORPHISM
  {
    id: "skeuomorphism",
    name: "Skeuomorphism",
    category: "Technical & Retro",
    shortDesc: "Realistic physical materials, brushed metal bevels, mechanical switches, and dimensional depth.",
    fullDesc:
      "A celebration of tangible industrial design. Simulates real-world materials: brushed gunmetal titanium, embossed labels, realistic physical toggle switches, and metallic gradient bevels.",
    tags: ["Tactile Materials", "Brushed Metal", "Mechanical Toggle", "Physical Cues"],
    themeMode: "light",
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#eef2f6",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
      borderColor: "#cbd5e1",
      borderGlow: "#d97706",
      accentPrimary: "#d97706",
      accentSecondary: "#b45309",
      accentTertiary: "#3b82f6",
      textPrimary: "#1e293b",
      textSecondary: "#334155",
      textMuted: "#64748b",
      cardRadius: "16px",
      btnRadius: "10px",
      cardBorder: "1.5px solid #cbd5e1",
      cardShadow: "0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffffff",
      cardShadowHover: "0 12px 30px rgba(0, 0, 0, 0.12), inset 0 1px 0 #ffffff",
      backdropBlur: "none",
      bgPattern: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
      bgPatternSize: "cover",
      badgeBg: "#fef3c7"
    },
    animationProfile: {
      name: "Mechanical Click",
      easing: "cubic-bezier(0.2, 0.9, 0.3, 1)",
      durationBase: 0.28,
      entranceType: "scale-spring",
      hoverInteraction: "tactile-press",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Brushed Metal",
      buttonLabel: "Flip Switch",
      cardAccentColor: "#f59e0b",
      cardSnippet: "Realistic bevel highlights and mechanical click physics"
    }
  },

  // 12. GLASS + GRAIN
  {
    id: "glass-grain",
    name: "Glass + Grain",
    category: "Surface Archetype",
    shortDesc: "Translucent frosted glass with film grain overlay and editorial typography.",
    fullDesc:
      "A cinematic union of modern frosted acrylic and tactile analogue film texture. Evokes luxury Scandinavian art direction with micro-grain noise, warm bone lighting, and serif headlines.",
    tags: ["Film Grain", "Frosted Glass", "Editorial Luxury", "Cinematic Noise"],
    themeMode: "light",
    fontDisplay: "'Cinzel', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f5f2eb",
      bgSecondary: "#ffffff",
      bgCard: "rgba(255, 255, 255, 0.92)",
      borderColor: "#e7e2d7",
      borderGlow: "#c2410c",
      accentPrimary: "#c2410c",
      accentSecondary: "#d97706",
      accentTertiary: "#44403c",
      textPrimary: "#292524",
      textSecondary: "#44403c",
      textMuted: "#78716c",
      cardRadius: "18px",
      btnRadius: "12px",
      cardBorder: "1.5px solid #e7e2d7",
      cardShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      cardShadowHover: "0 16px 40px rgba(194, 65, 12, 0.15)",
      backdropBlur: "blur(12px)",
      bgPattern: "radial-gradient(circle at 20% 20%, #fef3c7 0%, transparent 45%), radial-gradient(circle at 80% 80%, #fed7aa 0%, transparent 45%), #f5f2eb",
      bgPatternSize: "auto",
      badgeBg: "#fef3c7"
    },
    animationProfile: {
      name: "Cinematic Film Dissolve",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.65,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "noise"
    },
    previewTokens: {
      headline: "Artisanal Film",
      buttonLabel: "Read Journal",
      cardAccentColor: "#e2e8f0",
      cardSnippet: "Micro-grain noise with frosted acrylic luminescence"
    }
  },

  // 13. HOLOGRAPHIC UI
  {
    id: "holographic",
    name: "Holographic UI",
    category: "Aesthetic & Culture",
    shortDesc: "Iridescent chromatic gradients, scanning lasers, and projected floating interface layers.",
    fullDesc:
      "Future-forward sci-fi holographic projection. Shimmers with prismatic iridescent gradients, luminous cyan scanning lines, floating wireframes, and optical light prisms.",
    tags: ["Iridescent Sheen", "Laser Scans", "Spectral Prism", "Floating HUD"],
    themeMode: "light",
    fontDisplay: "'Orbitron', monospace",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f8fafc",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(245, 243, 255, 0.88) 100%)",
      borderColor: "#d8b4fe",
      borderGlow: "#a855f7",
      accentPrimary: "#a855f7",
      accentSecondary: "#38bdf8",
      accentTertiary: "#ec4899",
      textPrimary: "#1e1b4b",
      textSecondary: "#4c1d95",
      textMuted: "#64748b",
      cardRadius: "24px",
      btnRadius: "14px",
      cardBorder: "2px solid rgba(168, 85, 247, 0.45)",
      cardShadow: "0 16px 36px rgba(168, 85, 247, 0.18)",
      cardShadowHover: "0 24px 50px rgba(168, 85, 247, 0.3)",
      backdropBlur: "blur(14px)",
      bgPattern: "radial-gradient(at 15% 15%, #fce7f3 0px, transparent 40%), radial-gradient(at 85% 15%, #ede9fe 0px, transparent 40%), radial-gradient(at 50% 85%, #cffafe 0px, transparent 40%), #f8fafc",
      bgPatternSize: "cover",
      badgeBg: "#f3e8ff"
    },
    animationProfile: {
      name: "Spectral Shimmer",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.55,
      entranceType: "glitch-flash",
      hoverInteraction: "glow-bloom",
      ambientEffect: "scanlines"
    },
    previewTokens: {
      headline: "HOLO_PROJECTION",
      buttonLabel: "Engage Beam",
      cardAccentColor: "#00f0ff",
      cardSnippet: "Iridescent chromatic gradients with laser scanline sweeps"
    }
  },

  // 14. IMMERSIVE 3D UI
  {
    id: "immersive-3d",
    name: "Immersive 3D UI",
    category: "Motion & Kinetic",
    shortDesc: "Spatial card tilt, perspective transformations, layered z-depth, and 3D lighting.",
    fullDesc:
      "Brings the web page into 3D stereoscopic space. Features dynamic cursor-reactive card tilts, progressive z-index tiering, dramatic shadows, and smooth 3D camera transitions.",
    tags: ["Perspective Tilt", "3D Z-Depth", "Spatial Cards", "Interactive Parallax"],
    themeMode: "dark",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#0f0a2a",
      bgSecondary: "#ffffff",
      bgCard: "rgba(28, 18, 68, 0.88)",
      borderColor: "#a855f7",
      borderGlow: "#a855f7",
      accentPrimary: "#a855f7",
      accentSecondary: "#6366f1",
      accentTertiary: "#38bdf8",
      textPrimary: "#ffffff",
      textSecondary: "#e2e8f0",
      textMuted: "#94a3b8",
      cardRadius: "28px",
      btnRadius: "18px",
      cardBorder: "2px solid rgba(168, 85, 247, 0.5)",
      cardShadow: "0 25px 50px -10px rgba(168, 85, 247, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.25)",
      cardShadowHover: "0 35px 65px -10px rgba(168, 85, 247, 0.55), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
      backdropBlur: "blur(18px)",
      bgPattern: "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.35) 0%, transparent 50%), #0f0a2a",
      bgPatternSize: "cover",
      badgeBg: "rgba(168, 85, 247, 0.25)"
    },
    animationProfile: {
      name: "Spatial Perspective Tilt",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      durationBase: 0.45,
      entranceType: "perspective-3d",
      hoverInteraction: "tilt-3d",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Spatial Depth",
      buttonLabel: "Interact in 3D",
      cardAccentColor: "#60a5fa",
      cardSnippet: "Perspective transform with interactive cursor tilt physics"
    }
  },

  // 15. MOTION-DRIVEN UI
  {
    id: "motion-driven",
    name: "Motion-Driven UI",
    category: "Motion & Kinetic",
    shortDesc: "Choreographed animation, spring transitions, progressive storytelling, and reactive feedback.",
    fullDesc:
      "Animation is not an afterthought — it is the primary storyteller. Smoothly choreographed entry waterfalls, elastic magnetic buttons, spring physics, and continuous micro-delights.",
    tags: ["Choreographed", "Spring Physics", "Progressive Story", "Dynamic Response"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#fff1f2",
      bgSecondary: "#ffffff",
      bgCard: "rgba(255, 255, 255, 0.92)",
      borderColor: "#fecdd3",
      borderGlow: "#f43f5e",
      accentPrimary: "#f43f5e",
      accentSecondary: "#e11d48",
      accentTertiary: "#8b5cf6",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      cardRadius: "22px",
      btnRadius: "14px",
      cardBorder: "2px solid #fecdd3",
      cardShadow: "0 14px 34px rgba(244, 63, 94, 0.14)",
      cardShadowHover: "0 22px 48px rgba(244, 63, 94, 0.25)",
      backdropBlur: "blur(12px)",
      bgPattern: "radial-gradient(ellipse at 15% 15%, #ffe4e6 0%, transparent 50%), radial-gradient(ellipse at 85% 85%, #fce7f3 0%, transparent 50%), #fff1f2",
      bgPatternSize: "auto",
      badgeBg: "#ffe4e6"
    },
    animationProfile: {
      name: "High-Frequency Kinetic Choreography",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      durationBase: 0.55,
      entranceType: "scale-spring",
      hoverInteraction: "bounce",
      ambientEffect: "blobs"
    },
    previewTokens: {
      headline: "Fluid Motion",
      buttonLabel: "Trigger Sequence",
      cardAccentColor: "#f43f5e",
      cardSnippet: "Spring-physics easing with sequential staggered reveals"
    }
  },

  // 16. PARALLAX SCROLLING
  {
    id: "parallax-scrolling",
    name: "Parallax Scrolling",
    category: "Motion & Kinetic",
    shortDesc: "Multi-layered depth planes, scroll-linked rate differentiation, and foreground/background separation.",
    fullDesc:
      "A rich cinematic scroll experience without scroll-jacking. Foreground cards, midground typography, and celestial background particle nodes glide at different relative velocities.",
    tags: ["Multi-Tier Velocity", "Depth Planes", "Natural Scroll", "Cinematic Horizon"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f0f9ff",
      bgSecondary: "#ffffff",
      bgCard: "rgba(255, 255, 255, 0.92)",
      borderColor: "#bae6fd",
      borderGlow: "#0284c7",
      accentPrimary: "#0284c7",
      accentSecondary: "#6366f1",
      accentTertiary: "#8b5cf6",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      cardRadius: "24px",
      btnRadius: "16px",
      cardBorder: "1.5px solid #bae6fd",
      cardShadow: "0 16px 36px rgba(2, 132, 199, 0.14)",
      cardShadowHover: "0 24px 50px rgba(2, 132, 199, 0.22)",
      backdropBlur: "blur(14px)",
      bgPattern: "radial-gradient(circle at 20% 20%, #e0f2fe 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ede9fe 0%, transparent 50%), #f0f9ff",
      bgPatternSize: "auto",
      badgeBg: "#e0f2fe"
    },
    animationProfile: {
      name: "Smooth Velocity Separation",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.65,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "stars"
    },
    previewTokens: {
      headline: "Depth Velocity",
      buttonLabel: "Scroll Deeper",
      cardAccentColor: "#38bdf8",
      cardSnippet: "Differential layer velocities with zero scroll-jacking"
    }
  },

  // 17. KINETIC TYPOGRAPHY
  {
    id: "kinetic-typography",
    name: "Kinetic Typography",
    category: "Motion & Kinetic",
    shortDesc: "Massive scale headlines, animated text reveals, character masking, and dynamic type tracking.",
    fullDesc:
      "Typography takes center stage as architecture. Features colossal headlines that expand on scroll, ticker ribbon marquees, animated character reveals, and expressive type scales.",
    tags: ["Colossal Scale", "Masked Type", "Marquee Ribbons", "Dynamic Weight"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#fffef0",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#000000",
      borderGlow: "#1d4ed8",
      accentPrimary: "#1d4ed8",
      accentSecondary: "#f59e0b",
      accentTertiary: "#ef4444",
      textPrimary: "#000000",
      textSecondary: "#1e293b",
      textMuted: "#475569",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "3px solid #000000",
      cardShadow: "5px 5px 0px #000000",
      cardShadowHover: "8px 8px 0px #000000",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#dbeafe"
    },
    animationProfile: {
      name: "Kinetic Letter Reveal",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.6,
      entranceType: "kinetic-slide",
      hoverInteraction: "lift-shadow",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "TYPE_AS_POWER",
      buttonLabel: "Animate Type",
      cardAccentColor: "#facc15",
      cardSnippet: "Character masking and responsive type weight transitions"
    }
  },

  // 18. RETRO-FUTURISM
  {
    id: "retro-futurism",
    name: "Retro-Futurism",
    category: "Technical & Retro",
    shortDesc: "1970s sci-fi interfaces, warm amber CRT monitors, analog dials, and technical instrument panels.",
    fullDesc:
      "Evokes NASA mission control and vintage 1970s science fiction. Warm phosphor amber monitors, analog dial readouts, oscilloscope waves, rounded bezel displays, and nostalgic technical precision.",
    tags: ["Warm Amber", "Analog Dials", "NASA Telemetry", "Phosphor CRT"],
    themeMode: "dark",
    fontDisplay: "'Orbitron', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#1a0b2e",
      bgSecondary: "#ffffff",
      bgCard: "rgba(35, 14, 66, 0.88)",
      borderColor: "#ff7a00",
      borderGlow: "#ff7a00",
      accentPrimary: "#ff7a00",
      accentSecondary: "#f43f5e",
      accentTertiary: "#facc15",
      textPrimary: "#ffffff",
      textSecondary: "#fed7aa",
      textMuted: "#cbd5e1",
      cardRadius: "16px",
      btnRadius: "12px",
      cardBorder: "2px solid #ff7a00",
      cardShadow: "0 14px 35px rgba(255, 122, 0, 0.25)",
      cardShadowHover: "0 20px 45px rgba(255, 122, 0, 0.4)",
      backdropBlur: "blur(12px)",
      bgPattern: "radial-gradient(circle at 50% 20%, rgba(255, 122, 0, 0.35) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.3) 0%, transparent 50%), #1a0b2e",
      bgPatternSize: "cover",
      badgeBg: "rgba(255, 122, 0, 0.2)"
    },
    animationProfile: {
      name: "CRT Phosphor Warmup",
      easing: "steps(5, end)",
      durationBase: 0.35,
      entranceType: "cut-in",
      hoverInteraction: "glow-bloom",
      ambientEffect: "scanlines"
    },
    previewTokens: {
      headline: "TELEMETRY // 77",
      buttonLabel: "ENGAGE DIAL",
      cardAccentColor: "#f59e0b",
      cardSnippet: "Warm amber phosphor with analog oscilloscope grid"
    }
  },

  // 19. Y2K AESTHETIC
  {
    id: "y2k-aesthetic",
    name: "Y2K Aesthetic",
    category: "Aesthetic & Culture",
    shortDesc: "Chrome gradients, glossy candy acrylic buttons, metallic sheen, starbursts, and playful futuristic optimism.",
    fullDesc:
      "A vibrant millennium fever dream. Silver chrome gradient borders, translucent aqua candy bubbles, metallic starburst accents, and glossy skeuomorphic buttons straight out of year 2000.",
    tags: ["Chrome Metallic", "Candy Aqua", "Starburst Sparks", "Glossy Acrylic"],
    themeMode: "light",
    fontDisplay: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#e0f2fe",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 249, 255, 0.9) 100%)",
      borderColor: "#bae6fd",
      borderGlow: "#f43f5e",
      accentPrimary: "#f43f5e",
      accentSecondary: "#0284c7",
      accentTertiary: "#84cc16",
      textPrimary: "#0c4a6e",
      textSecondary: "#0369a1",
      textMuted: "#475569",
      cardRadius: "24px",
      btnRadius: "9999px",
      cardBorder: "2.5px solid #7dd3fc",
      cardShadow: "0 14px 32px rgba(14, 165, 233, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.95)",
      cardShadowHover: "0 20px 42px rgba(14, 165, 233, 0.35), inset 0 2px 4px rgba(255, 255, 255, 1)",
      backdropBlur: "blur(8px)",
      bgPattern: "radial-gradient(circle at 20% 20%, #e0f2fe 0%, #fce7f3 40%, #ffffff 80%)",
      bgPatternSize: "cover",
      badgeBg: "#e0f2fe"
    },
    animationProfile: {
      name: "Chrome Shimmer Bounce",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      durationBase: 0.45,
      entranceType: "scale-spring",
      hoverInteraction: "chrome-shimmer",
      ambientEffect: "blobs"
    },
    previewTokens: {
      headline: "MILLENNIUM_CORE",
      buttonLabel: "GLOSS POP",
      cardAccentColor: "#06b6d4",
      cardSnippet: "Translucent candy acrylic with chrome shimmer edges"
    }
  },

  // 20. VAPORWAVE
  {
    id: "vaporwave",
    name: "Vaporwave",
    category: "Aesthetic & Culture",
    shortDesc: "Retro sunset gradients, nostalgic purple & hot pink, classical statue motifs, and 1980s synth horizons.",
    fullDesc:
      "Aesthetic nostalgia and digital melancholy. Bathed in Miami sunset gradients (electric cyan, magenta, and twilight violet), retro wireframe grid floors, and nostalgic visual atmosphere.",
    tags: ["Sunset Gradients", "Twilight Purple", "Neon Teal", "Synth Horizon"],
    themeMode: "light",
    fontDisplay: "'Orbitron', monospace",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#fce7f3",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.9) 100%)",
      borderColor: "#fbcfe8",
      borderGlow: "#ec4899",
      accentPrimary: "#ec4899",
      accentSecondary: "#06b6d4",
      accentTertiary: "#a855f7",
      textPrimary: "#1e1147",
      textSecondary: "#581c87",
      textMuted: "#6b7280",
      cardRadius: "20px",
      btnRadius: "14px",
      cardBorder: "2px solid rgba(244, 114, 182, 0.55)",
      cardShadow: "0 14px 32px rgba(236, 72, 153, 0.2), 0 0 15px rgba(6, 182, 212, 0.15)",
      cardShadowHover: "0 20px 40px rgba(236, 72, 153, 0.3), 0 0 25px rgba(6, 182, 212, 0.25)",
      backdropBlur: "blur(12px)",
      bgPattern: "linear-gradient(135deg, #fbcfe8 0%, #f3e8ff 35%, #e0e7ff 70%, #cffafe 100%)",
      bgPatternSize: "cover",
      badgeBg: "#fce7f3"
    },
    animationProfile: {
      name: "Retro Synth Drift",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.7,
      entranceType: "fade-up",
      hoverInteraction: "glow-bloom",
      ambientEffect: "grid"
    },
    previewTokens: {
      headline: "ＡＥＳＴＨＥＴＩＣ",
      buttonLabel: "PLAY SYNTH",
      cardAccentColor: "#f472b6",
      cardSnippet: "Twilight purple and hot pink sunset gradient horizons"
    }
  },

  // 21. SWISS / INTERNATIONAL TYPOGRAPHIC STYLE
  {
    id: "swiss-style",
    name: "Swiss / International Style",
    category: "Layout & Architecture",
    shortDesc: "Strict mathematical grid, oversized sans-serif typography, restrained decoration, and functional clarity.",
    fullDesc:
      "Rooted in Josef Müller-Brockmann and the Zurich school. Driven by an uncompromising asymmetric grid, high-contrast black typography on bone white canvas, and stark crimson focal anchors.",
    tags: ["Grid Hierarchy", "Helvetica Bold", "Strict Order", "Crimson Anchor"],
    themeMode: "light",
    fontDisplay: "'Inter', system-ui, -apple-system, sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f8f9fa",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#0a0a0a",
      borderGlow: "#e11d48",
      accentPrimary: "#e11d48",
      accentSecondary: "#0a0a0a",
      accentTertiary: "#2563eb",
      textPrimary: "#0a0a0a",
      textSecondary: "#262626",
      textMuted: "#525252",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "2px solid #0a0a0a",
      cardShadow: "none",
      cardShadowHover: "none",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#fee2e2"
    },
    animationProfile: {
      name: "Architectural Precision Reveal",
      easing: "cubic-bezier(0, 0, 0.2, 1)",
      durationBase: 0.35,
      entranceType: "cut-in",
      hoverInteraction: "invert",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "ORDNUNG & FORM",
      buttonLabel: "SYSTEM AUSWÄHLEN",
      cardAccentColor: "#e11d48",
      cardSnippet: "Strict asymmetric mathematical grid with crimson anchor"
    }
  },

  // 22. EDITORIAL LUXURY
  {
    id: "editorial-luxury",
    name: "Editorial Luxury",
    category: "Aesthetic & Culture",
    shortDesc: "Refined serif/sans-serif pairing, premium whitespace, subtle transitions, and high-fashion presentation.",
    fullDesc:
      "Evokes high-end architectural and fashion monographs. Warm bone and charcoal palette, elegant classical serifs (Cinzel / Playfair), refined hairline rules, and generous pacing.",
    tags: ["High Fashion", "Editorial Serifs", "Bone Palette", "Refined Whitespace"],
    themeMode: "light",
    fontDisplay: "'Cinzel', serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#faf7f2",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#e7dfd5",
      borderGlow: "#c5a880",
      accentPrimary: "#c5a880",
      accentSecondary: "#b45309",
      accentTertiary: "#1c1917",
      textPrimary: "#1c1917",
      textSecondary: "#44403c",
      textMuted: "#78716c",
      cardRadius: "2px",
      btnRadius: "2px",
      cardBorder: "1px solid #e7dfd5",
      cardShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
      cardShadowHover: "0 14px 40px rgba(197, 168, 128, 0.18)",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#f5efe6"
    },
    animationProfile: {
      name: "Monograph Slow Reveal",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.75,
      entranceType: "editorial-mask",
      hoverInteraction: "lift-shadow",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "The Monograph",
      buttonLabel: "View Portfolio",
      cardAccentColor: "#b49b78",
      cardSnippet: "Classical serif headlines with champagne gold accents"
    }
  },

  // 23. TERMINAL / MATRIX UI
  {
    id: "terminal-matrix",
    name: "Terminal / Matrix UI",
    category: "Technical & Retro",
    shortDesc: "Pure monospace typography, retro phosphor CRT green, command-line motifs, and digital scanlines.",
    fullDesc:
      "Pure hacker terminal aesthetic. Built with JetBrains Mono, electric emerald phosphor glow on deep pitch black, blinking console cursors, and technical system status indicators.",
    tags: ["Phosphor Green", "Monospace Console", "CRT Scanlines", "Terminal Prompt"],
    themeMode: "dark",
    fontDisplay: "'JetBrains Mono', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#020b05",
      bgSecondary: "#ffffff",
      bgCard: "rgba(3, 24, 10, 0.9)",
      borderColor: "#22c55e",
      borderGlow: "#22c55e",
      accentPrimary: "#22c55e",
      accentSecondary: "#4ade80",
      accentTertiary: "#86efac",
      textPrimary: "#4ade80",
      textSecondary: "#22c55e",
      textMuted: "#15803d",
      cardRadius: "4px",
      btnRadius: "2px",
      cardBorder: "2px solid #22c55e",
      cardShadow: "0 0 20px rgba(34, 197, 94, 0.25)",
      cardShadowHover: "0 0 30px rgba(34, 197, 94, 0.45)",
      backdropBlur: "none",
      bgPattern: "radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.22) 0%, transparent 60%), #020b05",
      bgPatternSize: "cover",
      badgeBg: "rgba(34, 197, 94, 0.2)"
    },
    animationProfile: {
      name: "Console Character Stagger",
      easing: "steps(6, jump-end)",
      durationBase: 0.3,
      entranceType: "cut-in",
      hoverInteraction: "glow-bloom",
      ambientEffect: "scanlines"
    },
    previewTokens: {
      headline: "$ root@matrix:~#",
      buttonLabel: "> EXECUTE",
      cardAccentColor: "#22c55e",
      cardSnippet: "Electric phosphor CRT terminal with blinking prompt"
    }
  },

  // 24. ORGANIC / BIOPHILIC UI
  {
    id: "organic-biophilic",
    name: "Organic / Biophilic UI",
    category: "Aesthetic & Culture",
    shortDesc: "Natural earthy palettes, flowing pebble shapes, soft textures, and gentle organic transitions.",
    fullDesc:
      "Harmonizes digital technology with natural living forms. Sage greens, terracotta warmth, moss textures, and soft asymmetric pebble cards that evoke natural river stones.",
    tags: ["Natural Sage", "Pebble Cards", "Terracotta Warmth", "Living Curves"],
    themeMode: "light",
    fontDisplay: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f0fdf4",
      bgSecondary: "#ffffff",
      bgCard: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 253, 244, 0.9) 100%)",
      borderColor: "#bbf7d0",
      borderGlow: "#10b981",
      accentPrimary: "#10b981",
      accentSecondary: "#059669",
      accentTertiary: "#f59e0b",
      textPrimary: "#064e3b",
      textSecondary: "#065f46",
      textMuted: "#4b5563",
      cardRadius: "28px 12px 28px 12px",
      btnRadius: "24px 8px 24px 8px",
      cardBorder: "2px solid #bbf7d0",
      cardShadow: "0 14px 32px rgba(22, 101, 52, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
      cardShadowHover: "0 22px 45px rgba(22, 101, 52, 0.16)",
      backdropBlur: "none",
      bgPattern: "radial-gradient(circle at 10% 20%, #dcfce7 0%, transparent 40%), radial-gradient(circle at 90% 80%, #fef3c7 0%, transparent 35%), #f0fdf4",
      bgPatternSize: "auto",
      badgeBg: "#dcfce7"
    },
    animationProfile: {
      name: "Natural Leaf Sway",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.65,
      entranceType: "fade-up",
      hoverInteraction: "bounce",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "Biophilic Calm",
      buttonLabel: "Breathe In",
      cardAccentColor: "#4d7c58",
      cardSnippet: "Organic pebble shapes with earthy sage & terracotta"
    }
  },

  // 25. RETRO PIXEL UI
  {
    id: "retro-pixel",
    name: "Retro Pixel UI",
    category: "Technical & Retro",
    shortDesc: "16-bit arcade aesthetics, stepped pixel borders, bitmap badges, and retro gaming health bars.",
    fullDesc:
      "A nostalgic 16-bit arcade experience engineered for web accessibility. Stepped pixel borders, retro gaming health bars for skills, arcade coin buttons, and crisp pixel typography.",
    tags: ["16-Bit Arcade", "Pixel Borders", "Gaming HP Bars", "Retro Bitmap"],
    themeMode: "light",
    fontDisplay: "'JetBrains Mono', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#fef9c3",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#0f172a",
      borderGlow: "#ef4444",
      accentPrimary: "#ef4444",
      accentSecondary: "#3b82f6",
      accentTertiary: "#eab308",
      textPrimary: "#0f172a",
      textSecondary: "#1e293b",
      textMuted: "#475569",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "3.5px solid #0f172a",
      cardShadow: "5px 5px 0px #0f172a",
      cardShadowHover: "8px 8px 0px #0f172a",
      backdropBlur: "none",
      bgPattern: "radial-gradient(circle at 10% 10%, #fef08a 0%, transparent 35%), radial-gradient(circle at 90% 90%, #fed7aa 0%, transparent 35%), #fef9c3",
      bgPatternSize: "auto",
      badgeBg: "#fee2e2"
    },
    animationProfile: {
      name: "16-Bit Step Frame",
      easing: "steps(4, jump-end)",
      durationBase: 0.22,
      entranceType: "pixel-step",
      hoverInteraction: "tactile-press",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "LEVEL 99 DEV",
      buttonLabel: "[PRESS START]",
      cardAccentColor: "#ffd700",
      cardSnippet: "Stepped 16-bit pixel borders and arcade coin action"
    }
  },

  // 26. GRADIENT MESH UI
  {
    id: "gradient-mesh",
    name: "Gradient Mesh UI",
    category: "Surface Archetype",
    shortDesc: "Multi-point Gaussian color gradients, liquid atmospheric depth, and fluid chromatic transitions.",
    fullDesc:
      "A rich chromatic symphony. Multiple colored control points in coral, indigo, cyan, and violet drift and blend seamlessly across the background, creating deep luminous atmospheric warmth.",
    tags: ["Multi-Point Mesh", "Chromatic Blur", "Atmospheric Glow", "Gaussian Bloom"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#faf5ff",
      bgSecondary: "#ffffff",
      bgCard: "rgba(255, 255, 255, 0.9)",
      borderColor: "#ddd6fe",
      borderGlow: "#8b5cf6",
      accentPrimary: "#8b5cf6",
      accentSecondary: "#ec4899",
      accentTertiary: "#06b6d4",
      textPrimary: "#1e1b4b",
      textSecondary: "#3730a3",
      textMuted: "#64748b",
      cardRadius: "26px",
      btnRadius: "16px",
      cardBorder: "2px solid rgba(255, 255, 255, 0.95)",
      cardShadow: "0 16px 36px rgba(124, 58, 237, 0.14), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
      cardShadowHover: "0 24px 50px rgba(124, 58, 237, 0.22)",
      backdropBlur: "blur(16px)",
      bgPattern: "radial-gradient(at 10% 10%, #fbcfe8 0px, transparent 50%), radial-gradient(at 90% 15%, #c7d2fe 0px, transparent 50%), radial-gradient(at 50% 50%, #fed7aa 0px, transparent 50%), radial-gradient(at 20% 85%, #a7f3d0 0px, transparent 50%), radial-gradient(at 80% 85%, #bae6fd 0px, transparent 50%), #faf5ff",
      bgPatternSize: "cover",
      badgeBg: "#f3e8ff"
    },
    animationProfile: {
      name: "Gaussian Mesh Drift",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.7,
      entranceType: "fade-up",
      hoverInteraction: "lift-shadow",
      ambientEffect: "blobs"
    },
    previewTokens: {
      headline: "Mesh Chromatics",
      buttonLabel: "Blend Colors",
      cardAccentColor: "#818cf8",
      cardSnippet: "Multi-point Gaussian gradient field blending"
    }
  },

  // 27. HIGH-CONTRAST MONOCHROME
  {
    id: "high-contrast-monochrome",
    name: "High-Contrast Monochrome",
    category: "Layout & Architecture",
    shortDesc: "Pure black and stark white, oversized typography, sharp geometry, and zero color distractions.",
    fullDesc:
      "Extreme graphic conviction. Strips away all color hues to rely strictly on pure black (#000000) and pure white (#ffffff), dramatic scale shifts, inverted interactive states, and razor-sharp borders.",
    tags: ["Pure Black & White", "Zero Color", "Extreme Contrast", "Razor Sharp"],
    themeMode: "light",
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#ffffff",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#000000",
      borderGlow: "#000000",
      accentPrimary: "#000000",
      accentSecondary: "#262626",
      accentTertiary: "#525252",
      textPrimary: "#000000",
      textSecondary: "#171717",
      textMuted: "#404040",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "3px solid #000000",
      cardShadow: "none",
      cardShadowHover: "none",
      backdropBlur: "none",
      bgPattern: "none",
      bgPatternSize: "auto",
      badgeBg: "#000000"
    },
    animationProfile: {
      name: "Stark Invert Snap",
      easing: "cubic-bezier(0, 0, 0.2, 1)",
      durationBase: 0.25,
      entranceType: "cut-in",
      hoverInteraction: "invert",
      ambientEffect: "none"
    },
    previewTokens: {
      headline: "PURE_MONO",
      buttonLabel: "INVERT VIEW",
      cardAccentColor: "#ffffff",
      cardSnippet: "Pure black and white with inverted hover interactions"
    }
  },

  // 28. INDUSTRIAL / TECHNICAL UI
  {
    id: "industrial-technical",
    name: "Industrial / Technical UI",
    category: "Technical & Retro",
    shortDesc: "CAD blueprint grid lines, technical tolerance labels, crosshair brackets, and functional engineering dashboards.",
    fullDesc:
      "Engineered like precision aerospace schematics. Blueprint cyan grid backdrops, dimensional callout annotations ([DIM: 1920x1080]), corner crosshair brackets, and measured status gauges.",
    tags: ["CAD Blueprint", "Crosshair Brackets", "Tolerance Labels", "Engineering Grid"],
    themeMode: "light",
    fontDisplay: "'Orbitron', monospace",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    tokens: {
      bgPrimary: "#f0f7ff",
      bgSecondary: "#ffffff",
      bgCard: "#ffffff",
      borderColor: "#0284c7",
      borderGlow: "#0284c7",
      accentPrimary: "#0284c7",
      accentSecondary: "#eab308",
      accentTertiary: "#ef4444",
      textPrimary: "#082f49",
      textSecondary: "#0369a1",
      textMuted: "#475569",
      cardRadius: "0px",
      btnRadius: "0px",
      cardBorder: "2px solid #0284c7",
      cardShadow: "0 6px 18px rgba(2, 132, 199, 0.1)",
      cardShadowHover: "0 10px 25px rgba(2, 132, 199, 0.2)",
      backdropBlur: "none",
      bgPattern: "repeating-linear-gradient(0deg, rgba(2, 132, 199, 0.12) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(2, 132, 199, 0.12) 0px, transparent 1px, transparent 20px), #f0f7ff",
      bgPatternSize: "20px 20px",
      badgeBg: "#e0f2fe"
    },
    animationProfile: {
      name: "CAD Technical Trace",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      durationBase: 0.4,
      entranceType: "cut-in",
      hoverInteraction: "glow-bloom",
      ambientEffect: "blueprint"
    },
    previewTokens: {
      headline: "[SPEC_CAD // 1080P]",
      buttonLabel: "[MEASURE // GO]",
      cardAccentColor: "#38bdf8",
      cardSnippet: "Blueprint grid with corner crosshairs & tolerance labels"
    }
  }
];

export function getStylePreset(id: string): StylePreset {
  return STYLE_PRESETS.find((s) => s.id === id) || STYLE_PRESETS[0];
}

export function getAllStylePresets(): StylePreset[] {
  return STYLE_PRESETS;
}
