import React, { useState } from "react";
import type {
  WizardAnswers,
  Scenario,
  FixingMethod,
  HardwareFinish,
} from "../lib/calculator/types";
import { IMAGES } from "../lib/calculator/config";
import { SelectionCard, SliderInput, StepNote, ComplianceWarning } from "./wizard/steps/shared";

interface Props {
  answers: WizardAnswers;
  onChange: (updates: Partial<WizardAnswers>) => void;
  onGetEstimate: () => void;
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#1a3c5e",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "700",
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1a3c5e" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

const SCENARIOS: Array<{ value: Scenario; title: string; description: string; image: string }> = [
  {
    value: "deck_pool_fence",
    title: "Deck Pool Fence",
    description: "Ground-level pool or outdoor area - <=1m height - $280/m",
    image: IMAGES.pool,
  },
  {
    value: "balcony_balustrade",
    title: "Balcony / Patio Balustrade",
    description: "Elevated deck, balcony or patio - >1m height - $320/m",
    image: IMAGES.deck,
  },
  {
    value: "premium_pool_fence",
    title: "Premium Pool Fence",
    description: "High-spec pool fencing - NZ Pool Safety Act - $380/m",
    image: IMAGES.pool,
  },
  {
    value: "stair_balustrade",
    title: "Stair Balustrade",
    description: "Glass panels along stairs - NZBC Stair Safety Code - $330/m",
    image: IMAGES.deck,
  },
];

const FIXING_OPTIONS: Array<{
  value: FixingMethod;
  title: string;
  description: string;
  image: string;
}> = [
  {
    value: "spigots",
    title: "Spigots",
    description: "Round or square posts drilled into the floor - most common",
    image: IMAGES.spigots,
  },
  {
    value: "standoff_posts",
    title: "Stand-off Posts",
    description: "Bracket-mounted on the face of the structure",
    image: IMAGES.standoff,
  },
  {
    value: "hidden_channel",
    title: "Hidden Channel",
    description: "Glass appears to float - recessed channel in the floor",
    image: IMAGES.hiddenChannel,
  },
  {
    value: "not_sure",
    title: "Not Sure",
    description: "Our team will recommend the best option on site",
    image: IMAGES.notSure,
  },
];

const FINISH_OPTIONS: Array<{
  value: HardwareFinish;
  title: string;
  description: string;
  image: string;
  surcharge?: string;
}> = [
  {
    value: "standard_chrome",
    title: "Standard Chrome",
    description: "Included in base price",
    image: IMAGES.chrome,
  },
  {
    value: "matte_black",
    title: "Matte Black",
    description: "Most popular premium finish",
    image: IMAGES.matteBlack,
    surcharge: "+$15/m",
  },
  {
    value: "brushed_chrome",
    title: "Brushed Chrome",
    description: "Subtle step up from standard",
    image: IMAGES.brushedChrome,
    surcharge: "+$12/m",
  },
  {
    value: "brass",
    title: "Brass",
    description: "Premium - suits modern/luxury",
    image: IMAGES.brass,
    surcharge: "+$22/m",
  },
  {
    value: "not_sure",
    title: "Not Sure",
    description: "Team will help you choose on site",
    image: IMAGES.notSure,
  },
];

const CALL_TRIGGERS = [
  { id: "upper_floor", label: "Upper floor installation (first floor or higher)" },
  { id: "scaffold", label: "Scaffold or elevated access required" },
  { id: "high_rise", label: "High-rise building (3+ floors)" },
  { id: "hard_access", label: "Difficult or long-carry site access" },
  { id: "custom_glass", label: "Custom or curved glass required" },
  { id: "custom_colour", label: "Custom colour hardware (powder coat / RAL)" },
];

export function CalculatorForm({ answers, onChange, onGetEstimate }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const gatesHidden = answers.scenario === "balcony_balustrade";
  const gatesMandatory = answers.scenario === "premium_pool_fence";

  function handleScenarioChange(value: Scenario) {
    const updates: Partial<WizardAnswers> = { scenario: value };
    if (value === "premium_pool_fence" && answers.gates === 0) updates.gates = 1;
    if (value === "balcony_balustrade") updates.gates = 0;
    onChange(updates);
  }

  function toggleCallTrigger(id: string) {
    const current = answers.callTriggers;
    const updated = current.includes(id)
      ? current.filter((trigger) => trigger !== id)
      : [...current, id];
    onChange({ callTriggers: updated });
  }

  const canGetEstimate =
    answers.scenario !== null && answers.fixingMethod !== null && answers.hardwareFinish !== null;

  const steps = [
    {
      title: "What's your project?",
      canContinue: answers.scenario !== null,
      content: (
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}
        >
          {SCENARIOS.map((scenario) => (
            <SelectionCard
              key={scenario.value}
              image={scenario.image}
              title={scenario.title}
              description={scenario.description}
              selected={answers.scenario === scenario.value}
              onSelect={() => handleScenarioChange(scenario.value)}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Total length of glass run",
      canContinue: true,
      content: (
        <>
          <SliderInput
            label="Metres"
            value={answers.length}
            min={1}
            max={100}
            step={1}
            unit="m"
            onChange={(value) => onChange({ length: value })}
          />
          {answers.length < 5 && (
            <StepNote>Minimum job is 5 m - shorter runs are charged as 5 m.</StepNote>
          )}
        </>
      ),
    },
    {
      title: "How many corners?",
      canContinue: true,
      content: (
        <>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <SliderInput
                label="Corners"
                value={answers.corners}
                min={0}
                max={10}
                step={1}
                unit=""
                onChange={(value) => onChange({ corners: value })}
              />
            </div>
            <img
              src={IMAGES.corners}
              alt="How to count corners"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "12px",
                flexShrink: 0,
              }}
              loading="lazy"
            />
          </div>
          <StepNote>Count every 90 degree turn in the glass run. Each corner adds $85.</StepNote>
        </>
      ),
    },
    ...(!gatesHidden
      ? [
          {
            title: "How many gates?",
            canContinue: true,
            content: (
              <>
                <SliderInput
                  label="Gates"
                  value={answers.gates}
                  min={0}
                  max={6}
                  step={1}
                  unit=""
                  onChange={(value) => onChange({ gates: value })}
                />
                {gatesMandatory && (
                  <ComplianceWarning>
                    NZ Pool Safety Act requires at least 1 self-closing, lockable gate on all pool
                    fences.
                  </ComplianceWarning>
                )}
                {gatesMandatory && answers.gates === 0 && (
                  <ComplianceWarning>
                    You've set 0 gates - this doesn't meet NZ Pool Safety Act requirements.
                  </ComplianceWarning>
                )}
              </>
            ),
          },
        ]
      : []),
    {
      title: "How will the glass be fixed?",
      canContinue: answers.fixingMethod !== null,
      content: (
        <>
          <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6b7280" }}>
            This is a preference - no price impact. Our team will confirm suitability on site.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            {FIXING_OPTIONS.map((option) => (
              <SelectionCard
                key={option.value}
                image={option.image}
                title={option.title}
                description={option.description}
                selected={answers.fixingMethod === option.value}
                onSelect={() => onChange({ fixingMethod: option.value })}
                compact
              />
            ))}
          </div>
        </>
      ),
    },
    {
      title: "Hardware finish",
      canContinue: answers.hardwareFinish !== null,
      content: (
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}
        >
          {FINISH_OPTIONS.map((option) => (
            <SelectionCard
              key={option.value}
              image={option.image}
              title={option.title}
              description={`${option.description}${option.surcharge ? ` - ${option.surcharge}` : ""}`}
              selected={answers.hardwareFinish === option.value}
              onSelect={() => onChange({ hardwareFinish: option.value })}
              compact
            />
          ))}
        </div>
      ),
    },
    {
      title: "Any of these apply to your site?",
      canContinue: canGetEstimate,
      content: (
        <>
          <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6b7280" }}>
            Tick anything that applies. These situations need a site visit before we can quote
            accurately.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {CALL_TRIGGERS.map((trigger) => (
              <label
                key={trigger.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: `1px solid ${answers.callTriggers.includes(trigger.id) ? "#1a3c5e" : "#e6eaef"}`,
                  background: answers.callTriggers.includes(trigger.id) ? "#f0f4f8" : "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#1a3c5e",
                }}
              >
                <input
                  type="checkbox"
                  checked={answers.callTriggers.includes(trigger.id)}
                  onChange={() => toggleCallTrigger(trigger.id)}
                  style={{ width: "18px", height: "18px", accentColor: "#1a3c5e", flexShrink: 0 }}
                />
                {trigger.label}
              </label>
            ))}
          </div>
          {answers.callTriggers.length > 0 && (
            <ComplianceWarning>
              One or more of your site conditions requires a custom quote. Royal Glass will contact
              you to confirm the final price.
            </ComplianceWarning>
          )}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "16px 20px",
              marginTop: "24px",
              fontSize: "13px",
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            <strong style={{ color: "#1a3c5e" }}>This estimate assumes:</strong> toughened 12mm
            glass, timber or concrete substrate, NZ standard height for selected scenario,
            ground-level access, and straight panels. If any of these do not apply, call Royal Glass
            for a custom quote. <strong>Excludes:</strong> GST, site clearance, council permits, and
            scaffolding.
          </div>
        </>
      ),
    },
  ];

  const currentStep = steps[Math.min(activeStep, steps.length - 1)];
  const isLastStep = activeStep === steps.length - 1;
  const progressPercent = Math.round(((activeStep + 1) / steps.length) * 100);

  function goBack() {
    setActiveStep((step) => Math.max(0, step - 1));
  }

  function goForward() {
    if (!currentStep.canContinue) return;
    if (isLastStep) onGetEstimate();
    else setActiveStep((step) => Math.min(steps.length - 1, step + 1));
  }

  return (
    <div
      style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px", fontFamily: "inherit" }}
    >
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "800", color: "#1a3c5e" }}>
          Get a Glass Estimate
        </h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>
          Answer a few questions, enter your details, and then view your indicative estimate.
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a3c5e" }}>
            Step {activeStep + 1} of {steps.length}
          </span>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>{progressPercent}%</span>
        </div>
        <div
          style={{
            height: "6px",
            width: "100%",
            background: "#e6eaef",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "#1a3c5e",
              borderRadius: "999px",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      <Section number={activeStep + 1} title={currentStep.title}>
        {currentStep.content}
      </Section>

      <div
        style={{
          borderTop: "2px solid #e6eaef",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={goBack}
          disabled={activeStep === 0}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            background: "white",
            color: activeStep === 0 ? "#9ca3af" : "#1a3c5e",
            border: "1px solid #d1d5db",
            cursor: activeStep === 0 ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={!currentStep.canContinue}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "10px",
            background: currentStep.canContinue ? "#1a3c5e" : "#9ca3af",
            color: "white",
            border: "none",
            cursor: currentStep.canContinue ? "pointer" : "not-allowed",
            fontSize: "15px",
            fontWeight: "700",
          }}
        >
          {isLastStep ? "Continue - Enter Your Details" : "Continue"}
        </button>
      </div>
    </div>
  );
}
