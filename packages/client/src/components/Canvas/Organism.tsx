"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { audioSystem } from "../../engine/AudioSystem";
import { CONSTANTS, clamp } from "@aetheria/common";

export const Organism: React.FC = () => {
  const { camera, size, raycaster, pointer } = useThree();

  const groupRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const membraneRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const singularityRingRef = useRef<THREE.Mesh>(null);

  // Simulation physics state stored in refs to avoid React re-render overhead
  const physics = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
    energy: number;
    lastFrameTime: number;
    isPointerDown: boolean;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
    energy: CONSTANTS.E_MAX,
    lastFrameTime: performance.now(),
    isPointerDown: false
  });

  // Target pointer mapping in World Units
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      physics.current.isPointerDown = true;
      useBiosphereStore.getState().setIsAttracting(true);
      audioSystem.setAttractionActive(true);
    };

    const handlePointerUp = () => {
      physics.current.isPointerDown = false;
      useBiosphereStore.getState().setIsAttracting(false);
      audioSystem.setAttractionActive(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        const success = useBiosphereStore.getState().triggerShockwave();
        if (success) {
          audioSystem.playShockwave();
        }
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame((state, delta) => {
    const p = physics.current;
    const dt = clamp(delta, 0.001, 0.05);

    // 1. Raycast screen pointer to 2.5D World Plane (z = 0)
    raycaster.setFromCamera(pointer, camera);
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, targetPoint);

    if (targetPoint) {
      p.targetX = targetPoint.x;
      p.targetY = targetPoint.y;
    }

    // 2. Energy Pool Budget
    const store = useBiosphereStore.getState();
    const isAttracting = p.isPointerDown && p.energy >= CONSTANTS.E_DEPLETION_THRESHOLD;

    if (isAttracting) {
      p.energy = Math.max(0, p.energy - CONSTANTS.E_ATTRACT_DRAIN * dt);
    } else {
      p.energy = Math.min(CONSTANTS.E_MAX, p.energy + CONSTANTS.E_PASSIVE_REGEN * dt);
    }
    store.setEnergy(p.energy);

    // 3. Kinetic Acceleration Limits
    const isDepleted = p.energy < CONSTANTS.E_DEPLETION_THRESHOLD;
    const effectiveVMax = isDepleted
      ? CONSTANTS.V_MAX * CONSTANTS.SPEED_DEPLETED_MULTIPLIER
      : CONSTANTS.V_MAX;

    // Desired velocity towards target pointer
    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    const distToTarget = Math.sqrt(dx * dx + dy * dy);

    let desiredVx = 0;
    let desiredVy = 0;

    if (distToTarget > 0.1) {
      const speed = Math.min(effectiveVMax, distToTarget * 4.5);
      desiredVx = (dx / distToTarget) * speed;
      desiredVy = (dy / distToTarget) * speed;
    }

    // Accelerate smoothly clamped to A_MAX
    const ax = clamp((desiredVx - p.vx) / dt, -CONSTANTS.A_MAX, CONSTANTS.A_MAX);
    const ay = clamp((desiredVy - p.vy) / dt, -CONSTANTS.A_MAX, CONSTANTS.A_MAX);

    p.vx += ax * dt;
    p.vy += ay * dt;

    // Clamp speed magnitude
    const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (currentSpeed > effectiveVMax) {
      p.vx = (p.vx / currentSpeed) * effectiveVMax;
      p.vy = (p.vy / currentSpeed) * effectiveVMax;
    }

    // Update position
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Update global store state for other components
    store.setOrganismPos(p.x, p.y, p.vx, p.vy);

    // 4. Procedural Audio Synthesis trigger
    if (store.audioUnlocked && currentSpeed > 0.8) {
      audioSystem.playOrganismTone(p.x, p.y, currentSpeed, store.zoomWidth / 2);
    }

    // 5. Visual Mesh Animation
    if (groupRef.current) {
      groupRef.current.position.set(p.x, p.y, 0);

      // Tilt slightly toward velocity vector
      if (currentSpeed > 0.1) {
        const angle = Math.atan2(p.vy, p.vx);
        groupRef.current.rotation.z = angle - Math.PI / 2;
      }
    }

    const t = state.clock.getElapsedTime();

    // Pulse membrane
    if (membraneRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.08 + (currentSpeed / CONSTANTS.V_MAX) * 0.15;
      membraneRef.current.scale.set(pulse, pulse, pulse);
    }

    // Singularity Ring Visual
    if (singularityRingRef.current) {
      singularityRingRef.current.visible = isAttracting;
      if (isAttracting) {
        const ringScale = 1.0 + Math.sin(t * 12.0) * 0.2;
        singularityRingRef.current.scale.set(ringScale, ringScale, 1);
        singularityRingRef.current.rotation.z -= dt * 4.0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Ethereal Glow */}
      <mesh ref={glowRef}>
        <circleGeometry args={[2.8, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Pulsing Biological Membrane */}
      <mesh ref={membraneRef}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent={true}
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Bioluminescent Nucleus Core */}
      <mesh ref={nucleusRef}>
        <circleGeometry args={[0.7, 24]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>

      {/* Singularity Distortion Ring */}
      <mesh ref={singularityRingRef} visible={false}>
        <ringGeometry args={[2.2, 2.5, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
