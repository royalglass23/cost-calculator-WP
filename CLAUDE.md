# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run format       # Prettier format
```

## Architecture

This is a **TanStack Start** (React meta-framework) full-stack app that provides a 7-step wizard for Auckland-based frameless glass balustrade company Royal Glass. It runs on **Cloudflare Workers** (edge) via `@cloudflare/vite-plugin`.

### Stack

- **Routing**: TanStack Router — file-based routes in `src/routes/`
- **UI**: React 19 + Tailwind CSS 4 + Shadcn/ui (New York style, Radix primitives)
- **Forms**: React Hook Form + Zod validation
- **Data**: Supabase (server-side via service role key; client-side via anon key)
- **Server functions**: `createServerFn` from TanStack Start — these run server-side at the edge

### Key modules

| Path | Purpose |
|------|---------|
| `src/routes/calculator.tsx` | Main 7-step wizard (all wizard state lives here) |
| `src/lib/calculator/pricing.ts` | **Pure** pricing calculation engine — no side effects |
| `src/lib/calculator/schema.ts` | Zod schemas for `Answers` (customer inputs) and `Lead` (contact) |
| `src/lib/calculator/wizardData.ts` | Wizard step options and configuration |
| `src/lib/calculator/submit.functions.ts` | Server function: re-validates, runs pricing, writes DB atomically |
| `src/integrations/supabase/client.server.ts` | Admin Supabase client (service role — server only) |
| `src/components/calculator/` | Reusable wizard UI: `StepShell`, `VisualChoice`, `SliderField` |
| `src/components/ui/` | Shadcn primitives (generated — prefer editing via Shadcn CLI) |

### Data flow

1. User fills steps in `calculator.tsx` → local `useState`
2. On submit, server function (`createServerFn`) receives raw answers + lead
3. Server re-validates with Zod (never trust client totals)
4. `calculatePricing()` runs against active pricing rules fetched from Supabase
5. Lead + answers + pricing snapshot written atomically to Supabase
6. Response: `{ low, mid, high, lineItems, needsManualReview, reviewReasons, assumptions }`

### Pricing rules are database-driven

Pricing multipliers, thresholds, manual-review triggers, and disclaimer text all come from Supabase — not hardcoded. When debugging pricing, check the `pricing_rules` table first.

### Security invariants

- **Server-side authority**: pricing is always computed server-side; client sends raw answers only.
- **Honeypot**: `website` field in lead form must be empty — bots that fill it are silently rejected.
- **No raw IPs stored**: duplicate detection uses a coarse hash.
- **Service role key** is server-only; never expose it to the client bundle.

### Styling conventions

- Use `cn()` (from `src/lib/utils.ts`) for conditional Tailwind classes.
- Tailwind CSS 4 with CSS custom properties for theming — theme tokens live in the global CSS, not in `tailwind.config`.
- `@/*` path alias resolves to `src/`.
