import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aetheria: {
          bg: "#050811",
          card: "rgba(10, 18, 32, 0.75)",
          cyan: "#38bdf8",
          emerald: "#34d399",
          amber: "#f59e0b",
          rose: "#f43f5e",
          violet: "#a855f7"
        }
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;
