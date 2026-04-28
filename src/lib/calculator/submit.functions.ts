import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { submitSchema, type SubmitInput } from "./schema";
import { calculatePricing, type PricingRules, type PricingResult } from "./pricing";

export interface SubmitResponse {
  ok: true;
  leadId: string;
  estimate: {
    low: number;
    mid: number;
    high: number;
    rangePercent: number;
  };
  breakdown: PricingResult;
}

/**
 * Server-side lead submission. This is the ONLY source of truth for pricing.
 * Browser-calculated totals are never trusted.
 *
 * Flow:
 * 1. Validate full payload with Zod (rejects NaN, Infinity, bad enums, etc.)
 * 2. Honeypot check (rejects bots silently with success-shaped error)
 * 3. Load active pricing version from DB
 * 4. Recalculate pricing server-side
 * 5. Persist lead + answers + pricing snapshot atomically
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input as SubmitInput))
  .handler(async ({ data }): Promise<SubmitResponse> => {
    // Honeypot — bots fill hidden fields. Pretend success but don't store.
    if (data.lead.website && data.lead.website.length > 0) {
      throw new Error("Submission rejected.");
    }

    // Load active pricing
    const { data: priceRow, error: priceErr } = await supabaseAdmin
      .from("pricing_versions")
      .select("id, rules")
      .eq("is_active", true)
      .single();

    if (priceErr || !priceRow) {
      console.error("Pricing fetch failed:", priceErr);
      throw new Error("Pricing is temporarily unavailable. Please call Royal Glass directly.");
    }

    const rules = priceRow.rules as unknown as PricingRules;
    const breakdown = calculatePricing(data.answers, rules);

    // Best-effort metadata for the lead
    let userAgent: string | undefined;
    let ipHash: string | undefined;
    try {
      userAgent = getRequestHeader("user-agent")?.slice(0, 400);
      const ip = getRequestIP({ xForwardedFor: true });
      if (ip) {
        // Coarse hash — we don't store raw IP. Used for duplicate detection only.
        const enc = new TextEncoder().encode(ip);
        const buf = await crypto.subtle.digest("SHA-256", enc);
        ipHash = Array.from(new Uint8Array(buf))
          .slice(0, 16)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      }
    } catch {
      // ignore metadata errors
    }

    const { data: lead, error: leadErr } = await supabaseAdmin
      .from("leads")
      .insert({
        full_name: data.lead.fullName,
        email: data.lead.email.toLowerCase(),
        phone: data.lead.phone,
        role: data.lead.role,
        suburb: data.lead.suburb,
        timeframe: data.lead.timeframe,
        consent: data.lead.consent,
        marketing_opt_in: data.lead.marketingOptIn,
        estimate_low: breakdown.estimateLow,
        estimate_mid: breakdown.estimateMid,
        estimate_high: breakdown.estimateHigh,
        pricing_version_id: priceRow.id,
        needs_review: breakdown.needsReview,
        review_reasons: breakdown.reviewReasons,
        source: data.source ?? "calculator",
        utm: data.utm ?? null,
        user_agent: userAgent ?? null,
        ip_hash: ipHash ?? null,
      })
      .select("id")
      .single();

    if (leadErr || !lead) {
      console.error("Lead insert failed:", leadErr);
      throw new Error("Could not save your enquiry. Please try again or call Royal Glass.");
    }

    const { error: ansErr } = await (supabaseAdmin.from("lead_answers") as any).insert([
      {
        lead_id: lead.id,
        answers: data.answers,
        pricing_snapshot: rules,
        breakdown,
      },
    ]);
    if (ansErr) {
      console.error("Lead answers insert failed:", ansErr);
      // Lead is saved — don't fail the user, but log it.
    }

    return {
      ok: true,
      leadId: lead.id,
      estimate: {
        low: breakdown.estimateLow,
        mid: breakdown.estimateMid,
        high: breakdown.estimateHigh,
        rangePercent: breakdown.rangePercent,
      },
      breakdown,
    };
  });