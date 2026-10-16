import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";

export type BreakdownLine = { label: string; amount: number; note?: string; negative?: boolean };

type PriceBreakdownProps = { lines: BreakdownLine[]; totalLabel?: string; total: number; className?: string };

/** Rincian harga baris demi baris dengan total di bawah. */
export function PriceBreakdown({ lines, totalLabel = "Total", total, className }: PriceBreakdownProps) {
  return (
    <dl className={cn("flex flex-col gap-2 text-sm", className)}>
      {lines.map((line) => (
        <div key={line.label} className="flex items-start justify-between gap-4">
          <dt className="text-muted">
            {line.label}
            {line.note && <span className="block text-xs">{line.note}</span>}
          </dt>
          <dd className="shrink-0 text-right tabular-nums">
            {line.negative ? "-" : ""}
            {formatRupiah(line.amount)}
          </dd>
        </div>
      ))}
      <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <dt className="font-semibold">{totalLabel}</dt>
        <dd className="font-display text-2xl tabular-nums">{formatRupiah(total)}</dd>
      </div>
    </dl>
  );
}
