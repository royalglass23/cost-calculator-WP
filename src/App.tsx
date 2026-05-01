import React, { useEffect, useRef, useState } from 'react';
import type { WizardAnswers, LeadData, WizardStep, EstimateResult } from './lib/calculator/types';
import { calculateEstimate } from './lib/calculator/engine';
import { usePricing, getConfig } from './hooks/usePricing';
import { WizardShell } from './components/wizard/WizardShell';
import {
  Step1ProjectType,
  Step2Length,
  Step3Height,
  Step4Corners,
  Step5Gates,
  Step6FixingMethod,
  Step7HardwareFinish,
} from './components/wizard/steps/Steps';
import { LeadCapture } from './components/wizard/LeadCapture';
import { ResultScreen } from './components/wizard/ResultScreen';

const INITIAL_ANSWERS: WizardAnswers = {
  projectType: null,
  length: 10,
  height: null,
  corners: 0,
  gates: 0,
  fixingMethod: null,
  hardwareFinish: null,
};

const INITIAL_LEAD: LeadData = {
  fullName: '',
  phone: '',
  email: '',
  customerType: null,
  timeframe: null,
  address: '',
  consent: false,
  marketingConsent: false,
};

function loadTurnstile() {
  if (document.querySelector('[data-rg-turnstile]')) return;
  const s = document.createElement('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  s.async = true;
  s.defer = true;
  s.setAttribute('data-rg-turnstile', '1');
  document.head.appendChild(s);
}

export default function App() {
  const { pricing, loading } = usePricing();
  const loadedAt = useRef(Date.now());

  const [step, setStep] = useState<WizardStep>(1);
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState<{ leadId: number; email: string; firstName: string } | null>(null);

  useEffect(() => {
    const config = getConfig();
    if (config.turnstileSiteKey) loadTurnstile();
  }, []);

  useEffect(() => {
    const el = document.getElementById('rg-calculator-root');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  function updateAnswers(updates: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...updates }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 1: return answers.projectType !== null;
      case 2: return answers.length >= 1;
      case 3: return answers.height !== null;
      case 4: return true;
      case 5: return true;
      case 6: return answers.fixingMethod !== null;
      case 7: return answers.hardwareFinish !== null;
      default: return true;
    }
  }

  function goBack() {
    if (step === 9) { setStep(7); return; }
    if (step === 8) { setStep(9); return; }
    if (step > 1) setStep((prev) => (prev - 1) as WizardStep);
  }

  function goForward() {
    if (step < 7) { setStep((prev) => (prev + 1) as WizardStep); return; }
    if (step === 7) {
      const result = calculateEstimate(answers, pricing);
      setEstimate(result);
      setStep(9); // go to lead capture first
    }
  }

  function handleLeadSuccess(leadId: number, email: string, firstName: string) {
    setLeadInfo({ leadId, email, firstName });
    setSubmitted(true);
    setStep(8);
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px', color: '#9ca3af', fontSize: '14px' }}>
        Loading calculator...
      </div>
    );
  }

  const isLeadStep = step === 9;
  const isResultStep = step === 8;

  const content = () => {
    switch (step) {
      case 1: return <Step1ProjectType answers={answers} onChange={updateAnswers} />;
      case 2: return <Step2Length answers={answers} onChange={updateAnswers} />;
      case 3: return <Step3Height answers={answers} onChange={updateAnswers} />;
      case 4: return <Step4Corners answers={answers} onChange={updateAnswers} />;
      case 5: return <Step5Gates answers={answers} onChange={updateAnswers} />;
      case 6: return <Step6FixingMethod answers={answers} onChange={updateAnswers} />;
      case 7: return <Step7HardwareFinish answers={answers} onChange={updateAnswers} />;
      case 9: return estimate ? (
        <LeadCapture answers={answers} estimate={estimate} loadedAt={loadedAt.current} onSuccess={handleLeadSuccess} onBack={() => setStep(7)} />
      ) : null;
      case 8: return estimate && leadInfo ? (
        <ResultScreen answers={answers} estimate={estimate} leadId={leadInfo.leadId} email={leadInfo.email} firstName={leadInfo.firstName} />
      ) : null;
      default: return null;
    }
  };

  return (
    <WizardShell
      step={step}
      onBack={goBack}
      onContinue={goForward}
      canContinue={canContinue()}
      hideNav={isLeadStep || isResultStep}
    >
      {content()}
    </WizardShell>
  );
}
