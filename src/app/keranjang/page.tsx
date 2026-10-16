import type { Metadata } from "next";
import { CartSummary } from "@/components/commerce/CartSummary";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Keranjang" };

/** Halaman keranjang. */
export default function KeranjangPage() {
  return (
    <>
      <PageHeader title="Keranjang" />
      <div className="page-x pb-16 lg:pb-28">
        <CartSummary />
      </div>
    </>
  );
}
