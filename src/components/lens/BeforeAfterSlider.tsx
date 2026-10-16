"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { ImageSlot } from "@/data/types";

type BeforeAfterSliderProps = { before: ImageSlot; after: ImageSlot };

/**
 * Pembanding "Dulu vs Sekarang". Geser pegangan (atau pakai tombol panah
 * saat slider fokus) untuk membuka foto arsip di atas foto sekarang.
 */
export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-ui bg-surface-2 select-none">
        <Photo image={after} cover sizes="(min-width: 1024px) 800px, 100vw" />
        <div className="absolute inset-0 border-r border-surface" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Photo image={before} cover className="grayscale" sizes="(min-width: 1024px) 800px, 100vw" />
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-ui bg-ink px-2 py-1 text-xs font-medium text-surface">
          Dulu
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-ui bg-surface px-2 py-1 text-xs font-medium text-ink">
          Sekarang
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-surface"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-surface">
            <Icon icon={ChevronsLeftRight} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Geser untuk membandingkan foto dulu dan sekarang"
          aria-valuetext={`${pos}% foto dulu terlihat`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="text-xs text-muted">
        Kiri: {before.caption}. Kanan: {after.caption}.
      </figcaption>
    </figure>
  );
}
