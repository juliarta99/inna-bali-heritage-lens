import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";

type PriceTagProps = {
  amount: number;
  /** Harga coret (publish rate). */
  was?: number;
  suffix?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Harga dalam rupiah. Ukuran `lg` memakai Bodoni untuk angka besar. */
export function PriceTag({ amount, was, suffix, size = "md", className }: PriceTagProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {was !== undefined && (
        <span className="text-xs text-muted line-through">
          <span className="sr-only">Harga normal </span>
          {formatRupiah(was)}
        </span>
      )}
      <span className="flex flex-wrap items-baseline gap-x-1">
        <span
          className={cn(
            "text-ink",
            size === "sm" && "text-base font-semibold",
            size === "md" && "text-lg font-semibold",
            size === "lg" && "font-display text-2xl font-medium",
          )}
        >
          {formatRupiah(amount)}
        </span>
        {suffix && <span className="text-xs text-muted">{suffix}</span>}
      </span>
    </div>
  );
}
