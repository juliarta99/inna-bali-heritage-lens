import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = { children: ReactNode; tone?: "soft" | "outline" | "solid"; className?: string };

/** Label kecil untuk status atau atribut, ditulis huruf biasa. */
export function Badge({ children, tone = "soft", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-ui px-2 py-0.5 text-xs font-medium",
        tone === "soft" && "bg-primary-soft text-primary",
        tone === "outline" && "border border-line text-muted",
        tone === "solid" && "bg-primary text-surface",
        className,
      )}
    >
      {children}
    </span>
  );
}
