import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check, Clock, X } from "lucide-react";
import { PackageBooking } from "@/components/commerce/PackageBooking";
import { StickyBookBar } from "@/components/commerce/StickyBookBar";
import { LensThumb } from "@/components/lens/LensThumb";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { getLocation } from "@/data/locations";
import { getPackage, packages, packageTotal } from "@/data/packages";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/paket/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPackage(slug)?.name ?? "Paket tidak ditemukan" };
}

/** Halaman detail paket. `params` dibaca di dalam Suspense agar navigasi terasa instan. */
export default function PaketDetailPage({ params }: PageProps<"/paket/[slug]">) {
  return (
    <Suspense fallback={<p className="page-x py-16 text-muted">Memuat paket</p>}>
      <PaketContent params={params} />
    </Suspense>
  );
}

/** Detail paket: galeri, itinerary, termasuk/tidak termasuk, lokasi 3D, dan form pemesanan. */
async function PaketContent({ params }: { params: PageProps<"/paket/[slug]">["params"] }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const sample = packageTotal(pkg, pkg.priceUnit === "per-orang" ? 1 : 2);
  const [main, ...rest] = pkg.gallery;

  return (
    <>
      <PageHeader title={pkg.name} intro={pkg.tagline} back={{ href: "/paket", label: "Semua paket" }}>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Icon icon={Clock} />
          {pkg.duration}
        </p>
      </PageHeader>

      <div className="page-x pb-28 lg:pb-28">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2">
          <Photo
            image={main}
            ratio="aspect-[3/2] md:aspect-auto md:h-full"
            className="col-span-2 md:col-span-1 md:row-span-2"
            sizes="(min-width: 768px) 66vw, 100vw"
            priority
          />
          {rest.map((img) => (
            <Photo key={img.src} image={img} ratio="aspect-[3/2]" sizes="(min-width: 768px) 33vw, 50vw" compact />
          ))}
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1fr_24rem] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-12">
            <p className="max-w-[68ch] text-lg">{pkg.description}</p>

            <section aria-labelledby="itinerary">
              <h2 id="itinerary" className="text-2xl">
                Itinerary
              </h2>
              <ol className="mt-5 flex flex-col">
                {pkg.itinerary.map((step, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] gap-4 border-t border-line py-4">
                    <span className="grid size-8 place-items-center rounded-full border border-primary text-sm font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm text-muted">
                        {step.day}, pukul {step.time}
                      </p>
                      <p className="mt-0.5">{step.activity}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-10 sm:grid-cols-2">
              <section aria-labelledby="termasuk">
                <h2 id="termasuk" className="text-xl">
                  Termasuk
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Icon icon={Check} className="mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="tidak-termasuk">
                <h2 id="tidak-termasuk" className="text-xl">
                  Tidak termasuk
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted">
                      <Icon icon={X} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section aria-labelledby="lokasi-3d">
              <h2 id="lokasi-3d" className="text-xl">
                Lihat lokasinya sebelum datang
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {pkg.locations.map((s) => {
                  const loc = getLocation(s);
                  if (!loc) return null;
                  return (
                    <li key={s}>
                      <Link
                        href={`/jelajahi/${s}`}
                        className="flex items-center gap-4 rounded-ui border border-line p-3 hover:border-primary"
                      >
                        <LensThumb panorama={loc.panorama} alt="" className="w-16" sizes="64px" />
                        <span className="flex flex-col">
                          <span className="font-medium">{loc.name}</span>
                          <span className="text-xs text-muted">Tur 3D/360°</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <aside id="pesan" aria-labelledby="pesan-judul" className="scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-ui border border-line p-5 sm:p-6">
              <h2 id="pesan-judul" className="text-xl">
                Pesan paket
              </h2>
              <div className="mt-5">
                <PackageBooking pkg={pkg} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <StickyBookBar
        label={pkg.priceUnit === "per-2" ? "Contoh total untuk 2 orang" : "Per orang dewasa"}
        amount={sample.total}
        target="#pesan"
        cta="Pilih tanggal"
      />
    </>
  );
}
