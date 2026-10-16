import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LensThumb } from "@/components/lens/LensThumb";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { locations } from "@/data/locations";

export const metadata: Metadata = { title: "Jelajahi 3D/360°" };

/** Daftar tujuh lokasi tur 3D/360° dengan thumbnail lensa. */
export default function JelajahiPage() {
  return (
    <>
      <PageHeader
        title="Jelajahi 3D/360°"
        intro="Tujuh ruang di hotel dan sudut kota tua Denpasar. Pilih satu, geser untuk melihat sekeliling, lalu ketuk titik ungu untuk membaca ceritanya."
      />
      <div className="page-x pb-16 lg:pb-28">
        <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
          {locations.map((loc) => (
            <li key={loc.slug} className="border-b border-line">
              <Link href={`/jelajahi/${loc.slug}`} className="group flex items-center gap-5 py-5 sm:gap-6 sm:py-6">
                <LensThumb
                  panorama={loc.panorama}
                  alt={`Cuplikan panorama ${loc.name}`}
                  className="w-24 transition-transform duration-300 group-hover:scale-[1.04] sm:w-32"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-display text-lg group-hover:text-primary sm:text-xl">{loc.name}</span>
                  <span className="text-sm text-muted">{loc.summary}</span>
                  <span className="text-xs text-muted">{loc.hotspots.length} titik cerita</span>
                </span>
                <Icon icon={ChevronRight} className="hidden shrink-0 text-muted group-hover:text-primary sm:block" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[68ch] text-xs text-muted">
          Panorama saat ini adalah gambar pengganti berlisensi CC0 dengan suasana serupa. Nanti diganti hasil rekaman
          asli hotel. Lihat{" "}
          <Link href="/kredit" className="underline underline-offset-4 hover:text-primary">
            kredit aset
          </Link>
          .
        </p>
      </div>
    </>
  );
}
