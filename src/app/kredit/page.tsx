import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { allImages } from "@/data/images";
import { locations } from "@/data/locations";
import { otherCredits } from "@/data/site";
import type { Credit } from "@/data/types";

export const metadata: Metadata = { title: "Kredit aset" };

/** Foto dengan file sumber yang sama digabung menjadi satu baris kredit. */
function photoCredits(): Credit[] {
  const byUrl = new Map<string, Credit>();
  for (const img of allImages) {
    if (!img.credit) continue;
    const existing = byUrl.get(img.credit.url);
    const usedFor = `${img.caption}${img.illustrative ? " (foto ilustrasi)" : ""}`;
    if (existing) existing.usedFor += `; ${usedFor}`;
    else byUrl.set(img.credit.url, { ...img.credit, usedFor });
  }
  return [...byUrl.values()];
}

/** Daftar kredit dalam bentuk baris: judul bertaut, kegunaan, penulis, lisensi. */
function CreditList({ credits }: { credits: Credit[] }) {
  return (
    <ul className="border-t border-line">
      {credits.map((c) => (
        <li
          key={c.url + c.usedFor}
          className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1.4fr_1fr_8rem] sm:gap-6"
        >
          <div className="min-w-0">
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-start gap-1.5 font-medium break-words hover:text-primary"
            >
              <span className="min-w-0">{c.title}</span>
              <Icon icon={ExternalLink} size={16} className="mt-1 shrink-0" />
              <span className="sr-only">(membuka tab baru)</span>
            </a>
            <p className="text-sm text-muted">{c.usedFor}</p>
          </div>
          <p className="text-sm">{c.author}</p>
          <p className="text-sm text-muted">{c.license}</p>
        </li>
      ))}
    </ul>
  );
}

/** Atribusi semua aset pihak ketiga beserta lisensinya. */
export default function KreditPage() {
  const assets = [...locations.map((l) => l.panoramaCredit), ...otherCredits];
  return (
    <>
      <PageHeader
        title="Kredit aset"
        intro="Semua foto, panorama 360°, dan model 3D saat ini adalah aset berlisensi terbuka untuk keperluan prototipe. Foto berlabel “Foto ilustrasi” bukan foto hotel atau lokasi itu sendiri dan akan diganti dengan foto resmi hotel."
      />
      <div className="page-x flex flex-col gap-14 pb-16 lg:pb-28">
        <section aria-labelledby="kredit-foto" className="flex flex-col gap-4">
          <h2 id="kredit-foto" className="text-2xl">
            Foto
          </h2>
          <CreditList credits={photoCredits()} />
        </section>
        <section aria-labelledby="kredit-aset" className="flex flex-col gap-4">
          <h2 id="kredit-aset" className="text-2xl">
            Panorama, model 3D, huruf, dan pustaka
          </h2>
          <CreditList credits={assets} />
        </section>
      </div>
    </>
  );
}
