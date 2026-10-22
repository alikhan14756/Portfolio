import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Ali | Senior Frontend Developer & Digital Creator (JARVIS OS)",
  description: "Official interactive 4K portfolio for Muhammad Ali (Peshawar, Pakistan). Showcasing verified client websites, 12 dynamic themes, JARVIS AI assistant, and real-time 2.5D multiplayer engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
