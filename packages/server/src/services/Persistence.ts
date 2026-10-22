import { FossilRecord, BiosphereState, ClimateStatus } from "@aetheria/common";
import { CodexEntry } from "./AiOverseer.js";

export class PersistenceService {
  private fossils: Map<string, FossilRecord> = new Map();
  private snapshots: BiosphereState[] = [];
  private codexEntries: CodexEntry[] = [];

  constructor() {
    this.seedInitialFossils();
  }

  private seedInitialFossils() {
    // Ancient relic fossils pre-crystallized in the world plane
    const initialFossils: FossilRecord[] = [
      {
        id: "fossil_ancient_alpha",
        regionId: "0:0",
        position: { x: -25.0, y: 15.0 },
        geometryType: "TRIANGLE",
        vertices: [
          { x: -30.0, y: 10.0 },
          { x: -20.0, y: 10.0 },
          { x: -25.0, y: 22.0 }
        ],
        hue: 195,
        intensity: 0.9,
        triggerEvent: "ANCIENT_SYNAPSE",
        createdAt: Date.now() - 3600000,
        expiresAt: Date.now() + 86400000 * 7
      },
      {
        id: "fossil_ancient_beta",
        regionId: "1:-1",
        position: { x: 45.0, y: -30.0 },
        geometryType: "POLYGON_CYCLE",
        vertices: [
          { x: 40.0, y: -35.0 },
          { x: 50.0, y: -35.0 },
          { x: 55.0, y: -25.0 },
          { x: 35.0, y: -25.0 }
        ],
        hue: 160,
        intensity: 0.85,
        triggerEvent: "TOPOLOGICAL_RESONANCE",
        createdAt: Date.now() - 7200000,
        expiresAt: Date.now() + 86400000 * 7
      }
    ];

    for (const f of initialFossils) {
      this.fossils.set(f.id, f);
    }
  }

  public saveFossil(fossil: FossilRecord): void {
    this.fossils.set(fossil.id, fossil);
  }

  public getFossilsInRegion(regionId: string): FossilRecord[] {
    const now = Date.now();
    return Array.from(this.fossils.values()).filter(
      (f) => f.regionId === regionId && f.expiresAt > now
    );
  }

  public getAllActiveFossils(): FossilRecord[] {
    const now = Date.now();
    return Array.from(this.fossils.values()).filter((f) => f.expiresAt > now);
  }

  public saveSnapshot(snapshot: BiosphereState): void {
    this.snapshots.push(snapshot);
    if (this.snapshots.length > 500) this.snapshots.shift();
  }

  public saveCodex(entry: CodexEntry): void {
    this.codexEntries.push(entry);
    if (this.codexEntries.length > 100) this.codexEntries.shift();
  }

  public getCodexHistory(): CodexEntry[] {
    return this.codexEntries;
  }
}

export const persistenceService = new PersistenceService();
