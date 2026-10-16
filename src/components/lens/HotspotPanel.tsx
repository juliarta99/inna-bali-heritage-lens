"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { Hotspot } from "@/data/types";

type HotspotPanelProps = {
  hotspot: Hotspot;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (direction: -1 | 1) => void;
};

/**
 * Panel cerita hotspot: judul, cerita 2–3 kalimat, dan foto arsip bila ada.
 * Lembar bawah di mobile, panel samping di desktop. Muncul di atas viewer.
 */
export function HotspotPanel({ hotspot, index, total, onClose, onStep }: HotspotPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [hotspot.id]);

  return (
    <aside
      aria-labelledby="hotspot-title"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="absolute inset-x-0 bottom-0 z-20 flex max-h-[72%] animate-rise flex-col overflow-hidden rounded-t-[12px] bg-surface shadow-float sm:inset-x-auto sm:top-4 sm:right-4 sm:bottom-auto sm:max-h-[calc(100%-2rem)] sm:w-[380px] sm:rounded-ui"
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs text-muted">
            Titik cerita {index + 1} dari {total}
          </p>
          <h2 id="hotspot-title" ref={headingRef} tabIndex={-1} className="mt-1 text-xl outline-none">
            {hotspot.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup cerita"
          className="-mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-ui hover:bg-surface-2"
        >
          <Icon icon={X} />
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4">
        <p className="text-base">{hotspot.story}</p>
        {hotspot.archiveImage && (
          <figure className="flex flex-col gap-2">
            <Photo image={hotspot.archiveImage} ratio="aspect-[4/3]" sizes="(min-width: 640px) 380px, 100vw" />
            <figcaption className="text-xs text-muted">
              {hotspot.archiveImage.caption}
              {hotspot.archiveImage.source && <>. Sumber: {hotspot.archiveImage.source}</>}
            </figcaption>
          </figure>
        )}
      </div>
      {total > 1 && (
        <div className="mt-auto flex justify-between border-t border-line px-3 py-2">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm hover:bg-surface-2"
          >
            <Icon icon={ChevronLeft} />
            Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm hover:bg-surface-2"
          >
            Berikutnya
            <Icon icon={ChevronRight} />
          </button>
        </div>
      )}
    </aside>
  );
}
