import { ClimateStatus, clamp, CONSTANTS } from "@aetheria/common";

export class ClimateEngine {
  private currentClimate: ClimateStatus = "STABLE";
  private entropyScore = 40;
  private conditionTimer = 0; // Tracks duration in condition state

  // Rolling 60s window metric history
  private speedSamples: number[] = [];
  private shockSamples: number[] = [];
  private tetherSamples: number[] = [];
  private formationSamples: number[] = [];

  public update(
    dt: number,
    activeEntitiesCount: number,
    averageSpeed: number,
    spatialDispersion: number,
    shockwaveRate: number,
    tetherCount: number,
    formationsCount: number
  ): { climate: ClimateStatus; entropyScore: number; transitioned: boolean } {
    // 1. Normalize components against population
    const pop = Math.max(1, activeEntitiesCount);
    const vNorm = clamp(averageSpeed / CONSTANTS.V_MAX, 0, 1);
    const dSpatial = clamp(spatialDispersion, 0, 1);
    const rShock = clamp(shockwaveRate / (pop * 0.5), 0, 1);
    const cTether = clamp(tetherCount / (pop * 1.5), 0, 1);

    // 2. Composite Entropy Metric:
    // S = 100 * (0.35 * V_norm + 0.25 * D_spatial + 0.25 * R_shock + 0.15 * C_tether)
    const rawS = 100 * (0.35 * vNorm + 0.25 * dSpatial + 0.25 * rShock + 0.15 * cTether);
    // Smooth transition
    this.entropyScore = Math.round(this.entropyScore * 0.95 + rawS * 0.05);

    // Track rolling metrics
    this.formationSamples.push(formationsCount);
    if (this.formationSamples.length > 60) this.formationSamples.shift();
    const formationsPerMin = this.formationSamples.reduce((a, b) => a + b, 0) / (this.formationSamples.length / 60);

    const prevClimate = this.currentClimate;

    // 3. State Transition Rules with Hysteresis Guards
    switch (this.currentClimate) {
      case "STABLE":
        if (formationsPerMin >= 4.0 && this.entropyScore >= 30 && this.entropyScore <= 65) {
          this.currentClimate = "LUMINESCENT";
          this.conditionTimer = 0;
        } else if (this.entropyScore >= 60) {
          this.conditionTimer += dt;
          if (this.conditionTimer >= 30) {
            this.currentClimate = "TURBULENT";
            this.conditionTimer = 0;
          }
        } else if (this.entropyScore < 15) {
          this.conditionTimer += dt;
          if (this.conditionTimer >= 300) {
            this.currentClimate = "DORMANT";
            this.conditionTimer = 0;
          }
        } else {
          this.conditionTimer = 0;
        }
        break;

      case "TURBULENT":
        if (this.entropyScore < 50) {
          this.conditionTimer += dt;
          if (this.conditionTimer >= 60) {
            this.currentClimate = "STABLE";
            this.conditionTimer = 0;
          }
        } else {
          this.conditionTimer = 0;
        }
        break;

      case "DORMANT":
        if (this.entropyScore >= 25) {
          this.conditionTimer += dt;
          if (this.conditionTimer >= 15) {
            this.currentClimate = "STABLE";
            this.conditionTimer = 0;
          }
        } else {
          this.conditionTimer = 0;
        }
        break;

      case "LUMINESCENT":
        if (formationsPerMin < 1.5) {
          this.currentClimate = "STABLE";
          this.conditionTimer = 0;
        }
        break;
    }

    return {
      climate: this.currentClimate,
      entropyScore: this.entropyScore,
      transitioned: prevClimate !== this.currentClimate
    };
  }

  public getClimate(): ClimateStatus {
    return this.currentClimate;
  }

  public getEntropy(): number {
    return this.entropyScore;
  }

  public setClimateManual(c: ClimateStatus) {
    this.currentClimate = c;
    this.conditionTimer = 0;
  }
}
