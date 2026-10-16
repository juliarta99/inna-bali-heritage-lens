import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArViewer } from "@/components/lens/ArViewer";
import { BeforeAfterSlider } from "@/components/lens/BeforeAfterSlider";
import { LensThumb } from "@/components/lens/LensThumb";
import { LocationExplorer } from "@/components/lens/LocationExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { PriceTag } from "@/components/ui/PriceTag";
import { getLocation, locations } from "@/data/locations";
import { getPackage, packageTotal } from "@/data/packages";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jelajahi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  return { title: loc ? `${loc.name} 360°` : "Lokasi tidak ditemukan" };
}

/**
 * Halaman viewer satu lokasi. `params` dibaca di dalam Suspense agar kerangka
 * halaman (App Shell) bisa diprefetch dan navigasi terasa instan.
 */
export default function LokasiPage({ params }: PageProps<"/jelajahi/[slug]">) {
  return (
    <Suspense fallback={<LokasiFallback />}>
      <LokasiContent params={params} />
    </Suspense>
  );
}

/** Kerangka sementara seukuran viewer selama data lokasi dimuat. */
function LokasiFallback() {
  return (
    <div className="md:page-x md:pt-6">
      <div className="grid h-[calc(100svh-4rem)] w-full place-items-center bg-ink text-sm text-surface md:aspect-video md:h-auto md:rounded-ui">
        Memuat lensa
      </div>
    </div>
  );
}

/** Isi halaman lokasi: viewer, Dulu vs Sekarang, AR, paket terkait, dan navigasi lokasi. */
async function LokasiContent({ params }: { params: PageProps<"/jelajahi/[slug]">["params"] }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const pkg = getPackage(location.relatedPackage);
  const index = locations.findIndex((l) => l.slug === slug);
  const prev = locations[(index - 1 + locations.length) % locations.length];
  const next = locations[(index + 1) % locations.length];

  return (
    <>
      <LocationExplorer key={location.slug} location={location} packageName={pkg?.name ?? "Paket heritage"}>
        <div className="page-x pt-6 pb-8 md:pt-8">
          <Link
            href="/jelajahi"
            className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm text-muted hover:text-primary"
          >
            <Icon icon={ChevronLeft} />
            Semua lokasi
          </Link>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-h1m lg:text-4xl">{location.name}</h1>
              <p className="mt-3 max-w-[68ch] text-muted lg:text-lg">{location.summary}</p>
            </div>
            {location.model && (
              <div className="shrink-0">
                <ArViewer model={location.model} />
              </div>
            )}
          </div>
        </div>
      </LocationExplorer>

      {location.archiveCompare && (
        <section aria-labelledby="dulu-sekarang" className="border-t border-line bg-surface-2">
          <div className="page-x section-y grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 id="dulu-sekarang" className="text-2xl lg:text-3xl">
                Dulu vs Sekarang
              </h2>
              <p className="mt-3 max-w-[48ch] text-muted">
                Geser pegangan untuk membandingkan foto arsip dengan kondisi ruang hari ini.
              </p>
            </div>
            <BeforeAfterSlider before={location.archiveCompare.before} after={location.archiveCompare.after} />
          </div>
        </section>
      )}

      {pkg && (
        <section aria-labelledby="paket-terkait" className="border-t border-line">
          <div className="page-x section-y grid items-center gap-8 md:grid-cols-2 lg:gap-16">
            <Photo image={pkg.cover} ratio="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted">Paket terkait</p>
              <h2 id="paket-terkait" className="text-2xl lg:text-3xl">
                {pkg.name}
              </h2>
              <p className="max-w-[52ch] text-muted">{pkg.tagline}</p>
              <PriceTag
                amount={packageTotal(pkg, pkg.priceUnit === "per-orang" ? 1 : 2).total}
                suffix={pkg.priceUnit === "per-2" ? "contoh total untuk 2 orang" : "per orang"}
                size="lg"
              />
              <div>
                <ButtonLink href={`/paket/${pkg.slug}`}>Lihat paket</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Lokasi lain" className="border-t border-line">
        <div className="page-x grid grid-cols-2 gap-4 py-8">
          <Link href={`/jelajahi/${prev.slug}`} className="group flex items-center gap-3 rounded-ui py-2">
            <Icon icon={ChevronLeft} className="shrink-0 text-muted group-hover:text-primary" />
            <LensThumb panorama={prev.panorama} alt="" className="hidden w-14 sm:block" sizes="56px" />
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted">Sebelumnya</span>
              <span className="truncate font-medium group-hover:text-primary">{prev.name}</span>
            </span>
          </Link>
          <Link
            href={`/jelajahi/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-ui py-2 text-right"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted">Berikutnya</span>
              <span className="truncate font-medium group-hover:text-primary">{next.name}</span>
            </span>
            <LensThumb panorama={next.panorama} alt="" className="hidden w-14 sm:block" sizes="56px" />
            <Icon icon={ChevronRight} className="shrink-0 text-muted group-hover:text-primary" />
          </Link>
        </div>
      </nav>
    </>
  );
}
