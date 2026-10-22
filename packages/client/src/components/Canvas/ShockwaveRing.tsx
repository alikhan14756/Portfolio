"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { CONSTANTS } from "@aetheria/common";

export const ShockwaveRing: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const isShockwaveActive = useBiosphereStore((s) => s.isShockwaveActive);
  const shockwaveCenter = useBiosphereStore((s) => s.shockwaveCenter);
  const lastShockwaveTime = useBiosphereStore((s) => s.lastShockwaveTime);

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return;

    if (isShockwaveActive && shockwaveCenter) {
      meshRef.current.visible = true;
      const elapsed = performance.now() - lastShockwaveTime;
      const progress = Math.min(1.0, elapsed / 800); // 800ms duration

      // Radial blast expansion up to R_BLAST (30 WU)
      const currentRadius = progress * CONSTANTS.R_BLAST;
      meshRef.current.position.set(shockwaveCenter.x, shockwaveCenter.y, 0.1);
      meshRef.current.scale.set(currentRadius, currentRadius, 1);

      // Fade out opacity
      matRef.current.opacity = (1.0 - progress) * 0.75;
    } else {
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <ringGeometry args={[0.92, 1.0, 64]} />
      <meshBasicMaterial
        ref={matRef}
        color="#38bdf8"
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
