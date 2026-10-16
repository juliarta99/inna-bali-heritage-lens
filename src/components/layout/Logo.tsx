import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Logo Inna Bali Heritage Lens (emblem teratai-lensa dan tulisan).
 * Atur tinggi lewat `className`, misalnya "h-10"; lebar mengikuti rasio logo.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={site.logo.src}
      alt={site.name}
      width={site.logo.width}
      height={site.logo.height}
      priority={priority}
      unoptimized
      className={cn("w-auto", className)}
    />
  );
}
