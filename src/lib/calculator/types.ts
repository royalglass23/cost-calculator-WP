export type ProjectType = 'balustrade' | 'pool_fence';

export type HeightOption =
  | 'standard_1m'
  | 'less_than_1m'
  | 'not_sure'
  | 'standard_1_2m'
  | 'custom';

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
  projectType: ProjectType | null;
  length: number;
  height: HeightOption | null;
  corners: number;
  gates: number;
  fixingMethod: FixingMethod | null;
  hardwareFinish: HardwareFinish | null;
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

// 1-7 = wizard, 9 = lead capture, 8 = results
export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface PricingConfig {
  ratePerMetre: number;
  minimumLength: number;
  gatePrice: number;
  cornerSurcharge: number;
  hardwareSurchargePerMetre: number;
  hardwareMinimumSurcharge: number;
  rangeLowPercent: number;
  rangeHighPercent: number;
}

export interface EstimateResult {
  effectiveLength: number;
  subtotal: number;
  low: number;
  high: number;
  needsConsultation: boolean;
  consultationReasons: string[];
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
