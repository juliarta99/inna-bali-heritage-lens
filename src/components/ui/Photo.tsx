"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageSlot } from "@/data/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type PhotoProps = {
  image: ImageSlot;
  /** Kelas rasio, contoh "aspect-[4/3]". */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Sembunyikan teks keterangan di placeholder (untuk thumbnail kecil). */
  compact?: boolean;
  /** Isi penuh induk yang berposisi relatif (abaikan `ratio`, tanpa radius). */
  cover?: boolean;
};

/**
 * Foto dengan placeholder. Selama file di `image.src` belum ada,
 * tampil blok `surface-2` berisi ikon dan keterangan foto yang akan dipasang.
 * Foto ilustrasi (bukan foto hotel itu sendiri) diberi label kecil "Foto ilustrasi".
 */
export function Photo({
  image,
  ratio = "aspect-[4/3]",
  className,
  sizes = "100vw",
  priority,
  compact,
  cover,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        "overflow-hidden bg-surface-2",
        cover ? "absolute inset-0" : cn("relative rounded-ui", ratio),
        className,
      )}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center text-muted">
          <Icon icon={ImageIcon} size={compact ? 20 : 32} />
          {!compact && (
            <>
              <p className="max-w-[28ch] text-xs leading-snug">{image.caption}</p>
              <p className="text-[0.6875rem] break-all opacity-80">{image.src}</p>
            </>
          )}
        </div>
      )}
      <Image
        ref={ref}
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={cn("object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
      />
      {loaded && image.illustrative && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-[4px] bg-ink/75 px-1.5 py-0.5 text-[0.6875rem] text-surface">
          Foto ilustrasi
        </span>
      )}
    </div>
  );
}
