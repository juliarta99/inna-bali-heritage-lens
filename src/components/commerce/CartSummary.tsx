"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Stepper } from "@/components/ui/Stepper";
import { useToast } from "@/components/ui/Toast";
import { formatRupiah } from "@/lib/format";
import { useCart } from "./CartProvider";
import { KindIcon, kindLabel } from "./KindIcon";
import { PriceBreakdown } from "./PriceBreakdown";

/** Isi keranjang (paket, kamar, Box, Gift) dengan pengubah jumlah, tombol hapus, dan ringkasan. */
export function CartSummary() {
  const { items, hydrated, subtotal, setQuantity, removeItem } = useCart();
  const toast = useToast();

  if (!hydrated) {
    return <p className="py-12 text-muted">Memuat keranjang</p>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 border-t border-line py-12">
        <p className="font-display text-2xl">Keranjang masih kosong.</p>
        <p className="max-w-[52ch] text-muted">
          Mulai dari paket heritage, pesan kamar, atau pilih Heritage Box sebagai oleh-oleh.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/paket">Lihat paket</ButtonLink>
          <ButtonLink href="/kamar" variant="secondary">
            Book kamar
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <ul className="border-t border-line">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 border-b border-line py-6">
            <KindIcon kind={item.kind} />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted">{kindLabel[item.kind]}</p>
                  <Link href={item.href} className="font-medium hover:text-primary">
                    {item.title}
                  </Link>
                  <ul className="mt-1 text-sm text-muted">
                    {item.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <p className="shrink-0 font-semibold tabular-nums sm:text-right">
                  {formatRupiah(item.unitPrice * item.quantity)}
                  {item.quantity > 1 && (
                    <span className="block text-xs font-normal text-muted">
                      {formatRupiah(item.unitPrice)} per item
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                {item.maxQuantity > 1 ? (
                  <Stepper
                    size="sm"
                    label={`Jumlah ${item.title}`}
                    value={item.quantity}
                    min={1}
                    max={item.maxQuantity}
                    onChange={(q) => setQuantity(item.id, q)}
                  />
                ) : (
                  <span className="text-sm text-muted">Jumlah 1</span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    removeItem(item.id);
                    toast({ message: `${item.title} dihapus dari keranjang`, tone: "info" });
                  }}
                  aria-label={`Hapus ${item.title}`}
                  className="flex min-h-11 items-center gap-1.5 rounded-ui px-3 text-sm text-muted hover:bg-surface-2 hover:text-ink"
                >
                  <Icon icon={Trash2} />
                  <span className="hidden sm:inline">Hapus</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside aria-label="Ringkasan" className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-5 rounded-ui border border-line p-5 sm:p-6">
          <PriceBreakdown
            lines={[{ label: `Subtotal (${items.reduce((n, i) => n + i.quantity, 0)} item)`, amount: subtotal }]}
            total={subtotal}
          />
          <p className="text-xs text-muted">Kode voucher Heritage Gift bisa dimasukkan di langkah berikutnya.</p>
          <ButtonLink href="/checkout" full>
            Lanjut ke checkout
          </ButtonLink>
          <Link href="/paket" className="text-center text-sm text-primary underline-offset-4 hover:underline">
            Tambah paket lain
          </Link>
        </div>
      </aside>
    </div>
  );
}
