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
              "group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-elevated)]",
              selected
                ? "border-primary ring-2 ring-primary/40 ring-offset-2 ring-offset-background shadow-[var(--shadow-elevated)]"
                : "border-border/70",
            )}
          >
            {opt.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={opt.image}
                  alt={opt.label}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {selected && (
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                )}
              </div>
            ) : null}
            <div className="flex flex-1 items-start gap-2 px-4 py-3.5">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-medium tracking-tight text-foreground">
                  {opt.label}
                  {opt.notSure && (
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" aria-label="Not sure" />
                  )}
                </div>
                {opt.description && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{opt.description}</p>
                )}
              </div>
              {selected && !opt.image && (
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