import { QualityTier } from "@aetheria/common";
import { useBiosphereStore } from "../stores/useBiosphereStore";

export interface TierConfig {
  tier: QualityTier;
  particleCount: number;
  bloomEnabled: boolean;
  bloomIntensity: number;
  fbmOctaves: number;
  maxVoices: number;
}

export const TIER_CONFIGS: Record<QualityTier, TierConfig> = {
  1: {
    tier: 1,
    particleCount: 25000,
    bloomEnabled: true,
    bloomIntensity: 1.0,
    fbmOctaves: 3,
    maxVoices: 12
  },
  2: {
    tier: 2,
    particleCount: 8000,
    bloomEnabled: true,
    bloomIntensity: 0.6,
    fbmOctaves: 1,
    maxVoices: 6
  },
  3: {
    tier: 3,
    particleCount: 2500,
    bloomEnabled: false,
    bloomIntensity: 0.0,
    fbmOctaves: 0,
    maxVoices: 3
  }
};

export class QualityManager {
  private static instance: QualityManager | null = null;
  private lowFpsStartTime: number | null = null;
  private readonly DOWNGRADE_THRESHOLD_FPS = 45;
  private readonly DOWNGRADE_DURATION_MS = 3000;
  private frameCount = 0;
  private lastFpsUpdateTime = 0;

  public static getInstance(): QualityManager {
    if (!QualityManager.instance) {
      QualityManager.instance = new QualityManager();
    }
    return QualityManager.instance;
  }

  public detectInitialTier(): QualityTier {
    if (typeof window === "undefined") return 1;

    // Detect mobile or low memory devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;

    if (isMobile || (lowMemory && lowCores)) {
      return 3;
    }

    if (lowMemory || lowCores) {
      return 2;
    }

    return 1;
  }

  public recordFrame(now: number) {
    this.frameCount++;

    if (now - this.lastFpsUpdateTime >= 500) {
      const deltaSec = (now - this.lastFpsUpdateTime) / 1000;
      const currentFps = Math.round(this.frameCount / deltaSec);
      this.frameCount = 0;
      this.lastFpsUpdateTime = now;

      useBiosphereStore.getState().setFps(currentFps);

      // Check auto-downgrade condition
      const currentTier = useBiosphereStore.getState().qualityTier;
      if (currentTier < 3) {
        if (currentFps < this.DOWNGRADE_THRESHOLD_FPS) {
          if (!this.lowFpsStartTime) {
            this.lowFpsStartTime = now;
          } else if (now - this.lowFpsStartTime >= this.DOWNGRADE_DURATION_MS) {
            const nextTier = (currentTier + 1) as QualityTier;
            console.warn(
              `[QualityManager] FPS stayed below ${this.DOWNGRADE_THRESHOLD_FPS} for > 3.0s. Downgrading to Tier ${nextTier}.`
            );
            useBiosphereStore.getState().setQualityTier(nextTier);
            this.lowFpsStartTime = null;
          }
        } else {
          this.lowFpsStartTime = null;
        }
      }
    }
  }
}

export const qualityManager = QualityManager.getInstance();
