import { Vector2 } from "./math.js";

export type ClimateStatus = "LUMINESCENT" | "STABLE" | "TURBULENT" | "DORMANT";

export type QualityTier = 1 | 2 | 3;

export enum EntityFlags {
  IS_ATTRACTING = 1 << 0,          // 1
  IN_TETHER = 1 << 1,              // 2
  IN_CLOSED_FORMATION = 1 << 2,    // 4
  DEPLETED_ENERGY_MODE = 1 << 3   // 8
}

export interface OrganismState {
  id: string;
  position: Vector2;
  velocity: Vector2;
  energy: number;
  flags: number;
  hue: number;
  lastUpdated: number;
}

export interface FormationPolygon {
  id: string;
  centroid: Vector2;
  entityIds: string[];
  vertices: Vector2[];
  createdAt: number;
  expiresAt: number;
  area: number;
  harmonicChordIndex: number;
}

export interface FossilRecord {
  id: string;
  regionId: string;
  position: Vector2;
  geometryType: "TRIANGLE" | "QUAD" | "POLYGON_CYCLE";
  vertices: Vector2[];
  hue: number;
  intensity: number;
  triggerEvent: string;
  createdAt: number;
  expiresAt: number;
}

export interface MetricsDigest {
  averageSpeed: number;
  attractionCount: number;
  repulsionCount: number;
  tethersFormed: number;
  closedFormations: number;
}

export interface BiosphereState {
  climate: ClimateStatus;
  entropyScore: number;
  activeEntitiesCount: number;
  metrics: MetricsDigest;
}
