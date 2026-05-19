import React from 'react';
import type { WizardAnswers, Scenario, FixingMethod, HardwareFinish, EstimateResult } from '../lib/calculator/types';
import { IMAGES } from '../lib/calculator/config';
import { formatNZD } from '../lib/calculator/engine';
import { SelectionCard, SliderInput, StepNote, ComplianceWarning } from './wizard/steps/shared';

interface Props {
  answers: WizardAnswers;
  estimate: EstimateResult;
  onChange: (updates: Partial<WizardAnswers>) => void;
  onGetEstimate: () => void;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: '#1a3c5e', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: '700', flexShrink: 0,
        }}>
          {number}
        </div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1a3c5e' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── Scenario cards ───────────────────────────────────────────────────────────

const SCENARIOS: Array<{ value: Scenario; title: string; description: string; image: string }> = [
  {
    value: 'deck_pool_fence',
    title: 'Deck Pool Fence',
    description: 'Ground-level pool or outdoor area · ≤1m height · $280/m',
    image: IMAGES.pool,
  },
  {
    value: 'balcony_balustrade',
    title: 'Balcony / Patio Balustrade',
    description: 'Elevated deck, balcony or patio · >1m height · $320/m',
    image: IMAGES.deck,
  },
  {
    value: 'premium_pool_fence',
    title: 'Premium Pool Fence',
    description: 'High-spec pool fencing · NZ Pool Safety Act · $380/m',
    image: IMAGES.pool,
  },
  {
    value: 'stair_balustrade',
    title: 'Stair Balustrade',
    description: 'Glass panels along stairs · NZBC Stair Safety Code · $330/m',
    image: IMAGES.deck,
  },
];

// ─── Fixing method cards ──────────────────────────────────────────────────────

const FIXING_OPTIONS: Array<{ value: FixingMethod; title: string; description: string; image: string }> = [
  { value: 'spigots',        title: 'Spigots',         description: 'Round or square posts drilled into the floor — most common', image: IMAGES.spigots },
  { value: 'standoff_posts', title: 'Stand-off Posts',  description: 'Bracket-mounted on the face of the structure',              image: IMAGES.standoff },
  { value: 'hidden_channel', title: 'Hidden Channel',   description: 'Glass appears to float — recessed channel in the floor',    image: IMAGES.hiddenChannel },
  { value: 'not_sure',       title: 'Not Sure',         description: 'Our team will recommend the best option on site',           image: IMAGES.notSure },
];

// ─── Hardware finish cards ────────────────────────────────────────────────────

const FINISH_OPTIONS: Array<{ value: HardwareFinish; title: string; description: string; image: string; surcharge?: string }> = [
  { value: 'standard_chrome', title: 'Standard Chrome',  description: 'Included in base price',         image: IMAGES.chrome },
  { value: 'matte_black',     title: 'Matte Black',      description: 'Most popular premium finish',     image: IMAGES.matteBlack,    surcharge: '+$15/m' },
  { value: 'brushed_chrome',  title: 'Brushed Chrome',   description: 'Subtle step up from standard',    image: IMAGES.brushedChrome, surcharge: '+$12/m' },
  { value: 'brass',           title: 'Brass',             description: 'Premium — suits modern/luxury',   image: IMAGES.brass,         surcharge: '+$22/m' },
  { value: 'not_sure',        title: 'Not Sure',          description: 'Team will help you choose on site', image: IMAGES.notSure },
];

// ─── Call triggers ────────────────────────────────────────────────────────────

const CALL_TRIGGERS = [
  { id: 'upper_floor',  label: 'Upper floor installation (first floor or higher)' },
  { id: 'scaffold',     label: 'Scaffold or elevated access required' },
  { id: 'high_rise',    label: 'High-rise building (3+ floors)' },
  { id: 'hard_access',  label: 'Difficult or long-carry site access' },
  { id: 'custom_glass', label: 'Custom or curved glass required' },
  { id: 'custom_colour',label: 'Custom colour hardware (powder coat / RAL)' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function CalculatorForm({ answers, estimate, onChange, onGetEstimate }: Props) {
  const gatesHidden = answers.scenario === 'balcony_balustrade';
  const gatesMandatory = answers.scenario === 'premium_pool_fence';

  function handleScenarioChange(value: Scenario) {
    const updates: Partial<WizardAnswers> = { scenario: value };
    // Sc3: NZ law requires at least 1 gate — default to 1 if currently 0
    if (value === 'premium_pool_fence' && answers.gates === 0) updates.gates = 1;
    // Sc2: gates not applicable — reset to 0
    if (value === 'balcony_balustrade') updates.gates = 0;
    onChange(updates);
  }

  function toggleCallTrigger(id: string) {
    const current = answers.callTriggers;
    const updated = current.includes(id)
      ? current.filter((t) => t !== id)
      : [...current, id];
    onChange({ callTriggers: updated });
  }

  const canGetEstimate =
    answers.scenario !== null &&
    answers.fixingMethod !== null &&
    answers.hardwareFinish !== null;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px', fontFamily: 'inherit' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', color: '#1a3c5e' }}>
          Get a Glass Estimate
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '15px' }}>
          Answer a few questions and get an indicative price in seconds.
        </p>
      </div>

      {/* Section 1 — Scenario */}
      <Section number={1} title="What's your project?">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {SCENARIOS.map((sc) => (
            <SelectionCard
              key={sc.value}
              image={sc.image}
              title={sc.title}
              description={sc.description}
              selected={answers.scenario === sc.value}
              onSelect={() => handleScenarioChange(sc.value)}
            />
          ))}
        </div>
      </Section>

      {/* Section 2 — Length */}
      <Section number={2} title="Total length of glass run">
        <SliderInput
          label="Metres"
          value={answers.length}
          min={1}
          max={100}
          step={1}
          unit="m"
          onChange={(v) => onChange({ length: v })}
        />
        {answers.length < 5 && (
          <StepNote>Minimum job is 5 m — shorter runs are charged as 5 m.</StepNote>
        )}
      </Section>

      {/* Section 3 — Corners */}
      <Section number={3} title="How many corners?">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <SliderInput
              label="Corners"
              value={answers.corners}
              min={0}
              max={10}
              step={1}
              unit=""
              onChange={(v) => onChange({ corners: v })}
            />
          </div>
          <img
            src={IMAGES.corners}
            alt="How to count corners"
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }}
            loading="lazy"
          />
        </div>
        <StepNote>Count every 90° turn in the glass run. Each corner adds $85.</StepNote>
      </Section>

      {/* Section 4 — Gates (hidden for Sc2) */}
      {!gatesHidden && (
        <Section number={4} title="How many gates?">
          <SliderInput
            label="Gates"
            value={answers.gates}
            min={0}
            max={6}
            step={1}
            unit=""
            onChange={(v) => onChange({ gates: v })}
          />
          {gatesMandatory && (
            <ComplianceWarning>
              NZ Pool Safety Act requires at least 1 self-closing, lockable gate on all pool fences.
            </ComplianceWarning>
          )}
          {gatesMandatory && answers.gates === 0 && (
            <ComplianceWarning>
              You've set 0 gates — this doesn't meet NZ Pool Safety Act requirements.
            </ComplianceWarning>
          )}
        </Section>
      )}

      {/* Section 5 — Fixing method */}
      <Section number={gatesHidden ? 4 : 5} title="How will the glass be fixed?">
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6b7280' }}>
          This is a preference — no price impact. Our team will confirm suitability on site.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {FIXING_OPTIONS.map((opt) => (
            <SelectionCard
              key={opt.value}
              image={opt.image}
              title={opt.title}
              description={opt.description}
              selected={answers.fixingMethod === opt.value}
              onSelect={() => onChange({ fixingMethod: opt.value as FixingMethod })}
              compact
            />
          ))}
        </div>
      </Section>

      {/* Section 6 — Hardware finish */}
      <Section number={gatesHidden ? 5 : 6} title="Hardware finish">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {FINISH_OPTIONS.map((opt) => (
            <SelectionCard
              key={opt.value}
              image={opt.image}
              title={opt.title}
              description={`${opt.description}${opt.surcharge ? ' · ' + opt.surcharge : ''}`}
              selected={answers.hardwareFinish === opt.value}
              onSelect={() => onChange({ hardwareFinish: opt.value as HardwareFinish })}
              compact
            />
          ))}
        </div>
      </Section>

      {/* Section 7 — Site conditions */}
      <Section number={gatesHidden ? 6 : 7} title="Any of these apply to your site?">
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6b7280' }}>
          Tick anything that applies. These situations need a site visit before we can quote accurately.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CALL_TRIGGERS.map((trigger) => (
            <label
              key={trigger.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '10px',
                border: `1px solid ${answers.callTriggers.includes(trigger.id) ? '#1a3c5e' : '#e6eaef'}`,
                background: answers.callTriggers.includes(trigger.id) ? '#f0f4f8' : 'white',
                cursor: 'pointer', fontSize: '14px', color: '#1a3c5e',
              }}
            >
              <input
                type="checkbox"
                checked={answers.callTriggers.includes(trigger.id)}
                onChange={() => toggleCallTrigger(trigger.id)}
                style={{ width: '18px', height: '18px', accentColor: '#1a3c5e', flexShrink: 0 }}
              />
              {trigger.label}
            </label>
          ))}
        </div>
        {answers.callTriggers.length > 0 && (
          <ComplianceWarning>
            One or more of your site conditions requires a custom quote. We'll calculate what we can and Royal Glass will contact you to confirm the final price.
          </ComplianceWarning>
        )}
      </Section>

      {/* Assumptions */}
      <div style={{
        background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px',
        padding: '16px 20px', marginBottom: '32px', fontSize: '13px', color: '#64748b', lineHeight: '1.6',
      }}>
        <strong style={{ color: '#1a3c5e' }}>This estimate assumes:</strong>{' '}
        toughened 12mm glass · timber or concrete substrate · NZ standard height for selected scenario · ground-level access · straight panels.
        If any of these don't apply, call Royal Glass for a custom quote.{' '}
        <strong>Excludes:</strong> GST · site clearance · council permits · scaffolding.
      </div>

      {/* Live estimate preview */}
      {answers.scenario && !estimate.needsCallUs && (
        <div style={{
          background: '#1a3c5e', color: 'white', borderRadius: '16px',
          padding: '24px', marginBottom: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '4px' }}>Indicative estimate (excl. GST)</div>
          <div style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            {formatNZD(estimate.low)} – {formatNZD(estimate.high)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
            Submit your details below to lock in this estimate and get it emailed to you.
          </div>
        </div>
      )}

      {answers.scenario && estimate.needsCallUs && (
        <div style={{
          background: '#fff8ef', border: '1px solid #f59e0b', borderRadius: '16px',
          padding: '24px', marginBottom: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#92400e', marginBottom: '8px' }}>
            Custom Quote Required
          </div>
          <p style={{ margin: 0, color: '#78350f', fontSize: '14px' }}>
            Your site conditions need a visit before we can estimate accurately. Fill in your details and Royal Glass will be in touch.
          </p>
        </div>
      )}

      {/* Get estimate CTA */}
      <div style={{ borderTop: '2px solid #e6eaef', paddingTop: '32px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: '#1a3c5e' }}>
          Get your full estimate
        </h3>
        <p style={{ margin: '0 0 20px', color: '#6b7280', fontSize: '14px' }}>
          Enter your details and we'll save your estimate and follow up with next steps.
        </p>
        <button
          type="button"
          onClick={onGetEstimate}
          disabled={!canGetEstimate}
          style={{
            width: '100%', padding: '16px', borderRadius: '12px',
            background: canGetEstimate ? '#1a3c5e' : '#9ca3af',
            color: 'white', border: 'none', cursor: canGetEstimate ? 'pointer' : 'not-allowed',
            fontSize: '16px', fontWeight: '700', letterSpacing: '0.3px',
          }}
        >
          {canGetEstimate ? 'Continue — Enter Your Details' : 'Complete all selections above to continue'}
        </button>
      </div>
    </div>
  );
}
