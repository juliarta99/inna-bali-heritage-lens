"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Tabs } from "@/components/ui/Tabs";
import { gallery, galleryEras } from "@/data/gallery";
import type { GalleryEra } from "@/data/types";
import { StoryForm } from "./StoryForm";

/** Grid foto dengan filter era dan lightbox berisi keterangan serta sumber foto. */
export function GalleryView() {
  const [era, setEra] = useState<GalleryEra>("1928-1945");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = gallery.filter((g) => g.era === era);
  const current = openIndex !== null ? items[openIndex] : null;

  function step(d: -1 | 1) {
    setOpenIndex((i) => (i === null ? i : (i + d + items.length) % items.length));
  }

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        label="Filter era"
        idPrefix="era"
        items={galleryEras}
        value={era}
        onChange={(id) => {
          setEra(id);
          setOpenIndex(null);
        }}
      />

      <div id="era-panel" role="tabpanel" aria-labelledby={`era-tab-${era}`} className="flex flex-col gap-10">
        <ul className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group flex w-full flex-col gap-2 text-left"
                aria-label={`Buka foto: ${item.image.caption}`}
              >
                <Photo
                  image={item.image}
                  ratio="aspect-[4/3]"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  compact
                  className="transition-opacity group-hover:opacity-90"
                />
                <span className="text-xs text-muted">{item.year}</span>
                <span className="text-sm leading-snug group-hover:text-primary">{item.image.caption}</span>
              </button>
            </li>
          ))}
        </ul>
        {era === "100-cerita" && (
          <div className="max-w-2xl">
            <StoryForm />
          </div>
        )}
      </div>

      <Dialog open={current !== null} onClose={() => setOpenIndex(null)} title={current?.image.caption ?? ""} size="xl">
        {current && (
          <figure className="flex flex-col gap-4">
            <Photo image={current.image} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 1000px, 100vw" />
            <figcaption className="flex flex-col gap-1 text-sm">
              <span>
                <span className="text-muted">Tahun: </span>
                {current.year}
              </span>
              <span>
                <span className="text-muted">Sumber: </span>
                {current.image.source ?? "[konfirmasi ke hotel]"}
              </span>
            </figcaption>
            {items.length > 1 && (
              <div className="flex justify-between border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm hover:bg-surface-2"
                >
                  <Icon icon={ChevronLeft} />
                  Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm hover:bg-surface-2"
                >
                  Berikutnya
                  <Icon icon={ChevronRight} />
                </button>
              </div>
            )}
          </figure>
        )}
      </Dialog>
    </div>
  );
}
