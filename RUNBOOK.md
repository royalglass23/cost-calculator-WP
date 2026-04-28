# Royal Glass Estimate Builder — Runbook

This document covers setup, deployment, day-to-day operations, and troubleshooting for the Royal Glass online estimate calculator.

---

## What is this?

A **7-step wizard** that guides homeowners, builders, and developers through specifying a frameless glass balustrade or pool fence project and returns an indicative price range (low / mid / high in NZD). Every submission is stored as a **lead** in Supabase so Royal Glass can follow up.

**Stack at a glance**

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19, SSR) |
| Build / bundler | Vite 7 |
| Hosting | Cloudflare Workers (edge) |
| Database | Supabase (PostgreSQL + RLS) |
| Styling | Tailwind CSS 4 + Shadcn/ui |
| Validation | Zod (client + server) |

---

## Prerequisites

- Node.js 20+
- `npm` (or compatible)
- [Supabase CLI](https://supabase.com/docs/guides/cli) — `npm i -g supabase`
- A Supabase project (free tier is fine)
- A Cloudflare account (for production deployment)

---

## First-time setup (new environment)

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create `.env` in the project root:

```env
# Public — used by Vite and client code
VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<your-anon-or-publishable-key>"

# Server-only — never expose to client
SUPABASE_URL="https://<your-project-ref>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<your-service-role-key>"
```

Find these values in your Supabase dashboard under **Project Settings → API**.

### 3. Link the Supabase CLI to your project

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
```

### 4. Push database migrations

This creates the three required tables (`pricing_versions`, `leads`, `lead_answers`) with RLS policies:

```bash
npx supabase db push
```

### 5. Seed the pricing version

The app cannot function without at least one active row in `pricing_versions`. Go to your Supabase dashboard → **SQL Editor** and run the SQL below, adjusting the dollar figures to match Royal Glass's actual pricing:

```sql
INSERT INTO public.pricing_versions (version, is_active, rules, notes)
VALUES (
  1,
  true,
  '{
    "currency": "NZD",
    "rangePercent": 0.15,
    "minLengthMetres": 5,
    "ratePerMetre": 450,
    "heightSurchargePerMetreOver1m": 50,
    "cornerSurcharge": 150,
    "gateUnitPrice": 800,
    "glassTypeSurchargePerMetre": {
      "toughened":    0,
      "laminated":    80,
      "sgp_laminated": 150
    },
    "glassClaritySurchargePerMetre": {
      "standard":  0,
      "low_iron":  60,
      "tinted":    40
    },
    "glassShapeSurchargePerMetre": {
      "straight": 0,
      "curved":   200
    },
    "glassThicknessSurchargePerMetre": {
      "10mm":    0,
      "12mm":    0,
      "13.52mm": 50,
      "15mm":    100
    },
    "fixingMethodSurchargePerMetre": {
      "spigots":  0,
      "standoff": 30,
      "channel":  120
    },
    "handrailSurchargePerMetre": {
      "none":      0,
      "stainless": 80,
      "timber":    100,
      "glass":     150
    },
    "hardwareFinishSurchargePerMetre": {
      "standard":    0,
      "brushed":     20,
      "matte_black": 25,
      "brass":       35,
      "custom":      50
    },
    "hardwareFinishMinimumSurcharge": 150,
    "substrateSurchargePerMetre": {
      "timber":   0,
      "concrete": 20,
      "tiles":    40,
      "steel":    30
    },
    "reviewTriggers": {
      "scaffold":             true,
      "highrise":             true,
      "cbd":                  true,
      "customHeight":         true,
      "sgp":                  true,
      "curved":               true,
      "manyGates":            3,
      "manyCorners":          5,
      "longCarryDistance":    50,
      "unknownSubstrate":     false,
      "deterioratedSubstrate": true,
      "notSureAnswers":       true
    },
    "assumptions": [
      "Standard residential site with reasonable vehicle access",
      "Existing substrate in good structural condition",
      "No specialist engineering or consent required",
      "Supply and installation of glass and hardware only",
      "Auckland region — travel surcharge may apply outside metro area"
    ],
    "customerDisclaimer": "This is an indicative starting estimate only. Final pricing is confirmed by Royal Glass after a site visit and is subject to site conditions, council requirements, and current material costs."
  }',
  'Initial pricing v1 — adjust figures to match actual rates'
);
```

> **Important:** All `not_sure` answers fall back to the baseline option (e.g. `toughened` glass, `spigots` fixing). The `rangePercent` of `0.15` means the shown range is ±15% around the midpoint.

### 6. Start the dev server

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

---

## Updating pricing

Pricing rules are fully database-driven. To change rates **without any code deployment**:

1. Open Supabase dashboard → **SQL Editor**
2. Deactivate the current version and insert a new one:

```sql
-- Deactivate current
UPDATE public.pricing_versions SET is_active = false WHERE is_active = true;

-- Insert updated version (increment the version number)
INSERT INTO public.pricing_versions (version, is_active, rules, notes)
VALUES (2, true, '{ ... your updated rules JSON ... }', 'Rate increase July 2026');
```

Only one row can have `is_active = true` (enforced by a partial unique index). Old leads retain a snapshot of the rules that were active when they submitted.

---

## Viewing leads

All submitted enquiries land in the `leads` table. Each row includes:

| Column | Description |
|---|---|
| `full_name`, `email`, `phone` | Contact details |
| `suburb` | Project address / suburb |
| `estimate_low/mid/high` | The NZD range shown to the customer |
| `needs_review` | `true` if the project hit a manual-review trigger |
| `review_reasons` | JSON array of reasons (e.g. "CBD location") |
| `status` | Defaults to `new` — update to `contacted`, `quoted`, etc. |
| `created_at` | Submission timestamp |

The `lead_answers` table stores the full wizard payload and the pricing snapshot for auditing.

To view all new leads in SQL:

```sql
SELECT full_name, email, phone, suburb, estimate_low, estimate_high, needs_review, created_at
FROM public.leads
WHERE status = 'new'
ORDER BY created_at DESC;
```

---

## Deployment (Cloudflare Workers)

### Build for production

```bash
npm run build
```

### Set production secrets

Cloudflare Workers does not read `.env` files in production. Set secrets via the Wrangler CLI:

```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

`VITE_` prefixed variables are baked into the client bundle at build time — they do not need to be set as Worker secrets.

### Deploy

```bash
npx wrangler deploy
```

---

## Manual review triggers

When a submission hits any of the following conditions, `needs_review = true` is stored on the lead and the customer is told Royal Glass will review their project:

| Trigger | Default threshold |
|---|---|
| Scaffold required | Always |
| High-rise / 3+ storey access | Always |
| CBD / restricted parking | Always |
| Custom balustrade height | Always |
| SGP laminated glass | Always (requires engineering sign-off) |
| Curved / custom-shape glass | Always |
| Many gates | ≥ 3 gates |
| Many corners | ≥ 5 corners |
| Long carry distance | ≥ 50 m from parking |
| Deteriorated substrate | Always |
| Too many "Not sure" answers | ≥ 3 unspecified fields |

All thresholds live in `reviewTriggers` inside the active `pricing_versions.rules` JSON — adjust them in the database without redeploying.

---

## Troubleshooting

### "Pricing is temporarily unavailable"

The server could not find an active pricing version. Check:

1. The `pricing_versions` table exists (`npx supabase db push` if not).
2. At least one row has `is_active = true`.
3. The `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables are set correctly.

### Submit button stays disabled on step 7

All of the following must be satisfied:
- Full name ≥ 2 characters
- Valid email address format
- Valid NZ phone number (mobile `02x`, landline `03/04/06/07/09`, or `0800/0900`)
- Address / suburb filled in (≥ 2 characters)
- Consent checkbox ticked

### Address autocomplete shows no results

The address field uses the free OpenStreetMap Nominatim API. Possible causes:
- The search term is fewer than 3 characters (minimum before a request fires).
- The Nominatim server is temporarily unavailable (rare).
- The address is too rural for OSM coverage — the user can type the suburb manually.

### Lead saved but `lead_answers` missing

The `lead_answers` insert is best-effort — the lead row is the authoritative record. If answers fail to save, the error is logged server-side but the customer still sees their estimate. Check Cloudflare Worker logs for `"Lead answers insert failed"`.

### Supabase RLS blocking inserts

The app uses the **service role key** server-side, which bypasses RLS entirely. If inserts are failing despite correct credentials, the table may not exist (run `npx supabase db push`) or the service role key may be wrong / expired.

---

## Key files reference

| File | Purpose |
|---|---|
| `src/routes/calculator.tsx` | 7-step wizard UI + lead form |
| `src/lib/calculator/pricing.ts` | Pure pricing engine (no side effects) |
| `src/lib/calculator/schema.ts` | Zod schemas for answers, lead, and submit payload |
| `src/lib/calculator/submit.functions.ts` | Server function: validate → price → write DB |
| `src/lib/calculator/wizardData.ts` | All wizard option labels, images, and enums |
| `src/integrations/supabase/client.server.ts` | Admin Supabase client (server-only) |
| `supabase/migrations/` | Database schema — applied with `supabase db push` |
| `.env` | Local environment variables (never commit) |
| `wrangler.jsonc` | Cloudflare Worker config |
