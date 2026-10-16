"use client";

import { X } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type PackageTeaserProps = { packageName: string; href: string; onDismiss: () => void };

/** Panel bawah "Ingin merasakan langsung?" yang muncul setelah 3 hotspot atau 45 detik. */
export function PackageTeaser({ packageName, href, onDismiss }: PackageTeaserProps) {
  return (
    <div
      data-sticky-bar
      role="region"
      aria-label="Tawaran paket"
      className="fixed inset-x-0 bottom-0 z-30 animate-rise border-t border-line bg-surface shadow-float"
    >
      <div className="page-x flex items-center gap-3 py-3 sm:gap-6 sm:py-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted">Ingin merasakan langsung?</p>
          <p className="truncate font-display text-lg sm:text-xl">{packageName}</p>
        </div>
        <ButtonLink href={href} className="shrink-0">
          Lihat paket
        </ButtonLink>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Tutup tawaran paket"
          className="grid size-11 shrink-0 place-items-center rounded-ui text-muted hover:bg-surface-2 hover:text-ink"
        >
          <Icon icon={X} />
        </button>
      </div>
    </div>
  );
}
