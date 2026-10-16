"use client";

import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type VrToggleProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

/**
 * Tombol kendali viewer (Mode VR, Gerakkan HP, Layar penuh).
 * Di mobile ikon di atas label, di layar lebar ikon di samping label.
 */
export function VrToggle({ icon, label, active, disabled, onClick }: VrToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "flex min-h-14 min-w-16 flex-col items-center justify-center gap-0.5 rounded-ui px-2 text-[0.6875rem] font-medium transition-colors sm:min-h-11 sm:flex-row sm:gap-2 sm:px-3 sm:text-sm",
        "disabled:cursor-not-allowed disabled:opacity-50",
        active ? "bg-primary text-surface" : "bg-surface text-ink hover:bg-surface-2",
      )}
    >
      <Icon icon={icon} />
      {label}
    </button>
  );
}
