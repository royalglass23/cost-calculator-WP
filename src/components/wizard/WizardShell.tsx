import React from 'react';
import { TOTAL_WIZARD_STEPS } from '../../lib/calculator/engine';
import type { WizardStep } from '../../lib/calculator/types';

interface WizardShellProps {
  step: WizardStep;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  children: React.ReactNode;
  hideNav?: boolean;
}

export function WizardShell({
  step,
  onBack,
  onContinue,
  canContinue,
  children,
  hideNav = false,
}: WizardShellProps) {
  const isWizardStep = step >= 1 && step <= TOTAL_WIZARD_STEPS;
  const progressPercent = isWizardStep
    ? Math.round((step / TOTAL_WIZARD_STEPS) * 100)
    : 100;

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: '760px',
        margin: '0 auto',
        padding: '28px 16px 56px',
        color: '#111',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Progress bar */}
      {isWizardStep && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Step {step} / {TOTAL_WIZARD_STEPS}
            </span>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>{progressPercent}%</span>
          </div>
          <div style={{ height: '3px', width: '100%', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: '#1a3c5e',
              borderRadius: '2px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ minHeight: '400px', background: '#fff', border: '1px solid #e7edf4', borderRadius: '18px', padding: '24px', boxShadow: '0 10px 28px rgba(15,23,42,0.06)' }}>
        {children}
      </div>

      {/* Nav */}
      {!hideNav && (
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={onBack}
              style={{
                padding: '10px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: 'white',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4b5563',
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            style={{
              padding: '10px 28px',
              borderRadius: '8px',
              border: 'none',
              background: canContinue ? '#1a3c5e' : '#e5e7eb',
              color: canContinue ? 'white' : '#9ca3af',
              fontSize: '14px',
              fontWeight: 600,
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
