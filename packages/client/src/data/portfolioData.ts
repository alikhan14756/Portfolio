export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: "Client Work" | "Playground" | "Engineering Flagship";
  tag: string;
  subtitle: string;
  client?: string;
  date?: string;
  status: "Completed" | "Active" | "Roadmap";
  overview: string;
  businessGoals?: string;
  scopeContribution: string;
  designDecisions?: string;
  responsiveImplementation?: string;
  accessibilityPerformance?: string;
  challenge: string;
  solution: string;
  resultsEvidence?: string;
  metrics: { label: string; value: string; isCvReported?: boolean }[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  isMockup?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  quote: string;
  rating: number;
}

export interface ExperienceItem {
  year: string;
  title: string;
  description: string;
  status: "Completed" | "Current";
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: "Completed" | "In Progress";
  location: string;
}

export interface LanguageItem {
  language: string;
  proficiency: "Native" | "Fluent" | "Professional";
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Muhammad Ali",
    role: "Frontend Developer & Digital Creator",
    callsign: "ALI.BUILD // JARVIS-CORE",
    headline: "I Build Websites That Convert.",
    subheadline:
      "Frontend developer based in Peshawar, Pakistan with 2+ years of hands-on experience crafting fast, modern, and responsive websites. Specialized in WordPress, Elementor, and vanilla web technologies.",
    availability: "Available for Projects",
    location: "Peshawar, Pakistan 🇵🇰",
    email: "alikhanwebdeveloper@gmail.com",
    whatsapp: "+92 305 5389967",
    whatsappUrl: "https://wa.me/923055389967?text=Hi%20Ali,%20I%20am%20interested%20in%20working%20with%20you!",
    github: "https://github.com/alikhan14756",
    codevibe: "@codevibe.anim",
    codevibeUrl: "https://instagram.com/codevibe.anim",
    portfolioSource: "https://alibuild.site/",
    cvUrl: "/assets/Muhammad_Ali_CV.pdf",
    stats: [
      { label: "Projects Completed", value: "15+" },
      { label: "Client Satisfaction", value: "100%" },
      { label: "Years Experience", value: "2+" },
      { label: "PageSpeed Benchmark", value: "90+" }
    ]
  },

  education: [
    {
      degree: "Diploma of Information Technology (DIT)",
      institution: "Government Polytechnic Institute / Technical Board",
      period: "2025 – Present",
      status: "In Progress",
      location: "Peshawar, KPK"
    },
    {
      degree: "FSc (Pre-Medical)",
      institution: "Peshawar Model Degree College",
      period: "Graduated 2025",
      status: "Completed",
      location: "Peshawar, KPK"
    }
  ] as EducationItem[],

  languages: [
    { language: "Pashto", proficiency: "Native" },
    { language: "Urdu", proficiency: "Fluent" },
    { language: "English", proficiency: "Professional" }
  ] as LanguageItem[],

  contentBrand: {
    name: "CodeVibe",
    handle: "@codevibe.anim",
    platforms: "Instagram & TikTok",
    focus: "Creative CSS Animations, JavaScript Micro-Interactions, and Web Experiments",
    url: "https://instagram.com/codevibe.anim"
  },

  skills: [
    { name: "WordPress", level: 90, category: "CMS" },
    { name: "Elementor Pro", level: 90, category: "CMS" },
    { name: "Responsive Design", level: 90, category: "Frontend" },
    { name: "HTML5 & CSS3", level: 85, category: "Frontend" },
    { name: "UI/UX & Speed Opt.", level: 88, category: "Design" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "WooCommerce", level: 85, category: "E-Commerce" },
    { name: "Git & GitHub", level: 80, category: "DevOps" },
    { name: "Figma to Code", level: 88, category: "Design" }
  ],

  learningRoadmap: [
    { name: "React 19 & Next.js 15", progress: 85 },
    { name: "Three.js / WebGL Shaders", progress: 80 },
    { name: "Fastify & Socket.IO Architecture", progress: 85 },
    { name: "TypeScript Strict Systems", progress: 85 },
    { name: "State Machines & Spatial Partitioning", progress: 80 }
  ],

  projects: [
    {
      id: "ivanalexx",
      title: "Ivana Studio (ivanalexx.com)",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Top-Rated Fiverr Video Producer & Director Portfolio",
      client: "Ivan's Studios Videography",
      date: "2025 – 2026",
      status: "Completed",
      imageUrl: "/assets/ivan.jfif",
      overview:
        "Ivan's Studios (ivanalexx.com) is an international video production portfolio showcasing commercial spots, brand films, generative AI videos, product ads, and motion graphics for clients worldwide.",
      businessGoals:
        "Elevate personal branding beyond freelance marketplace confines, establish direct high-ticket client trust, and streamline incoming commercial inquiries with zero friction.",
      scopeContribution:
        "Full frontend website development using WordPress & Elementor Pro, structuring video showreel grids, responsive typography hierarchy, dynamic lead capture forms, and performance tuning.",
      designDecisions:
        "Cinematic dark aesthetic with high-contrast typography, bold video hero containers, and distraction-free portfolio grids prioritizing high-definition motion reels.",
      responsiveImplementation:
        "Fluid container layout verified across mobile, tablet, laptop, and ultra-wide displays with aspect-ratio-locked video players.",
      accessibilityPerformance:
        "Semantic markup, keyboard navigation on modal video players, lazy-loaded video iframes, and sub-2.5s initial visual response.",
      challenge:
        "Embedding high-bitrate video showreels without degrading page load times or mobile scroll fluidity.",
      solution:
        "Implemented poster frame previews with on-demand video player mounting, caching static assets, and minimizing render-blocking stylesheets.",
      resultsEvidence:
        "Live deployed website at https://ivanalexx.com/ serving global prospective clients with 100% mobile responsiveness.",
      metrics: [
        { label: "Mobile Usability", value: "100%" },
        { label: "Video Showcase", value: "Multi-Format" },
        { label: "Deployment", value: "Live Production" }
      ],
      techStack: ["WordPress", "Elementor Pro", "Custom CSS", "Responsive Video", "WhatsApp Funnel"],
      liveUrl: "https://ivanalexx.com/"
    },
    {
      id: "nexcurex",
      title: "Nexcurex (nexcurex.com)",
      imageUrl: "/assets/project_nexcurex.png",
      category: "Client Work",
      tag: "WordPress & WooCommerce",
      subtitle: "Luxury Beauty & Cosmetics E-Commerce Storefront",
      client: "Nexcurex Botanical Cosmetics",
      date: "2025 – 2026",
      status: "Completed",
      overview:
        "Nexcurex (nexcurex.com) is a luxury beauty and cosmetics e-commerce storefront featuring botanical skincare serums, organic lip pigments, vegan formulas, and promotional discount funnels.",
      businessGoals:
        "Deliver an editorial, high-conversion shopping experience for clean cosmetics and skincare buyers, featuring promotional coupon visibility (GLOW20) and streamlined catalog navigation.",
      scopeContribution:
        "E-commerce layout implementation on WordPress with Astra theme foundations, custom WooCommerce catalog integration, responsive product grids, and coupon funnel integration.",
      designDecisions:
        "Clean, high-conversion retail layout with prominent promotion banners, grid-based product cards, clear discount badges, and intuitive checkout pathways.",
      responsiveImplementation:
        "Mobile-first responsive e-commerce architecture ensuring seamless browsing, filtering, and cart checkout on smartphones and tablets.",
      accessibilityPerformance:
        "WCAG-compliant color contrast on product prices, accessible cart drawer toggles, and responsive image sizing.",
      challenge:
        "Balancing rich promotional banners and high-resolution clothing catalogs with rapid page loads on mobile connections.",
      solution:
        "Implemented WordPress responsive image srcset sizing, lightweight Astra theme core assets, and optimized WooCommerce catalog queries.",
      resultsEvidence:
        "Live functional storefront at https://nexcurex.com/ featuring product categories, special edition discounts, and direct checkout.",
      metrics: [
        { label: "Product Catalog", value: "Active" },
        { label: "Cart & Checkout", value: "Woo Ready" },
        { label: "Responsiveness", value: "Mobile First" }
      ],
      techStack: ["WordPress", "WooCommerce", "Astra", "Custom CSS", "Responsive UI"],
      liveUrl: "https://nexcurex.com/"
    },
    {
      id: "arshad",
      title: "Arshad Tiles — Business Website",
      category: "Client Work",
      tag: "HTML/CSS & JavaScript",
      subtitle: "Artisanal Tile & Ceramics Showcase",
      client: "Arshad Khan (Business Owner)",
      date: "2025",
      status: "Completed",
      imageUrl: "/assets/tiles.jfif",
      overview:
        "A complete commercial showcase website built for Arshad Tiles, a regional tiles and sanitary products retailer transitioning from traditional walk-ins to digital customer inquiries.",
      businessGoals:
        "Establish an online product catalog so homeowners and contractors can explore ceramic, porcelain, and sanitary product lines before visiting.",
      scopeContribution:
        "End-to-end design and frontend development: built responsive product galleries, interactive category filtering, direct WhatsApp quote integration, and mobile optimization.",
      designDecisions:
        "Warm, elegant presentation emphasizing material textures, clean product grids, and instantaneous WhatsApp inquiry call-to-actions.",
      responsiveImplementation:
        "100% mobile-friendly responsive design tested across diverse device viewports.",
      accessibilityPerformance:
        "Achieved 2.1s average load time and 90+ PageSpeed benchmark score with semantic HTML and optimized image assets.",
      challenge:
        "The client had zero existing web footprint or digital photography assets, requiring structured catalog organization from raw product inventory.",
      solution:
        "Organized products into high-demand architectural categories (Floor, Wall, Kitchen, Sanitary) and paired each with instant WhatsApp inquiry routing.",
      resultsEvidence:
        "Client reports a 40% increase in customer inquiries and direct quote requests within the first two months.",
      metrics: [
        { label: "Inquiry Growth", value: "+40%", isCvReported: true },
        { label: "Average Load Time", value: "2.1s", isCvReported: true },
        { label: "Mobile Friendliness", value: "100%", isCvReported: true }
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "WhatsApp API", "Responsive Design"],
      liveUrl: "https://alikhan14756.github.io/Arshad-Tiles/",
      githubUrl: "https://github.com/alikhan14756/Arshad-Tiles"
    },
    {
      id: "vet",
      title: "VetCarePlus — Veterinary Website",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Veterinary Clinic Booking Portal",
      client: "Dr. Usman (Veterinary Surgeon, Malik Hassan Veterinary)",
      date: "2025",
      status: "Completed",
      imageUrl: "/assets/vet.jfif",
      overview:
        "A clean, professional veterinary clinic portal developed for Malik Hassan Veterinary (VetCarePlus) to provide digital healthcare information and online appointment booking.",
      businessGoals:
        "Modernize clinic patient intake, reduce receptionist call volume, and provide clear listings of surgical, vaccination, and diagnostic pet services.",
      scopeContribution:
        "Full website development using WordPress and Elementor Pro: custom appointment request system, medical service directory, and mobile-first consultation routing.",
      designDecisions:
        "Trust-inspiring healthcare aesthetic with clinical blues and calming greens, prominent emergency clinic contact buttons, and clear service pricing.",
      responsiveImplementation:
        "Responsive appointment form and service cards engineered for single-thumb mobile interaction.",
      accessibilityPerformance:
        "High-contrast text, accessible form inputs with visible labels, and lightweight asset loading delivering 1.8s load times.",
      challenge:
        "Pet owners needed an intuitive way to request appointments without confusing medical terminology.",
      solution:
        "Designed an intuitive 3-step appointment booking interface with instant confirmation alerts and direct WhatsApp clinic routing.",
      resultsEvidence:
        "CV reports 1.8s average load time and a 35% increase in clinic bookings (reported on CV; marked for independent audit).",
      metrics: [
        { label: "Booking Increase", value: "+35%", isCvReported: true },
        { label: "Load Time", value: "1.8s", isCvReported: true },
        { label: "Appointment System", value: "Operational" }
      ],
      techStack: ["WordPress", "Elementor Pro", "Booking System", "Contact Form 7", "Speed Opt"]
    },
    {
      id: "shah-sweet",
      imageUrl: "/assets/project_shah_sweet.png",
      title: "Shah Sweets — Traditional Mithai & Royal Confectionery",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Traditional Confectionery & Mithai Showcase",
      client: "Shah Sweets Confectionery",
      date: "2025",
      status: "Completed",
      overview:
        "A rich, mouth-watering digital catalog and online ordering website crafted for Shah Sweets, celebrating authentic Mughal & Peshawari mithai made in 100% pure desi ghee, saffron ras malai, and bespoke wedding gift hampers.",
      businessGoals:
        "Introduce the sweet shop's confectionery offerings to regional event planners, wedding hosts, and corporate gifting clients.",
      scopeContribution:
        "Crafted mobile-first product catalog, confectionery showcase galleries, brand story section, and direct order messaging.",
      designDecisions:
        "Warm artisanal color scheme with mouth-watering photography cards, category filters, and clear pricing indications.",
      responsiveImplementation:
        "Fully responsive layout verified across smartphone, tablet, and desktop viewports.",
      accessibilityPerformance:
        "Semantic image alt attributes, fast CSS layout rendering, and accessible CTA buttons.",
      challenge:
        "Conveying the freshness and tradition of hand-crafted sweets on a digital screen.",
      solution:
        "Highlighted authentic ingredients and traditional recipes through high-resolution visual cards and WhatsApp direct ordering.",
      resultsEvidence:
        "Operational showcase deployed on GitHub Pages and ready for WooCommerce full cart expansion.",
      metrics: [
        { label: "Product Catalog", value: "Complete" },
        { label: "Layout Mode", value: "Mobile First" },
        { label: "E-Commerce", value: "Woo Ready" }
      ],
      techStack: ["WordPress", "Elementor", "Product Catalog", "Custom CSS", "Responsive UI"],
      liveUrl: "https://alikhan14756.github.io/Shah-Sweet/",
      githubUrl: "https://github.com/alikhan14756/Shah-Sweet"
    },
        
    {
      id: "css-animation-showcase",
      imageUrl: "/assets/project_animations.png",
      title: "CSS Animation Showcase",
      category: "Playground",
      tag: "CSS3 & JavaScript",
      subtitle: "20+ Creative Micro-Interaction Effects",
      date: "2025",
      status: "Completed",
      overview:
        "A dedicated playground repository exploring creative CSS animations, 3D keyframe transforms, and GPU-composited UI micro-interactions.",
      scopeContribution:
        "Engineered 20+ standalone micro-interaction components: holographic card tilts, glowing borders, animated buttons, and particle loaders.",
      challenge: "Achieving complex multi-stage animations without triggering layout thrashing or dropped frames on mobile devices.",
      solution: "Constrained all keyframe animations strictly to transform and opacity properties for direct GPU compositing.",
      resultsEvidence: "Achieved 98 performance score on Google Lighthouse with zero third-party animation libraries.",
      metrics: [
        { label: "Micro-Interactions", value: "20+", isCvReported: true },
        { label: "Performance Score", value: "98", isCvReported: true },
        { label: "GPU Composited", value: "100%" }
      ],
      techStack: ["CSS3 Keyframes", "3D Transforms", "GPU Acceleration", "BEM CSS", "Vanilla JS"],
      githubUrl: "https://github.com/alikhan14756"
    },
    {
      id: "ball-physics-engine",
      imageUrl: "/assets/project_physics.png",
      title: "Ball Physics Engine",
      category: "Playground",
      tag: "HTML5 Canvas Physics",
      subtitle: "Canvas-Based 60 FPS Collision & Gravity Sim",
      date: "2025",
      status: "Completed",
      overview:
        "A 2D canvas-based physics demonstration featuring real-time elastic collisions, gravitational acceleration, boundary restitution, and interactive user impulses.",
      scopeContribution:
        "Authored the deterministic 2D vector physics model, RequestAnimationFrame render loop, and mouse/touch impulse interaction.",
      challenge: "Handling multi-ball elastic collisions without balls sticking or escaping boundary boxes during rapid velocity spikes.",
      solution: "Implemented positional correction alongside momentum conservation equations to eliminate overlapping penetration.",
      resultsEvidence: "Runs consistently at 60 FPS with real-time multi-body interactions.",
      metrics: [
        { label: "Simulation Rate", value: "60 FPS", isCvReported: true },
        { label: "Collision Physics", value: "Elastic" },
        { label: "Dependencies", value: "Zero (Native)" }
      ],
      techStack: ["HTML5 Canvas", "2D Vector Math", "RequestAnimationFrame", "JavaScript"],
      githubUrl: "https://github.com/alikhan14756"
    },
    {
      id: "qr-code-generator",
      imageUrl: "/assets/project_qrcode.png",
      title: "QR Code Generator & Scanner",
      category: "Playground",
      tag: "JavaScript Utility Tool",
      subtitle: "Responsive Custom QR Generator & Scanner Tool",
      date: "2025",
      status: "Completed",
      overview:
        "A custom responsive web utility for generating high-density QR codes for URLs, contact cards, and Wi-Fi networks, complete with download options.",
      scopeContribution:
        "Designed and implemented the responsive UI, client-side matrix encoding integration, and PNG/SVG export routines.",
      challenge: "Ensuring high-density QR codes render sharply across both low-DPI monitors and high-resolution mobile screens.",
      solution: "Rendered QR matrices dynamically as vector SVGs and high-res canvas exports with configurable padding.",
      resultsEvidence: "Fully responsive tool providing instantaneous client-side encoding with zero server roundtrips.",
      metrics: [
        { label: "Export Formats", value: "SVG & PNG" },
        { label: "Client-Side", value: "100%" },
        { label: "Responsiveness", value: "Full" }
      ],
      techStack: ["JavaScript", "HTML5 Canvas", "SVG Matrix", "CSS3 Grid"],
      githubUrl: "https://github.com/alikhan14756"
    },
    {
      id: "quiz-application",
      title: "Interactive Quiz Application",
      category: "Playground",
      tag: "JavaScript Web App",
      subtitle: "Dynamic Knowledge Quiz Platform",
      date: "2025",
      status: "Completed",
      imageUrl: "/assets/project_quiz.png",
      overview:
        "An interactive trivia and knowledge testing application featuring multi-category questions, countdown timers, animated feedback, and instant score summaries.",
      scopeContribution:
        "Built dynamic question state machine, timed countdown triggers, score analytics, and celebratory result animations.",
      challenge: "Providing seamless state progression without screen flickers or state desynchronization.",
      solution: "Structured an immutable question state machine handling transitions, countdown resets, and answer validations.",
      resultsEvidence: "CV reports 500+ users and 95% accuracy score across test sessions (CV-reported metrics).",
      metrics: [
        { label: "Reported Users", value: "500+", isCvReported: true },
        { label: "Accuracy Score", value: "95%", isCvReported: true },
        { label: "State Machine", value: "Zero Dependencies" }
      ],
      techStack: ["JavaScript", "HTML5", "CSS3 Transitions", "Local State"],
      githubUrl: "https://github.com/alikhan14756"
    }
  ] as ProjectCaseStudy[],

  services: [
    {
      id: "service-web-dev",
      number: "01",
      title: "Website Development",
      description:
        "Custom, responsive websites built with clean, semantic code that load fast and look stunning across all mobile, tablet, and desktop devices.",
      features: [
        "WordPress & Elementor Pro mastery",
        "Semantic HTML5, modern CSS3 & JavaScript",
        "Mobile-first responsive architecture",
        "PageSpeed 90+ performance optimization"
      ]
    },
    {
      id: "service-landing-pages",
      number: "02",
      title: "Landing Pages That Convert",
      description:
        "Conversion-focused landing pages meticulously engineered to turn cold web visitors into paying customers and WhatsApp inquiries.",
      features: [
        "High-converting visual hierarchy & CRO",
        "Frictionless WhatsApp & lead form funnels",
        "A/B testing-ready structure",
        "Technical SEO & OpenGraph meta tags"
      ]
    },
    {
      id: "service-redesign",
      number: "03",
      title: "Website Redesign & Modernization",
      description:
        "Transform outdated, clunky websites into sleek, high-performing digital platforms that command market authority.",
      features: [
        "Comprehensive UI/UX audit & speed diagnosis",
        "Modern glassmorphism & clean layout systems",
        "Asset compression & bounce-rate reduction",
        "Cross-browser & mobile touch optimization"
      ]
    },
    {
      id: "service-ui-dev",
      number: "04",
      title: "UI Implementation & Animation",
      description:
        "Pixel-perfect frontend development translating Figma, XD, or custom design files into fluid, responsive interactive web experiences.",
      features: [
        "Exact Figma-to-code translation",
        "Fluid CSS animations & micro-interactions",
        "Interactive canvas & physics experiments",
        "Accessible WCAG AA contrast & keyboard navigation"
      ]
    }
  ] as ServiceItem[],

  process: [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "Analyze business objectives, competitor landscape, target audience, and key conversion pathways to establish a clear project blueprint.",
      deliverables: ["Project Scope Document", "Information Architecture", "Content Inventory"]
    },
    {
      step: "02",
      title: "UI/UX & Wireframing",
      description:
        "Design conversion-focused wireframes and responsive UI mockups with high-contrast typography, clear visual hierarchy, and intuitive navigation.",
      deliverables: ["Interactive Prototypes", "Design System Tokens", "Mobile-First Wireframes"]
    },
    {
      step: "03",
      title: "Development & Optimization",
      description:
        "Implement clean, modular code with WordPress, Elementor, or modern frontend frameworks, tuned for sub-2.5s load speeds and 90+ PageSpeed scores.",
      deliverables: ["Clean Modular Codebase", "Asset Optimization", "Form & WhatsApp Integration"]
    },
    {
      step: "04",
      title: "Testing, Launch & Growth",
      description:
        "Rigorous cross-device testing, SEO meta validation, accessibility checks, and seamless production deployment followed by ongoing support.",
      deliverables: ["Deployment Checklist", "SEO Meta & Analytics Setup", "Post-Launch Verification"]
    }
  ] as ProcessStep[],

  experience: [
    {
      year: "2024",
      title: "Started Frontend Development Journey",
      description:
        "Began mastering HTML5, CSS3, and JavaScript — built foundational web applications, interactive calculators, and quiz state machines from scratch.",
      status: "Completed"
    },
    {
      year: "2024",
      title: "Mastered WordPress & Elementor Ecosystem",
      description:
        "Deep-dived into WordPress architecture, Elementor Pro site builders, WooCommerce setups, custom CSS hooks, and PageSpeed performance optimization.",
      status: "Completed"
    },
    {
      year: "2025",
      title: "Launched Freelance Career & Delivered Commercial Platforms",
      description:
        "Delivered successful client websites for Arshad Tiles, VetCarePlus, Shah-Sweet, Ivana Studio, and Nexcurex with 100% client satisfaction.",
      status: "Completed"
    },
    {
      year: "2025 – Present",
      title: "Pursuing DIT & Growing Content Brand CodeVibe",
      description:
        "Pursuing Diploma of Information Technology while expanding @codevibe.anim coding tutorials on CSS animations and JavaScript.",
      status: "Current"
    },
    {
      year: "2026",
      title: "Advanced Full-Stack Engineering & Aetheria Biosphere",
      description:
        "Building next-generation interactive applications, mastering React 19, Next.js 15, Three.js shaders, Fastify real-time websockets, and 2.5D biospheres.",
      status: "Current"
    }
  ] as ExperienceItem[],

  testimonials: [
    {
      id: "test-arshad",
      name: "Arshad Khan",
      role: "Business Owner, Arshad Tiles",
      avatarInitials: "AK",
      quote:
        "Ali delivered an excellent website for our business. He understood our requirements perfectly and the result exceeded our expectations. Our customer inquiries increased significantly within the first two months.",
      rating: 5
    },
    {
      id: "test-usman",
      name: "Dr. Usman",
      role: "Chief Surgeon, Malik Hassan Veterinary Clinic",
      avatarInitials: "DU",
      quote:
        "Great communication and very professional work. The clinic website is fast, responsive, and looks amazing on all devices. Online appointment requests have streamlined our daily booking schedule.",
      rating: 5
    },
    {
      id: "test-sarah",
      name: "Sarah M.",
      role: "Creative Director & Agency Partner",
      avatarInitials: "SM",
      quote:
        "Ali combines an eye for pixel-perfect design with solid technical execution. His speed optimizations and responsive animations delivered a noticeably superior client experience.",
      rating: 5
    }
  ] as TestimonialItem[]
};
