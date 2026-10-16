import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type StepIndicatorProps = {
  steps: string[];
  /** Indeks langkah aktif, mulai dari 0. */
  current: number;
};

/** Penanda langkah bernomor untuk alur berurutan (misalnya Heritage Gift). */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="flex w-full items-start gap-2" aria-label="Langkah">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex flex-1 flex-col gap-2" aria-current={active ? "step" : undefined}>
            <div className={cn("h-1 rounded-full", i <= current ? "bg-primary" : "bg-line")} />
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border text-xs font-semibold",
                  done && "border-primary bg-primary text-surface",
                  active && "border-primary text-primary",
                  !done && !active && "border-line text-muted",
                )}
              >
                {done ? <Icon icon={Check} size={16} /> : i + 1}
              </span>
              <span className={cn("text-xs sm:text-sm", active ? "font-medium text-ink" : "text-muted")}>{step}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
