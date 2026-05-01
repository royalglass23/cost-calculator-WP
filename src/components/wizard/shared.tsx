import React from 'react';

// Selection card with image + title + description
interface SelectionCardProps {
  image?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
}

export function SelectionCard({ image, imageAlt, title, description, selected, onSelect, badge }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '12px',
        border: `2px solid ${selected ? '#1a3c5e' : '#e5e7eb'}`,
        background: 'white',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        boxShadow: selected ? '0 0 0 1px #1a3c5e' : 'none',
        padding: 0,
      }}
    >
      {image && (
        <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={image}
            alt={imageAlt ?? title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {selected && (
            <div style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#1a3c5e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontSize: '14px', lineHeight: 1 }}>✓</span>
            </div>
          )}
        </div>
      )}
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{title}</span>
          {badge && (
            <span style={{ fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
              {badge}
            </span>
          )}
        </div>
        {description && <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{description}</p>}
      </div>
    </button>
  );
}

// Slider + manual input
interface SliderInputProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}

export function SliderInput({ value, min, max, unit, onChange }: SliderInputProps) {
  const [text, setText] = React.useState(String(value));
  React.useEffect(() => { setText(String(value)); }, [value]);

  function commit(raw: string) {
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    else setText(String(value));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '56px', fontWeight: 700, color: '#1a3c5e', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ fontSize: '22px', color: '#9ca3af' }}>{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#1a3c5e' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{min}{unit}</span>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{max}{unit}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: '#6b7280' }}>Or type:</span>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
          <input type="number" min={min} max={max} value={text}
            onChange={e => setText(e.target.value)}
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
            style={{ width: '64px', padding: '6px 8px', fontSize: '14px', border: 'none', outline: 'none', textAlign: 'center' }}
          />
          <span style={{ padding: '6px 8px', fontSize: '13px', color: '#6b7280', background: '#f9fafb' }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

// Info note
export function StepNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '8px', background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#1e40af' }}>
      <span style={{ flexShrink: 0 }}>ℹ</span>
      <span>{children}</span>
    </div>
  );
}

// Warning
export function ComplianceWarning({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '8px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#92400e' }}>
      <span style={{ flexShrink: 0 }}>⚠</span>
      <span>{children}</span>
    </div>
  );
}

// Hero image
export function StepHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '24px' }}>
      <img src={src} alt={alt} loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}
