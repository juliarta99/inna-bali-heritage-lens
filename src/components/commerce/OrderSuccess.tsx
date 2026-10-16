"use client";

import { CircleCheck, Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "./CartProvider";
import { Voucher } from "./Voucher";

/** Isi halaman sukses: konfirmasi, e-voucher pesanan dari `?kode=`, dan tombol lanjutan. */
export function OrderSuccess() {
  const params = useSearchParams();
  const code = params.get("kode");
  const { orders, hydrated } = useCart();
  const toast = useToast();
  const order = orders.find((o) => o.code === code) ?? (code ? undefined : orders[0]);

  if (!hydrated) return <p className="py-12 text-muted">Memuat e-voucher</p>;

  if (!order) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <p className="font-display text-2xl">Pesanan tidak ditemukan.</p>
        <p className="text-muted">Pesanan disimpan di perangkat ini. Coba buka daftar pesanan.</p>
        <ButtonLink href="/pesanan">Lihat pesanan</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Icon icon={CircleCheck} size={40} className="text-primary" />
        <h1 className="text-h1m lg:text-3xl">Pembayaran berhasil</h1>
        <p className="text-muted">
          Terima kasih, {order.customer.name}. E-voucher juga dikirim ke {order.customer.email} (simulasi).
        </p>
      </div>
      <Voucher order={order} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => toast({ message: "Prototipe: e-voucher belum bisa diunduh.", tone: "info" })}>
          <Icon icon={Download} />
          Simpan ke HP
        </Button>
        <ButtonLink href="/pesanan" variant="secondary">
          Lihat pesanan
        </ButtonLink>
      </div>
    </div>
  );
}
