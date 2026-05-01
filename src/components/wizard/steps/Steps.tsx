import React from 'react';
import type { WizardAnswers, HeightOption, FixingMethod, HardwareFinish } from '../../../lib/calculator/types';
import { SelectionCard, SliderInput, StepNote, ComplianceWarning, StepHero } from './shared';
import { IMAGES } from '../../../lib/calculator/config';

interface StepProps {
  answers: WizardAnswers;
  onChange: (updates: Partial<WizardAnswers>) => void;
}

// ─── STEP 1: Project Type ─────────────────────────────────────────────────────

export function Step1ProjectType({ answers, onChange }: StepProps) {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        What kind of project is this?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        Pick the closest match — we can fine-tune the details at site visit.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <SelectionCard
          image={IMAGES.deck}
          imageAlt="Glass balustrade installed on an Auckland deck — Royal Glass project"
          title="Glass Balustrade"
          description="Deck, balcony, or staircase"
          selected={answers.projectType === 'balustrade'}
          onSelect={() => onChange({ projectType: 'balustrade', height: 'standard_1m', gates: 0 })}
        />
        <SelectionCard
          image={IMAGES.pool}
          imageAlt="Frameless glass pool fence installed by Royal Glass Auckland"
          title="Pool Fence"
          description="Compliant frameless pool fencing"
          selected={answers.projectType === 'pool_fence'}
          onSelect={() => onChange({ projectType: 'pool_fence', height: 'standard_1_2m' })}
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <StepNote>
          Need both? Complete one estimate now and mention the other in the notes — our team will combine them into a single quote.
        </StepNote>
      </div>
    </div>
  );
}

// ─── STEP 2: Total Length ─────────────────────────────────────────────────────

export function Step2Length({ answers, onChange }: StepProps) {
  return (
    <div>
      <StepHero src={IMAGES.deck} alt="Long run of frameless glass balustrade showing linear measurement" />

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        Total length of glass run
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        Measure along the edge where the glass will be installed. Add up all sections if there are multiple runs.
      </p>

      <SliderInput
        value={answers.length}
        min={1}
        max={100}
        unit="m"
        onChange={(v) => onChange({ length: v })}
      />

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <StepNote>
          Not sure of the exact length? Give us your best estimate — we confirm precise measurements on the free site visit.
        </StepNote>
        {answers.length < 5 && (
          <div style={{ display: 'flex', gap: '8px', borderRadius: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '12px', fontSize: '14px', color: '#4b5563' }}>
            <svg style={{ marginTop: '2px', width: '16px', height: '16px', flexShrink: 0, color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Our minimum job size is 5 metres. The estimate will reflect a 5m minimum.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STEP 3: Height ───────────────────────────────────────────────────────────

interface HeightOption3 { value: HeightOption; label: string; description: string; badge?: string; }

const BALUSTRADE_HEIGHTS: HeightOption3[] = [
  { value: 'standard_1m',   label: '1m above floor level', description: 'Standard height — most common for decks and balconies', badge: 'Most common' },
  { value: 'less_than_1m',  label: 'Less than 1m',         description: 'Below standard — may require compliance check' },
  { value: 'not_sure',      label: 'Not sure',              description: 'Our team will confirm the correct height on site' },
];

const POOL_FENCE_HEIGHTS: HeightOption3[] = [
  { value: 'standard_1_2m', label: '1.2m',         description: 'Required height for all pool barriers in New Zealand', badge: 'NZ compliance standard' },
  { value: 'not_sure',      label: 'Not sure',      description: 'Our team will confirm and ensure full NZ compliance' },
  { value: 'custom',        label: 'Custom height', description: 'Non-standard — we will discuss the specifics with you' },
];

function RadioOption({ opt, selected, onClick }: { opt: HeightOption3; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '12px',
        border: `2px solid ${selected ? '#1a3c5e' : hovered ? '#c4cdd6' : '#e5e7eb'}`,
        background: selected ? '#eff6ff' : 'white',
        padding: '16px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
        outline: 'none',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{opt.label}</span>
          {opt.badge && (
            <span style={{ borderRadius: '999px', background: '#dcfce7', padding: '2px 8px', fontSize: '10px', fontWeight: 500, color: '#15803d' }}>
              {opt.badge}
            </span>
          )}
        </div>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{opt.description}</span>
      </div>
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${selected ? '#1a3c5e' : '#d1d5db'}`,
        background: selected ? '#1a3c5e' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
      </div>
    </button>
  );
}

export function Step3Height({ answers, onChange }: StepProps) {
  const isPool = answers.projectType === 'pool_fence';
  const options = isPool ? POOL_FENCE_HEIGHTS : BALUSTRADE_HEIGHTS;
  const heroSrc = isPool ? IMAGES.heightPoolFence : IMAGES.heightBalustrade;

  return (
    <div>
      <StepHero
        src={heroSrc}
        alt={isPool ? 'NZ compliant glass pool fence 1.2m height' : 'Glass balustrade height measurement on Auckland deck'}
      />

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        What height does the glass need to be?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        {isPool
          ? 'NZ pool safety regulations require a minimum 1.2m barrier height from finished ground level.'
          : 'Height is measured from the finished floor or deck surface to the top edge of the glass.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt) => (
          <RadioOption
            key={opt.value}
            opt={opt}
            selected={answers.height === opt.value}
            onClick={() => onChange({ height: opt.value })}
          />
        ))}
      </div>

      {answers.height === 'less_than_1m' && (
        <div style={{ marginTop: '16px' }}>
          <ComplianceWarning>
            Under the NZ Building Code, balustrades on decks or balconies more than 1m above ground must be at least 1m high. Our team will review this with you — no extra charge for the advice.
          </ComplianceWarning>
        </div>
      )}

      {(answers.height === 'not_sure' || answers.height === 'custom') && (
        <div style={{ marginTop: '16px' }}>
          <StepNote>
            No problem — our team will confirm the right height when we visit the site. We will make sure everything meets NZ Building Code.
          </StepNote>
        </div>
      )}
    </div>
  );
}

// ─── STEP 4: Corners ──────────────────────────────────────────────────────────

export function Step4Corners({ answers, onChange }: StepProps) {
  return (
    <div>
      <StepHero
        src={IMAGES.corners}
        alt="Corner junction of a glass balustrade system — Royal Glass Auckland"
      />

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        How many corners are there?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        Count each point where the glass changes direction. A square pool enclosure has 4 corners. A straight run with no turns has 0.
      </p>

      <SliderInput
        value={answers.corners}
        min={0}
        max={10}
        unit="corners"
        onChange={(v) => onChange({ corners: v })}
      />

      <div style={{ marginTop: '24px' }}>
        <StepNote>
          This estimate assumes standard 90° corners. Curved or angled corners may have different pricing — mention it in the notes and our team will include it in the formal quote.
        </StepNote>
      </div>
    </div>
  );
}

// ─── STEP 5: Gates ────────────────────────────────────────────────────────────

export function Step5Gates({ answers, onChange }: StepProps) {
  const isPool = answers.projectType === 'pool_fence';

  return (
    <div>
      <StepHero
        src={IMAGES.gates}
        alt="Frameless glass pool gate with self-closing latch — Royal Glass Auckland"
      />

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        How many gates do you need?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        {isPool
          ? 'Pool fence gates must be self-closing, latching, and open away from the pool under NZ regulations. Gates are $1,100 each including compliant hardware.'
          : 'Access gates can be added to any glass balustrade run. Each gate includes hinges, latch, and matching hardware.'}
      </p>

      <SliderInput
        value={answers.gates}
        min={0}
        max={6}
        unit="gates"
        onChange={(v) => onChange({ gates: v })}
      />

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {answers.gates === 0 && !isPool && (
          <StepNote>
            No gates needed — that is completely fine. You can always add one later.
          </StepNote>
        )}
        {isPool && answers.gates === 0 && (
          <ComplianceWarning>
            Pool fences require at least one compliant gate for pool access. If access is via another compliant barrier (e.g. a locked door), zero gates is fine — otherwise add at least one.
          </ComplianceWarning>
        )}
        {answers.gates > 0 && (
          <StepNote>
            Each gate includes self-closing hinges and a latch. Hardware finish will match your selection on the next steps.
          </StepNote>
        )}
      </div>
    </div>
  );
}

// ─── STEP 6: Fixing Method ────────────────────────────────────────────────────

interface FixingOption { value: FixingMethod; label: string; description: string; detail: string; image: string; imageAlt: string; }

const FIXING_OPTIONS: FixingOption[] = [
  {
    value: 'spigots',
    label: 'Spigots',
    description: 'Round or square posts drilled into the floor',
    detail: 'Most common. Clean base, glass sits above with a small post visible at the bottom.',
    image: IMAGES.spigots,
    imageAlt: 'Round mini post spigot glass balustrade system — Royal Glass Auckland',
  },
  {
    value: 'standoff_posts',
    label: 'Stand-off Posts',
    description: 'Bracket-mounted on the face of the structure',
    detail: 'Ideal when drilling into the floor is not possible. Mounts on the side of the deck or wall.',
    image: IMAGES.standoff,
    imageAlt: 'Stand-off post glass balustrade system mounted on deck face — Royal Glass',
  },
  {
    value: 'hidden_channel',
    label: 'Hidden Channel',
    description: 'Recessed base channel — no visible post',
    detail: 'Cleanest look. Glass appears to float from the ground. Requires a rebate in the floor.',
    image: IMAGES.hiddenChannel,
    imageAlt: 'Hidden channel base glass balustrade with no visible posts — Royal Glass Auckland',
  },
  {
    value: 'not_sure',
    label: 'Not Sure',
    description: 'We will recommend the best option on site',
    detail: 'No problem — our team will assess the structure and recommend the right system for your situation.',
    image: IMAGES.notSure,
    imageAlt: 'Not sure option for fixing method',
  },
];

export function Step6FixingMethod({ answers, onChange }: StepProps) {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        How will the glass be fixed?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        This affects the look and how we attach the glass to your structure. If you are not sure, our team will recommend the best option when they visit.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {FIXING_OPTIONS.map((opt) => (
          <SelectionCard
            key={opt.value}
            image={opt.image || undefined}
            imageAlt={opt.imageAlt}
            title={opt.label}
            description={opt.description}
            selected={answers.fixingMethod === opt.value}
            onSelect={() => onChange({ fixingMethod: opt.value })}
          />
        ))}
      </div>

      {answers.fixingMethod && answers.fixingMethod !== 'not_sure' && (
        <div style={{ marginTop: '16px' }}>
          <StepNote>
            {FIXING_OPTIONS.find((o) => o.value === answers.fixingMethod)?.detail}
          </StepNote>
        </div>
      )}
      {answers.fixingMethod === 'not_sure' && (
        <div style={{ marginTop: '16px' }}>
          <StepNote>
            Our team will assess your deck or floor on the free site visit and recommend the system that suits your structure best.
          </StepNote>
        </div>
      )}
    </div>
  );
}

// ─── STEP 7: Hardware Finish ──────────────────────────────────────────────────

interface FinishOption {
  value: HardwareFinish;
  label: string;
  description: string;
  swatch: string;
  image?: string;
  imageAlt?: string;
  pricingNote?: string;
}

const FINISH_OPTIONS: FinishOption[] = [
  {
    value: 'standard_chrome',
    label: 'Standard Chrome',
    description: 'Polished, timeless. Included in base price.',
    swatch: 'linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 40%, #a8a8a8 60%, #d0d0d0 100%)',
    image: IMAGES.chrome,
    imageAlt: 'Standard chrome hardware on frameless glass balustrade',
  },
  {
    value: 'matte_black',
    label: 'Matte Black',
    description: 'Modern and bold. Popular with contemporary homes.',
    swatch: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 50%, #2a2a2a 100%)',
    image: IMAGES.matteBlack,
    imageAlt: 'Matte black hardware finish on glass balustrade',
    pricingNote: '+$50/m (min. $250)',
  },
  {
    value: 'brushed_chrome',
    label: 'Brushed Chrome',
    description: 'Soft sheen, subtle. Works with most styles.',
    swatch: 'linear-gradient(135deg, #d4d4d4 0%, #b8b8b8 40%, #c8c8c8 100%)',
    image: IMAGES.brushedChrome,
    imageAlt: 'Brushed chrome hardware finish on frameless glass balustrade',
    pricingNote: '+$50/m (min. $250)',
  },
  {
    value: 'brass',
    label: 'Brass',
    description: 'Warm, premium look for luxury finishes.',
    swatch: 'linear-gradient(135deg, #d4a830 0%, #b8922a 40%, #c8a030 100%)',
    image: IMAGES.brass,
    imageAlt: 'Brass hardware finish on glass balustrade — Royal Glass',
    pricingNote: '+$50/m (min. $250)',
  },
  {
    value: 'custom',
    label: 'Custom Colour',
    description: 'Powder coated or RAL matched. Contact us to discuss.',
    swatch: 'linear-gradient(135deg, #f59e0b 0%, #8b5cf6 30%, #3b82f6 60%, #10b981 100%)',
    image: IMAGES.finishCustom,
    imageAlt: 'Custom finish colour examples',
    pricingNote: 'Priced on enquiry',
  },
  {
    value: 'not_sure',
    label: 'Not Sure',
    description: 'Our team will help you choose on site.',
    swatch: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
    image: IMAGES.notSure,
    imageAlt: 'Not sure hardware finish option',
  },
];

export function Step7HardwareFinish({ answers, onChange }: StepProps) {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '4px' }}>
        What hardware finish do you prefer?
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: 0, marginBottom: '24px', lineHeight: 1.5 }}>
        This applies to spigots, standoffs, gate hinges, and latches. Standard chrome is included in the base price — other finishes have a small surcharge.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {FINISH_OPTIONS.map((opt) => {
          const desc = opt.pricingNote ? `${opt.description} ${opt.pricingNote}` : opt.description;
          return (
            <SelectionCard
              key={opt.value}
              image={opt.image}
              imageAlt={opt.imageAlt}
              title={opt.label}
              description={desc}
              selected={answers.hardwareFinish === opt.value}
              onSelect={() => onChange({ hardwareFinish: opt.value })}
            />
          );
        })}
      </div>

      {(answers.hardwareFinish === 'custom' || answers.hardwareFinish === 'not_sure') && (
        <div style={{ marginTop: '16px' }}>
          <StepNote>
            {answers.hardwareFinish === 'custom'
              ? 'Custom finishes are priced on enquiry. Our team will discuss options and pricing when we call you.'
              : 'No worries — our team can show you samples on the site visit to help you decide.'}
          </StepNote>
        </div>
      )}
    </div>
  );
}
