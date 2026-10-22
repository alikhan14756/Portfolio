"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

export const PortfolioParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleEffect = usePortfolioStore((s) => s.particleEffect);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const theme = usePortfolioStore((s) => s.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const speedMultiplier =
      animationIntensity === "minimal" ? 0.2 : animationIntensity === "balanced" ? 0.6 : 1.0;

    // --- Particle Mode: Matrix Digital Rain ---
    const matrixColumns = Math.floor(width / 20);
    const matrixDrops = new Array(matrixColumns).fill(1);
    const matrixChars = "010101XYZABCDEFALI.BUILD";

    // --- Particle Mode: Starfield ---
    const starCount = 120;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width
    }));

    // --- Particle Mode: Curl Swarm ---
    const swarmCount = 80;
    const particles = Array.from({ length: swarmCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let t = 0;

    const render = () => {
      t += 0.016 * speedMultiplier;
      ctx.clearRect(0, 0, width, height);

      // Get current theme color from computed style
      const computed = getComputedStyle(document.documentElement);
      const accent = computed.getPropertyValue("--accent-primary").trim() || "#38bdf8";

      if (particleEffect === "matrix-rain") {
        ctx.fillStyle = "rgba(4, 9, 20, 0.15)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = accent;
        ctx.font = "12px monospace";

        for (let i = 0; i < matrixDrops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          ctx.fillText(char, i * 20, matrixDrops[i] * 20);
          if (matrixDrops[i] * 20 > height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
          }
          matrixDrops[i] += 0.7 * speedMultiplier;
        }
      } else if (particleEffect === "starfield") {
        ctx.fillStyle = accent;
        const cx = width / 2;
        const cy = height / 2;

        for (const s of stars) {
          s.z -= 2 * speedMultiplier;
          if (s.z <= 0) s.z = width;

          const k = 250 / s.z;
          const px = s.x * k + cx;
          const py = s.y * k + cy;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const size = Math.max(0.5, (1 - s.z / width) * 3);
            ctx.globalAlpha = Math.min(1, (1 - s.z / width) * 1.2);
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      } else if (particleEffect === "hex-grid") {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.06;
        ctx.lineWidth = 1;
        const r = 35;
        const h = r * Math.sqrt(3);

        for (let y = 0; y < height + h; y += h) {
          for (let x = 0; x < width + r * 3; x += r * 3) {
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
              const angle = (Math.PI / 3) * a;
              const hx = x + r * Math.cos(angle);
              const hy = y + r * Math.sin(angle);
              if (a === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      } else {
        // Default: Curl-Noise Swarm
        ctx.fillStyle = accent;
        for (const p of particles) {
          p.x += (p.vx + Math.sin(t + p.y * 0.01) * 0.5) * speedMultiplier;
          p.y += (p.vy + Math.cos(t + p.x * 0.01) * 0.5) * speedMultiplier;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleEffect, animationIntensity, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-500"
    />
  );
};
