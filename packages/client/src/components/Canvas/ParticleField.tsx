"use client";

import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { TIER_CONFIGS } from "../../engine/QualityManager";
import { PARTICLE_VERTEX_SHADER, PARTICLE_FRAGMENT_SHADER } from "./Shaders";
import { CONSTANTS } from "@aetheria/common";

export const ParticleField: React.FC = () => {
  const qualityTier = useBiosphereStore((s) => s.qualityTier);
  const reducedMotion = useBiosphereStore((s) => s.reducedMotion);
  const organismX = useBiosphereStore((s) => s.x);
  const organismY = useBiosphereStore((s) => s.y);
  const isAttracting = useBiosphereStore((s) => s.isAttracting);
  const isShockwaveActive = useBiosphereStore((s) => s.isShockwaveActive);
  const shockwaveCenter = useBiosphereStore((s) => s.shockwaveCenter);
  const lastShockwaveTime = useBiosphereStore((s) => s.lastShockwaveTime);

  const tierConfig = TIER_CONFIGS[qualityTier] || TIER_CONFIGS[1];
  const count = tierConfig.particleCount;

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate Instanced Buffer Attributes
  const { geometry, uniforms } = useMemo(() => {
    // Base billboard quad geometry
    const baseGeo = new THREE.PlaneGeometry(0.8, 0.8);
    const instancedGeo = new THREE.InstancedBufferGeometry();
    instancedGeo.index = baseGeo.index;
    instancedGeo.attributes.position = baseGeo.attributes.position;
    instancedGeo.attributes.uv = baseGeo.attributes.uv;

    const maxCount = 25000;
    const offsets = new Float32Array(maxCount * 3);
    const scales = new Float32Array(maxCount);
    const phases = new Float32Array(maxCount);
    const colors = new Float32Array(maxCount * 3);

    // Color palettes
    const palette = [
      new THREE.Color("#38bdf8"), // Cyan
      new THREE.Color("#34d399"), // Emerald
      new THREE.Color("#818cf8"), // Indigo
      new THREE.Color("#67e8f9"), // Light cyan
      new THREE.Color("#a78bfa")  // Violet
    ];

    for (let i = 0; i < maxCount; i++) {
      // Unbounded 2.5D plane distribution [-140, 140] WU, z in [-10, 10]
      offsets[i * 3 + 0] = (Math.random() - 0.5) * 280;
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 280;
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Scale variation
      scales[i] = 0.5 + Math.random() * 1.5;

      // Noise phase
      phases[i] = Math.random() * Math.PI * 2;

      // Bioluminescent tint
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    instancedGeo.setAttribute(
      "aOffset",
      new THREE.InstancedBufferAttribute(offsets, 3)
    );
    instancedGeo.setAttribute(
      "aScale",
      new THREE.InstancedBufferAttribute(scales, 1)
    );
    instancedGeo.setAttribute(
      "aPhase",
      new THREE.InstancedBufferAttribute(phases, 1)
    );
    instancedGeo.setAttribute(
      "aBaseColor",
      new THREE.InstancedBufferAttribute(colors, 3)
    );

    const shaderUniforms = {
      uTime: { value: 0 },
      uOrganismPos: { value: new THREE.Vector2(0, 0) },
      uAttracting: { value: 0 },
      uShockwaveActive: { value: 0 },
      uShockwaveCenter: { value: new THREE.Vector2(0, 0) },
      uShockwaveProgress: { value: 0 },
      uShockwaveRadius: { value: CONSTANTS.R_BLAST },
      uReducedMotion: { value: 0 }
    };

    return { geometry: instancedGeo, uniforms: shaderUniforms };
  }, []);

  // Update dynamic count
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.count = count;
    }
  }, [count]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.getElapsedTime();
    u.uOrganismPos.value.set(organismX, organismY);
    u.uAttracting.value = isAttracting ? 1.0 : 0.0;
    u.uReducedMotion.value = reducedMotion ? 1.0 : 0.0;

    // Shockwave animation progress
    if (isShockwaveActive && shockwaveCenter) {
      const elapsed = performance.now() - lastShockwaveTime;
      const progress = Math.min(1.0, elapsed / 800);
      u.uShockwaveActive.value = 1.0;
      u.uShockwaveCenter.value.set(shockwaveCenter.x, shockwaveCenter.y);
      u.uShockwaveProgress.value = progress;
    } else {
      u.uShockwaveActive.value = 0.0;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={PARTICLE_VERTEX_SHADER}
        fragmentShader={PARTICLE_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};
