# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What this repo is

A **React/Vite SPA** delivered as a **WordPress plugin shortcode** (`[rg_calculator]`). Customers visit `royalglass.co.nz/estimate`, fill in a 7-step wizard describing their frameless glass balustrade or pool fence project, receive a client-side price estimate, and submit their lead. The WordPress plugin saves the lead to a custom DB table (`wp_rg_leads`), emails Royal Glass staff asynchronously, and returns a success response.

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
```

```powershell
Compress-Archive -Path wordpress-plugin\rg-calculator -DestinationPath wordpress-plugin\rg-calculator.zip -Force
```

> Do NOT run `cp dist/*.jpg` — images are not bundled by Vite. They live permanently in
> `wordpress-plugin/rg-calculator/assets/` and must not be overwritten on each deploy.

There are no automated tests.

---

## Architecture

### React app (`src/`)

Entry: `src/main.tsx` mounts directly on `#rg-calculator-root`. No router is used at runtime — `main.tsx` imports `App` directly and calls `ReactDOM.createRoot`. Hash/TanStack routing artefacts from the original template have been removed.

The `@` path alias resolves to `src/` (configured in `vite.config.ts`).

**Wizard flow (App.tsx):**

```
steps 1-7 (wizard questions)
  -> step 9 (LeadCapture form — contact details, address, notes, consent)
    -> step 8 (ResultScreen — estimate + send-to-email)
```

State lives entirely in `App.tsx` local React state. No global state library is used.

**Step numbering:**
| Step | Content |
|---|---|
| 1 | Project type (balustrade / pool fence) |
| 2 | Length (slider) |
| 3 | Height |
| 4 | Corners |
| 5 | Gates |
| 6 | Fixing method |
| 7 | Hardware finish |
| 9 | Lead capture (contact form) |
| 8 | Result screen |

### Pricing engine (`src/lib/calculator/`)

| File | Role |
|---|---|
| `config.ts` | **Only place prices live.** Edit `DEFAULT_PRICING` here to change pricing. Also exports `IMAGES` map and `getPluginBase()`. |
| `engine.ts` | Pure function `calculateEstimate(answers, pricing) -> EstimateResult`. No side effects. |
| `types.ts` | TypeScript interfaces for `WizardAnswers`, `LeadData`, `EstimateResult`, `PricingConfig`. |

**Estimate always shows a price.** The engine computes a low/high range for every input combination. `consultationReasons` is a list of strings flagging unknowns or special cases (shown as an amber bar below the price on screen and in the customer email). These never block the price — they are informational only.

**Current consultation triggers** (flags only — do not hide price):
- Height `less_than_1m` — NZ Building Code compliance check required
- Height `not_sure` — estimated at standard 1m
- Height `custom` — final price may vary
- Fixing method `not_sure` — to be confirmed on site
- Hardware finish `not_sure` — estimated at standard chrome
- Hardware finish `custom` — pricing may vary

**Hardware surcharge** applies only to `matte_black`, `brushed_chrome`, `brass` finishes.

**To change prices:** Edit only `config.ts`. Run `npm run build` and redeploy.

### Hooks (`src/hooks/`)

| File | Role |
|---|---|
| `usePricing.ts` | Fetches live pricing from `GET /wp-json/royal-glass/v1/pricing` on mount. Falls back to `DEFAULT_PRICING` if the fetch fails or on local dev. Also exports `getConfig()` which returns `window.rgCalculatorConfig`. |

### UI components (`src/components/wizard/`)

All components use **inline `style` props only** — no Tailwind classNames, no shadcn. This is intentional: WordPress themes output unlayered CSS which always overrides Tailwind's `@layer`-wrapped utilities. Inline styles are immune to the cascade.

| File | Role |
|---|---|
| `WizardShell.tsx` | Outer chrome: progress bar, back/continue nav, step counter |
| `steps/Steps.tsx` | All 7 wizard step components |
| `steps/shared.tsx` | `SelectionCard`, `SliderInput`, `StepNote`, `ComplianceWarning`, `StepHero` |
| `LeadCapture.tsx` | Contact form (name, email, phone, customer type, timeframe, address, notes, consent). Cloudflare Turnstile invisible CAPTCHA. |
| `NZAddressAutocomplete.tsx` | Google Maps Places autocomplete wired to NZ addresses |
| `ResultScreen.tsx` | Estimate display, breakdown, project summary, assumptions, next steps, send-to-email card |

### Styles (`src/index.css`)

Minimal CSS. Contains a scoped reset under `#rg-calculator-root` to neutralise WordPress theme defaults (margin, padding, list-style, box-sizing). All component styling is inline.

### Image assets

Images live at `wordpress-plugin/rg-calculator/assets/*.jpg` and are served from the WordPress plugin URL. The asset base URL is injected by WordPress as `window.rgCalculatorConfig.assetsUrl` via `wp_localize_script`. `config.ts` reads this first; the DOM script-tag query is a fallback only.

Never rely on `base` in `vite.config.ts` for image URLs — images are not imported as modules, so Vite does not process them.

### WordPress plugin (`wordpress-plugin/rg-calculator/`)

| File | Role |
|---|---|
| `rg-calculator.php` | Plugin bootstrap. Registers shortcode, enqueues assets, calls `wp_localize_script` to inject `window.rgCalculatorConfig` (`restUrl`, `nonce`, `googleMapsKey`, `turnstileSiteKey`, `assetsUrl`). |
| `includes/database.php` | Creates `wp_rg_leads` table on activation. CRUD helpers. |
| `includes/validation.php` | `rg_validate_lead`, `rg_validate_answers`, `rg_sanitize_*`. |
| `includes/api.php` | REST routes. Lead submit handler: time gate -> rate limit -> honeypot -> Turnstile -> validate -> save -> async email -> respond. Estimate email handler: rate limit -> validate -> async email -> respond. |
| `includes/email.php` | `rg_send_lead_email()` — plain-text admin notification. `rg_send_estimate_email_to_customer()` — rich HTML email to customer (price always shown, amber bar if concerns exist). |
| `includes/admin-pricing.php` | WordPress admin page for editing pricing values. |
| `includes/admin-leads.php` | WordPress admin page listing submitted leads. |

**Email sending is asynchronous.** Both the admin notification and the customer estimate email are dispatched via `add_action('shutdown', ...)` with `fastcgi_finish_request()`. The API responds to the browser immediately; emails send in the background after the response is flushed. This eliminates the 2-5 second `wp_mail()` delay the user would otherwise see.

**Customer email is on-demand only.** No auto-confirmation is sent on form submit. The customer receives an email only when they explicitly click "Get this estimate in your inbox" on the result screen. This ensures the email always contains real pricing data (not stubs) and lets them redirect it to a builder, partner, or architect.

**Turnstile enforcement** activates only when BOTH `RG_TURNSTILE_SITE_KEY` (frontend) AND `RG_TURNSTILE_SECRET` (backend) are defined in `wp-config.php`. A partial setup is treated as disabled.

**Rate limits:**
- Lead submissions: 10 per IP per hour (admin users bypass)
- Estimate emails: 5 per IP per hour (admin users bypass)

**Lead status flow:** `NEW` -> `REVIEWED` -> `ACCEPTED` or `REJECTED`.

---

## `wp-config.php` constants

```php
define('RG_GOOGLE_MAPS_KEY',   'AIza...');
define('RG_TURNSTILE_SITE_KEY','0x...');
define('RG_TURNSTILE_SECRET',  '0x...');
define('RG_LEAD_NOTIFY_EMAIL', 'roxy@royalglass.co.nz');
```

---

## Non-negotiable constraints

**Never reintroduce:**
- `@tanstack/react-start`, `@cloudflare/vite-plugin`, or any Cloudflare Worker config
- Supabase in the lead submission path
- n8n or any external webhook called during public form submission
- Automatic ServiceM8 job creation from a public form submission
- Tailwind `className` props in wizard components (use inline `style` instead)
- An auto-confirmation email sent immediately on lead submit

**Never expose to the browser bundle:**
- ServiceM8 API keys, n8n webhook URLs, Supabase service-role keys, or any private credential

**Server-side validation in `api.php` must never be skipped** because frontend validation exists — both run independently.

**Database save must complete before email is scheduled.** If the DB insert fails, return a 500 and do not schedule the email.

**Images are not bundled by Vite.** Do not import `.jpg` files as ES modules in wizard components. Reference them via the `IMAGES` map in `config.ts`, which resolves from `window.rgCalculatorConfig.assetsUrl`.
