"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

/**
 * High-Quality 3D Holographic JARVIS Core / Arc Reactor
 * Built with Three.js & React Three Fiber.
 * Features 4K high-density particle clouds, multi-axis holographic gimbals,
 * pulsating geodesic wireframe, and dynamic pointer tracking.
 */

interface CoreProps {
  accentColor: string;
  secondaryColor: string;
  isSpeaking: boolean;
  intensity: "full" | "balanced" | "minimal" | "off";
}

function HolographicScene({ accentColor, secondaryColor, isSpeaking, intensity }: CoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Target pointer rotation for smooth gyro follow
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.targetX = (e.clientX / innerWidth - 0.5) * 0.8;
      mouse.current.targetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  // Parse CSS hex/rgb colors to THREE.Color
  const primaryThreeColor = useMemo(() => new THREE.Color(accentColor || "#38bdf8"), [accentColor]);
  const secondaryThreeColor = useMemo(() => new THREE.Color(secondaryColor || "#22d3ee"), [secondaryColor]);

  // Particle swarm geometry (800 - 1400 points)
  const particleCount = intensity === "minimal" ? 400 : intensity === "balanced" ? 800 : 1200;
  const [particlePositions, particleScales] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.35 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      scales[i] = Math.random() * 0.8 + 0.2;
    }
    return [positions, scales];
  }, [particleCount]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isSpeaking ? 2.2 : 1.0;

    // Smooth pointer follow on root group
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.current.x * 0.8;
      groupRef.current.rotation.x = -mouse.current.y * 0.8;
    }

    if (intensity === "off") return;

    // Outer Gimbal Ring 1
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35 * speedMult;
      ring1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    }

    // Middle Gimbal Ring 2
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5 * speedMult;
      ring2Ref.current.rotation.z = Math.cos(t * 0.5) * 0.35;
    }

    // Inner Gimbal Ring 3
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.65 * speedMult;
      ring3Ref.current.rotation.y += delta * 0.3 * speedMult;
    }

    // Geodesic Inner Wireframe Core (Breathing pulse)
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += delta * 0.4 * speedMult;
      innerCoreRef.current.rotation.x += delta * 0.25 * speedMult;

      const basePulse = Math.sin(t * (isSpeaking ? 7.0 : 2.5)) * 0.08;
      const scale = 0.68 + basePulse + (isSpeaking ? 0.08 : 0);
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    // Particle Swarm Orbit & Pulse
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.15 * speedMult;
      particlesRef.current.rotation.x += delta * 0.08 * speedMult;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient and Concentrated Core Point Light */}
      <ambientLight intensity={0.4} />
      <pointLight color={primaryThreeColor} intensity={isSpeaking ? 4.5 : 2.5} distance={10} />
      <pointLight position={[0, 0, 2]} color={secondaryThreeColor} intensity={1.5} distance={8} />

      {/* 1. Innermost Glowing Quantum Energy Sphere */}
      <mesh>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial
          color={primaryThreeColor}
          emissive={primaryThreeColor}
          emissiveIntensity={isSpeaking ? 3.0 : 1.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Geodesic Wireframe Core (Icosahedron) */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          color={secondaryThreeColor}
          wireframe
          transparent
          opacity={isSpeaking ? 0.95 : 0.75}
        />
      </mesh>

      {/* 3. Middle Torus Gimbal Ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.88, 0.018, 16, 64]} />
        <meshStandardMaterial
          color={secondaryThreeColor}
          emissive={secondaryThreeColor}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 4. Second Torus Gimbal Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.12, 0.022, 16, 72]} />
        <meshStandardMaterial
          color={primaryThreeColor}
          emissive={primaryThreeColor}
          emissiveIntensity={1.4}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* 5. Outer Major Tactical Ring with Orbiting Nodes */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.38, 0.026, 16, 80]} />
        <meshStandardMaterial
          color={primaryThreeColor}
          emissive={primaryThreeColor}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 6. Orbiting Satellites on Outer Ring */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
        <mesh
          key={idx}
          position={[Math.cos(angle) * 1.38, Math.sin(angle) * 1.38, 0]}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={secondaryThreeColor} />
        </mesh>
      ))}

      {/* 7. Quantum Particle Swarm Field */}
      {intensity !== "off" && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color={primaryThreeColor}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
}

export const JarvisHologramCore3D: React.FC = () => {
  const theme = usePortfolioStore((s) => s.theme);
  const accentOverride = usePortfolioStore((s) => s.accentOverride);
  const isSpeaking = usePortfolioStore((s) => s.isSpeaking);
  const animationIntensity = usePortfolioStore((s) => s.animationIntensity);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute theme colors dynamically from CSS variables or theme presets
  const themeColors: Record<string, { primary: string; secondary: string }> = {
    "jarvis-core": { primary: "#38bdf8", secondary: "#22d3ee" },
    "iron-red": { primary: "#ef4444", secondary: "#f59e0b" },
    "iron-man": { primary: "#ef4444", secondary: "#f59e0b" },
    "cyberpunk-neon": { primary: "#facc15", secondary: "#ec4899" },
    "cyberpunk": { primary: "#facc15", secondary: "#ec4899" },
    "matrix-terminal": { primary: "#22c55e", secondary: "#4ade80" },
    "matrix": { primary: "#22c55e", secondary: "#4ade80" },
    "arctic-glass": { primary: "#bae6fd", secondary: "#7dd3fc" },
    "midnight-purple": { primary: "#c084fc", secondary: "#a855f7" },
    "emerald-professional": { primary: "#34d399", secondary: "#10b981" },
    "emerald-pro": { primary: "#34d399", secondary: "#10b981" },
    "solar-gold": { primary: "#fbbf24", secondary: "#ea580c" },
    "ocean-blue": { primary: "#0ea5e9", secondary: "#2dd4bf" },
    "rose-neon": { primary: "#fb7185", secondary: "#f43f5e" },
    "paper-studio": { primary: "#0f172a", secondary: "#475569" },
    "monochrome": { primary: "#f43f5e", secondary: "#e4e4e7" }
  };

  const activeColors = themeColors[theme] || { primary: "#38bdf8", secondary: "#22d3ee" };
  const primaryColor = accentOverride || activeColors.primary;
  const secondaryColor = activeColors.secondary;

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-[var(--accent-primary)]/40 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]} // Crisp 4K / Retina display scaling
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true
        }}
        className="w-full h-full"
      >
        <HolographicScene
          accentColor={primaryColor}
          secondaryColor={secondaryColor}
          isSpeaking={isSpeaking}
          intensity={animationIntensity}
        />
      </Canvas>

      {/* Subtle Concentric Ambient Glow Behind Canvas */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-20 -z-10 transition-colors duration-500"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`
        }}
      />
    </div>
  );
};
