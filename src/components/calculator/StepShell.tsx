import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}

export function StepShell({
  step,
  total,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  loading,
}: Props) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>
            Step {step} <span className="text-muted-foreground/50">/ {total}</span>
          </span>
          <span className="font-medium text-primary">{pct}%</span>
        </div>
        <Progress value={pct} className="h-1" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elevated)]">
        <div className="border-b border-border/50 bg-gradient-to-b from-secondary/40 to-card px-6 py-7 sm:px-10 sm:py-9">
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="px-6 py-7 sm:px-10 sm:py-9">{children}</div>
        <div className="flex items-center justify-between gap-3 border-t border-border/50 bg-secondary/20 px-6 py-4 sm:px-10">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={!onBack || loading}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {onNext && (
            <Button
              type="button"
              onClick={onNext}
              disabled={nextDisabled || loading}
              size="lg"
              className="gap-2 px-6"
            >
              {loading ? "Working…" : nextLabel}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}