"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { TIER_CONFIGS } from "../../engine/QualityManager";
import {
  FLUID_BACKGROUND_VERTEX_SHADER,
  FLUID_BACKGROUND_FRAGMENT_SHADER
} from "./Shaders";

export const BackgroundFluid: React.FC = () => {
  const { size } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const climate = useBiosphereStore((s) => s.climate);
  const qualityTier = useBiosphereStore((s) => s.qualityTier);
  const cameraX = useBiosphereStore((s) => s.cameraX);
  const cameraY = useBiosphereStore((s) => s.cameraY);
  const zoomWidth = useBiosphereStore((s) => s.zoomWidth);

  const tierConfig = TIER_CONFIGS[qualityTier] || TIER_CONFIGS[1];

  const palette = useMemo(() => {
    switch (climate) {
      case "DORMANT":
        return {
          base: new THREE.Color("#03060c"),
          accent: new THREE.Color("#1e293b"),
          sat: 0.2
        };
      case "TURBULENT":
        return {
          base: new THREE.Color("#0a0412"),
          accent: new THREE.Color("#f43f5e"),
          sat: 1.2
        };
      case "LUMINESCENT":
        return {
          base: new THREE.Color("#021a1f"),
          accent: new THREE.Color("#34d399"),
          sat: 1.3
        };
      case "STABLE":
      default:
        return {
          base: new THREE.Color("#040714"),
          accent: new THREE.Color("#0284c7"),
          sat: 1.0
        };
    }
  }, [climate]);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uCameraPos: { value: new THREE.Vector2(0, 0) },
      uZoom: { value: zoomWidth },
      uOctaves: { value: tierConfig.fbmOctaves },
      uBaseColor: { value: palette.base },
      uAccentColor: { value: palette.accent },
      uSaturation: { value: palette.sat }
    };
  }, [size.width, size.height, zoomWidth, tierConfig.fbmOctaves, palette]);

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.getElapsedTime();
    u.uCameraPos.value.set(cameraX, cameraY);
    u.uZoom.value = zoomWidth;
    u.uOctaves.value = tierConfig.fbmOctaves;
    u.uBaseColor.value.lerp(palette.base, 0.05);
    u.uAccentColor.value.lerp(palette.accent, 0.05);
    u.uSaturation.value = palette.sat;
  });

  return (
    <mesh position={[cameraX, cameraY, -8]}>
      {/* Plane covering current viewport frustum */}
      <planeGeometry args={[zoomWidth * 1.5, (zoomWidth * 1.5 * size.height) / size.width]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={FLUID_BACKGROUND_VERTEX_SHADER}
        fragmentShader={FLUID_BACKGROUND_FRAGMENT_SHADER}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
