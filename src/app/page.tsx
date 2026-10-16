import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Countdown } from "@/components/home/Countdown";
import { Timeline } from "@/components/home/Timeline";
import { HeroLens } from "@/components/lens/HeroLens";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/data/images";
import { getLocation, HERO_LOCATION_SLUG } from "@/data/locations";
import { homeCopy } from "@/data/site";
import { CENTENARY_DATE, CENTENARY_NOTE, timeline } from "@/data/timeline";
import { formatTanggal } from "@/lib/format";

/** Beranda: hero lensa, linimasa, hitung mundur 100 tahun, tiga pintu masuk, dan kutipan Suite 77. */
export default function HomePage() {
  const hero = getLocation(HERO_LOCATION_SLUG)!;

  return (
    <>
      <section className="page-x grid items-center gap-8 pt-8 pb-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-16 lg:pb-28">
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-h1m text-balance lg:text-4xl">{homeCopy.title}</h1>
          <p className="mx-auto max-w-[52ch] text-muted lg:mx-0 lg:text-lg">{homeCopy.subtitle}</p>
          <div className="hidden gap-3 lg:flex">
            <ButtonLink href="/jelajahi">Jelajahi 3D/360°</ButtonLink>
            <ButtonLink href="/paket" variant="secondary">
              Lihat paket
            </ButtonLink>
          </div>
        </div>
        <HeroLens
          panorama={hero.panorama}
          startYaw={hero.startYaw}
          label={`Lensa 360° ${hero.name}. Geser untuk melihat sekeliling.`}
          hint={homeCopy.lensHint}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:hidden">
          <ButtonLink href="/jelajahi">Jelajahi 3D/360°</ButtonLink>
          <ButtonLink href="/paket" variant="secondary">
            Lihat paket
          </ButtonLink>
        </div>
      </section>

      <section
        id="linimasa"
        aria-labelledby="linimasa-judul"
        className="scroll-mt-16 border-t border-line bg-surface-2"
      >
        <div className="page-x section-y">
          <div className="flex flex-col gap-3">
            <h2 id="linimasa-judul" className="text-2xl lg:text-3xl">
              Seratus tahun dalam satu lorong
            </h2>
            <p className="max-w-[60ch] text-muted">Dari pembangunan tahun 1927 sampai peringatan 100 tahun.</p>
          </div>
          <div className="mt-8">
            <Timeline events={timeline} />
          </div>
        </div>
      </section>

      <section aria-labelledby="hitung-mundur" className="border-t border-line">
        <div className="page-x section-y grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-3">
            <h2 id="hitung-mundur" className="text-2xl lg:text-3xl">
              Menuju 100 tahun
            </h2>
            <p className="text-muted">
              Hitung mundur ke {formatTanggal(CENTENARY_DATE)}. <span className="text-xs">{CENTENARY_NOTE}</span>
            </p>
          </div>
          <Countdown target={CENTENARY_DATE} />
        </div>
      </section>

      <section aria-label="Mulai dari sini" className="border-t border-line">
        <div className="page-x section-y grid gap-12 md:grid-cols-3 md:gap-8">
          {homeCopy.doors.map((door) => (
            <Link key={door.href} href={door.href} className="group flex flex-col gap-4">
              <Photo
                image={images.beranda[door.imageKey]}
                ratio="aspect-[4/3]"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <h2 className="text-2xl group-hover:text-primary">{door.title}</h2>
              <p className="text-muted">{door.text}</p>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                {door.cta}
                <Icon icon={ChevronRight} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="suite-77-kutipan" className="border-t border-line bg-surface-2">
        <div className="page-x section-y grid items-center gap-10 md:grid-cols-[2fr_3fr] lg:gap-20">
          <Photo image={images.beranda.suite77} ratio="aspect-[3/4]" sizes="(min-width: 768px) 40vw, 100vw" />
          <div className="flex flex-col gap-6">
            <h2 id="suite-77-kutipan" className="sr-only">
              Suite 77
            </h2>
            <blockquote className="font-display text-xl leading-snug sm:text-2xl lg:text-3xl">
              {homeCopy.quote}
            </blockquote>
            <p className="text-sm text-muted">{homeCopy.quoteSource}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/paket/jejak-bung-karno">Lihat paket Jejak Bung Karno</ButtonLink>
              <ButtonLink href="/jelajahi/suite-77" variant="secondary">
                Masuk ke Suite 77
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
