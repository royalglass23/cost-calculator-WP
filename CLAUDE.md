# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What this repo is

A **React/Vite SPA** delivered as a **WordPress plugin shortcode** (`[rg_calculator]`). Customers visit `royalglass.co.nz/estimate`, fill in a 7-step wizard describing their frameless glass balustrade project, receive a client-side price estimate, and submit their lead. The WordPress plugin saves the lead to a custom DB table (`wp_rg_leads`), emails Royal Glass staff, and returns a success response.

There is no Node.js server, no Cloudflare Workers, and no Supabase in the production path.

---

## Commands

```bash
npm run dev          # Vite dev server (hot reload, runs in browser at localhost:5173)
npm run build        # Production build → dist/rg-calculator.js + dist/rg-calculator.css
npm run build:dev    # Build with development mode (source maps, no minification)
npm run lint         # ESLint
npm run format       # Prettier
```

Full deploy sequence (build → copy assets → zip for WP upload):

```bash
npm run build
cp dist/rg-calculator.js  wordpress-plugin/rg-calculator/assets/
cp dist/rg-calculator.css wordpress-plugin/rg-calculator/assets/
cp dist/*.jpg             wordpress-plugin/rg-calculator/assets/
```

```powershell
Compress-Archive -Path wordpress-plugin\rg-calculator -DestinationPath wordpress-plugin\rg-calculator.zip -Force
```

The JS/CSS and all image assets must be copied — the JS bundle references images at
`/wp-content/plugins/rg-calculator/assets/*.jpg` (set by `base` in `vite.config.ts`).

There are no automated tests.

---

## Architecture

### React app (`src/`)

Entry: `src/main.tsx` mounts on `#rg-calculator-root` using `react-router-dom` `createHashRouter`. Hash routing is required — WordPress owns the URL; React must not interfere.

The `@` path alias resolves to `src/` (configured in `vite.config.ts`).

The entire wizard lives in a single route component: `src/routes/calculator.tsx` (`CalculatorPage`). It holds all wizard state (`answers`, `lead`, `step`) in local React state. No global state library is used. `ResultView` (the step-8 result screen) is defined inline at the bottom of the same file, not in a separate component file.

`src/routes/__root.tsx` and `src/routes/index.tsx` are TanStack Router artefacts kept for compatibility — they do not affect runtime because `main.tsx` bypasses the TanStack `routeTree` entirely and routes directly to `CalculatorPage`.

**Wizard flow:**

1. `CalculatorPage` renders either `<Wizard>` (steps 1–7) or `<ResultView>` (step 8, shown after successful submission).
2. `<Wizard>` is a big `if (step === N)` chain. Each branch renders `<StepShell>` wrapping either `<VisualChoice>`, `<SliderField>`, or plain inputs.
3. On step 7 (contact details + consent), `handleSubmit` is called:
   - Runs `calculatePricing(answers, defaultPricingRules)` client-side.
   - Posts a flat `LeadPayload` (snake_case fields) to the WP REST endpoint.
   - On success, stores the `PricingResult` in state and advances to the result screen.
4. `<ResultView>` displays the estimate range and breakdown from the locally-computed `PricingResult` — the server response is only used for `ok`/`leadId`/`message`.

### Pricing engine (`src/lib/calculator/`)

| File | Role |
|---|---|
| `calculator.config.ts` | **Only place prices live.** Edit `defaultPricingRules` here to change pricing. |
| `pricing.ts` | Pure function `calculatePricing(answers, rules) → PricingResult`. No side effects. Do not edit. |
| `schema.ts` | Zod schemas for `Answers`, `Lead`, `SubmitInput`. Source of truth for field shapes. |
| `wizardData.ts` | `VisualOption[]` arrays for every wizard step's choices, with labels and image imports. |
| `submit.ts` | `submitLead(payload)` — plain `fetch` to `window.rgCalculator.endpoint` (set by `wp_localize_script`). Falls back to `/wp-json/royal-glass/v1/leads`. |

**`not_sure` fallback:** For any option where the user selects `not_sure`, `pricing.ts` substitutes the cheapest baseline (e.g. toughened glass, spigots, standard finish, 12mm). This means `not_sure` answers never inflate the estimate but do trigger `needsReview` (if ≥3 are `not_sure`). The `PricingResult.needsReview` flag is set when any `reviewTriggers` condition fires — it changes the message shown in `ResultView` but does not block submission.

**To change prices:** Edit only `calculator.config.ts`. Run `npm run build` and redeploy.

**To add a new wizard option** (e.g. a new glass type):
1. Add the value to the relevant Zod enum in `schema.ts`.
2. Add pricing for it in `calculator.config.ts`.
3. Handle it in `pricing.ts` if the calculation logic changes.
4. Add the `VisualOption` entry (with image) in `wizardData.ts`.

### UI components (`src/components/`)

- `calculator/StepShell` — wraps every wizard step: progress bar, title, Back/Continue buttons.
- `calculator/VisualChoice` — image-card grid for selecting from a list of `VisualOption` values.
- `calculator/SliderField` — numeric slider with typed input.
- `ui/` — shadcn/ui components (Radix primitives + Tailwind). Do not modify these directly.

### Styles (`src/styles.css`)

Tailwind v4 with `@theme inline`. All semantic color tokens (primary, card, muted, etc.) are defined as `oklch` CSS custom properties in `:root` and `.dark`. To add a new semantic color, add it to both blocks and register it in `@theme inline`. The font family `font-display` is wired to a CSS variable.

### WordPress plugin (`wordpress-plugin/rg-calculator/`)

| File | Role |
|---|---|
| `rg-calculator.php` | Plugin bootstrap. Registers shortcode, enqueues assets, calls `wp_localize_script` to inject `window.rgCalculator`. |
| `includes/database.php` | Creates `wp_rg_leads` table on activation. CRUD helpers: `rg_calc_insert_lead`, `rg_calc_update_lead_status`, `rg_calc_get_leads`. |
| `includes/validation.php` | `rg_calc_validate_payload` (honeypot, required fields, numeric bounds, payload size). `rg_calc_sanitize_payload`. Rate limiting via WP transients (5/hour per IP). |
| `includes/email.php` | `rg_calc_send_support_email` — sends plain-text email to `admin_email` via `wp_mail()`. |
| `includes/api.php` | Registers `POST /wp-json/royal-glass/v1/leads` (public) and admin-only GET/status routes. Submit handler: validate → sanitize → insert → email → respond. |
| `includes/admin-page.php` | WordPress admin menu page ("RG Leads") showing the leads table. |

**Lead status flow:** `NEW` → `REVIEWED` → `ACCEPTED` or `REJECTED`. ServiceM8 integration is deliberately deferred to a later phase — do not add it to the public submit path.

---

## Non-negotiable constraints

**Unused deps still in `package.json`:** `@supabase/supabase-js` and `@tanstack/react-query` are installed but not imported anywhere in the production code path. Do not use them for new features.

Never reintroduce:
- `@tanstack/react-start`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`, or any Cloudflare Worker config
- Supabase in the V1 lead submission path
- n8n or any external webhook called during public form submission
- Automatic ServiceM8 job creation from a public form submission

Never expose to the browser bundle:
- ServiceM8 API keys, n8n webhook URLs, Supabase service-role keys, or any private automation credential

Server-side validation in `api.php` must never be skipped because frontend validation exists — both must run independently.

Database save must complete before the email is sent. If the DB insert fails, return a 500; do not send an email for a lead that wasn't saved.
