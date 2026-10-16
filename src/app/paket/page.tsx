import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { LensThumb } from "@/components/lens/LensThumb";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLocation } from "@/data/locations";
import { packages, packageTotal } from "@/data/packages";
import { getRoom } from "@/data/rooms";
import { formatRupiah } from "@/lib/format";

export const metadata: Metadata = { title: "Paket heritage" };

/** Daftar empat paket heritage dengan harga pengalaman, contoh total, durasi, dan lokasi 3D terkait. */
export default function PaketPage() {
  return (
    <>
      <PageHeader
        title="Paket heritage"
        intro="Empat cara merasakan hotel internasional pertama di Bali, dari tiga jam tanpa menginap sampai akhir pekan penuh."
      />
      <div className="page-x pb-16 lg:pb-28">
        <ul className="flex flex-col border-t border-line">
          {packages.map((pkg) => {
            const { total, roomRate } = packageTotal(pkg, pkg.priceUnit === "per-orang" ? 1 : 2);
            const room = getRoom(pkg.roomId);
            return (
              <li
                key={pkg.slug}
                className="grid gap-6 border-b border-line py-8 md:grid-cols-[2fr_3fr] md:gap-10 lg:py-12"
              >
                <Link href={`/paket/${pkg.slug}`} aria-hidden="true" tabIndex={-1}>
                  <Photo image={pkg.cover} ratio="aspect-[3/2]" sizes="(min-width: 768px) 40vw, 100vw" />
                </Link>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl lg:text-3xl">
                      <Link href={`/paket/${pkg.slug}`} className="hover:text-primary">
                        {pkg.name}
                      </Link>
                    </h2>
                    <p className="flex items-center gap-2 text-sm text-muted">
                      <Icon icon={Clock} />
                      {pkg.duration}
                    </p>
                  </div>
                  <p className="max-w-[56ch] text-muted">{pkg.tagline}</p>

                  <dl className="grid grid-cols-2 gap-4 rounded-ui border border-line p-4 text-sm">
                    <div>
                      <dt className="text-muted">Harga pengalaman</dt>
                      <dd className="mt-1 font-semibold">
                        {formatRupiah(pkg.experiencePrice)}
                        <span className="block text-xs font-normal text-muted">
                          {pkg.priceUnit === "per-2"
                            ? "untuk 2 orang"
                            : `per orang, pelajar ${formatRupiah(pkg.studentPrice ?? pkg.experiencePrice)}`}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted">Contoh total</dt>
                      <dd className="mt-1 font-display text-xl">
                        {formatRupiah(total)}
                        <span className="block font-sans text-xs text-muted">
                          {room
                            ? `${room.name} ${formatRupiah(roomRate)} x ${pkg.nights} malam + pengalaman`
                            : "1 orang dewasa"}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted">Lihat lokasinya dalam 3D/360°</p>
                    <ul className="flex flex-wrap gap-2">
                      {pkg.locations.map((slug) => {
                        const loc = getLocation(slug);
                        if (!loc) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/jelajahi/${slug}`}
                              className="flex min-h-11 items-center gap-2 rounded-ui border border-line py-1 pr-4 pl-1 text-sm hover:border-primary hover:text-primary"
                            >
                              <LensThumb panorama={loc.panorama} alt="" className="w-9 p-0.5" sizes="36px" />
                              {loc.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <ButtonLink href={`/paket/${pkg.slug}`}>Lihat detail paket</ButtonLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-muted">
          Hanya butuh kamar?{" "}
          <Link href="/kamar" className="font-medium text-primary underline underline-offset-4">
            Pesan kamar langsung
          </Link>
        </p>
      </div>
    </>
  );
}
