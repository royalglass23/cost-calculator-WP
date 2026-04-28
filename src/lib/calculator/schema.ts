import { z } from "zod";

/**
 * Customer-supplied wizard answers. This shape is the contract between
 * the wizard UI and the server pricing engine. The server re-validates
 * everything before pricing — never trust client values.
 */
export const answersSchema = z.object({
  // Project type
  projectType: z.enum(["balustrade_deck", "balustrade_balcony", "stairs", "pool_fence"]),

  // Dimensions
  lengthMetres: z.number().min(1).max(200),
  heightOption: z.enum(["1.0m", "1.1m", "1.2m", "custom", "not_sure"]),
  customHeightMm: z.number().min(800).max(2000).optional(),
  upperFloor: z.boolean(),
  corners: z.number().int().min(0).max(20),
  gates: z.number().int().min(0).max(10),

  // Glass
  glassThickness: z.enum(["10mm", "12mm", "13.52mm", "15mm", "not_sure"]),
  glassType: z.enum(["toughened", "laminated", "sgp_laminated", "not_sure"]),
  glassClarity: z.enum(["standard", "low_iron", "tinted", "not_sure"]),
  glassShape: z.enum(["straight", "curved", "not_sure"]),

  // Fixing & hardware
  fixingMethod: z.enum(["spigots", "standoff", "channel", "not_sure"]),
  handrail: z.enum(["none", "stainless", "timber", "glass", "not_sure"]),
  hardwareFinish: z.enum(["standard", "matte_black", "brushed", "brass", "custom", "not_sure"]),

  // Site
  siteAccess: z.enum(["easy", "stairs", "highrise", "scaffold", "not_sure"]),
  carryDistanceMetres: z.number().min(0).max(200),
  workingHeight: z.enum(["ground", "1-2_storeys", "3plus_storeys"]),
  cbdLocation: z.boolean(),

  // Substrate
  substrate: z.enum(["timber", "concrete", "tiles", "steel", "not_sure"]),
  substrateCondition: z.enum(["new", "good", "uneven", "deteriorated", "not_sure"]),

  // Notes
  notes: z.string().max(2000).optional(),
});

export type Answers = z.infer<typeof answersSchema>;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(40),
  role: z.enum(["homeowner", "builder", "architect", "developer", "other"]),
  suburb: z.string().trim().min(2).max(120),
  timeframe: z.enum(["asap", "1-3_months", "3-6_months", "6plus_months", "planning"]),
  consent: z.literal(true),
  marketingOptIn: z.boolean().default(false),
  // Honeypot — must be empty
  website: z.string().max(0).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

export const submitSchema = z.object({
  lead: leadSchema,
  answers: answersSchema,
  source: z.string().max(80).optional(),
  utm: z.record(z.string().max(80), z.string().max(200)).optional(),
});

export type SubmitInput = z.infer<typeof submitSchema>;