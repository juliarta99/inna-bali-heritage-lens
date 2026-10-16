import type { Metadata } from "next";
import { OrderList } from "@/components/commerce/OrderList";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Pesanan saya" };

/** Halaman daftar pesanan. */
export default function PesananPage() {
  return (
    <>
      <PageHeader title="Pesanan saya" intro="Pesanan tersimpan di perangkat ini." />
      <div className="page-x pb-16 lg:pb-28">
        <OrderList />
      </div>
    </>
  );
}
