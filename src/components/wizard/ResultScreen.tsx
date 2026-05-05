import React, { useState } from 'react';
import { formatNZD } from '../../lib/calculator/engine';
import type { WizardAnswers, EstimateResult } from '../../lib/calculator/types';
import { getConfig } from '../../hooks/usePricing';

interface Props {
  answers: WizardAnswers;
  estimate: EstimateResult;
  leadId: number;
  email: string;
  firstName: string;
}

const HEIGHT_LABELS: Record<string, string> = {
  standard_1m: '1m above floor level', less_than_1m: 'Less than 1m (to be confirmed)',
  not_sure: 'To be confirmed on site', standard_1_2m: '1.2m (NZ compliance)', custom: 'Custom',
};
const FIXING_LABELS: Record<string, string> = {
  spigots: 'Spigots', standoff_posts: 'Stand-off posts', hidden_channel: 'Hidden channel', not_sure: 'To be confirmed',
};
const FINISH_LABELS: Record<string, string> = {
  standard_chrome: 'Standard chrome', matte_black: 'Matte black', brushed_chrome: 'Brushed chrome',
  brass: 'Brass', custom: 'Custom', not_sure: 'To be confirmed',
};

export function ResultScreen({ answers, estimate, leadId, email, firstName }: Props) {
  const [emailInput, setEmailInput]   = useState(email);
  const [sending,    setSending]      = useState(false);
  const [sent,       setSent]         = useState(false);
  const [sendError,  setSendError]    = useState('');

  async function sendToEmail() {
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSendError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const config = getConfig();
      const res = await fetch(`${config.restUrl}/estimate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': config.nonce },
        body: JSON.stringify({ email: trimmed, firstName, leadId, answers, estimate }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
      } else {
        setSendError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSendError('Unable to send. Please check your connection or call 0800 769 254.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      {/* Estimate banner */}
      <div style={{
        background: 'linear-gradient(135deg, #173755 0%, #1a3c5e 60%, #244a70 100%)',
        borderRadius: '18px', padding: '34px 24px', textAlign: 'center',
        marginBottom: estimate.consultationReasons.length > 0 ? '0' : '24px', color: 'white',
        boxShadow: '0 14px 34px rgba(26,60,94,0.26)',
        borderBottomLeftRadius: estimate.consultationReasons.length > 0 ? '0' : '18px',
        borderBottomRightRadius: estimate.consultationReasons.length > 0 ? '0' : '18px',
      }}>
        <p style={{ fontSize: '13px', color: '#93c5fd', marginTop: 0, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
          Your indicative estimate
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '12px 0' }}>
          <span style={{ fontSize: '36px', fontWeight: 700 }}>{formatNZD(estimate.low)}</span>
          <span style={{ fontSize: '24px', color: '#93c5fd' }}>–</span>
          <span style={{ fontSize: '36px', fontWeight: 700 }}>{formatNZD(estimate.high)}</span>
        </div>
        <p style={{ fontSize: '13px', color: '#93c5fd', margin: 0 }}>
          Excluding GST · Based on {estimate.effectiveLength}m effective length
        </p>
      </div>

      {/* Concerns — shown only when some details need confirming */}
      {estimate.consultationReasons.length > 0 && (
        <div style={{
          background: '#fffbeb', border: '1px solid #fde68a',
          borderTop: 'none',
          borderBottomLeftRadius: '18px', borderBottomRightRadius: '18px',
          padding: '14px 20px', marginBottom: '24px',
        }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#92400e', marginTop: 0, marginBottom: '6px' }}>
            A few things we'll confirm at the site visit:
          </p>
          {estimate.consultationReasons.map(r => (
            <p key={r} style={{ fontSize: '12px', color: '#b45309', margin: '0 0 2px 0' }}>· {r}</p>
          ))}
        </div>
      )}

      {/* Breakdown */}
      {/*
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginTop: 0, marginBottom: '16px' }}>Estimate breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
          <Row label={`${estimate.effectiveLength}m × base rate`} value={formatNZD(estimate.breakdown.base)} />
          {estimate.breakdown.gates > 0 && <Row label={`${answers.gates} gate${answers.gates !== 1 ? 's' : ''}`} value={formatNZD(estimate.breakdown.gates)} />}
          {estimate.breakdown.corners > 0 && <Row label={`${answers.corners} corner${answers.corners !== 1 ? 's' : ''}`} value={formatNZD(estimate.breakdown.corners)} />}
          {estimate.breakdown.hardwareSurcharge > 0 && <Row label="Hardware finish surcharge" value={formatNZD(estimate.breakdown.hardwareSurcharge)} />}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#111' }}>
            <span>Estimated total (excl. GST)</span>
            <span>{formatNZD(estimate.subtotal)}</span>
          </div>
        </div>
      </div>    
      */}

      {/* Project summary */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginTop: 0, marginBottom: '12px' }}>Your project summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '14px' }}>
          {[
            ['Project type',    answers.projectType === 'pool_fence' ? 'Glass Pool Fence' : 'Glass Balustrade'],
            ['Length',          `${answers.length}m`],
            ['Height',          HEIGHT_LABELS[answers.height ?? ''] ?? ''],
            ['Corners',         `${answers.corners}`],
            ['Gates',           `${answers.gates}`],
            ['Fixing method',   FIXING_LABELS[answers.fixingMethod ?? ''] ?? ''],
            ['Hardware finish', FINISH_LABELS[answers.hardwareFinish ?? ''] ?? ''],
          ].map(([k, v]) => (
            <React.Fragment key={k}>
              <span style={{ color: '#6b7280' }}>{k}</span>
              <span style={{ fontWeight: 500, color: '#111' }}>{v}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Assumptions */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginTop: 0, marginBottom: '8px' }}>This estimate assumes:</h3>
        {['12mm toughened clear glass', 'Straight panels — no curved glass', 'Ground floor installation', 'Good substrate condition (timber deck default)', 'Standard shape'].map(a => (
          <p key={a} style={{ fontSize: '13px', color: '#6b7280', marginTop: 0, marginBottom: '4px' }}>✓ {a}</p>
        ))}
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', marginBottom: 0 }}>
          Anything different? Our team will adjust the formal quote after the site visit.
        </p>
      </div>

      {/* What happens next */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginTop: 0, marginBottom: '16px' }}>What happens next</h3>
        {[
          { n: '1', title: 'We review your details', body: 'Our team checks your project and contacts you within 1 business day.' },
          { n: '2', title: 'Site visit',         body: 'We visit to take precise measurements and confirm the scope.' },
          { n: '3', title: 'Confirmed quote',          body: 'You receive a detailed, fixed-price quote with timeline. No obligation.' },
        ].map(item => (
          <div key={item.n} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1a3c5e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
              {item.n}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginTop: 0, marginBottom: '2px' }}>{item.title}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Send to email ─────────────────────────────────────────────────── */}
      <div style={{ border: '1px solid #dbeafe', borderRadius: '14px', padding: '22px', marginBottom: '16px', background: '#f0f7ff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a3c5e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a3c5e', marginTop: 0, marginBottom: '3px' }}>
              Get this estimate in your inbox
            </h3>
            <p style={{ fontSize: '13px', color: '#3b82f6', margin: 0 }}>
              {firstName ? `Hi ${firstName} — we'll` : "We'll"} send you a personal copy with everything you need, all in one place. Forward it to your builder, partner, or architect too.
            </p>
          </div>
        </div>

        {sent ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg style={{ width: '13px', height: '13px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#15803d', marginTop: 0, marginBottom: '2px' }}>Sent! Check your inbox.</p>
              <p style={{ fontSize: '12px', color: '#16a34a', margin: 0 }}>Can't find it? Check your spam folder, or call us on 0800 769 254.</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                value={emailInput}
                onChange={e => { setEmailInput(e.target.value); setSendError(''); }}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '11px 14px',
                  border: `1px solid ${sendError ? '#f87171' : '#bfdbfe'}`,
                  borderRadius: '8px', fontSize: '14px', outline: 'none',
                  background: 'white', boxSizing: 'border-box' as const,
                }}
              />
              <button
                type="button"
                onClick={sendToEmail}
                disabled={sending}
                style={{
                  padding: '11px 22px', borderRadius: '8px', border: 'none',
                  background: sending ? '#9ca3af' : '#1a3c5e',
                  color: 'white', fontSize: '14px', fontWeight: 600,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {sending ? 'Sending…' : 'Send →'}
              </button>
            </div>
            {sendError && (
              <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', marginBottom: 0 }}>{sendError}</p>
            )}
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', marginBottom: 0 }}>
              Want to share with your builder or partner? Change the address above.
            </p>
          </>
        )}
      </div>

      {/* Call CTA */}
      <a href="tel:0800769254" style={{
        display: 'block', textAlign: 'center', padding: '14px',
        border: '1px solid #d1d5db', borderRadius: '8px',
        fontSize: '14px', color: '#374151', textDecoration: 'none', marginBottom: '12px',
      }}>
        Call us now: 0800 769 254
      </a>

      {/* Print */}
      <button onClick={() => window.print()} style={{
        display: 'block', width: '100%', padding: '10px',
        border: '1px solid #e5e7eb', borderRadius: '8px',
        fontSize: '13px', color: '#9ca3af', background: 'white', cursor: 'pointer', marginBottom: '16px',
      }}>
        Save or print this estimate
      </button>

      <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
        This is an indicative estimate only. Final pricing is confirmed after our team completes a site visit. Prices exclude GST.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
