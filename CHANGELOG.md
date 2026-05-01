# Changelog — RG Cost Calculator

All notable changes, fixes, and decisions for this project from origin to current.

---

## v2.1.0 — 2026-05-01 (current)

### Features added
- **Send-to-email on result screen** — "Get this estimate in your inbox" card on the result screen. Pre-fills with the submitted email address. User can change it to send to a builder, partner, or architect. Calls `POST /wp-json/royal-glass/v1/estimate-email`.
- **Optional notes field** — free-text "Anything else we should know?" textarea added to the lead capture form. Stored in `wp_rg_leads.notes` and included in the admin notification email.
- **Consultation concerns panel (amber bar)** — replaces the old "Pricing on enquiry" block. The price range always shows. If any wizard answers trigger a flag (unknown height, fixing method TBC, etc.), an amber panel attaches below the price band listing them as "things we'll confirm at the site visit." Matches between the on-screen UI and the customer email exactly.
- **Async email sending** — both the admin notification and the customer email now dispatch via `add_action('shutdown', ...)` + `fastcgi_finish_request()`. The API returns `201` to the browser immediately; email sends in the background. Eliminated the 2–5 second submit delay caused by synchronous `wp_mail()`.
- **`assetsUrl` injected by WordPress** — `wp_localize_script` now includes `assetsUrl: RG_CALC_URL . 'assets/'`. `config.ts` uses this as the primary image base URL, falling back to DOM script-tag detection only if it's missing. Fixes images not loading on mobile/incognito when a caching plugin renames or combines scripts.

### Behaviour changes
- **Price always shows** — removed `needsConsultation` as a price-blocking mechanism. The engine still populates `consultationReasons` for flagging, but the result screen always renders the low–high range.
- **Customer email is on-demand only** — the auto-confirmation email that previously fired on form submit has been removed. It was sending $0/$0 stubs. The customer now only receives an email when they explicitly request it via the result screen button, ensuring real pricing data is always in the email.
- **Admin email** — removed "Best time: anytime" line (field was hardcoded, never collected from user). Consultation block now reads "To confirm at site visit:" with `·` bullets instead of "⚠ NEEDS CONSULTATION".
- **Rate limit raised** — lead submissions increased from 5 to 10 per IP per hour. Admin users bypass rate limiting entirely (prevents testing friction for site owners).

### Bug fixes
- **"Too many submissions" error during testing** — rate limit of 5/hour was too low and had no admin bypass. Fixed.
- **"Security check failed" error** — Turnstile backend check previously required only `RG_TURNSTILE_SECRET`, not the site key. A site that had the secret but not the site key would pass the frontend silently and fail the backend. Fixed to require both constants before enforcement activates.
- **Turnstile timing race** — the Turnstile `useEffect` ran once on mount and silently failed if `window.turnstile` hadn't loaded yet (async script). Fixed with a 200ms polling loop.
- **Images not showing on mobile / incognito** — the image URL was resolved by querying `document.querySelector('script[src*="rg-calculator.js"]')`. Caching plugins (WP Rocket, Autoptimize, LiteSpeed, etc.) rename or combine scripts, making this query return `null` and falling back to a hardcoded path. Desktop users were unaffected because their browser had images cached. Fixed by injecting the canonical URL via `wp_localize_script`.
- **Price not showing with `not_sure` / `custom` answers** — `fixingMethod === 'not_sure'`, `hardwareFinish === 'not_sure'`, and `hardwareFinish === 'custom'` were all consultation triggers that hid the price. None of these affect the price calculation (no surcharge applies). Removed them as price-blocking triggers; they now appear as informational flags only.

### Codebase cleanup
Removed ~60 unused files left over from the original TanStack/shadcn template:
- `src/routes/calculator.tsx` — old TanStack route, never imported by `main.tsx`
- `src/components/calculator/` — old StepShell, VisualChoice, SliderField
- `src/components/ui/` — all 40 shadcn/Radix components (unused; wizard uses inline styles)
- `src/lib/utils.ts` — only used by the removed shadcn components
- `src/lib/calculator/pricing.ts`, `schema.ts`, `submit.ts`, `wizardData.ts`, `calculator.config.ts` — old engine files superseded by `engine.ts`, `types.ts`, `config.ts`
- `src/styles.css` — not imported anywhere
- `components.json` — shadcn CLI config, obsolete without the ui/ folder
- `supabase/` — entire directory (Supabase removed from production path)
- Old build artefacts: `rg-calculator-check/`, `rg-calculator-fixed.zip`, `wordpress-.zip`

---

## v2.0.1 — 2026-04-30

### WordPress premium styling fix
**Problem:** The calculator looked polished on local dev but degraded on WordPress — wrong fonts, colours overridden, layout broken.

**Root cause:** Tailwind v4 wraps all utility classes in `@layer` blocks. WordPress themes output unlayered CSS. Per the CSS cascade spec, unlayered styles always win over layered ones regardless of specificity. The theme was silently overriding every Tailwind class.

**Fix:** Converted all `className` usage in wizard step components (`steps/Steps.tsx`, `steps/shared.tsx`) to inline `style` props. Inline styles are the highest-priority CSS declarations and cannot be overridden by external stylesheets. Added a scoped CSS reset in `src/index.css` under `#rg-calculator-root` with ID-level specificity to neutralise theme defaults (margin, padding, box-sizing, list-style).

### WordPress plugin created (v2.0.0 baseline)
- `wp_rg_leads` custom DB table via `dbDelta`
- REST API: `POST /leads`, `GET /pricing`
- Admin notification via `wp_mail()`
- Bot protection: time gate, honeypot, Cloudflare Turnstile, IP rate limiting
- Pricing editable from WordPress admin (`admin-pricing.php`)
- Lead management table in WordPress admin (`admin-leads.php`)
- SEO: `application/ld+json` schema markup (LocalBusiness, Service, FAQPage) injected in `<head>`

---

## v1.x — Pre-WordPress (Cloudflare Workers + Supabase)

The original build used:
- **Cloudflare Workers** as the API layer
- **Supabase** for lead storage
- **TanStack Router** with hash routing
- **shadcn/ui** (Radix primitives + Tailwind) for all UI components
- **n8n** considered for post-submit automation

### Why it was replaced

| Decision | Reason |
|---|---|
| Removed Cloudflare Workers | Royal Glass runs on shared WordPress hosting. Workers added deployment complexity with no benefit over WP REST API. |
| Removed Supabase | External database dependency for a single table. `wp_rg_leads` is simpler, keeps all data in one place, and is managed with familiar WP admin tooling. |
| Removed TanStack Router | The router was not used at runtime — `main.tsx` bypassed it. The route tree added dead code. Removed entirely. |
| Removed shadcn/ui | All 40 components were unused after the inline-style rewrite. Removing them reduced the CSS bundle from ~54 KB to ~17 KB. |
| Kept `@supabase/supabase-js`, `@tanstack/react-query` in package.json | Listed in `package.json` but never imported. Left to avoid breaking changes if referenced elsewhere. Do not use for new features. |

---

## Known constraints and decisions

**Why inline styles instead of Tailwind in wizard components?**
WordPress themes are unlayered CSS. Tailwind v4 uses `@layer`. Unlayered always beats layered per the cascade spec. Inline styles cannot be overridden by any stylesheet. This is a permanent architectural decision for this project.

**Why is customer email on-demand?**
The auto-confirmation email that fired on submit used stub data (low/high = 0) because the actual estimate is computed client-side and was not passed through `rg_send_lead_email()`. On-demand send via the result screen button passes the real estimate data directly to the email function.

**Why async email with shutdown hook?**
`wp_mail()` blocks the HTTP connection for 2–5 seconds while the SMTP server accepts the message. By dispatching email in the `shutdown` action after `fastcgi_finish_request()`, the browser sees the response immediately. On PHP-FPM hosts (WP Engine, Kinsta, SiteGround) this is a true background send. On older mod_php hosts the email still sends synchronously at shutdown, but the REST response has already been sent to the client so the user sees no delay.

**Why only height triggers full consultation?**
Height is the only field with a genuine NZ Building Code implication (`less_than_1m` requires a compliance check; custom height needs design input). Fixing method and hardware finish unknowns can be baselined cheaply (spigots, standard chrome) and confirmed at site visit — hiding the price for these added no value.

**Why is `assetsUrl` injected by PHP instead of detected in JS?**
`RG_CALC_URL` is WordPress's canonical URL for the plugin directory. It handles subdirectory installs, CDN rewrites, and SSL correctly. DOM-based detection (`querySelector('script[src*="rg-calculator.js"]')`) fails silently when caching plugins rename scripts — causing blank images on fresh loads.
