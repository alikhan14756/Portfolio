import { CodexOutputSchema, CodexOutput, ClimateStatus } from "@aetheria/common";

export interface CodexEntry extends CodexOutput {
  id: string;
  timestamp: number;
  climateAtGeneration: ClimateStatus;
  generationMethod: "AI" | "FALLBACK";
  metricsSnapshot: {
    entropyScore: number;
    activeEntities: number;
  };
}

export const FALLBACK_LORE: Record<ClimateStatus, CodexOutput[]> = {
  DORMANT: [
    {
      eraTitle: "The Crystalline Stasis",
      observation: "The current subsided into crystalline silence. Cold structures rested beneath the inert ether."
    },
    {
      eraTitle: "Epoch of Hibernation",
      observation: "Sub-bass resonances lingered across motionless coordinates. No new vectors disturbed the pale vacuum."
    }
  ],
  STABLE: [
    {
      eraTitle: "Harmonic Equilibrium",
      observation: "Ethereal filaments aligned in serene mathematical cadence. Organisms maintained rhythmic proximity across the boundless plane."
    },
    {
      eraTitle: "The Lydian Drift",
      observation: "Bioluminescent pulses resonated through gentle spatial shears. Continuous equilibrium held the biosphere in suspended symmetry."
    }
  ],
  TURBULENT: [
    {
      eraTitle: "Fractured Resonance",
      observation: "Violent shockwaves shattered the planar stillness into chaotic vectors. Entropy surged as rapid kinetic impulses dispersed the collective."
    },
    {
      eraTitle: "The Violet Tempest",
      observation: "High-frequency shear destabilized the synaptic lattice. Wandering nodes scattered across erratic orbits under relentless repulsion."
    }
  ],
  LUMINESCENT: [
    {
      eraTitle: "The Golden Convergence",
      observation: "Resonant polygon shields radiated intense harmonic light across the sector. Interconnected nodes channeled infinite energy into the shimmering ether."
    },
    {
      eraTitle: "Ascendant Geometry",
      observation: "Closed topological formations stabilized the core lattice with golden chords. Ethereal relics crystallized beneath the luminous canopy."
    }
  ]
};

export class AiOverseer {
  private eventsSinceLastRun = 0;
  private lastCronTime = Date.now();
  private entries: CodexEntry[] = [];
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || null;
  }

  public recordEvent(count = 1) {
    this.eventsSinceLastRun += count;
  }

  public async evaluateChronicle(
    climate: ClimateStatus,
    entropyScore: number,
    activeEntities: number
  ): Promise<CodexEntry> {
    const delta = this.eventsSinceLastRun;
    this.eventsSinceLastRun = 0;
    this.lastCronTime = Date.now();

    // If no API key or events < 50, use verified deterministic fallback
    if (!this.apiKey || delta < 50) {
      return this.generateFallbackEntry(climate, entropyScore, activeEntities);
    }

    try {
      // Execute with 5000ms timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Attempt AI call if configured
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `ROLE: Global Overseer of Aetheria (digital ecosystem).
INPUT: Validated, aggregated environmental metrics digest.
RULES:
1. Return a pure JSON object matching the schema: {"eraTitle": string, "observation": string}.
2. Exactly two sentences. Poetic, detached, scientifically evocative tone.
3. Base observations purely on the metrics digest (velocity, tethers, shockwaves, entropy).
4. Do NOT reference real-world events, users, usernames, or technical stack details.
5. Do NOT include Markdown formatting or code fences.`
            },
            {
              role: "user",
              content: JSON.stringify({
                climate,
                entropyScore,
                activeEntities,
                deltaEvents: delta
              })
            }
          ]
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`LLM API returned status ${response.status}`);
      }

      const json = await response.json();
      const rawText = json.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(rawText);

      // Strict runtime Zod validation
      const validated = CodexOutputSchema.parse(parsed);

      const entry: CodexEntry = {
        id: `codex_${Date.now()}`,
        eraTitle: validated.eraTitle,
        observation: validated.observation,
        timestamp: Date.now(),
        climateAtGeneration: climate,
        generationMethod: "AI",
        metricsSnapshot: { entropyScore, activeEntities }
      };

      this.entries.push(entry);
      return entry;
    } catch (err) {
      // Deterministic fallback on timeout, rate limit, or schema validation failure
      return this.generateFallbackEntry(climate, entropyScore, activeEntities);
    }
  }

  public generateFallbackEntry(
    climate: ClimateStatus,
    entropyScore: number,
    activeEntities: number
  ): CodexEntry {
    const list = FALLBACK_LORE[climate] || FALLBACK_LORE.STABLE;
    const randomPick = list[Math.floor(Math.random() * list.length)];

    const entry: CodexEntry = {
      id: `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eraTitle: randomPick.eraTitle,
      observation: randomPick.observation,
      timestamp: Date.now(),
      climateAtGeneration: climate,
      generationMethod: "FALLBACK",
      metricsSnapshot: { entropyScore, activeEntities }
    };

    this.entries.push(entry);
    return entry;
  }

  public getHistory(): CodexEntry[] {
    return this.entries.slice(-20);
  }
}
