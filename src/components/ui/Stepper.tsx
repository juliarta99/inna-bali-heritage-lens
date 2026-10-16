"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type StepperProps = {
  id?: string;
  /** Nama yang dibacakan, contoh "Jumlah tamu". */
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "md" | "sm";
};

/** Pengubah jumlah dengan tombol kurang dan tambah (target sentuh 44px). */
export function Stepper({ id, label, value, min = 0, max = 99, onChange, size = "md" }: StepperProps) {
  const btn = cn(
    "grid place-items-center text-ink transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:text-line",
    size === "md" ? "size-12" : "size-11",
  );
  return (
    <div id={id} role="group" aria-label={label} className="inline-flex items-center rounded-ui border border-line">
      <button
        type="button"
        className={cn(btn, "rounded-l-ui")}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Kurangi ${label.toLowerCase()}`}
      >
        <Icon icon={Minus} />
      </button>
      <output aria-live="polite" className="min-w-10 text-center text-base font-medium tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={cn(btn, "rounded-r-ui")}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Tambah ${label.toLowerCase()}`}
      >
        <Icon icon={Plus} />
      </button>
    </div>
  );
}
