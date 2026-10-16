import { QrCode } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Order, PaymentMethod } from "@/data/types";
import { site } from "@/data/site";
import { formatRupiah, formatWaktu } from "@/lib/format";
import { PriceBreakdown } from "./PriceBreakdown";

export const paymentLabel: Record<PaymentMethod, string> = {
  qris: "QRIS",
  va: "Virtual Account",
  kartu: "Kartu kredit/debit",
};

/** E-voucher pesanan: kode, QR placeholder, rincian item, dan total. Bergaya tiket kapal dengan sobekan. */
export function Voucher({ order }: { order: Order }) {
  return (
    <article
      aria-label={`E-voucher ${order.code}`}
      className="overflow-hidden rounded-ui border border-line bg-surface"
    >
      <header className="flex flex-col gap-1 bg-primary px-5 py-5 text-surface sm:px-8">
        <p className="text-sm opacity-90">{site.hotel}</p>
        <p className="font-display text-2xl">E-voucher</p>
      </header>

      <div className="grid gap-6 px-5 py-6 sm:grid-cols-[1fr_auto] sm:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="col-span-2">
            <dt className="text-muted">Kode pesanan</dt>
            <dd className="font-display text-2xl tracking-wide break-all">{order.code}</dd>
          </div>
          <div>
            <dt className="text-muted">Atas nama</dt>
            <dd className="font-medium break-words">{order.customer.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Dibayar</dt>
            <dd className="font-medium">{formatWaktu(order.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted">Metode</dt>
            <dd className="font-medium">{paymentLabel[order.payment]}</dd>
          </div>
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="font-medium">Lunas</dd>
          </div>
        </dl>
        <div className="flex flex-col items-center gap-2">
          <div className="grid size-36 place-items-center rounded-ui border-2 border-dashed border-line bg-surface-2 text-muted">
            <Icon icon={QrCode} size={40} />
          </div>
          <p className="text-xs text-muted">Tunjukkan saat check-in</p>
        </div>
      </div>

      <div className="relative border-t border-dashed border-line">
        <span
          className="absolute -top-3 -left-3 size-6 rounded-full border border-line bg-surface-2"
          aria-hidden="true"
        />
        <span
          className="absolute -top-3 -right-3 size-6 rounded-full border border-line bg-surface-2"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-5 px-5 py-6 sm:px-8">
        <ul className="flex flex-col gap-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-sm">
              <div className="min-w-0">
                <p className="font-medium">
                  {item.title}
                  {item.quantity > 1 && <span className="text-muted"> x {item.quantity}</span>}
                </p>
                <ul className="text-muted">
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {item.gift && (
                  <p className="mt-1">
                    Kode gift: <span className="font-semibold text-primary">{item.gift.code}</span>
                  </p>
                )}
              </div>
              <p className="shrink-0 tabular-nums">{formatRupiah(item.unitPrice * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <PriceBreakdown
          lines={[
            { label: "Subtotal", amount: order.subtotal },
            ...(order.discount > 0
              ? [{ label: `Voucher ${order.voucherCode}`, amount: order.discount, negative: true }]
              : []),
          ]}
          totalLabel="Total dibayar"
          total={order.total}
        />
      </div>
    </article>
  );
}
