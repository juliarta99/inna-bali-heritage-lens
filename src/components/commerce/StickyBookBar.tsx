import { buttonClasses } from "@/components/ui/buttonClasses";
import { formatRupiah } from "@/lib/format";

type StickyBookBarProps = { label: string; amount: number; target: string; cta: string };

/** Bar menempel di bawah layar (mobile saja) yang mengarah ke form pemesanan. */
export function StickyBookBar({ label, amount, target, cta }: StickyBookBarProps) {
  return (
    <div data-sticky-bar className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface lg:hidden">
      <div className="page-x flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-muted">{label}</p>
          <p className="font-display text-xl">{formatRupiah(amount)}</p>
        </div>
        <a href={target} className={buttonClasses("primary", "md")}>
          {cta}
        </a>
      </div>
    </div>
  );
}
