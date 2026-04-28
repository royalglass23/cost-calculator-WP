import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { StepShell } from "@/components/calculator/StepShell";
import { VisualChoice } from "@/components/calculator/VisualChoice";
import { SliderField } from "@/components/calculator/SliderField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, ShieldCheck, Phone, Mail, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitLead, type SubmitResponse } from "@/lib/calculator/submit.functions";
import {
  projectTypeOptions,
  heightOptions,
  glassThicknessOptions,
  glassTypeOptions,
  glassClarityOptions,
  glassShapeOptions,
  fixingOptions,
  handrailOptions,
  finishOptions,
  accessOptions,
  workingHeightOptions,
  substrateOptions,
  substrateConditionOptions,
  roleOptions,
  timeframeOptions,
} from "@/lib/calculator/wizardData";
import type { Answers, Lead } from "@/lib/calculator/schema";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Calculator — Royal Glass Balustrade Estimate" },
      { name: "description", content: "Get an indicative estimate for your frameless glass balustrade or pool fence." },
    ],
  }),
  component: CalculatorPage,
});

const TOTAL_STEPS = 7;

const defaultAnswers: Answers = {
  projectType: "balustrade_deck",
  lengthMetres: 10,
  heightOption: "1.0m",
  upperFloor: false,
  corners: 1,
  gates: 0,
  glassThickness: "12mm",
  glassType: "toughened",
  glassClarity: "standard",
  glassShape: "straight",
  fixingMethod: "spigots",
  handrail: "none",
  hardwareFinish: "standard",
  siteAccess: "easy",
  carryDistanceMetres: 5,
  workingHeight: "ground",
  cbdLocation: false,
  substrate: "timber",
  substrateCondition: "good",
  notes: "",
};

const defaultLead: Lead = {
  fullName: "",
  email: "",
  phone: "",
  role: "homeowner",
  suburb: "",
  timeframe: "1-3_months",
  consent: true,
  marketingOptIn: false,
  website: "",
};

function fmt(n: number) {
  return new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD", maximumFractionDigits: 0 }).format(n);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// Accepts NZ mobile (02x), landlines (03/04/06/07/09), 0800/0900, and +64 variants.
// Strips spaces, hyphens, dots and parentheses before checking.
function isValidNZPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, "");
  return /^(\+64|0)(2\d{7,9}|[3-9]\d{7}|800\d{6,7}|900\d{6,7})$/.test(digits);
}

// Address autocomplete backed by Nominatim (OpenStreetMap), filtered to NZ.
function NZAddressInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    onChange(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (v.length < 3) { setSuggestions([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(v)}&countrycodes=nz&format=json&limit=6&addressdetails=0`,
          { headers: { "Accept-Language": "en-NZ,en" } },
        );
        const data: Array<{ display_name: string }> = await res.json();
        const names = data.map((r) => r.display_name);
        setSuggestions(names);
        setOpen(names.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setFetching(false);
      }
    }, 350);
  }

  function select(name: string) {
    const clean = name.replace(/,\s*New Zealand$/, "");
    setQuery(clean);
    onChange(clean);
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Start typing an address or suburb…"
        maxLength={120}
        autoComplete="off"
      />
      {fetching && (
        <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-md">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="cursor-pointer truncate px-3 py-2 text-sm hover:bg-accent"
              title={s}
              onMouseDown={() => select(s)}
            >
              {s.replace(/,\s*New Zealand$/, "")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [lead, setLead] = useState<Lead>(defaultLead);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const showHandrail = answers.projectType === "stairs" || answers.projectType === "balustrade_balcony";

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const updateLead = <K extends keyof Lead>(key: K, value: Lead[K]) =>
    setLead((l) => ({ ...l, [key]: value }));

  const leadValid = useMemo(
    () =>
      lead.fullName.trim().length >= 2 &&
      isValidEmail(lead.email) &&
      isValidNZPhone(lead.phone) &&
      lead.suburb.trim().length >= 2 &&
      lead.consent === true,
    [lead],
  );

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await submitLead({
        data: {
          lead,
          answers,
          source: "web_calculator",
        },
      });
      setResult(res);
      setStep(TOTAL_STEPS + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40">
      <SiteHeader />
      <Toaster richColors position="top-center" />
      <main className="mx-auto max-w-4xl px-4 py-10">
        {result && step > TOTAL_STEPS ? (
          <ResultView result={result} onRestart={() => { setResult(null); setStep(1); }} />
        ) : (
          <Wizard
            step={step}
            answers={answers}
            lead={lead}
            update={update}
            updateLead={updateLead}
            setStep={setStep}
            showHandrail={showHandrail}
            leadValid={leadValid}
            loading={loading}
            onSubmit={handleSubmit}
            emailTouched={emailTouched}
            phoneTouched={phoneTouched}
            setEmailTouched={setEmailTouched}
            setPhoneTouched={setPhoneTouched}
          />
        )}
      </main>
    </div>
  );
}

interface WizardProps {
  step: number;
  answers: Answers;
  lead: Lead;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  updateLead: <K extends keyof Lead>(k: K, v: Lead[K]) => void;
  setStep: (n: number) => void;
  showHandrail: boolean;
  leadValid: boolean;
  loading: boolean;
  onSubmit: () => void;
  emailTouched: boolean;
  phoneTouched: boolean;
  setEmailTouched: (v: boolean) => void;
  setPhoneTouched: (v: boolean) => void;
}

function Wizard({ step, answers, lead, update, updateLead, setStep, showHandrail, leadValid, loading, onSubmit, emailTouched, phoneTouched, setEmailTouched, setPhoneTouched }: WizardProps) {
  const back = step > 1 ? () => setStep(step - 1) : undefined;
  const next = () => setStep(step + 1);

  if (step === 1) {
    return (
      <StepShell step={1} total={TOTAL_STEPS} title="What kind of project is this?" subtitle="Pick the closest match — we'll fine-tune the details next." onBack={back} onNext={next}>
        <VisualChoice options={projectTypeOptions} value={answers.projectType} onChange={(v) => update("projectType", v)} columns={2} />
      </StepShell>
    );
  }

  if (step === 2) {
    return (
      <StepShell step={2} total={TOTAL_STEPS} title="Dimensions" subtitle="Approximate is fine — we measure on site." onBack={back} onNext={next}>
        <div className="space-y-8">
          <div>
            <Label className="mb-3 block">Total length</Label>
            <SliderField value={answers.lengthMetres} onChange={(n) => update("lengthMetres", n)} min={1} max={100} unit="m" />
            <p className="mt-2 text-xs text-muted-foreground">Minimum charge applies under 5m.</p>
          </div>
          <div>
            <Label className="mb-3 block">Required height</Label>
            <VisualChoice options={heightOptions} value={answers.heightOption} onChange={(v) => update("heightOption", v)} columns={3} />
            <div className="mt-4 flex items-center gap-3 rounded-md border bg-muted/40 p-3">
              <Switch id="upper" checked={answers.upperFloor} onCheckedChange={(c) => update("upperFloor", c)} />
              <Label htmlFor="upper" className="text-sm">Upper-floor balcony / drop more than 1m</Label>
            </div>
          </div>
          <div>
            <Label className="mb-3 block">Number of corners</Label>
            <SliderField value={answers.corners} onChange={(n) => update("corners", n)} min={0} max={10} />
          </div>
          <div>
            <Label className="mb-3 block">Number of gates</Label>
            <SliderField value={answers.gates} onChange={(n) => update("gates", n)} min={0} max={6} />
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 3) {
    return (
      <StepShell step={3} total={TOTAL_STEPS} title="Glass" subtitle="Most projects use 12mm toughened standard clear — choose 'Not sure' if you'd like us to recommend." onBack={back} onNext={next}>
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block">Thickness</Label>
            <VisualChoice options={glassThicknessOptions} value={answers.glassThickness} onChange={(v) => update("glassThickness", v)} columns={3} />
          </div>
          <div>
            <Label className="mb-3 block">Glass type</Label>
            <VisualChoice options={glassTypeOptions} value={answers.glassType} onChange={(v) => update("glassType", v)} columns={2} />
          </div>
          <div>
            <Label className="mb-3 block">Clarity</Label>
            <VisualChoice options={glassClarityOptions} value={answers.glassClarity} onChange={(v) => update("glassClarity", v)} columns={2} />
          </div>
          <div>
            <Label className="mb-3 block">Shape</Label>
            <VisualChoice options={glassShapeOptions} value={answers.glassShape} onChange={(v) => update("glassShape", v)} columns={3} />
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 4) {
    return (
      <StepShell step={4} total={TOTAL_STEPS} title="Fixing & hardware" onBack={back} onNext={next}>
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block">Fixing method</Label>
            <VisualChoice options={fixingOptions} value={answers.fixingMethod} onChange={(v) => update("fixingMethod", v)} columns={2} />
          </div>
          {showHandrail && (
            <div>
              <Label className="mb-3 block">Handrail</Label>
              <VisualChoice options={handrailOptions} value={answers.handrail} onChange={(v) => update("handrail", v)} columns={3} />
            </div>
          )}
          <div>
            <Label className="mb-3 block">Hardware finish</Label>
            <VisualChoice options={finishOptions} value={answers.hardwareFinish} onChange={(v) => update("hardwareFinish", v)} columns={3} />
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 5) {
    return (
      <StepShell step={5} total={TOTAL_STEPS} title="Site & access" subtitle="Tricky access usually triggers a manual review — that's normal." onBack={back} onNext={next}>
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block">Site access</Label>
            <VisualChoice options={accessOptions} value={answers.siteAccess} onChange={(v) => update("siteAccess", v)} columns={2} />
          </div>
          <div>
            <Label className="mb-3 block">Carry distance from parking</Label>
            <SliderField value={answers.carryDistanceMetres} onChange={(n) => update("carryDistanceMetres", n)} min={0} max={100} unit="m" />
          </div>
          <div>
            <Label className="mb-3 block">Working height</Label>
            <VisualChoice options={workingHeightOptions} value={answers.workingHeight} onChange={(v) => update("workingHeight", v)} columns={3} />
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
            <Switch id="cbd" checked={answers.cbdLocation} onCheckedChange={(c) => update("cbdLocation", c)} />
            <Label htmlFor="cbd" className="text-sm">CBD or restricted-parking location</Label>
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 6) {
    return (
      <StepShell step={6} total={TOTAL_STEPS} title="Substrate" subtitle="What will we be fixing into?" onBack={back} onNext={next}>
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block">Substrate type</Label>
            <VisualChoice options={substrateOptions} value={answers.substrate} onChange={(v) => update("substrate", v)} columns={3} />
          </div>
          <div>
            <Label className="mb-3 block">Condition</Label>
            <VisualChoice options={substrateConditionOptions} value={answers.substrateCondition} onChange={(v) => update("substrateCondition", v)} columns={3} />
          </div>
          <div>
            <Label htmlFor="notes" className="mb-2 block">Anything else? (optional)</Label>
            <Textarea id="notes" maxLength={2000} value={answers.notes ?? ""} onChange={(e) => update("notes", e.target.value)} placeholder="Special requirements, drawings to share, timing notes…" />
          </div>
        </div>
      </StepShell>
    );
  }

  // Step 7 — Lead form
  const emailError = emailTouched && lead.email.length > 0 && !isValidEmail(lead.email);
  const phoneError = phoneTouched && lead.phone.length > 0 && !isValidNZPhone(lead.phone);

  return (
    <StepShell
      step={7}
      total={TOTAL_STEPS}
      title="Almost there"
      subtitle="We'll show your indicative range and forward your details to Royal Glass."
      onBack={back}
      onNext={onSubmit}
      nextLabel="Show my estimate"
      nextDisabled={!leadValid}
      loading={loading}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" value={lead.fullName} onChange={(e) => updateLead("fullName", e.target.value)} maxLength={120} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={lead.email}
            onChange={(e) => updateLead("email", e.target.value)}
            onBlur={() => setEmailTouched(true)}
            maxLength={255}
            className={emailError ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {emailError && (
            <p className="mt-1 text-xs text-destructive">Please enter a valid email address.</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={lead.phone}
            onChange={(e) => updateLead("phone", e.target.value)}
            onBlur={() => setPhoneTouched(true)}
            maxLength={40}
            placeholder="e.g. 021 123 4567"
            className={phoneError ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-destructive">Please enter a valid NZ phone number (e.g. 021 123 4567 or 09 123 4567).</p>
          )}
        </div>
        <div>
          <Label className="mb-2 block">I'm a... *</Label>
          <VisualChoice options={roleOptions} value={lead.role} onChange={(v) => updateLead("role", v)} columns={3} />
        </div>
        <div>
          <Label className="mb-2 block">Timeframe *</Label>
          <VisualChoice options={timeframeOptions} value={lead.timeframe} onChange={(v) => updateLead("timeframe", v)} columns={2} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="suburb" className="mb-2 block">Project address / suburb *</Label>
          <NZAddressInput value={lead.suburb} onChange={(v) => updateLead("suburb", v)} />
        </div>
        {/* Honeypot — hidden from real users, must stay empty */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={lead.website ?? ""}
              onChange={(e) => updateLead("website", e.target.value)}
            />
          </label>
        </div>
        <div className="sm:col-span-2 space-y-3 rounded-md border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <Checkbox id="consent" checked={lead.consent} onCheckedChange={(c) => updateLead("consent", c === true ? true : (false as unknown as true))} />
            <Label htmlFor="consent" className="text-sm font-normal leading-snug">
              I agree Royal Glass may contact me about my enquiry and store my details for that purpose. *
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="marketing" checked={lead.marketingOptIn} onCheckedChange={(c) => updateLead("marketingOptIn", c === true)} />
            <Label htmlFor="marketing" className="text-sm font-normal leading-snug text-muted-foreground">
              I'd also like occasional updates from Royal Glass. (optional)
            </Label>
          </div>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        This is an indicative starting estimate, not a formal quote. Final pricing is confirmed by Royal Glass after a site visit.
      </p>
    </StepShell>
  );
}

function ResultView({ result, onRestart }: { result: SubmitResponse; onRestart: () => void }) {
  const { estimate, breakdown } = result;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-8 shadow-[var(--shadow-elevated)]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" /> Indicative estimate
        </div>
        <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
          {fmt(estimate.low)} – {fmt(estimate.high)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A starting range based on your answers. Final pricing is confirmed by Royal Glass after a site visit.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="gap-2">
            <a href="tel:0800769254"><Phone className="h-4 w-4" /> Call Royal Glass</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href="https://book.servicem8.com/request_service_booking?strVendorUUID=db04a105-eb9c-4c46-8fe0-1df68da8bcdb">
              <Mail className="h-4 w-4" /> Request a formal quote <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {breakdown.needsReview && (
        <div className="rounded-xl border border-warning/40 bg-warning/10 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-warning-foreground" />
            <div>
              <h3 className="font-medium text-warning-foreground">Royal Glass will review your project</h3>
              <p className="mt-1 text-sm text-warning-foreground/80">
                Some details mean we'd rather check before confirming pricing:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-warning-foreground/90">
                {breakdown.reviewReasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="font-display text-lg">Major cost factors</h3>
          <ul className="mt-4 divide-y text-sm">
            {breakdown.lines.map((l) => (
              <li key={l.label} className="flex items-start justify-between gap-3 py-2.5">
                <div>
                  <div>{l.label}</div>
                  {l.detail && <div className="text-xs text-muted-foreground">{l.detail}</div>}
                </div>
                <div className="font-medium tabular-nums">{fmt(l.amount)}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="font-display text-lg">What this estimate assumes</h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {breakdown.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="mt-4 rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
            {breakdown.disclaimer}
          </p>
        </div>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={onRestart}>Start a new estimate</Button>
      </div>
    </div>
  );
}
