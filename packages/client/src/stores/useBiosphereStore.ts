import { create } from "zustand";
import { ClimateStatus, QualityTier, CONSTANTS } from "@aetheria/common";

export interface BiosphereStore {
  // Local Organism State
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  isAttracting: boolean;
  isShockwaveActive: boolean;
  shockwaveCenter: { x: number; y: number } | null;
  lastShockwaveTime: number;
  isDepleted: boolean;

  // Camera & Viewport
  zoomWidth: number;
  cameraX: number;
  cameraY: number;

  // Environment & Climate
  climate: ClimateStatus;
  entropyScore: number;
  qualityTier: QualityTier;
  fps: number;

  // Audio & User Permissions
  audioUnlocked: boolean;
  isMuted: boolean;
  volume: number;

  // Controls & Accessibility
  reducedMotion: boolean;

  // Actions
  setOrganismPos: (x: number, y: number, vx: number, vy: number) => void;
  setEnergy: (energy: number) => void;
  setIsAttracting: (val: boolean) => void;
  triggerShockwave: () => boolean;
  setClimate: (climate: ClimateStatus) => void;
  setEntropy: (entropy: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  setFps: (fps: number) => void;
  unlockAudio: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (vol: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setCameraPos: (cx: number, cy: number) => void;
  setZoomWidth: (w: number) => void;
}

export const useBiosphereStore = create<BiosphereStore>((set, get) => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  energy: CONSTANTS.E_MAX,
  isAttracting: false,
  isShockwaveActive: false,
  shockwaveCenter: null,
  lastShockwaveTime: 0,
  isDepleted: false,

  zoomWidth: 120, // default World Units width
  cameraX: 0,
  cameraY: 0,

  climate: "STABLE",
  entropyScore: 42,
  qualityTier: 1,
  fps: 60,

  audioUnlocked: false,
  isMuted: false,
  volume: 0.7,
  reducedMotion: false,

  setOrganismPos: (x, y, vx, vy) => set({ x, y, vx, vy }),

  setEnergy: (energy) =>
    set({
      energy,
      isDepleted: energy < CONSTANTS.E_DEPLETION_THRESHOLD
    }),

  setIsAttracting: (isAttracting) => {
    const { isDepleted } = get();
    // Cannot attract when depleted
    set({ isAttracting: isDepleted ? false : isAttracting });
  },

  triggerShockwave: () => {
    const { energy, lastShockwaveTime, x, y, isDepleted } = get();
    const now = performance.now();

    if (isDepleted) return false;
    if (energy < CONSTANTS.E_SHOCKWAVE_COST) return false;
    if (now - lastShockwaveTime < CONSTANTS.SHOCKWAVE_COOLDOWN_MS) return false;

    set({
      energy: energy - CONSTANTS.E_SHOCKWAVE_COST,
      lastShockwaveTime: now,
      isShockwaveActive: true,
      shockwaveCenter: { x, y }
    });

    // Reset shockwave animation flag after 800ms
    setTimeout(() => {
      set({ isShockwaveActive: false });
    }, 800);

    return true;
  },

  setClimate: (climate) => set({ climate }),
  setEntropy: (entropyScore) => set({ entropyScore }),
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setFps: (fps) => set({ fps }),
  unlockAudio: () => set({ audioUnlocked: true }),
  setMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setCameraPos: (cameraX, cameraY) => set({ cameraX, cameraY }),
  setZoomWidth: (zoomWidth) => set({ zoomWidth })
}));
