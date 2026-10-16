import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "md" | "sm" | "icon";

/** Kelas Tailwind untuk tombol dan tautan bergaya tombol. */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", full = false) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-ui font-medium transition-colors duration-150 select-none text-center",
    "disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:opacity-50",
    size === "md" && "min-h-12 px-5 text-sm",
    size === "sm" && "min-h-11 px-4 text-sm",
    size === "icon" && "size-11 shrink-0",
    variant === "primary" && "bg-primary text-surface hover:bg-primary/90 active:bg-primary/80",
    variant === "secondary" && "border border-primary bg-surface text-primary hover:bg-primary-soft",
    variant === "ghost" && "text-ink hover:bg-surface-2",
    variant === "inverse" && "bg-surface text-ink hover:bg-surface-2",
    full && "w-full",
  );
}
