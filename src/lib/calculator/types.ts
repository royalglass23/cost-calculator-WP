export type Scenario =
  | 'deck_pool_fence'
  | 'balcony_balustrade'
  | 'premium_pool_fence'
  | 'stair_balustrade';

export type FixingMethod = 'spigots' | 'standoff_posts' | 'hidden_channel' | 'not_sure';

export type HardwareFinish =
  | 'standard_chrome'
  | 'matte_black'
  | 'brushed_chrome'
  | 'brass'
  | 'custom'
  | 'not_sure';

export type CustomerType = 'homeowner' | 'builder' | 'architect' | 'developer' | 'other';
export type Timeframe = 'asap' | '1_3_months' | '3_6_months' | '6_plus_months' | 'just_planning';

export interface WizardAnswers {
  scenario: Scenario | null;
  length: number;
  corners: number;
  gates: number;
  fixingMethod: FixingMethod | null;
  hardwareFinish: HardwareFinish | null;
  callTriggers: string[];
}

export interface LeadData {
  fullName: string;
  phone: string;
  email: string;
  customerType: CustomerType | null;
  timeframe: Timeframe | null;
  address: string;
  notes: string;
  consent: boolean;
  marketingConsent: boolean;
}

export interface ScenarioPricing {
  ratePerMetre: number;
  gatePrice: number | null;
}

export interface PricingConfig {
  scenarios: Record<Scenario, ScenarioPricing>;
  minimumLength: number;
  cornerSurcharge: number;
  hardwareFinishSurcharge: Record<HardwareFinish, number>;
  rangeLowPercent: number;
  rangeHighPercent: number;
}

export interface EstimateResult {
  effectiveLength: number;
  subtotal: number;
  low: number;
  high: number;
  needsCallUs: boolean;
  breakdown: {
    base: number;
    gates: number;
    corners: number;
    hardwareSurcharge: number;
  };
}

export interface LeadPayload {
  answers: WizardAnswers;
  lead: LeadData;
  estimate: EstimateResult;
  turnstileToken: string;
  loadedAt: number;
}

export interface LeadResponse {
  ok: boolean;
  leadId?: number;
  error?: string;
}
