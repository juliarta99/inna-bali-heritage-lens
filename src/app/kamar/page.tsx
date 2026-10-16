import type { Metadata } from "next";
import { RoomBooking } from "@/components/commerce/RoomBooking";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Book kamar" };

/** Halaman Book Kamar. */
export default function KamarPage() {
  return (
    <>
      <PageHeader
        title="Book kamar"
        intro="Menginap di bangunan cagar budaya di jantung Denpasar. Semua kamar berkapasitas 2 dewasa dan tarif sudah termasuk pajak."
      />
      <div className="page-x pb-16 lg:pb-28">
        <RoomBooking />
      </div>
    </>
  );
}
