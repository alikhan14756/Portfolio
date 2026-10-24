import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://alibuild.site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Ali — Senior Frontend Developer & WordPress Expert",
    template: "%s | Muhammad Ali",
  },
  description:
    "Official portfolio of Muhammad Ali, Senior Frontend Developer and WordPress & Elementor Pro Specialist based in Peshawar, Pakistan. Specializing in high-converting commercial client websites, WooCommerce, responsive UI/UX, and modern React 19/Next.js 15 web applications.",
  applicationName: "Muhammad Ali Portfolio",
  authors: [
    {
      name: "Muhammad Ali",
      url: siteUrl,
    },
  ],
  generator: "Next.js",
  keywords: [
    "Muhammad Ali",
    "Muhammad Ali Developer",
    "Frontend Developer Peshawar",
    "WordPress Developer Pakistan",
    "Elementor Pro Specialist",
    "WooCommerce Expert",
    "React Developer Pakistan",
    "Next.js Developer",
    "Web Designer Peshawar",
    "Khyber Pakhtunkhwa Web Developer",
    "High-Performance Web Design",
    "Tailwind CSS Expert",
    "Modern Web Architecture",
    "BS Nursing Developer",
    "Healthcare and Web Engineering",
    "Freelance Frontend Developer Pakistan",
    "Interactive Portfolio",
    "Speed Optimization 98+"
  ],
  creator: "Muhammad Ali",
  publisher: "Muhammad Ali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Muhammad Ali — Frontend Developer & WordPress Specialist",
    title: "Muhammad Ali — Frontend Developer & WordPress Specialist",
    description:
      "Crafting high-converting WordPress, Elementor Pro, WooCommerce stores, and fluid modern React web apps. Based in Peshawar, Pakistan.",
    images: [
      {
        url: "/muhammad_ali_hero.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Ali - Frontend Developer & Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali — Frontend Developer & WordPress Specialist",
    description:
      "Crafting high-converting WordPress, Elementor Pro, WooCommerce stores, and fluid modern React web apps. Based in Peshawar, Pakistan.",
    images: ["/muhammad_ali_hero.png"],
    creator: "@alikhan14756",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Complete JSON-LD Structured Data Schema (Person + WebSite + ProfessionalService)
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Muhammad Ali",
        alternateName: ["Ali Khan", "Muhammad Ali Frontend"],
        jobTitle: "Senior Frontend Developer & WordPress Specialist",
        url: siteUrl,
        image: `${siteUrl}/muhammad_ali_hero.png`,
        description:
          "Senior Frontend Developer with 2+ years of experience delivering high-converting WordPress, Elementor Pro, and React applications.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Peshawar",
          addressRegion: "Khyber Pakhtunkhwa",
          addressCountry: "PK",
        },
        sameAs: [
          "https://github.com/alikhan14756",
          "https://wa.me/923055389967",
        ],
        knowsAbout: [
          "WordPress",
          "Elementor Pro",
          "WooCommerce",
          "HTML5",
          "CSS3",
          "JavaScript (ES6+)",
          "TypeScript",
          "React 19",
          "Next.js 15",
          "Tailwind CSS",
          "Responsive Web Design",
          "Web Performance Optimization",
          "SEO Best Practices",
          "E-Commerce Solutions",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Government Polytechnic Institute / Technical Board Peshawar",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Muhammad Ali Portfolio",
        description:
          "Official interactive portfolio of Muhammad Ali, Senior Frontend Developer.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: "Muhammad Ali — Web Development & Design",
        url: siteUrl,
        image: `${siteUrl}/muhammad_ali_hero.png`,
        priceRange: "$$",
        telephone: "",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Peshawar",
          addressRegion: "Khyber Pakhtunkhwa",
          addressCountry: "PK",
        },
        areaServed: [
          "Pakistan",
          "United States",
          "United Kingdom",
          "Worldwide Remote",
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className="scroll-smooth light"
      data-theme="claymorphism"
      data-style="claymorphism"
      data-theme-mode="light"
      data-atmosphere="none"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
