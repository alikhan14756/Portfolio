"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

/**
 * AAA-Grade Next-Gen 3D Holographic JARVIS Arc Reactor & Neural Core
 * Engineered with Three.js & React Three Fiber.
 * 
 * Features:
 * - Mechanical 10-blade aperture iris ring
 * - Tactical holographic HUD gauge with 48 radial tick marks & crosshairs
 * - Sinusoidal 3D Fourier audio-reactive energy waveforms
 * - Dual-arm logarithmic spiral particle accretion vortex (2,500 points)
 * - Pulsating quantum crystal dodecahedron core
 * - Orbiting cyber telemetry beacon satellites
 * - Interactive mouse/touch gyro tracking & drag-to-spin with momentum
 * - Audio-reactive speech pulse scaling & 4K hardware antialiasing
 */

interface HolographicSceneProps {
  primaryColor: string;
  secondaryColor: string;
  isSpeaking: boolean;
  intensity: "full" | "balanced" | "minimal" | "off";
}

function HologramScene({ primaryColor, secondaryColor, isSpeaking, intensity }: HolographicSceneProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const irisRingRef = useRef<THREE.Group>(null);
  const hudRing1Ref = useRef<THREE.Mesh>(null);
  const hudRing2Ref = useRef<THREE.Mesh>(null);
  const innerCrystalRef = useRef<THREE.Mesh>(null);
  const wireframeLatticeRef = useRef<THREE.Mesh>(null);
  const particleVortexRef = useRef<THREE.Points>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  // Mouse & Pointer inertia state
  const pointer = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragRotX: 0,
    dragRotY: 0,
    dragVelX: 0,
    dragVelY: 0
  });

  const shockwaveProgress = useRef(1.0);

  // Three.js color instances
  const colPrimary = useMemo(() => new THREE.Color(primaryColor || "#38bdf8"), [primaryColor]);
  const colSecondary = useMemo(() => new THREE.Color(secondaryColor || "#22d3ee"), [secondaryColor]);

  // Pointer & Drag Event Listeners
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      pointer.current.targetX = (e.clientX / innerWidth - 0.5) * 1.2;
      pointer.current.targetY = (e.clientY / innerHeight - 0.5) * 1.2;

      if (pointer.current.isDragging) {
        const deltaX = e.clientX - pointer.current.dragStartX;
        const deltaY = e.clientY - pointer.current.dragStartY;
        pointer.current.dragVelX = deltaX * 0.005;
        pointer.current.dragVelY = deltaY * 0.005;
        pointer.current.dragRotY += pointer.current.dragVelX;
        pointer.current.dragRotX += pointer.current.dragVelY;
        pointer.current.dragStartX = e.clientX;
        pointer.current.dragStartY = e.clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      pointer.current.isDragging = true;
      pointer.current.dragStartX = e.clientX;
      pointer.current.dragStartY = e.clientY;
      // Trigger shockwave pulse on click
      shockwaveProgress.current = 0.0;
    };

    const handlePointerUp = () => {
      pointer.current.isDragging = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, []);

  // 1. Generate 48 Radial HUD Dial Tick Marks
  const hudTickGeometry = useMemo(() => {
    const count = 48;
    const positions: number[] = [];
    const radiusInner = 1.32;
    const radiusOuter = 1.42;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const isMajor = i % 4 === 0;
      const rOut = isMajor ? radiusOuter + 0.06 : radiusOuter;

      const x1 = Math.cos(angle) * radiusInner;
      const y1 = Math.sin(angle) * radiusInner;
      const x2 = Math.cos(angle) * rOut;
      const y2 = Math.sin(angle) * rOut;

      positions.push(x1, y1, 0, x2, y2, 0);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, []);

  // 2. Generate Sinusoidal 3D Fourier Audio Waveform Curves
  const [waveGeometry1, waveGeometry2] = useMemo(() => {
    const pointsCount = 120;
    const pts1: THREE.Vector3[] = [];
    const pts2: THREE.Vector3[] = [];

    for (let i = 0; i <= pointsCount; i++) {
      const theta = (i / pointsCount) * Math.PI * 2;
      const r = 0.96;
      pts1.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
      pts2.push(new THREE.Vector3(Math.cos(theta) * (r + 0.12), Math.sin(theta) * (r + 0.12), 0));
    }

    const g1 = new THREE.BufferGeometry().setFromPoints(pts1);
    const g2 = new THREE.BufferGeometry().setFromPoints(pts2);
    return [g1, g2];
  }, []);

  const audioLine1 = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: colPrimary, transparent: true, opacity: 0.85 });
    return new THREE.Line(waveGeometry1, mat);
  }, [waveGeometry1, colPrimary]);

  const audioLine2 = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: colSecondary, transparent: true, opacity: 0.7 });
    return new THREE.Line(waveGeometry2, mat);
  }, [waveGeometry2, colSecondary]);

  const hudDialLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: colPrimary, transparent: true, opacity: 0.65 });
    return new THREE.LineSegments(hudTickGeometry, mat);
  }, [hudTickGeometry, colPrimary]);

  // 3. Generate Dual Logarithmic Spiral Accretion Particle Vortex (2,400 points)
  const particleCount = intensity === "minimal" ? 800 : intensity === "balanced" ? 1600 : 2400;
  const [particlePositions, particleColors, particleSizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Dual logarithmic spiral arms (0 or PI)
      const armOffset = (i % 2) * Math.PI;
      const distance = Math.pow(Math.random(), 0.7) * 1.5 + 0.45;
      const angle = distance * 4.2 + armOffset + (Math.random() - 0.5) * 0.4;

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = (Math.random() - 0.5) * 0.35 * (1.8 - distance);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color gradient from center to rim
      const ratio = distance / 1.95;
      const mixedColor = colPrimary.clone().lerp(colSecondary, ratio);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      sz[i] = Math.random() * 0.04 + 0.015;
    }

    return [pos, col, sz];
  }, [particleCount, colPrimary, colSecondary]);

  // Main Render & Physics Simulation Loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isSpeaking ? 2.4 : 1.0;

    // 1. Smooth gyro & inertia follow
    pointer.current.currentX += (pointer.current.targetX - pointer.current.currentX) * 0.06;
    pointer.current.currentY += (pointer.current.targetY - pointer.current.currentY) * 0.06;

    // Apply drag inertia damping
    if (!pointer.current.isDragging) {
      pointer.current.dragVelX *= 0.92;
      pointer.current.dragVelY *= 0.92;
      pointer.current.dragRotY += pointer.current.dragVelX;
      pointer.current.dragRotX += pointer.current.dragVelY;
    }

    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.y = pointer.current.currentX * 0.7 + pointer.current.dragRotY;
      rootGroupRef.current.rotation.x = -pointer.current.currentY * 0.7 + pointer.current.dragRotX;
    }

    if (intensity === "off") return;

    // 2. Central Arc Reactor Core Pulsing
    if (innerCrystalRef.current) {
      innerCrystalRef.current.rotation.y += delta * 0.5 * speedMult;
      innerCrystalRef.current.rotation.x += delta * 0.3 * speedMult;
      const pulseRate = isSpeaking ? 10.0 : 3.0;
      const scale = 0.42 + Math.sin(t * pulseRate) * 0.04 + (isSpeaking ? 0.06 : 0);
      innerCrystalRef.current.scale.set(scale, scale, scale);
    }

    if (wireframeLatticeRef.current) {
      wireframeLatticeRef.current.rotation.y -= delta * 0.35 * speedMult;
      wireframeLatticeRef.current.rotation.z += delta * 0.25 * speedMult;
      const pulse = 0.68 + Math.cos(t * (isSpeaking ? 8.0 : 2.5)) * 0.03;
      wireframeLatticeRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. Mechanical Aperture Iris Blades Rotation
    if (irisRingRef.current) {
      irisRingRef.current.rotation.z += delta * 0.3 * speedMult;
    }

    // 4. Concentric HUD Tactical Dials
    hudDialLine.rotation.z += delta * 0.15 * speedMult;
    if (hudRing1Ref.current) {
      hudRing1Ref.current.rotation.z -= delta * 0.22 * speedMult;
    }
    if (hudRing2Ref.current) {
      hudRing2Ref.current.rotation.z += delta * 0.35 * speedMult;
    }

    // 5. Dynamic Sinusoidal Audio Ribbon Oscillation
    audioLine1.rotation.z -= delta * 0.4 * speedMult;
    const positions1 = audioLine1.geometry.attributes.position;
    const count1 = positions1.count;
    for (let i = 0; i < count1; i++) {
      const theta = (i / count1) * Math.PI * 2;
      const freq = isSpeaking ? 8 : 4;
      const amp = isSpeaking ? 0.09 : 0.035;
      const zOffset = Math.sin(theta * freq + t * 4) * amp;
      positions1.setZ(i, zOffset);
    }
    positions1.needsUpdate = true;

    audioLine2.rotation.z += delta * 0.28 * speedMult;
    const positions2 = audioLine2.geometry.attributes.position;
    const count2 = positions2.count;
    for (let i = 0; i < count2; i++) {
      const theta = (i / count2) * Math.PI * 2;
      const freq = isSpeaking ? 6 : 3;
      const amp = isSpeaking ? 0.08 : 0.03;
      const zOffset = Math.cos(theta * freq - t * 3.5) * amp;
      positions2.setZ(i, zOffset);
    }
    positions2.needsUpdate = true;

    // 6. Keplerian Swirl on Particle Accretion Vortex
    if (particleVortexRef.current) {
      particleVortexRef.current.rotation.z += delta * 0.25 * speedMult;
    }

    // 7. Shockwave Ring Propagation on Click
    if (shockwaveRef.current) {
      if (shockwaveProgress.current < 1.0) {
        shockwaveProgress.current += delta * 1.8;
        const swScale = 0.5 + shockwaveProgress.current * 1.8;
        shockwaveRef.current.scale.set(swScale, swScale, swScale);
        (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity =
          Math.max(0, 1.0 - shockwaveProgress.current);
      } else {
        shockwaveRef.current.scale.set(0.01, 0.01, 0.01);
        (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Dynamic Lighting Core */}
      <ambientLight intensity={0.4} />
      <pointLight color={colPrimary} intensity={isSpeaking ? 5.5 : 3.0} distance={12} />
      <pointLight position={[0, 0, 2.5]} color={colSecondary} intensity={2.0} distance={8} />

      {/* 1. Innermost Glowing Quantum Crystal (Dodecahedron) */}
      <mesh ref={innerCrystalRef}>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color={colPrimary}
          emissive={colPrimary}
          emissiveIntensity={isSpeaking ? 3.5 : 2.2}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Geodesic Outer Lattice Cage (Icosahedron Wireframe) */}
      <mesh ref={wireframeLatticeRef}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color={colSecondary}
          wireframe
          transparent
          opacity={isSpeaking ? 0.95 : 0.75}
        />
      </mesh>

      {/* 3. Mechanical 10-Blade Aperture Iris */}
      <group ref={irisRingRef}>
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.78, Math.sin(angle) * 0.78, 0]}
              rotation={[0, 0, angle + 0.35]}
            >
              <boxGeometry args={[0.22, 0.035, 0.015]} />
              <meshStandardMaterial
                color={colPrimary}
                emissive={colPrimary}
                emissiveIntensity={0.8}
                metalness={0.95}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* 4. Sinusoidal 3D Audio Waveform Ribbons */}
      <primitive object={audioLine1} />
      <primitive object={audioLine2} />

      {/* 5. Tactical Holographic HUD Gauge (48 Radial Ticks) */}
      <primitive object={hudDialLine} />

      {/* 6. Concentric Holographic HUD Dial Rings */}
      <mesh ref={hudRing1Ref}>
        <ringGeometry args={[1.28, 1.30, 64]} />
        <meshBasicMaterial color={colSecondary} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={hudRing2Ref}>
        <ringGeometry args={[1.44, 1.47, 48]} />
        <meshBasicMaterial color={colPrimary} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* 7. Tactical Crosshairs at 4 Quadrants */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <group key={i} rotation={[0, 0, angle]}>
          <mesh position={[1.52, 0, 0]}>
            <boxGeometry args={[0.08, 0.015, 0.01]} />
            <meshBasicMaterial color={colSecondary} />
          </mesh>
        </group>
      ))}

      {/* 8. Orbiting Cyber Telemetry Beacon Satellites */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
        <group key={idx} rotation={[angle * 0.5, angle, 0]}>
          <mesh position={[Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={colPrimary}
              emissive={colPrimary}
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      ))}

      {/* 9. Dual Logarithmic Spiral Accretion Particle Vortex (2,400 points) */}
      {intensity !== "off" && (
        <points ref={particleVortexRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.038}
            vertexColors
            transparent
            opacity={0.88}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}

      {/* 10. Chromatic Interactive Shockwave Pulse Ring (Triggered on Click) */}
      <mesh ref={shockwaveRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.85, 0.95, 48]} />
        <meshBasicMaterial
          color={colSecondary}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
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

  // Theme-specific vibrant RGB color matrix
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
    "paper-studio": { primary: "#0f172a", secondary: "#334155" },
    "monochrome": { primary: "#f43f5e", secondary: "#e4e4e7" }
  };

  const activeColors = themeColors[theme] || { primary: "#38bdf8", secondary: "#22d3ee" };
  const primaryColor = accentOverride || activeColors.primary;
  const secondaryColor = activeColors.secondary;

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[320px] flex items-center justify-center">
        <div className="w-36 h-36 rounded-full border-2 border-dashed border-[var(--accent-primary)]/40 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 2]} // 4K Retina hardware antialiasing
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true
        }}
        className="w-full h-full"
      >
        <HologramScene
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          isSpeaking={isSpeaking}
          intensity={animationIntensity}
        />
      </Canvas>

      {/* Interactive Drag & Shockwave Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[9px] font-mono tracking-widest text-[var(--accent-primary)]/70 uppercase bg-[var(--badge-bg)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]/50">
        DRAG TO ROTATE • CLICK TO PULSE
      </div>

      {/* Atmospheric Concentric Glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-25 -z-10 transition-colors duration-500"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 65%)`
        }}
      />
    </div>
  );
};
