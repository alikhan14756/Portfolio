import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aetheria | 2.5D Real-Time Generative Biosphere",
  description: "An infinite, physics-driven digital ecosystem powered by WebGL, Web Audio, and collective topological resonance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#040711] text-slate-100 overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
