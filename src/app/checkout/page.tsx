import type { Metadata } from "next";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Checkout" };

/** Halaman checkout. */
export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" back={{ href: "/keranjang", label: "Kembali ke keranjang" }} />
      <div className="page-x pb-16 lg:pb-28">
        <CheckoutForm />
      </div>
    </>
  );
}
