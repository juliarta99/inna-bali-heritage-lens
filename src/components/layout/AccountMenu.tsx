"use client";

import { ReceiptText, Stamp, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Ikon akun yang membuka menu Passport dan Pesanan. */
export function AccountMenu() {
  // Menu tercatat terbuka untuk path tertentu, sehingga otomatis tertutup saat pindah halaman.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenPath(next ? pathname : null);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenPath(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label="Akun: Passport dan Pesanan"
        aria-expanded={open}
        aria-controls="account-menu"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-ui text-ink hover:bg-surface-2"
      >
        <Icon icon={UserRound} size={24} />
      </button>
      {open && (
        <div
          id="account-menu"
          className="absolute top-full right-0 z-50 mt-2 w-56 animate-fade rounded-ui border border-line bg-surface p-1.5 shadow-float"
        >
          <Link
            href="/passport"
            className="flex min-h-11 items-center gap-3 rounded-[4px] px-3 text-sm hover:bg-surface-2"
          >
            <Icon icon={Stamp} className="text-primary" />
            Passport
          </Link>
          <Link
            href="/pesanan"
            className="flex min-h-11 items-center gap-3 rounded-[4px] px-3 text-sm hover:bg-surface-2"
          >
            <Icon icon={ReceiptText} className="text-primary" />
            Pesanan saya
          </Link>
        </div>
      )}
    </div>
  );
}
