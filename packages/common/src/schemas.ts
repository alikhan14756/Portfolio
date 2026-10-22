import { z } from "zod";

export const MovementPacketSchema = z.object({
  seq: z.number().int(),
  x: z.number().finite().min(-10000).max(10000),
  y: z.number().finite().min(-10000).max(10000),
  vx: z.number().finite().min(-30).max(30),
  vy: z.number().finite().min(-30).max(30),
  isAttracting: z.boolean(),
  isShockwaveRequested: z.boolean()
});

export type MovementPacket = z.infer<typeof MovementPacketSchema>;

export const CodexOutputSchema = z.object({
  eraTitle: z.string().min(3).max(60),
  observation: z.string().min(20).max(400).refine(
    (val) => (val.match(/[.!?]/g) || []).length === 2,
    { message: "Observation must contain exactly two sentences." }
  )
});

export type CodexOutput = z.infer<typeof CodexOutputSchema>;

export const UserPreferencesSchema = z.object({
  reducedMotion: z.boolean().default(false),
  soundEnabled: z.boolean().default(true),
  volume: z.number().min(0).max(1).default(0.7)
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
