import type { EstimateResult, WizardAnswers } from './types';

export type CalculatorLeadForIntake = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  customerType: string;
  timeframe: string;
  address: string;
  callPreference: string;
  notes: string;
};

export type LeadIntakePrefill = {
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  clientProfileKey: string;
  projectType: string;
  product: string;
  location: string;
  suburb: string;
  cat4: string;
  budgetBand: string;
  source: 'calculator';
  leadSource: string;
  timeline: string;
  externalRef: string;
  freeText: string;
  jobDescription: string;
};

const CLIENT_PROFILE_BY_CUSTOMER_TYPE: Record<string, string> = {
  homeowner: 'homeowner',
  builder: 'builder_developer_pool_builder_landscaper',
  developer: 'builder_developer_pool_builder_landscaper',
  architect: 'builder_developer_pool_builder_landscaper',
  pool_builder: 'builder_developer_pool_builder_landscaper',
};

const BUSINESS_CUSTOMER_TYPES = new Set(['builder', 'developer', 'architect', 'pool_builder']);

const PROJECT_TYPE_BY_SCENARIO: Record<string, string> = {
  ground_level: 'ground_level',
  balcony_balustrade: 'balcony_balustrade',
  stair_balustrade: 'stair_balustrade',
  premium_pool_fence: 'pool_fence',
};

const CUSTOMER_TYPE_LABEL: Record<string, string> = {
  homeowner: 'Homeowner',
  builder: 'Builder',
  developer: 'Developer',
  architect: 'Architect',
  pool_builder: 'Pool Builder',
  other: 'Other',
};

const SCENARIO_LABEL: Record<string, string> = {
  ground_level: 'Ground Level Fence',
  balcony_balustrade: 'Balcony / Patio Balustrade',
  stair_balustrade: 'Stair Balustrade',
  premium_pool_fence: 'Premium Pool Fence',
};

const FIXING_LABEL: Record<string, string> = {
  spigot_round: 'Spigot Round',
  standoff_posts: 'Stand-off Posts',
  viking: 'Viking System',
  jh_clamps: 'JH Clamps',
  side_channel: 'Side Channel',
  top_channel: 'Top Channel',
  aluminium_1: 'Aluminium 1',
  aluminium_2: 'Aluminium 2',
  sed: 'SED (Special Engineer Design)',
};

const SUBSTRATE_LABEL: Record<string, string> = {
  timber: 'Timber',
  concrete: 'Concrete',
  tile: 'Tile',
  steel: 'Steel',
  not_sure: 'To be confirmed',
};

const HARDWARE_FINISH_LABEL: Record<string, string> = {
  standard_chrome: 'Chrome',
  matte_black: 'Matt black',
  brushed_chrome: 'Brushed chrome',
  powder_coated: 'Powder coated',
  not_sure: 'To be confirmed',
};

const GLASS_TYPE_LABEL: Record<string, string> = {
  toughened_12mm: '12mm Toughened + Capping',
  laminated: 'Laminated (no capping)',
};

const GLASS_COLOUR_LABEL: Record<string, string> = {
  clear: 'Clear',
  low_iron: 'Low Iron / Ultra-Clear',
  tinted: 'Tinted',
  frosted: 'Frosted Glass',
};

export function mapCalculatorToLeadIntakePrefill(input: {
  answers: WizardAnswers;
  estimate: EstimateResult;
  lead: CalculatorLeadForIntake;
  submissionRef: string;
  submittedAt?: Date;
}): LeadIntakePrefill {
  const { answers, estimate, lead, submissionRef } = input;
  const submittedAt = input.submittedAt ?? new Date();
  const clientName = `${lead.firstName} ${lead.lastName}`.trim();
  const projectType = PROJECT_TYPE_BY_SCENARIO[answers.scenario ?? ''] ?? 'other';

  return {
    clientName,
    companyName: BUSINESS_CUSTOMER_TYPES.has(lead.customerType) ? clientName : '',
    phone: lead.phone,
    email: lead.email,
    clientProfileKey: CLIENT_PROFILE_BY_CUSTOMER_TYPE[lead.customerType] ?? '',
    projectType,
    product: projectType,
    location: lead.address,
    suburb: '',
    cat4: '',
    budgetBand: budgetBandFromEstimate(estimate.low, estimate.high),
    source: 'calculator',
    leadSource: 'website_google_walk_in_cold_lead',
    timeline: lead.timeframe,
    externalRef: submissionRef,
    freeText: lead.notes,
    jobDescription: buildJobDescription(answers, estimate, lead, submittedAt),
  };
}

export function budgetBandFromEstimate(low: number, high: number): string {
  if (!Number.isFinite(low) || !Number.isFinite(high)) return '';

  const midpoint = (Math.min(low, high) + Math.max(low, high)) / 2;
  if (midpoint <= 0) return '';
  if (midpoint >= 50_000) return '50k_plus';
  if (midpoint >= 20_000) return '20k_50k';
  if (midpoint >= 5_000) return '5k_20k';
  return 'lt_5k';
}

function buildJobDescription(
  answers: WizardAnswers,
  estimate: EstimateResult,
  lead: CalculatorLeadForIntake,
  submittedAt: Date
): string {
  const lines = [
    `[Calculator] submitted ${submittedAt.toISOString()}`,
    `Estimate: $${Math.round(estimate.low)} - $${Math.round(estimate.high)} (subtotal $${Math.round(estimate.subtotal)})`,
    `Project: ${label(answers.scenario, SCENARIO_LABEL)}, ${answers.length}m, ${answers.corners} corner(s), ${answers.gates} gate(s)`,
    `Fixing: ${label(answers.fixingMethod, FIXING_LABEL)} | Substrate: ${label(answers.substrate, SUBSTRATE_LABEL)} | Hardware: ${label(answers.hardwareFinish, HARDWARE_FINISH_LABEL)}`,
    `Glass: ${label(answers.glassType, GLASS_TYPE_LABEL)} / ${label(answers.glassColour, GLASS_COLOUR_LABEL)}`,
    `Customer type: ${CUSTOMER_TYPE_LABEL[lead.customerType] ?? (lead.customerType || 'not specified')} | Call preference: ${lead.callPreference}`,
    `Consultation needed: ${estimate.needsCallUs || estimate.consultationFlags.length > 0 ? 'yes' : 'no'}`,
    `Contact consent: yes`,
  ];

  if (answers.landingLength > 0) {
    lines.splice(3, 0, `Landing: ${answers.landingLength}m`);
  }

  if (estimate.consultationFlags.length > 0) {
    lines.push(`Site visit checks: ${estimate.consultationFlags.join('; ')}`);
  }

  if (lead.notes) {
    lines.push(`Notes: ${lead.notes}`);
  }

  return lines.join('\n');
}

function label(value: string | null, labels: Record<string, string>): string {
  if (!value) return 'not specified';
  return labels[value] ?? value.replaceAll('_', ' ');
}
