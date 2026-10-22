export interface Vector2 {
  x: number;
  y: number;
}

export const CONSTANTS = {
  // Spatial & Grid
  GRID_CELL_SIZE: 60.0, // WU
  INTEREST_MOORE_NEIGHBORS: 1, // 3x3 grid (current + 8 surrounding)
  TETHER_CONNECT_DISTANCE: 12.0, // WU
  TETHER_BREAK_DISTANCE: 16.5, // WU
  TETHER_CONFIRMATION_TIME_MS: 300,

  // Camera
  CAMERA_LERP: 0.08,
  CAMERA_VIEW_MIN_WIDTH: 80.0, // WU
  CAMERA_VIEW_MAX_WIDTH: 240.0, // WU

  // Physics Limits
  V_MAX: 22.0, // WU/s
  A_MAX: 60.0, // WU/s^2
  SPEED_DEPLETED_MULTIPLIER: 0.4,

  // Gravitational Attraction
  G: 120.0,
  F_ATTRACT_MAX: 45.0, // WU/s^2
  ATTRACT_EPSILON: 4.0, // WU^2
  R_ATTRACT: 25.0, // WU

  // Shockwave Repulsion
  I_0: 80.0, // WU/s impulse
  R_BLAST: 30.0, // WU
  SHOCKWAVE_COOLDOWN_MS: 1200,

  // Energy
  E_MAX: 100.0,
  E_PASSIVE_REGEN: 8.0, // units/s
  E_ATTRACT_DRAIN: 15.0, // units/s
  E_SHOCKWAVE_COST: 45.0, // units flat
  E_DEPLETION_THRESHOLD: 5.0,

  // Audio Musical Mapping
  AUDIO_SCALE: [
    146.83, // D3
    164.81, // E3
    185.00, // F#3
    220.00, // A3
    246.94, // B3
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    587.33  // D5
  ],
  F_MIN: 146.83,
  F_MAX: 587.33,
  AUDIO_MAX_DISTANCE: 45.0 // WU
} as const;

export function vec2(x = 0, y = 0): Vector2 {
  return { x, y };
}

export function distance(a: Vector2, b: Vector2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distanceSq(a: Vector2, b: Vector2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Calculates gravitational attraction force magnitude and direction:
 * F_attract = min(F_max, (G * M1 * M2) / (d^2 + epsilon))
 * Returns a 2D acceleration vector applied to the target towards source.
 */
export function calculateAttractionForce(
  source: Vector2,
  target: Vector2,
  m1 = 1.0,
  m2 = 1.0
): Vector2 {
  const dx = source.x - target.x;
  const dy = source.y - target.y;
  const dSq = dx * dx + dy * dy;
  const d = Math.sqrt(dSq);

  if (d <= 0.0001 || d > CONSTANTS.R_ATTRACT) {
    return { x: 0, y: 0 };
  }

  const rawForce = (CONSTANTS.G * m1 * m2) / (dSq + CONSTANTS.ATTRACT_EPSILON);
  const force = Math.min(CONSTANTS.F_ATTRACT_MAX, rawForce);

  // Normalize direction towards source and scale by force
  return {
    x: (dx / d) * force,
    y: (dy / d) * force
  };
}

/**
 * Calculates shockwave repulsion impulse vector:
 * F_repulse(d) = I0 * (1 - d / R_blast) for d <= R_blast
 * Returns impulse vector pointing radially outward from blast center.
 */
export function calculateShockwaveImpulse(
  blastCenter: Vector2,
  target: Vector2
): Vector2 {
  const dx = target.x - blastCenter.x;
  const dy = target.y - blastCenter.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d <= 0.0001) {
    // Arbitrary outward direction if right on center
    return { x: CONSTANTS.I_0, y: 0 };
  }

  if (d > CONSTANTS.R_BLAST) {
    return { x: 0, y: 0 };
  }

  const impulseMag = CONSTANTS.I_0 * (1.0 - d / CONSTANTS.R_BLAST);
  return {
    x: (dx / d) * impulseMag,
    y: (dy / d) * impulseMag
  };
}

/**
 * Quantize frequency to closest D Lydian Pentatonic scale note
 */
export function quantizeToLydianScale(freq: number): number {
  let closest: number = CONSTANTS.AUDIO_SCALE[0];
  let minDiff = Math.abs(freq - closest);

  for (let i = 1; i < CONSTANTS.AUDIO_SCALE.length; i++) {
    const diff = Math.abs(freq - CONSTANTS.AUDIO_SCALE[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = CONSTANTS.AUDIO_SCALE[i];
    }
  }

  return closest;
}

/**
 * Map normalized Y coordinate [0, 1] to scale-quantized pitch
 * f = f_min * (f_max / f_min)^clamp(y_norm, 0, 1)
 */
export function pitchFromYNorm(yNorm: number): number {
  const clampedY = clamp(yNorm, 0, 1);
  const rawFreq = CONSTANTS.F_MIN * Math.pow(CONSTANTS.F_MAX / CONSTANTS.F_MIN, clampedY);
  return quantizeToLydianScale(rawFreq);
}

/**
 * Hermite cubic spline interpolation for continuous smoothing
 */
export function hermiteInterpolate(
  p0: number,
  p1: number,
  m0: number,
  m1: number,
  t: number
): number {
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return h00 * p0 + h10 * m0 + h01 * p1 + h11 * m1;
}
