import type { Metadata } from "next";
import { GalleryView } from "@/components/gallery/GalleryView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Gallery" };

/** Halaman Gallery dengan filter era dan 100 Tahun, 100 Cerita. */
export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        intro="Foto hotel dari masa ke masa. Ketuk foto untuk melihat keterangan dan sumbernya."
      />
      <div className="page-x pb-16 lg:pb-28">
        <GalleryView />
      </div>
    </>
  );
}
