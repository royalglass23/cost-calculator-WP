import { cn } from "@/lib/utils";
import { Check, HelpCircle } from "lucide-react";
import type { VisualOption } from "@/lib/calculator/wizardData";

interface Props<V extends string> {
  options: VisualOption<V>[];
  value: V | undefined;
  onChange: (v: V) => void;
  columns?: 2 | 3 | 4;
}

export function VisualChoice<V extends string>({ options, value, onChange, columns = 2 }: Props<V>) {
  const grid =
    columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={cn("grid grid-cols-1 gap-3", grid)}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-all",
              "hover:border-primary/60 hover:shadow-[var(--shadow-soft)]",
              selected
                ? "border-primary ring-2 ring-primary/30 shadow-[var(--shadow-elevated)]"
                : "border-border",
            )}
          >
            {opt.image && (
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={opt.image}
                  alt={opt.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 items-start gap-2 p-3">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-medium">
                  {opt.label}
                  {opt.notSure && (
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" aria-label="Not sure" />
                  )}
                </div>
                {opt.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{opt.description}</p>
                )}
              </div>
              {selected && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}