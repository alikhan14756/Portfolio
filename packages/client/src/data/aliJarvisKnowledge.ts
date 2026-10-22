/**
 * ALI JARVIS Structured Portfolio Knowledge Base & Conversational Rules
 * Maintained as an independent, structured data model.
 */

export interface ProjectFact {
  id: string;
  name: string;
  domain?: string;
  url?: string;
  role: string;
  technologies: string[];
  summary: string;
  metrics: string;
  detailedOverview: string;
}

export interface ServicePackage {
  service: string;
  priceRange: string;
  timeline: string;
  deliverables: string[];
}

export interface AliJarvisKnowledgeBase {
  identity: {
    name: string;
    fullName: string;
    role: string;
    purpose: string;
    personality: string[];
    boundaries: string[];
  };
  owner: {
    name: string;
    title: string;
    location: string;
    yearsOfExperience: string;
    education: {
      degree: string;
      institution: string;
      period: string;
      status: string;
    }[];
    languages: { name: string; proficiency: string }[];
    contact: {
      whatsapp: string;
      whatsappUrl: string;
      email: string;
      github: string;
      instagram: string;
    };
  };
  clientProjects: ProjectFact[];
  services: ServicePackage[];
  educationalConcepts: Record<string, { beginner: string; technical: string }>;
  themeDescriptions: Record<string, string>;
}

export const ALI_JARVIS_KNOWLEDGE: AliJarvisKnowledgeBase = {
  identity: {
    name: "ALI JARVIS",
    fullName: "ALI JARVIS // Autonomous Portfolio Copilot",
    role: "Muhammad Ali's Personal Portfolio Guide & AI Assistant",
    purpose: "To assist visitors in discovering Muhammad Ali's commercial client websites, reviewing technical case studies, answering questions about services and pricing, calibrating visual themes, and navigating the digital portfolio.",
    personality: [
      "Friendly, professional, calm, intelligent, concise and naturally conversational",
      "Uses a light futuristic persona without pretending to be a real human or claiming Marvel affiliation",
      "Offers concise 2-4 sentence answers by default, expanding with comprehensive detail only when requested"
    ],
    boundaries: [
      "Does not disclose hidden server keys or private infrastructure",
      "Does not execute arbitrary code or shell commands",
      "Distinguishes verified client work from estimated or general knowledge",
      "Gracefully guides off-topic requests back to relevant portfolio and web development topics"
    ]
  },

  owner: {
    name: "Muhammad Ali",
    title: "Frontend Developer & Digital Creator",
    location: "Peshawar, Khyber Pakhtunkhwa, Pakistan 🇵🇰",
    yearsOfExperience: "2+ years of verified commercial client delivery",
    education: [
      {
        degree: "Diploma in Information Technology (DIT)",
        institution: "Government Polytechnic Institute / Technical Board",
        period: "2025 – Present",
        status: "In Progress"
      },
      {
        degree: "FSc (Pre-Medical)",
        institution: "Peshawar Model Degree College",
        period: "2023 – 2025",
        status: "Completed"
      }
    ],
    languages: [
      { name: "English", proficiency: "Professional Working Proficiency" },
      { name: "Urdu", proficiency: "Native / Bilingual" },
      { name: "Pashto", proficiency: "Native / Regional" }
    ],
    contact: {
      whatsapp: "+92 305 5389967",
      whatsappUrl: "https://wa.me/923055389967",
      email: "alikhanwebdeveloper@gmail.com",
      github: "https://github.com/alikhan14756",
      instagram: "https://instagram.com/codevibe.anim"
    }
  },

  clientProjects: [
    {
      id: "ivanalexx",
      name: "Ivana Studio",
      domain: "ivanalexx.com",
      url: "https://ivanalexx.com/",
      role: "Lead Frontend Web Developer (WordPress & Elementor Pro)",
      technologies: ["WordPress", "Elementor Pro", "HTML5/CSS3", "JavaScript", "Responsive Design"],
      summary: "High-end portfolio for an international video producer on Fiverr featuring multi-format showreels, modern typography, and direct client lead capture.",
      metrics: "Sub-2.2s load time, 100% responsive cross-device layout.",
      detailedOverview: "Engineered for video director Ivana Alexx. Focuses on cinematic widescreen media presentation, custom video lightboxes, seamless contact forms, and fluid micro-animations."
    },
    {
      id: "nexcurex",
      name: "Nexcurex",
      domain: "nexcurex.com",
      url: "https://nexcurex.com/",
      role: "E-Commerce Developer & UI/UX Integrator",
      technologies: ["WooCommerce", "WordPress", "Elementor Pro", "Payment Gateways", "Tailwind CSS"],
      summary: "Modern apparel and fashion e-commerce storefront featuring product filtering, special edition discounts (OFF20), and secure checkout.",
      metrics: "Optimized mobile cart experience, automated order email confirmations.",
      detailedOverview: "Full online store deployment with dynamic discount coupon codes, category landing pages, cart drawer, and high-conversion product galleries."
    },
    {
      id: "arshad",
      name: "Arshad Tiles",
      url: "https://alikhan14756.github.io/Arshad-Tiles/",
      role: "Frontend Developer & Performance Specialist",
      technologies: ["HTML5", "CSS3", "JavaScript", "WhatsApp API", "Responsive Grid"],
      summary: "Commercial ceramic tiles catalog website with direct WhatsApp inquiry routing and 2.1s average load time.",
      metrics: "CV-reported +40% surge in customer inquiries, 2.1s page speed.",
      detailedOverview: "Built for local ceramic manufacturer Arshad Tiles to digitize their inventory catalog, enabling customers to order specific tile SKUs via one-click WhatsApp prefilled chats."
    },
    {
      id: "vet",
      name: "VetCarePlus (Malik Hassan Veterinary)",
      role: "Web Developer & UI Designer",
      technologies: ["WordPress", "Elementor", "Appointment Booking Engine", "Responsive Design"],
      summary: "Veterinary medical clinic portal featuring online appointment requests and pet healthcare service guides.",
      metrics: "CV-reported +35% appointment surge, 1.8s page speed.",
      detailedOverview: "Features clean medical UI, emergency calling integration, clinic hours, doctor credentials, and automated appointment inquiry routing."
    },
    {
      id: "shah-sweet",
      name: "Shah-Sweet Store",
      role: "Frontend Developer",
      technologies: ["HTML5/CSS3", "JavaScript", "Mobile-First UI", "WhatsApp API"],
      summary: "Artisanal confectionery catalog with mobile-first menu navigation and direct messaging order integration.",
      metrics: "Mobile-optimized menu catalog, instant order dispatch.",
      detailedOverview: "Designed for a local bakery to showcase daily confectionery specialties and allow quick customer order placement without complex checkout friction."
    },
    {
      id: "aetheria-ecosystem",
      name: "Aetheria 2.5D Collaborative Biosphere",
      role: "Technical Flagship Architect",
      technologies: ["React 19", "Next.js 15", "Three.js / WebGL", "Fastify", "Socket.IO", "Redis", "Web Audio API"],
      summary: "Real-time 25 Hz authoritative multiplayer simulation featuring a 60 WU spatial grid, Hermite spline interpolation, synaptic tethers, and procedural audio synthesis.",
      metrics: "25 Hz authoritative server ticks, sub-15ms loop latency, 100% procedural zero-asset audio.",
      detailedOverview: "A distributed digital biosphere exploring collective topological resonance where 3+ entities form closed geometric cycles, triggering harmonic procedural chords and emergent fossil formations."
    }
  ],

  services: [
    {
      service: "High-Converting Landing Pages",
      priceRange: "$150 – $350",
      timeline: "2 – 4 Business Days",
      deliverables: ["Custom UI/UX layout", "Sub-2.0s PageSpeed optimization", "Lead capture forms", "100% Mobile responsiveness"]
    },
    {
      service: "Custom WordPress & Elementor Pro Websites",
      priceRange: "$300 – $600",
      timeline: "5 – 9 Business Days",
      deliverables: ["Multi-page brand design", "Dynamic blog/case-studies", "SEO setup", "Training video on managing content"]
    },
    {
      service: "Full E-Commerce Stores (WooCommerce / Shopify)",
      priceRange: "$500 – $1,200+",
      timeline: "10 – 14 Business Days",
      deliverables: ["Product catalog & categories", "Shopping cart & checkout", "Payment gateways (Stripe, PayPal, Local)", "Coupon discount engine"]
    },
    {
      service: "Website Speed & Core Web Vitals Optimization",
      priceRange: "$100 – $250",
      timeline: "1 – 3 Business Days",
      deliverables: ["90+ Google PageSpeed score", "Image compression & WebP conversion", "Code minification & cache setup", "LCP / CLS remediation"]
    },
    {
      service: "Interactive Frontend Web Applications",
      priceRange: "Custom Quote",
      timeline: "Flexible Milestones",
      deliverables: ["React 19 / Next.js 15 App Router", "Tailwind CSS styling", "Three.js WebGL 3D canvas integration", "REST / WebSocket API connectivity"]
    }
  ],

  educationalConcepts: {
    "responsive-design": {
      beginner: "Responsive design means building a website so it automatically looks beautiful and easy to read whether you are on an iPhone, an iPad, a laptop, or an ultra-wide desktop monitor.",
      technical: "Implemented using CSS media queries, fluid rem/em units, CSS Grid, Flexbox, dynamic viewport units, and responsive images with srcset to ensure zero layout shift across all DPI densities."
    },
    "wordpress-elementor": {
      beginner: "WordPress powers over 40% of all websites worldwide. Elementor Pro is a visual builder that lets developers design pixel-perfect, custom layouts while giving the website owner an easy dashboard to edit text and images without touching code.",
      technical: "A flexible CMS architecture utilizing PHP templating, Elementor Pro container widgets, custom hook filters, optimized asset asset dequeuing, and custom CSS/JS injection for bespoke enterprise features."
    },
    "threejs-webgl": {
      beginner: "WebGL lets browsers display real 3D graphics using your computer's graphics card. Three.js is a JavaScript library that makes it possible to create 3D objects, lighting, and camera animations right on a webpage without needing any plugins.",
      technical: "A scene graph rendering library running on top of WebGL/WebGPU. Manages orthographic/perspective cameras, custom GLSL fragment/vertex shaders, InstancedMesh buffers, and requestAnimationFrame render loops."
    },
    "pagespeed-optimization": {
      beginner: "Page speed is how quickly a website loads when someone clicks on it. Faster websites rank higher on Google and convert far more visitors into paying customers because nobody likes waiting for a slow site.",
      technical: "Measured via Google Core Web Vitals: Largest Contentful Paint (LCP < 2.5s), First Input Delay (FID < 100ms), and Cumulative Layout Shift (CLS < 0.1). Optimized using asset minification, Brotli compression, critical CSS, and deferred script loading."
    }
  },

  themeDescriptions: {
    "jarvis-core": "Default holographic HUD theme. Deep space navy background with luminous cyan arc reactor neons.",
    "iron-red": "Stark-inspired charcoal crimson background with titanium gold and hot red reactor accents.",
    "cyberpunk-neon": "High-contrast Night City aesthetic with electric yellow borders, hot magenta glows, and chamfered polygon cards.",
    "matrix-terminal": "Retro phosphor CRT aesthetic with falling code grid, pure monospace typography, and green terminal panels.",
    "arctic-glass": "Sub-zero crystalline aesthetic with frosted acrylic glass, baby blue rim lighting, and translucent depths.",
    "midnight-purple": "Deep royal purple with lavender gradients and soft violet luminescence.",
    "emerald-professional": "Corporate mint and deep slate teal for refined technology and business platforms.",
    "solar-gold": "Warm luxury gold with solar amber highlights and radiant lighting.",
    "ocean-blue": "Clean technical deep azure with seafoam cyan accents.",
    "rose-neon": "Electric plum and hot rose neon with rich velvety backdrops.",
    "paper-studio": "High-contrast editorial light mode. Warm bone linen paper with slate ink typography and clean borders.",
    "monochrome": "Pure noir silver with stark minimalist contrast and zero color distractions."
  }
};
