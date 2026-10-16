import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccess } from "@/components/commerce/OrderSuccess";

export const metadata: Metadata = { title: "Pembayaran berhasil" };

/** Halaman sukses dengan e-voucher. */
export default function SuksesPage() {
  return (
    <div className="page-x py-10 lg:py-16">
      <Suspense fallback={<p className="py-12 text-muted">Memuat e-voucher</p>}>
        <OrderSuccess />
      </Suspense>
    </div>
  );
}
