"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

export const PortfolioParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const styleId = usePortfolioStore((s) => s.styleId);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);

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
      animationIntensity === "minimal" ? 0.3 : animationIntensity === "balanced" ? 0.7 : 1.0;

    const s = (styleId || "").toLowerCase();

    // 1. Matrix Rain for terminal-matrix
    const matrixCols = Math.floor(width / 22);
    const matrixDrops = new Array(matrixCols).fill(1).map(() => Math.floor(Math.random() * -50));
    const matrixChars = "01010101XYZABCDEFALI.BUILD<>{}/*#$@";

    // 2. 8-Bit Retro Pixel Stars
    const pixelStars = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.7 ? 4 : 2,
      blinkSpeed: Math.random() * 0.05 + 0.02,
      opacity: Math.random()
    }));

    // 3. Clay Pastel Soft Blobs
    const clayBlobs = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 45 + 30,
      color: Math.random() > 0.5 ? "rgba(244, 114, 182, 0.12)" : "rgba(167, 139, 250, 0.12)"
    }));

    // 4. Vaporwave Upward Neon Embers
    const vaporEmbers = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 1.2 + 0.5),
      vx: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 1.5,
      color: Math.random() > 0.5 ? "#f43f5e" : "#06b6d4"
    }));

    // 5. Neobrutalist Tumbling Shapes
    const brutalistSymbols = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 14 + 10,
      rot: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.02
    }));

    // 6. Generic Nodes & Swarm
    const swarm = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.2
    }));

    let t = 0;

    const render = () => {
      t += 0.016 * speedMultiplier;
      ctx.clearRect(0, 0, width, height);

      const computed = getComputedStyle(document.documentElement);
      const accent = computed.getPropertyValue("--accent-primary").trim() || "#38bdf8";
      const accentSec = computed.getPropertyValue("--accent-secondary").trim() || "#ec4899";

      // 1. Matrix Digital Rain for terminal-matrix
      if (s === "terminal-matrix") {
        ctx.fillStyle = "rgba(4, 9, 20, 0.2)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = '11px "JetBrains Mono", monospace';

        for (let i = 0; i < matrixDrops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * 22;
          const y = matrixDrops[i] * 20;

          ctx.fillStyle = "#ffffff";
          ctx.fillText(char, x, y);

          ctx.fillStyle = accent;
          ctx.fillText(char, x, y - 18);

          if (y > height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
          }
          matrixDrops[i] += 0.8 * speedMultiplier;
        }
      }

      // 2. Retro Pixel 8-Bit Arcade Starfield
      else if (s === "retro-pixel") {
        pixelStars.forEach((star) => {
          star.opacity += star.blinkSpeed * speedMultiplier;
          const alpha = Math.abs(Math.sin(star.opacity));

          ctx.fillStyle = star.size > 2 ? accent : "#ffffff";
          ctx.globalAlpha = alpha * 0.85;
          ctx.fillRect(star.x, star.y, star.size, star.size);
        });
        ctx.globalAlpha = 1.0;
      }

      // 3. Cyberpunk HUD Radar Line & Sweep
      else if (s === "cyberpunk") {
        ctx.save();
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.15;
        // Draw HUD grid lines
        for (let x = 0; x < width; x += 100) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 100) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        // Radar sweep
        const sweepY = (t * 80) % height;
        ctx.strokeStyle = accentSec;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.moveTo(0, sweepY);
        ctx.lineTo(width, sweepY);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Retro-Futurism Apollo Orbit Path
      else if (s === "retro-futurism") {
        ctx.save();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, width * 0.35, height * 0.3, t * 0.1, 0, Math.PI * 2);
        ctx.stroke();
        // Orbiting satellite
        const satX = width / 2 + Math.cos(t * 0.5) * width * 0.35;
        const satY = height / 2 + Math.sin(t * 0.5) * height * 0.3;
        ctx.fillStyle = "#f59e0b";
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(satX, satY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Claymorphism: Pastel Floating Spheres
      else if (s === "claymorphism") {
        clayBlobs.forEach((b) => {
          b.x += b.vx * speedMultiplier;
          b.y += b.vy * speedMultiplier;
          if (b.x < -50) b.x = width + 50;
          if (b.x > width + 50) b.x = -50;
          if (b.y < -50) b.y = height + 50;
          if (b.y > height + 50) b.y = -50;

          const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.1, b.x, b.y, b.r);
          grad.addColorStop(0, b.color);
          grad.addColorStop(1, "transparent");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 6. Vaporwave: Upward Rising Neon Embers
      else if (s === "vaporwave") {
        vaporEmbers.forEach((e) => {
          e.y += e.vy * speedMultiplier;
          e.x += Math.sin(t + e.y * 0.01) * 0.8;
          if (e.y < -10) {
            e.y = height + 10;
            e.x = Math.random() * width;
          }

          ctx.shadowColor = e.color;
          ctx.shadowBlur = 10;
          ctx.fillStyle = e.color;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 7. Y2K Aesthetic: Floating Chrome Starbursts
      else if (s === "y2k-aesthetic") {
        ctx.save();
        ctx.fillStyle = "#ec4899";
        for (let i = 0; i < 20; i++) {
          const x = (Math.sin(t * 0.2 + i * 2) * 0.5 + 0.5) * width;
          const y = (Math.cos(t * 0.3 + i * 3) * 0.5 + 0.5) * height;
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 8. Neobrutalism: Chunky Tumbling Squares & Plusses
      else if (s === "neobrutalism") {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        brutalistSymbols.forEach((sym) => {
          sym.x += sym.vx * speedMultiplier;
          sym.y += sym.vy * speedMultiplier;
          sym.rot += sym.vRot * speedMultiplier;

          if (sym.x < -20) sym.x = width + 20;
          if (sym.x > width + 20) sym.x = -20;
          if (sym.y < -20) sym.y = height + 20;
          if (sym.y > height + 20) sym.y = -20;

          ctx.save();
          ctx.translate(sym.x, sym.y);
          ctx.rotate(sym.rot);
          ctx.globalAlpha = 0.2;

          const sz = sym.size;
          ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);
          ctx.restore();
        });
        ctx.globalAlpha = 1.0;
      }

      // 9. Swiss Style: Red Crosses & Clean Coordinate Ticks
      else if (s === "swiss-style") {
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        brutalistSymbols.forEach((sym) => {
          ctx.save();
          ctx.translate(sym.x, sym.y);
          ctx.globalAlpha = 0.15;
          const sz = 8;
          ctx.beginPath();
          ctx.moveTo(-sz, 0);
          ctx.lineTo(sz, 0);
          ctx.moveTo(0, -sz);
          ctx.lineTo(0, sz);
          ctx.stroke();
          ctx.restore();
        });
        ctx.globalAlpha = 1.0;
      }

      // 10. Organic Biophilic: Drifting Green Spores
      else if (s === "organic-biophilic") {
        ctx.save();
        ctx.fillStyle = "#10b981";
        swarm.forEach((p) => {
          p.x += Math.sin(t + p.y * 0.005) * 0.5;
          p.y += 0.3 * speedMultiplier;
          if (p.y > height) p.y = 0;
          ctx.globalAlpha = 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // 11. Default / Glassmorphism / Aurora: Connected Constellation
      else {
        swarm.forEach((p) => {
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = accent;
          ctx.globalAlpha = p.alpha * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Connected lines
        ctx.strokeStyle = accent;
        ctx.lineWidth = 0.75;
        for (let i = 0; i < swarm.length; i++) {
          for (let j = i + 1; j < swarm.length; j++) {
            const dx = swarm[i].x - swarm[j].x;
            const dy = swarm[i].y - swarm[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.globalAlpha = (1 - dist / 110) * 0.2;
              ctx.beginPath();
              ctx.moveTo(swarm[i].x, swarm[i].y);
              ctx.lineTo(swarm[j].x, swarm[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [styleId, animationIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="portfolio-particles pointer-events-none fixed inset-0 z-0"
      style={{ opacity: animationIntensity === "off" ? 0 : 1 }}
    />
  );
};
