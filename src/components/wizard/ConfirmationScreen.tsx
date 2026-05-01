import React from 'react';
import { formatNZD } from '../../lib/calculator/engine';
import type { EstimateResult, LeadData } from '../../lib/calculator/types';

interface ConfirmationScreenProps {
  lead: LeadData;
  estimate: EstimateResult;
}

export function ConfirmationScreen({ lead, estimate }: ConfirmationScreenProps) {
  return (
    <div className="text-center py-8">
      {/* Success icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Thanks, {lead.firstName}!
      </h2>
      <p className="text-gray-500 mb-1">
        Your quote request has been received by Royal Glass.
      </p>
      <p className="text-gray-500 text-sm mb-8">
        Our team will be in touch within 1 business day.
      </p>

      {/* Estimate reminder */}
      {!estimate.needsConsultation && (
        <div className="inline-flex flex-col items-center rounded-2xl bg-[#1a3c5e] text-white px-8 py-5 mb-8">
          <p className="text-sm text-blue-200 mb-1">Your indicative estimate</p>
          <p className="text-2xl font-bold">
            {formatNZD(estimate.low)} – {formatNZD(estimate.high)}
          </p>
          <p className="text-xs text-blue-300 mt-1">Excl. GST · Confirmed after site visit</p>
        </div>
      )}

      {/* What happens next */}
      <div className="rounded-xl border border-gray-200 p-5 mb-8 text-left">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">What happens next</h3>
        <div className="space-y-4">
          {[
            { step: '1', title: 'We review your details', body: 'Our team checks your project details and confirms availability.' },
            { step: '2', title: 'We call you', body: `We will call ${lead.phone} ${lead.callPreference !== 'anytime' ? `during your preferred time (${lead.callPreference})` : 'within business hours'} to confirm the site visit.` },
            { step: '3', title: 'Free site visit + confirmed quote', body: 'We measure up, finalise the scope, and send you a detailed fixed-price quote.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a3c5e] text-white text-xs font-bold">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Save or print your estimate
        </button>
        <a
          href="tel:0800769254"
          className="w-full rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
        >
          Call us: 0800 769 254
        </a>
        <a
          href="https://royalglass.co.nz"
          className="w-full rounded-xl bg-[#1a3c5e] px-6 py-3 text-sm font-semibold text-white text-center hover:bg-[#14304d] transition-colors"
        >
          Back to Royal Glass
        </a>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Have a question? Call us on{' '}
        <a href="tel:0800769254" className="underline">0800 769 254</a>
        {' '}or email{' '}
        <a href="mailto:support@royalglass.co.nz" className="underline">support@royalglass.co.nz</a>
      </p>
    </div>
  );
}
