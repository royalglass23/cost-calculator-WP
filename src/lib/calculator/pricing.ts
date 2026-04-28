import type { Answers } from "./schema";

/**
 * Pricing rule shape — mirrors what's stored in `pricing_versions.rules` JSONB.
 * Centralised so server and admin both speak the same shape.
 */
export interface PricingRules {
  currency: string;
  rangePercent: number;
  minLengthMetres: number;
  ratePerMetre: number;
  heightSurchargePerMetreOver1m: number;
  cornerSurcharge: number;
  gateUnitPrice: number;
  glassTypeSurchargePerMetre: Record<string, number>;
  glassClaritySurchargePerMetre: Record<string, number>;
  glassShapeSurchargePerMetre: Record<string, number>;
  glassThicknessSurchargePerMetre: Record<string, number>;
  fixingMethodSurchargePerMetre: Record<string, number>;
  handrailSurchargePerMetre: Record<string, number>;
  hardwareFinishSurchargePerMetre: Record<string, number>;
  hardwareFinishMinimumSurcharge: number;
  substrateSurchargePerMetre: Record<string, number>;
  reviewTriggers: {
    scaffold?: boolean;
    highrise?: boolean;
    cbd?: boolean;
    customHeight?: boolean;
    sgp?: boolean;
    curved?: boolean;
    manyGates?: number;
    manyCorners?: number;
    longCarryDistance?: number;
    unknownSubstrate?: boolean;
    deterioratedSubstrate?: boolean;
    notSureAnswers?: boolean;
  };
  assumptions: string[];
  customerDisclaimer: string;
}

export interface PricingLine {
  label: string;
  amount: number;
  detail?: string;
}

export interface PricingResult {
  subtotal: number;
  estimateLow: number;
  estimateMid: number;
  estimateHigh: number;
  rangePercent: number;
  lines: PricingLine[];
  needsReview: boolean;
  reviewReasons: string[];
  assumptions: string[];
  disclaimer: string;
  effectiveLengthMetres: number;
}

function safe(map: Record<string, number>, key: string): number {
  return typeof map?.[key] === "number" ? map[key] : 0;
}

/** Round an estimate to a "human-feeling" $100 boundary so it never looks like a precise quote. */
function roundToHundred(n: number): number {
  return Math.round(n / 100) * 100;
}

/**
 * Pure pricing function. Same input → same output. Runs server-side only;
 * never trust browser-computed totals.
 */
export function calculatePricing(answers: Answers, rules: PricingRules): PricingResult {
  const reasons: string[] = [];
  const lines: PricingLine[] = [];

  // Effective length is at least the minimum (e.g. 5m floor).
  const effectiveLength = Math.max(answers.lengthMetres, rules.minLengthMetres);

  // Base length cost
  const lengthCost = effectiveLength * rules.ratePerMetre;
  lines.push({
    label: `Linear metres (${effectiveLength.toFixed(1)}m × $${rules.ratePerMetre}/m)`,
    amount: lengthCost,
    detail:
      answers.lengthMetres < rules.minLengthMetres
        ? `Minimum ${rules.minLengthMetres}m applies`
        : undefined,
  });

  // Height surcharge (over 1m on a deck/balcony, 1.2m for pool)
  const overHeight =
    answers.heightOption === "1.2m" ? 0.2 : answers.heightOption === "1.1m" ? 0.1 : 0;
  if (overHeight > 0 || answers.upperFloor) {
    const heightAdd = effectiveLength * rules.heightSurchargePerMetreOver1m;
    lines.push({
      label: "Upper-floor / extra height allowance",
      amount: heightAdd,
    });
  }

  // Corners
  if (answers.corners > 0) {
    lines.push({
      label: `Corners (${answers.corners} × $${rules.cornerSurcharge})`,
      amount: answers.corners * rules.cornerSurcharge,
    });
  }

  // Gates
  if (answers.gates > 0) {
    lines.push({
      label: `Gates (${answers.gates} × $${rules.gateUnitPrice})`,
      amount: answers.gates * rules.gateUnitPrice,
    });
  }

  // Glass type
  const glassTypeKey = answers.glassType === "not_sure" ? "toughened" : answers.glassType;
  const glassTypeRate = safe(rules.glassTypeSurchargePerMetre, glassTypeKey);
  if (glassTypeRate > 0) {
    lines.push({
      label: `${glassTypeKey === "sgp_laminated" ? "SGP laminated" : "Laminated"} glass upgrade`,
      amount: effectiveLength * glassTypeRate,
    });
  }

  // Glass clarity
  const clarityKey = answers.glassClarity === "not_sure" ? "standard" : answers.glassClarity;
  const clarityRate = safe(rules.glassClaritySurchargePerMetre, clarityKey);
  if (clarityRate > 0) {
    lines.push({
      label: clarityKey === "low_iron" ? "Ultra-clear (low-iron) glass" : "Tinted glass",
      amount: effectiveLength * clarityRate,
    });
  }

  // Glass shape
  const shapeKey = answers.glassShape === "not_sure" ? "straight" : answers.glassShape;
  const shapeRate = safe(rules.glassShapeSurchargePerMetre, shapeKey);
  if (shapeRate > 0) {
    lines.push({ label: "Curved / custom-shape glass", amount: effectiveLength * shapeRate });
  }

  // Glass thickness
  const thicknessKey = answers.glassThickness === "not_sure" ? "12mm" : answers.glassThickness;
  const thicknessRate = safe(rules.glassThicknessSurchargePerMetre, thicknessKey);
  if (thicknessRate > 0) {
    lines.push({
      label: `Heavier glass (${thicknessKey})`,
      amount: effectiveLength * thicknessRate,
    });
  }

  // Fixing method
  const fixingKey = answers.fixingMethod === "not_sure" ? "spigots" : answers.fixingMethod;
  const fixingRate = safe(rules.fixingMethodSurchargePerMetre, fixingKey);
  if (fixingRate > 0) {
    lines.push({
      label: fixingKey === "channel" ? "Hidden channel fixing" : "Stand-off post fixing",
      amount: effectiveLength * fixingRate,
    });
  }

  // Handrail (only meaningful for stairs / raised balustrade)
  const needsHandrail =
    answers.projectType === "stairs" || answers.projectType === "balustrade_balcony";
  if (needsHandrail && answers.handrail !== "none" && answers.handrail !== "not_sure") {
    const hrRate = safe(rules.handrailSurchargePerMetre, answers.handrail);
    if (hrRate > 0) {
      lines.push({
        label: `${answers.handrail.charAt(0).toUpperCase()}${answers.handrail.slice(1)} handrail`,
        amount: effectiveLength * hrRate,
      });
    }
  }

  // Hardware finish
  const finishKey = answers.hardwareFinish === "not_sure" ? "standard" : answers.hardwareFinish;
  const finishRate = safe(rules.hardwareFinishSurchargePerMetre, finishKey);
  if (finishRate > 0) {
    const raw = effectiveLength * finishRate;
    const finishAmount = Math.max(raw, rules.hardwareFinishMinimumSurcharge);
    lines.push({
      label: `Premium hardware finish (${finishKey.replace("_", " ")})`,
      amount: finishAmount,
      detail:
        raw < rules.hardwareFinishMinimumSurcharge
          ? `Minimum $${rules.hardwareFinishMinimumSurcharge} applies`
          : undefined,
    });
  }

  // Substrate
  const substrateKey = answers.substrate === "not_sure" ? "timber" : answers.substrate;
  const substrateRate = safe(rules.substrateSurchargePerMetre, substrateKey);
  if (substrateRate > 0) {
    lines.push({
      label: `${substrateKey.charAt(0).toUpperCase()}${substrateKey.slice(1)} substrate fixing`,
      amount: effectiveLength * substrateRate,
    });
  }

  // ---- Manual review triggers ----
  const trig = rules.reviewTriggers;
  if (trig.scaffold && answers.siteAccess === "scaffold") {
    reasons.push("Scaffold-required access — needs site visit");
  }
  if (trig.highrise && (answers.siteAccess === "highrise" || answers.workingHeight === "3plus_storeys")) {
    reasons.push("Working at height (3+ storeys)");
  }
  if (trig.cbd && answers.cbdLocation) {
    reasons.push("CBD / restricted-parking location");
  }
  if (trig.customHeight && (answers.heightOption === "custom" || answers.customHeightMm)) {
    reasons.push("Custom balustrade height");
  }
  if (trig.sgp && answers.glassType === "sgp_laminated") {
    reasons.push("SGP laminated glass — engineering review");
  }
  if (trig.curved && answers.glassShape === "curved") {
    reasons.push("Curved or custom-shape glass");
  }
  if (trig.manyGates && answers.gates >= trig.manyGates) {
    reasons.push(`${answers.gates} gates — multi-gate project`);
  }
  if (trig.manyCorners && answers.corners >= trig.manyCorners) {
    reasons.push(`${answers.corners} corners — complex layout`);
  }
  if (trig.longCarryDistance && answers.carryDistanceMetres >= trig.longCarryDistance) {
    reasons.push(`Long carry distance (${answers.carryDistanceMetres}m from parking)`);
  }
  if (trig.unknownSubstrate && answers.substrate === "not_sure") {
    reasons.push("Substrate type unknown — site check required");
  }
  if (trig.deterioratedSubstrate && answers.substrateCondition === "deteriorated") {
    reasons.push("Deteriorated substrate condition");
  }
  if (trig.notSureAnswers) {
    const notSureFields = (
      [
        "glassThickness",
        "glassType",
        "glassClarity",
        "glassShape",
        "fixingMethod",
        "handrail",
        "hardwareFinish",
        "siteAccess",
      ] as const
    ).filter((k) => (answers as Record<string, unknown>)[k] === "not_sure");
    if (notSureFields.length >= 3) {
      reasons.push(`${notSureFields.length} unspecified answers — Royal Glass to confirm details`);
    }
  }

  // Subtotal & range
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const range = rules.rangePercent;
  const low = roundToHundred(subtotal * (1 - range));
  const high = roundToHundred(subtotal * (1 + range));
  const mid = roundToHundred(subtotal);

  return {
    subtotal,
    estimateLow: low,
    estimateMid: mid,
    estimateHigh: high,
    rangePercent: range,
    lines,
    needsReview: reasons.length > 0,
    reviewReasons: reasons,
    assumptions: rules.assumptions ?? [],
    disclaimer: rules.customerDisclaimer ?? "",
    effectiveLengthMetres: effectiveLength,
  };
}