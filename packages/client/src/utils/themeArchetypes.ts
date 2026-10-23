export type ThemeArchetypeId =
  | "claymorphism"
  | "neumorphism"
  | "neobrutalism"
  | "swiss-style"
  | "cyberpunk"
  | "terminal-matrix"
  | "industrial-technical"
  | "bento-grid"
  | "retro-pixel"
  | "retro-futurism"
  | "y2k-aesthetic"
  | "vaporwave"
  | "glassmorphism"
  | "liquid-glass"
  | "aurora"
  | "gradient-mesh"
  | "holographic"
  | "immersive-3d"
  | "motion-driven"
  | "parallax-scrolling"
  | "kinetic-typography"
  | "editorial-luxury"
  | "minimalism"
  | "dark-midnight"
  | "organic-biophilic"
  | "high-contrast-monochrome"
  | "skeuomorphism"
  | "glass-grain";

export interface ThemeArchetypeConfig {
  id: ThemeArchetypeId;
  name: string;
  badgeText: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  tagline: string;
  heroLayout: "split" | "bento" | "stacked" | "brutalist" | "arcade" | "editorial" | "terminal" | "blueprint";
  skillsStyle:
    | "clay-pills"
    | "neumorphic-concave"
    | "brutalist-blocks"
    | "swiss-grid"
    | "cyber-matrix"
    | "terminal-ascii"
    | "cad-blueprint"
    | "bento-tiles"
    | "retro-xp"
    | "amber-crt"
    | "y2k-chrome"
    | "vaporwave-neon"
    | "glass-radar"
    | "liquid-prism"
    | "aurora-wave"
    | "gradient-blobs"
    | "holographic-foil"
    | "tilt-3d"
    | "kinetic-spring"
    | "editorial-minimal"
    | "midnight-stealth"
    | "organic-leaves"
    | "raw-monochrome"
    | "skeuo-beveled";
  skillsHeaderTitle: string;
  skillsHeaderSubtitle: string;
}

export function getThemeArchetype(styleId: string): ThemeArchetypeConfig {
  const s = (styleId || "").toLowerCase();

  // 1. Claymorphism
  if (s === "claymorphism") {
    return {
      id: "claymorphism",
      name: "Claymorphism 3D",
      badgeText: "👋 HEY THERE! I'M MUHAMMAD ALI",
      headlinePrefix: "Crafting Delightful, High-Converting",
      headlineHighlight: "Digital Experiences.",
      subheadline:
        "Tactile, soft, and friendly web engineering. Specializing in high-performance WordPress, Elementor Pro, and fluid modern interfaces with zero friction.",
      tagline: "3D TACTILE • PASTEL COHESION • ULTRA SOFT",
      heroLayout: "stacked",
      skillsStyle: "clay-pills",
      skillsHeaderTitle: "Tactile Skills & Proficiencies",
      skillsHeaderSubtitle: "Interactive 3D competency meters with spring physics and responsive tactile feedback."
    };
  }

  // 2. Neumorphism
  if (s === "neumorphism") {
    return {
      id: "neumorphism",
      name: "Neumorphism Soft",
      badgeText: "⚪ MONOCHROME EMBOSSED // SOFT MINIMAL",
      headlinePrefix: "Subtle Depth & Tactile",
      headlineHighlight: "Debossed Precision.",
      subheadline:
        "Seamless inner and outer shadows creating soft physical extrusions. Clean, calm, and distraction-free web craftsmanship.",
      tagline: "SOFT DEPTH • DUAL BEVEL • TRANQUIL SHADOWS",
      heroLayout: "stacked",
      skillsStyle: "neumorphic-concave",
      skillsHeaderTitle: "Debossed Skill Meters",
      skillsHeaderSubtitle: "Sculpted concave and convex tactile indicators blending directly into the canvas."
    };
  }

  // 3. Neobrutalism
  if (s === "neobrutalism") {
    return {
      id: "neobrutalism",
      name: "Neobrutalism Raw",
      badgeText: "★ 100% VERIFIED DEV • AVAILABLE FOR HIRE 2026 ★",
      headlinePrefix: "NO-NONSENSE WEBSITES THAT",
      headlineHighlight: "ACTUALLY CONVERT.",
      subheadline:
        "High-contrast, bold, and unapologetic frontend architecture. Built to crush conversion goals, dominate page speeds, and leave an unforgettable visual mark.",
      tagline: "BOLD MONO • 0% FLUFF • 100% IMPACT",
      heroLayout: "brutalist",
      skillsStyle: "brutalist-blocks",
      skillsHeaderTitle: "RAW TECHNICAL CAPABILITIES",
      skillsHeaderSubtitle: "No fluff, hardened frontend execution stack verified across real client deployments."
    };
  }

  // 4. Swiss Style
  if (s === "swiss-style") {
    return {
      id: "swiss-style",
      name: "Swiss International",
      badgeText: "SWISS STYLE // INT. TYPOGRAPHIC STYLE (1957–2026)",
      headlinePrefix: "Objective Form & Rational",
      headlineHighlight: "Grid Architecture.",
      subheadline:
        "Rigorous asymmetrical grid alignment, primary red and black accents, and pure typographic legibility inspired by Josef Müller-Brockmann.",
      tagline: "HELVETICA GRID • ASYMMETRIC BALANCE • PURE UTILITY",
      heroLayout: "editorial",
      skillsStyle: "swiss-grid",
      skillsHeaderTitle: "INDEX DER KOMPETENZEN (SKILLS)",
      skillsHeaderSubtitle: "Strict modular mathematical rhythm engineered for rapid visual comprehension."
    };
  }

  // 5. Cyberpunk UI
  if (s === "cyberpunk" || s === "cyberpunk-ui") {
    return {
      id: "cyberpunk",
      name: "Cyberpunk HUD",
      badgeText: "SYS_CORE://ALI.BUILD // SECURITY: CLEAR // STATUS: ONLINE",
      headlinePrefix: "NEXT-GEN DIGITAL SYSTEMS &",
      headlineHighlight: "ADVANCED TELEMETRY.",
      subheadline:
        "Tactical sci-fi HUDs, authoritative network synchronization, GLSL canvas shaders, and lightning-fast frontend pipelines built for maximum throughput.",
      tagline: "TACTICAL HUD • 25HZ TICK • AUTHORITATIVE SYNC",
      heroLayout: "split",
      skillsStyle: "cyber-matrix",
      skillsHeaderTitle: "DIAGNOSTIC MATRIX // STACK SPECS",
      skillsHeaderSubtitle: "Hardware-accelerated technical telemetry and memory-optimized web capabilities."
    };
  }

  // 6. Terminal / Matrix
  if (s === "terminal-matrix") {
    return {
      id: "terminal-matrix",
      name: "Terminal Phosphor Matrix",
      badgeText: "root@ali-mainframe:~$ ./start_daemon --all --verbose",
      headlinePrefix: "PHOSPHOR CRT MATRIX &",
      headlineHighlight: "COMMAND LINE ARCHITECTURE.",
      subheadline:
        "Pure terminal mastery. Real-time green phosphor glowing streams, raw shell automation, and lightweight web servers that respond in single-digit milliseconds.",
      tagline: "GREEN CRT • ASCII BOX • LINUX DAEMON",
      heroLayout: "terminal",
      skillsStyle: "terminal-ascii",
      skillsHeaderTitle: "SYSTEM PACKAGE INVENTORY [dpkg -l]",
      skillsHeaderSubtitle: "Monospaced system capabilities executing on bare-metal frontend infrastructure."
    };
  }

  // 7. Industrial Technical
  if (s === "industrial-technical") {
    return {
      id: "industrial-technical",
      name: "Industrial CAD Blueprint",
      badgeText: "SPEC: ISO-9001 // CAD REV. 4.2 // TOLERANCE: ±0.01",
      headlinePrefix: "BLUEPRINT SPECIFICATION FOR",
      headlineHighlight: "MISSION-CRITICAL WEB.",
      subheadline:
        "Architectural coordinate grids, technical dimension callouts, and rigorous structural integrity designed for heavy industrial engineering platforms.",
      tagline: "CAD BLUEPRINT • DIMENSION METRICS • STRUCTURAL INTEGRITY",
      heroLayout: "blueprint",
      skillsStyle: "cad-blueprint",
      skillsHeaderTitle: "COMPONENT CALIBRATION MATRIX",
      skillsHeaderSubtitle: "Verified engineering parameters calibrated to industrial standards."
    };
  }

  // 8. Bento Grid
  if (s === "bento-grid") {
    return {
      id: "bento-grid",
      name: "Bento Grid Modular",
      badgeText: "MODULAR COMPONENT ARCHITECTURE // v2.6.0",
      headlinePrefix: "Architecting Modern Web Apps in",
      headlineHighlight: "Structured Bento Cells.",
      subheadline:
        "Clean asymmetric layout precision. Organizing complexity into intuitive, beautiful, and glanceable cards for high-ticket commercial clients.",
      tagline: "ASYMMETRIC TILES • MODULAR HARMONY • RESPONSIVE MESH",
      heroLayout: "bento",
      skillsStyle: "bento-tiles",
      skillsHeaderTitle: "Modular Skills Showcase",
      skillsHeaderSubtitle: "Asymmetrical skill spotlight cells with real-time mastery badges and tech stacks."
    };
  }

  // 9. Retro Pixel (8-Bit Arcade)
  if (s === "retro-pixel") {
    return {
      id: "retro-pixel",
      name: "Retro 8-Bit Arcade",
      badgeText: "👾 INSERT COIN • 1P READY • HIGH SCORE: 999,990",
      headlinePrefix: "LEVEL 99 FRONTEND WARRIOR",
      headlineHighlight: "PRESS START TO WIN!",
      subheadline:
        "Nostalgic 8-bit chiptune vibes combined with ultra-modern 60 FPS web execution. Power-up your business with websites that stand out in any gaming arcade!",
      tagline: "8-BIT CRT • PIXEL PERFECT • CHIPTUNE GLORY",
      heroLayout: "arcade",
      skillsStyle: "retro-xp",
      skillsHeaderTitle: "PLAYER 1 CHARACTER STATS (LVL 99)",
      skillsHeaderSubtitle: "EXP meters and legendary skill inventory forged through 15+ epic web quests."
    };
  }

  // 10. Retro-Futurism
  if (s === "retro-futurism") {
    return {
      id: "retro-futurism",
      name: "Retro-Futurism NASA '77",
      badgeText: "VOYAGER DEEP-SPACE TELEMETRY // SECTOR 07",
      headlinePrefix: "SPACE-AGE COMPUTATION &",
      headlineHighlight: "ANALOG WARMTH.",
      subheadline:
        "Warm amber CRT glows, curved CRT television chassis, and late-70s aerospace design bringing soulful futuristic warmth back to modern web apps.",
      tagline: "AMBER CRT • VOYAGER AESTHETIC • SPACE AGE",
      heroLayout: "terminal",
      skillsStyle: "amber-crt",
      skillsHeaderTitle: "FLIGHT CONTROL AVIONICS // SKILLS",
      skillsHeaderSubtitle: "On-board aerospace navigation modules and deep-space telemetry."
    };
  }

  // 11. Y2K Aesthetic
  if (s === "y2k-aesthetic") {
    return {
      id: "y2k-aesthetic",
      name: "Y2K Cyber Millenium",
      badgeText: "★ CYBERSPACE 2000 // MP3 PLAYER // WINAMP READY ★",
      headlinePrefix: "CYBER-OPTIMISM & GLOSSY",
      headlineHighlight: "CHROME DREAMS.",
      subheadline:
        "Holographic CD-ROM badges, metallic chrome gradients, and bubblegum neon energy celebrating the dawn of the global internet era.",
      tagline: "CHROME FOIL • WINAMP VIBES • CYBER 2000",
      heroLayout: "split",
      skillsStyle: "y2k-chrome",
      skillsHeaderTitle: "CYBER WEAPONRY & SKILLS 2000",
      skillsHeaderSubtitle: "High-octane internet modules loaded with maximum cybernetic style."
    };
  }

  // 12. Vaporwave
  if (s === "vaporwave") {
    return {
      id: "vaporwave",
      name: "Vaporwave Dream",
      badgeText: "🌴 SURF THE AESTHETIC WEB // EST. 2024 // WINDOWS 95 READY 🌴",
      headlinePrefix: "RIDE THE DIGITAL SUNSET WITH",
      headlineHighlight: "AESTHETIC VIBES.",
      subheadline:
        "Neon grid horizons, glowing chrome gradients, and dreamy nostalgic micro-interactions designed to make your web presence look effortlessly legendary.",
      tagline: "SYNTH HORIZON • CHROME GRADIENTS • 90S CYBER DREAM",
      heroLayout: "split",
      skillsStyle: "vaporwave-neon",
      skillsHeaderTitle: "Aesthetic Web Arsenal",
      skillsHeaderSubtitle: "Neon glowing chrome competencies tuned to maximum visual frequency."
    };
  }

  // 13. Glassmorphism
  if (s === "glassmorphism") {
    return {
      id: "glassmorphism",
      name: "Glassmorphism Frosted",
      badgeText: "✦ FROSTED BACKDROP PRISM // 40PX BLUR",
      headlinePrefix: "Sculpting Modern Digital Interfaces With",
      headlineHighlight: "Frosted Glass Depth.",
      subheadline:
        "High-refraction acrylic frosted surfaces with glowing specular edge lighting. Floating softly above deep, colorful ambient backdrops.",
      tagline: "FROSTED ACRYLIC • SPECULAR HIGHLIGHTS • TRANSLUCENT DEPTH",
      heroLayout: "split",
      skillsStyle: "glass-radar",
      skillsHeaderTitle: "Refractive Proficiency Cards",
      skillsHeaderSubtitle: "Frosted glass tiles with multi-layer blur and iridescent progress arcs."
    };
  }

  // 14. Liquid Glass
  if (s === "liquid-glass") {
    return {
      id: "liquid-glass",
      name: "Liquid Glass Fluid",
      badgeText: "💧 CHROMATIC DISPERSION // FLUID LENS",
      headlinePrefix: "Fluid Chromatic Dispersion &",
      headlineHighlight: "Prismatic Liquid Flow.",
      subheadline:
        "Organic refractive fluid bubbles with dynamic rainbow chromatic shifts. Micro-interactions that bend and ripple with physical liquid viscosity.",
      tagline: "FLUID PRISM • RAINBOW SHIFT • LIQUID VISCOSITY",
      heroLayout: "split",
      skillsStyle: "liquid-prism",
      skillsHeaderTitle: "Prismatic Skill Dispersion",
      skillsHeaderSubtitle: "Chromatic liquid gauges rippling with dynamic spectrum color waves."
    };
  }

  // 15. Aurora UI
  if (s === "aurora" || s === "aurora-ui") {
    return {
      id: "aurora",
      name: "Aurora Borealis",
      badgeText: "🌌 NORTHERN LIGHTS MESH // COSMIC PLASMA",
      headlinePrefix: "Breathing Northern Lights &",
      headlineHighlight: "Cosmic Plasma Radiance.",
      subheadline:
        "Organic shifting curtains of electric emerald, violet, and cyan light dancing behind ethereal glass containers with zero visual fatigue.",
      tagline: "AURORA PLASMA • COSMIC EMERALD • ETHEREAL NIGHT",
      heroLayout: "split",
      skillsStyle: "aurora-wave",
      skillsHeaderTitle: "Aurora Competency Aurora",
      skillsHeaderSubtitle: "Wavefronts of cosmic plasma illuminating verified technical capabilities."
    };
  }

  // 16. Gradient Mesh
  if (s === "gradient-mesh" || s === "gradient-mesh-ui") {
    return {
      id: "gradient-mesh",
      name: "Vibrant Gradient Mesh",
      badgeText: "🎨 MULTI-POINT FLUID MESH // HIGH SATURATION",
      headlinePrefix: "High-Energy Shifting Colors &",
      headlineHighlight: "Fluid Modern Mesh.",
      subheadline:
        "Vibrant multi-point cubic bezier color fields that morph continuously. Giving high-growth tech startups undeniable visual authority.",
      tagline: "HIGH ENERGY • CUBIC BEZIER • SATURATED SPECTRUM",
      heroLayout: "split",
      skillsStyle: "gradient-blobs",
      skillsHeaderTitle: "Chromatic Capability Spectrum",
      skillsHeaderSubtitle: "Dynamic multi-point gradient gauges with high saturation fluid fills."
    };
  }

  // 17. Holographic
  if (s === "holographic" || s === "holographic-ui") {
    return {
      id: "holographic",
      name: "Holographic Iridescent Foil",
      badgeText: "💿 PRISMATIC DIFFRACTION // 3D SPECULAR FOIL",
      headlinePrefix: "DIFFRACTIVE LIGHT SHIMMER &",
      headlineHighlight: "IRIDESCENT SPECULARITY.",
      subheadline:
        "Holographic collector card foils that refract the entire light spectrum as your cursor glides across the interface.",
      tagline: "PRISMATIC FOIL • SPECULAR SHIMMER • COLLECTOR TILT",
      heroLayout: "split",
      skillsStyle: "holographic-foil",
      skillsHeaderTitle: "Prismatic Collector Skills",
      skillsHeaderSubtitle: "Diffractive rainbow foil indicators shifting dynamically on cursor hover."
    };
  }

  // 18. Immersive 3D
  if (s === "immersive-3d" || s === "immersive-3d-ui") {
    return {
      id: "immersive-3d",
      name: "Immersive Spatial 3D",
      badgeText: "📦 SPATIAL DEPTH LAYERS // PERSPECTIVE: 1000PX",
      headlinePrefix: "True Spatial Depth &",
      headlineHighlight: "Dimensional Perspective.",
      subheadline:
        "Cards and widgets that break out of the 2D plane with real perspective pitch and yaw, floating above an infinite interactive canvas.",
      tagline: "SPATIAL 3D • PERSPECTIVE PITCH • FLOATING PLANES",
      heroLayout: "split",
      skillsStyle: "tilt-3d",
      skillsHeaderTitle: "3D Spatial Capability Meters",
      skillsHeaderSubtitle: "Multi-layered perspective extrusion showing depth of production experience."
    };
  }

  // 19. Dark Midnight
  if (s === "dark-midnight" || s === "dark-mode-/-midnight-ui") {
    return {
      id: "dark-midnight",
      name: "Dark Midnight Stealth",
      badgeText: "🌑 TRUE OLED OBSIDIAN (#06080D) // ELECTRIC SAPPHIRE",
      headlinePrefix: "Cinematic Midnight Stealth &",
      headlineHighlight: "Deep Obsidian Contrast.",
      subheadline:
        "True pitch-black OLED backgrounds engineered with electric sapphire accents to completely eliminate glare and maximize battery life.",
      tagline: "TRUE OLED • ZERO GLARE • SAPPHIRE EDGE",
      heroLayout: "editorial",
      skillsStyle: "midnight-stealth",
      skillsHeaderTitle: "Stealth Capability Telemetry",
      skillsHeaderSubtitle: "Ultra-high contrast sapphire indicators calibrated for low-light developer workflows."
    };
  }

  // 20. Organic Biophilic
  if (s === "organic-biophilic" || s === "organic-/-biophilic-ui") {
    return {
      id: "organic-biophilic",
      name: "Organic Biophilic",
      badgeText: "🌿 NATURAL ORGANIC GEOMETRY // BOTANICAL CALM",
      headlinePrefix: "Natural Flowing Curves &",
      headlineHighlight: "Botanical Harmony.",
      subheadline:
        "Asymmetrical organic leaf radii, earthy moss greens, and warm clay stone textures engineered to reduce cognitive strain and inspire peaceful focus.",
      tagline: "LEAF RADII • BOTANICAL GREEN • STONE TEXTURES",
      heroLayout: "editorial",
      skillsStyle: "organic-leaves",
      skillsHeaderTitle: "Natural Competency Garden",
      skillsHeaderSubtitle: "Curved organic indicators mimicking growth patterns found in nature."
    };
  }

  // 21. High-Contrast Monochrome
  if (s === "high-contrast-monochrome") {
    return {
      id: "high-contrast-monochrome",
      name: "High-Contrast Monochrome",
      badgeText: "⬛ 100% PURE BLACK & WHITE // 0% INTERMEDIATE GRAY ⬜",
      headlinePrefix: "ABSOLUTE BINARY CONTRAST &",
      headlineHighlight: "UNCOMPROMISING SPEED.",
      subheadline:
        "Zero halftones. Zero gradients. Pure mathematical contrast where every pixel is either 100% black or 100% white with instantaneous inverse states.",
      tagline: "PURE BINARY • ZERO GRAYS • MAXIMUM ACCESSIBILITY",
      heroLayout: "brutalist",
      skillsStyle: "raw-monochrome",
      skillsHeaderTitle: "BINARY CAPABILITY MATRIX",
      skillsHeaderSubtitle: "100% contrast bars readable under direct sunlight or strict accessibility audits."
    };
  }

  // 22. Skeuomorphism
  if (s === "skeuomorphism") {
    return {
      id: "skeuomorphism",
      name: "Skeuomorphism Physical",
      badgeText: "⚙️ BEVELED METALLIC HARDWARE // STITCHED LEATHER",
      headlinePrefix: "Realistic Physical Depth &",
      headlineHighlight: "Precision Metalcraft.",
      subheadline:
        "Brushed aluminum screws, beveled chrome switches, and stitched tactile leather grain honoring classic physical studio recording equipment.",
      tagline: "BRUSHED ALUMINUM • CHROME SCREWS • STITCHED LEATHER",
      heroLayout: "stacked",
      skillsStyle: "skeuo-beveled",
      skillsHeaderTitle: "Studio Equipment Console",
      skillsHeaderSubtitle: "Realistic physical potentiometer dials and beveled VU meters."
    };
  }

  // 23. Editorial Luxury
  if (s === "editorial-luxury") {
    return {
      id: "editorial-luxury",
      name: "Editorial Luxury Magazine",
      badgeText: "HAUTE TYPOGRAPHY // VOL. XXVI // HAUTE COUTURE",
      headlinePrefix: "High-Fashion Editorial Typography &",
      headlineHighlight: "Champagne Opulence.",
      subheadline:
        "Delicate serif italic headers, generous haute-couture whitespace, and warm champagne metallic accents tailored for luxury retail brands.",
      tagline: "PLAYFAIR SERIF • CHAMPAGNE GOLD • GENEROUS MARGINS",
      heroLayout: "editorial",
      skillsStyle: "editorial-minimal",
      skillsHeaderTitle: "Catalog of Technical Mastery",
      skillsHeaderSubtitle: "An editorial directory of specialized web engineering disciplines."
    };
  }

  // Default / Minimalism
  return {
    id: "minimalism",
    name: "Editorial Minimalism",
    badgeText: "FIG. 01 — SELECTED WORKS & DIGITAL SYSTEMS (2026)",
    headlinePrefix: "Precision Frontend Engineering &",
    headlineHighlight: "Refined Typography.",
    subheadline:
      "Stripping away unnecessary clutter to focus on pure typography, generous whitespace, and sub-second page performance that converts visitors into loyal clients.",
    tagline: "SWISS PURITY • SUB-SECOND SPEED • TIMELESS ELEGANCE",
    heroLayout: "editorial",
    skillsStyle: "editorial-minimal",
    skillsHeaderTitle: "Index of Competencies & Stack",
    skillsHeaderSubtitle: "A curated technical catalog categorized by architectural specialty and production readiness."
  };
}
