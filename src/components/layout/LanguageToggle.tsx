"use client";

import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

/** Pemilih bahasa ID/EN (dummy). EN hanya menampilkan notifikasi. */
export function LanguageToggle({ className }: { className?: string }) {
  const toast = useToast();
  const base = "min-h-11 min-w-11 px-2 text-xs font-semibold rounded-[4px] transition-colors";
  return (
    <div
      role="group"
      aria-label="Pilih bahasa"
      className={cn("flex items-center rounded-ui border border-line p-0.5", className)}
    >
      <button type="button" aria-pressed="true" className={cn(base, "bg-primary-soft text-primary")}>
        ID
      </button>
      <button
        type="button"
        aria-pressed="false"
        className={cn(base, "text-muted hover:text-ink")}
        onClick={() => toast({ message: "Versi English segera hadir", tone: "info" })}
      >
        EN
      </button>
    </div>
  );
}
