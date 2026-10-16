import Image from "next/image";
import { cn } from "@/lib/cn";

type LensThumbProps = { panorama: string; alt: string; className?: string; sizes?: string };

/** Thumbnail lingkaran (lensa) dari potongan tengah panorama, dengan bingkai tipis seperti jendela kapal. */
export function LensThumb({ panorama, alt, className, sizes = "160px" }: LensThumbProps) {
  return (
    <div className={cn("relative aspect-square shrink-0 rounded-full border border-line p-1.5", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-2">
        <Image src={panorama} alt={alt} fill sizes={sizes} className="scale-[1.6] object-cover" />
      </div>
    </div>
  );
}
