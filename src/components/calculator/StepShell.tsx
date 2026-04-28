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
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {step} of {total}
          </span>
          <span>{pct}%</span>
        </div>
        <Progress value={pct} className="h-1.5" />
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
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
              className="gap-2"
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