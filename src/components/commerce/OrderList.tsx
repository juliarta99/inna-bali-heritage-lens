"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { formatRupiah, formatWaktu } from "@/lib/format";
import { useCart } from "./CartProvider";
import { Voucher } from "./Voucher";

/** Daftar pesanan dari state dan localStorage. Setiap pesanan bisa dibuka untuk melihat e-vouchernya. */
export function OrderList() {
  const { orders, hydrated } = useCart();
  const [openCode, setOpenCode] = useState<string | null>(null);

  if (!hydrated) return <p className="py-12 text-muted">Memuat pesanan</p>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 border-t border-line py-12">
        <p className="font-display text-2xl">Belum ada pesanan. Mulai dari paket heritage.</p>
        <ButtonLink href="/paket">Lihat paket heritage</ButtonLink>
      </div>
    );
  }

  return (
    <ul className="border-t border-line">
      {orders.map((order) => {
        const open = openCode === order.code;
        return (
          <li key={order.code} className="border-b border-line">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`order-${order.code}`}
              onClick={() => setOpenCode(open ? null : order.code)}
              className="flex w-full items-center gap-4 py-5 text-left hover:bg-surface-2 sm:px-2"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-display text-xl break-all">{order.code}</span>
                <span className="text-sm text-muted">
                  {formatWaktu(order.createdAt)}, {order.items.length} item
                </span>
                <span className="truncate text-sm">{order.items.map((i) => i.title).join(", ")}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-semibold tabular-nums">{formatRupiah(order.total)}</span>
                <span className="text-xs text-muted">Lunas</span>
              </span>
              <Icon icon={ChevronDown} className={cn("shrink-0 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
              <div id={`order-${order.code}`} className="animate-fade pb-6">
                <Voucher order={order} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
