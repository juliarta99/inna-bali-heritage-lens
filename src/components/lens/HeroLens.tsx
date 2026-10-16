"use client";

import { Move } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { LensViewerLazy } from "./LensViewerLazy";

type HeroLensProps = { panorama: string; label: string; hint: string; startYaw?: number };

/**
 * Lensa beranda: panorama 360° di dalam bingkai lingkaran seperti jendela kapal KPM.
 * Membesar pelan saat halaman dimuat (satu-satunya animasi beranda).
 */
export function HeroLens({ panorama, label, hint, startYaw }: HeroLensProps) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="aspect-square w-[min(84vw,30rem)] animate-lens-in rounded-full border border-line p-2.5 lg:w-[min(40vw,34rem)]">
        <div className="aspect-square rounded-full border-[6px] border-primary p-1">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-ink [&_.psv-container]:rounded-full">
            <LensViewerLazy panorama={panorama} label={label} variant="hero" startYaw={startYaw} />
          </div>
        </div>
      </div>
      <figcaption className="flex items-center gap-2 text-sm text-muted">
        <Icon icon={Move} />
        {hint}
      </figcaption>
    </figure>
  );
}
