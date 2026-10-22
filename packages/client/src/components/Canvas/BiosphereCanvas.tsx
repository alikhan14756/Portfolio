"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { qualityManager } from "../../engine/QualityManager";
import { CONSTANTS, clamp } from "@aetheria/common";
import { Organism } from "./Organism";
import { ParticleField } from "./ParticleField";
import { BackgroundFluid } from "./BackgroundFluid";
import { ShockwaveRing } from "./ShockwaveRing";

// Internal Scene Controller for Camera Interpolation and Performance Monitoring
const SceneController: React.FC = () => {
  const { camera, size } = useThree();

  const organismX = useBiosphereStore((s) => s.x);
  const organismY = useBiosphereStore((s) => s.y);
  const zoomWidth = useBiosphereStore((s) => s.zoomWidth);
  const setCameraPos = useBiosphereStore((s) => s.setCameraPos);

  const camPos = useRef({ x: 0, y: 0 });

  // Wheel zoom handler clamped to [80, 240] World Units
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentZoom = useBiosphereStore.getState().zoomWidth;
      const nextZoom = clamp(
        currentZoom + (e.deltaY > 0 ? 8 : -8),
        CONSTANTS.CAMERA_VIEW_MIN_WIDTH,
        CONSTANTS.CAMERA_VIEW_MAX_WIDTH
      );
      useBiosphereStore.getState().setZoomWidth(nextZoom);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((state) => {
    // 1. Record frame for adaptive quality scaling
    qualityManager.recordFrame(performance.now());

    // 2. Orthographic Camera Follow LERP = 0.08
    const orthoCam = camera as THREE.OrthographicCamera;
    const aspect = size.width / size.height;
    const halfWidth = zoomWidth / 2;
    const halfHeight = halfWidth / aspect;

    orthoCam.left = -halfWidth;
    orthoCam.right = halfWidth;
    orthoCam.top = halfHeight;
    orthoCam.bottom = -halfHeight;
    orthoCam.updateProjectionMatrix();

    // Smooth LERP follow to organism position
    camPos.current.x += (organismX - camPos.current.x) * CONSTANTS.CAMERA_LERP;
    camPos.current.y += (organismY - camPos.current.y) * CONSTANTS.CAMERA_LERP;

    camera.position.x = camPos.current.x;
    camera.position.y = camPos.current.y;
    camera.position.z = 20;

    setCameraPos(camPos.current.x, camPos.current.y);
  });

  return null;
};

export const BiosphereCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#040711] overflow-hidden">
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 20],
          zoom: 1,
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false
        }}
      >
        <SceneController />
        <BackgroundFluid />
        <ParticleField />
        <ShockwaveRing />
        <Organism />
      </Canvas>
    </div>
  );
};
