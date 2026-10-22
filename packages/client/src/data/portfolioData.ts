export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: "Client Work" | "Playground";
  tag: string;
  subtitle: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
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

export const PORTFOLIO_DATA = {
  profile: {
    name: "Muhammad Ali",
    role: "Frontend Web Developer & Digital Creator",
    callsign: "ALI.BUILD // JARVIS-CORE",
    headline: "I Build Websites That Convert.",
    subheadline:
      "I help businesses grow online with fast, modern websites built on WordPress, Elementor & clean code — delivered with pixel-perfect precision.",
    availability: "Available for Projects",
    location: "Pakistan 🇵🇰",
    email: "alikhanwebdeveloper@gmail.com",
    whatsapp: "+92 305 5389967",
    whatsappUrl: "https://wa.me/923055389967?text=Hi%20Ali,%20I%20am%20interested%20in%20working%20with%20you!",
    github: "https://github.com/alikhan14756",
    portfolioSource: "https://alibuild.site/",
    stats: [
      { label: "Projects Completed", value: "15+" },
      { label: "Client Satisfaction", value: "100%" },
      { label: "Years Experience", value: "2+" },
      { label: "Core Technologies", value: "10+" }
    ]
  },

  skills: [
    { name: "WordPress", level: 90, category: "CMS" },
    { name: "Elementor Pro", level: 90, category: "CMS" },
    { name: "Responsive Design", level: 90, category: "Frontend" },
    { name: "HTML5 & CSS3", level: 85, category: "Frontend" },
    { name: "UI/UX Design", level: 88, category: "Design" },
    { name: "JavaScript", level: 80, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "WooCommerce", level: 85, category: "E-Commerce" },
    { name: "PageSpeed Optimization", level: 92, category: "Performance" },
    { name: "Git & GitHub", level: 80, category: "DevOps" },
    { name: "Figma to Code", level: 88, category: "Design" }
  ],

  learningRoadmap: [
    { name: "React 19", progress: 85 },
    { name: "Next.js 15", progress: 80 },
    { name: "Three.js / WebGL", progress: 75 },
    { name: "GSAP Animations", progress: 80 },
    { name: "TypeScript", progress: 85 }
  ],

  projects: [
    {
      id: "ivanalexx",
      title: "ivanalexx.com",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Top-Rated Fiverr Creator Portfolio",
      client: "Ivanalexx (Video Producer & Director on Fiverr)",
      challenge:
        "Ivanalexx is a prominent video creator and director on Fiverr. As a top-rated freelancer, he needed a high-caliber digital portfolio to showcase his video productions and capture high-ticket direct client leads.",
      solution:
        "Engineered a polished, high-performance WordPress website using Elementor Pro with a conversion-focused layout, smooth micro-interactions, an integrated video showcase, and instant WhatsApp inquiry routing.",
      metrics: [
        { label: "Brand Design", value: "Modern" },
        { label: "Responsiveness", value: "100%" },
        { label: "Performance", value: "Fast" }
      ],
      techStack: ["WordPress", "Elementor Pro", "Custom CSS", "Speed Opt"],
      liveUrl: "https://ivanalexx.com"
    },
    {
      id: "arshad",
      title: "Arshad Tiles Website",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Artisanal Tile & Ceramics Showcase",
      client: "Arshad Khan (Business Owner)",
      challenge:
        "The business had zero digital presence. Customers could not explore ceramic and tile inventory online, and all inquiries depended strictly on word-of-mouth foot traffic.",
      solution:
        "Built a fast, fully responsive digital catalog featuring product showcase galleries, direct WhatsApp quote integration, structured contact channels, and performance tuned to 90+ PageSpeed.",
      metrics: [
        { label: "More Inquiries", value: "+40%" },
        { label: "Load Time", value: "2.1s" },
        { label: "PageSpeed Score", value: "90+" }
      ],
      techStack: ["WordPress", "Elementor Pro", "WooCommerce", "Custom CSS"],
      liveUrl: "https://alikhan14756.github.io/Portfolio/"
    },
    {
      id: "vet",
      title: "Malik Hassan Veterinary",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Veterinary Clinic Booking Portal",
      client: "Dr. Usman (Veterinary Surgeon)",
      challenge:
        "The veterinary clinic lacked an online appointment booking system and struggled to reach pet owners beyond its immediate neighborhood.",
      solution:
        "Developed a trustworthy, clean clinic platform with medical service listings, an online appointment request engine, WhatsApp fast booking, and rapid mobile load speeds.",
      metrics: [
        { label: "More Bookings", value: "+35%" },
        { label: "Load Time", value: "1.8s" },
        { label: "Mobile Usability", value: "100%" }
      ],
      techStack: ["WordPress", "Elementor Pro", "Contact Form 7", "Speed Opt"]
    },
    {
      id: "sweet",
      title: "Shah-Sweet Store",
      category: "Client Work",
      tag: "WordPress & Elementor",
      subtitle: "Artisanal Sweet Shop Catalog",
      client: "Shah Sweets Confectionery",
      challenge:
        "A traditional sweet shop with no web presence needed to showcase artisanal confectioneries, reach new citywide customers, and accept digital orders.",
      solution:
        "Designed a warm, brand-first product showcase website with an interactive confectionery catalog, brand history section, and frictionless WhatsApp order checkout.",
      metrics: [
        { label: "Brand Design", value: "Artisanal" },
        { label: "E-Commerce", value: "Woo Ready" },
        { label: "Load Speed", value: "Fast" }
      ],
      techStack: ["WordPress", "Elementor Pro", "WooCommerce", "Custom CSS"],
      liveUrl: "https://alikhan14756.github.io/Shah-Sweet/",
      githubUrl: "https://github.com/alikhan14756/Shah-Sweet"
    },
    {
      id: "quiz-app",
      title: "Interactive Quiz Web App",
      category: "Playground",
      tag: "JavaScript Web App",
      subtitle: "Multi-Category Dynamic Knowledge Quiz",
      challenge: "Building a responsive, timer-based trivia web application with dynamic scoring and zero third-party dependencies.",
      solution: "Engineered clean vanilla JS state management, responsive card layouts, and animated progress bars.",
      metrics: [
        { label: "Architecture", value: "Vanilla JS" },
        { label: "Framerate", value: "60 FPS" }
      ],
      techStack: ["JavaScript", "HTML5", "CSS3 Flexbox"]
    },
    {
      id: "calculator",
      title: "Modern Web Calculator",
      category: "Playground",
      tag: "JavaScript Tool",
      subtitle: "Sleek Glassmorphic Arithmetic Calculator",
      challenge: "Creating an accessible, keyboard-responsive arithmetic calculator with memory register and calculation history.",
      solution: "Implemented robust expression parsing with error guards and polished CSS glassmorphism.",
      metrics: [
        { label: "Keyboard Ready", value: "100%" },
        { label: "History Log", value: "Active" }
      ],
      techStack: ["JavaScript", "CSS Grid", "Glassmorphism"]
    },
    {
      id: "css-animation-showcase",
      title: "CSS Animation Showcase",
      category: "Playground",
      tag: "CSS Animations",
      subtitle: "20+ Creative Micro-Interactions",
      challenge: "Exploring pure CSS keyframes, 3D transforms, and performant GPU-composited UI micro-interactions.",
      solution: "Crafted a curated gallery of buttons, loaders, hover cards, and glowing borders with zero JavaScript overhead.",
      metrics: [
        { label: "Animations", value: "20+" },
        { label: "GPU Accelerated", value: "100%" }
      ],
      techStack: ["CSS3 Keyframes", "3D Transforms", "BEM"]
    },
    {
      id: "physics-ball-bounce",
      title: "Canvas Physics Ball Bounce",
      category: "Playground",
      tag: "HTML5 Canvas Physics",
      subtitle: "60 FPS Collision & Gravity Sim",
      challenge: "Simulating elastic collisions, restitution, and gravitational acceleration on an HTML5 2D canvas context.",
      solution: "Created an optimized RequestAnimationFrame physics loop with deterministic boundary collisions.",
      metrics: [
        { label: "Framerate", value: "60 FPS" },
        { label: "Elasticity", value: "Simulated" }
      ],
      techStack: ["Canvas 2D API", "JavaScript Math", "Vector2"]
    },
    {
      id: "qr-code-tool",
      title: "QR Code Generator & Scanner",
      category: "Playground",
      tag: "JS Utility Tool",
      subtitle: "Custom QR Code Engine with Camera Scanner",
      challenge: "Generating and decoding high-density QR matrices with custom color palettes and download options.",
      solution: "Integrated client-side encoding algorithms with real-time SVG and canvas rendering.",
      metrics: [
        { label: "Output Formats", value: "SVG/PNG" },
        { label: "Client-Side", value: "100%" }
      ],
      techStack: ["JavaScript", "SVG Rendering", "Canvas"]
    }
  ] as ProjectCaseStudy[],

  services: [
    {
      id: "service-web-dev",
      number: "01",
      title: "Website Development",
      description: "Custom responsive websites built with clean, semantic code that loads fast and looks stunning on every device.",
      features: [
        "WordPress & Elementor Pro mastery",
        "Custom HTML5, CSS3 & JavaScript code",
        "Mobile-first responsive architecture",
        "Performance & PageSpeed 90+ optimization"
      ]
    },
    {
      id: "service-landing-pages",
      number: "02",
      title: "High-Converting Landing Pages",
      description: "Conversion-rate focused landing pages meticulously engineered to turn visitors into paying clients.",
      features: [
        "CRO-optimized visual hierarchy",
        "A/B test ready structure",
        "Direct WhatsApp & CTA lead capture",
        "Technical SEO meta tags & OpenGraph"
      ]
    },
    {
      id: "service-redesign",
      number: "03",
      title: "Website Redesign & Modernization",
      description: "Transform your outdated website into a modern, high-performing digital asset that commands authority.",
      features: [
        "Comprehensive UX audit & competitor analysis",
        "Modern glassmorphism & clean UI patterns",
        "Load speed enhancements & asset minification",
        "Bounce rate reduction & retention tuning"
      ]
    },
    {
      id: "service-ui-dev",
      number: "04",
      title: "UI Implementation & Animation",
      description: "Pixel-perfect frontend implementation translating Figma/XD designs into fluid interactive experiences.",
      features: [
        "Exact Figma-to-code translation",
        "Fluid CSS animations & micro-interactions",
        "Interactive controls & components",
        "Rigorous cross-browser compatibility testing"
      ]
    }
  ] as ServiceItem[],

  experience: [
    {
      year: "2024",
      title: "Started Frontend Development",
      description: "Began journey with HTML5, CSS3 & JavaScript — built first portfolio websites and interactive tools from scratch.",
      status: "Completed"
    },
    {
      year: "2024",
      title: "Mastered WordPress Ecosystem",
      description: "Deep-dived into WordPress architecture, Elementor Pro, WooCommerce, custom PHP/CSS hooks, and PageSpeed optimization.",
      status: "Completed"
    },
    {
      year: "2025",
      title: "Launched Freelance Career",
      description: "Began working with real business clients, delivering custom solutions on time with 100% satisfaction rates.",
      status: "Completed"
    },
    {
      year: "2025",
      title: "Delivered Commercial Business Websites",
      description: "Successfully built and deployed live platforms for Arshad Tiles, Shah-Sweet, Malik Hassan Veterinary clinic, and ivanalexx.com.",
      status: "Completed"
    },
    {
      year: "2026",
      title: "Building Creative Brand & Modern Stacks",
      description: "Creating next-gen interactive web applications, mastering React, Next.js, Three.js, and generative 2.5D biospheres.",
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
        "Ali delivered an excellent website for our business. He understood our requirements perfectly and the result exceeded our expectations. Our customer inquiries increased by 40% within the first two months.",
      rating: 5
    },
    {
      id: "test-usman",
      name: "Dr. Usman",
      role: "Chief Surgeon, Malik Hassan Veterinary Clinic",
      avatarInitials: "DU",
      quote:
        "Great communication and very professional work. The clinic website is fast, responsive, and looks amazing on all devices. Online appointment requests have streamlined our daily booking schedule significantly.",
      rating: 5
    },
    {
      id: "test-hamza",
      name: "Hamza Aqib",
      role: "Digital Entrepreneur",
      avatarInitials: "HA",
      quote:
        "Highly skilled developer! He completed the project on time and helped me achieve my business goals effectively. The attention to detail in animations and responsive layouts is second to none.",
      rating: 5
    }
  ] as TestimonialItem[]
};
