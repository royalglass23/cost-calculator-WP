import type { WizardAnswers, PricingConfig, EstimateResult } from './types';
import { DEFAULT_PRICING } from './config';

// ─── Consultation triggers ────────────────────────────────────────────────────
// These selections flag the lead as needing a call before quoting

const CONSULTATION_CHECKS: Array<{
  condition: (a: WizardAnswers) => boolean;
  reason: string;
}> = [
  {
    condition: (a) => a.height === 'less_than_1m',
    reason: 'Height below 1m — NZ Building Code compliance check required',
  },
  {
    condition: (a) => a.height === 'not_sure',
    reason: 'Height not confirmed — estimated at standard 1m',
  },
  {
    condition: (a) => a.height === 'custom',
    reason: 'Custom height — final price may vary from this estimate',
  },
  {
    condition: (a) => a.fixingMethod === 'not_sure',
    reason: 'Fixing method to be confirmed on site',
  },
  {
    condition: (a) => a.hardwareFinish === 'not_sure',
    reason: 'Hardware finish to be confirmed — estimated at standard chrome',
  },
  {
    condition: (a) => a.hardwareFinish === 'custom',
    reason: 'Custom hardware finish — pricing may vary',
  },
];

// ─── Main formula ─────────────────────────────────────────────────────────────

export function calculateEstimate(
  answers: WizardAnswers,
  pricing: PricingConfig = DEFAULT_PRICING
): EstimateResult {
  const effectiveLength = Math.max(answers.length, pricing.minimumLength);

  // Base: length × rate per metre
  const base = effectiveLength * pricing.ratePerMetre;

  // Gates
  const gates = answers.gates * pricing.gatePrice;

  // Corners
  const corners = answers.corners * pricing.cornerSurcharge;

  // Hardware surcharge — only for non-standard, non-consultation finishes
  const surchargeFinishes = ['matte_black', 'brushed_chrome', 'brass'];
  const hardwareSurcharge = surchargeFinishes.includes(answers.hardwareFinish ?? '')
    ? Math.max(effectiveLength * pricing.hardwareSurchargePerMetre, pricing.hardwareMinimumSurcharge)
    : 0;

  const subtotal = base + gates + corners + hardwareSurcharge;

  // Round to nearest $50 for cleaner display
  const roundToNearest = (n: number, to = 50) => Math.round(n / to) * to;

  const low = roundToNearest(subtotal * (pricing.rangeLowPercent / 100));
  const high = roundToNearest(subtotal * (pricing.rangeHighPercent / 100));

  // Consultation check
  const consultationReasons = CONSULTATION_CHECKS
    .filter(({ condition }) => condition(answers))
    .map(({ reason }) => reason);

  return {
    effectiveLength,
    subtotal,
    low,
    high,
    needsConsultation: consultationReasons.length > 0,
    consultationReasons,
    breakdown: { base, gates, corners, hardwareSurcharge },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const formatNZD = (amount: number): string =>
  new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(amount);

export const STEP_NAMES: Record<number, string> = {
  1: 'Project',
  2: 'Length',
  3: 'Height',
  4: 'Corners',
  5: 'Gates',
  6: 'Fixing',
  7: 'Finish',
};

export const TOTAL_WIZARD_STEPS = 7;
