import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface Props {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SliderField({ value, onChange, min, max, step = 1, unit = "" }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {min}
          {unit} – {max}
          {unit}
        </span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) onChange(Math.max(min, Math.min(max, n)));
            }}
            className="w-24 text-right"
          />
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0] ?? min)}
      />
    </div>
  );
}