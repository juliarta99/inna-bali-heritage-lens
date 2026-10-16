"use client";

import { Menu, ReceiptText, Stamp, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { LanguageToggle } from "./LanguageToggle";

/** Tombol menu dan drawer navigasi untuk layar kecil. */
export function MobileNav() {
  // Menu tercatat terbuka untuk path tertentu, sehingga otomatis tertutup saat pindah halaman.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenPath(next ? pathname : null);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const linkClass = (active: boolean) =>
    cn(
      "flex min-h-12 items-center rounded-ui px-3 text-lg font-medium",
      active ? "bg-primary-soft text-primary" : "text-ink hover:bg-surface-2",
    );

  return (
    <>
      <button
        type="button"
        aria-label="Buka menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-ui text-ink hover:bg-surface-2 lg:hidden"
      >
        <Icon icon={Menu} size={24} />
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,88vw)] bg-surface p-0 text-ink shadow-float backdrop:bg-ink/50 open:animate-fade"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-display text-lg">Menu</span>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-ui hover:bg-surface-2"
            >
              <Icon icon={X} size={24} />
            </button>
          </div>
          <nav aria-label="Menu utama" className="flex flex-col gap-1 p-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(pathname.startsWith(item.href))}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mx-3 border-t border-line pt-3">
            <Link href="/passport" className="flex min-h-12 items-center gap-3 rounded-ui px-3 hover:bg-surface-2">
              <Icon icon={Stamp} className="text-primary" />
              Passport
            </Link>
            <Link href="/pesanan" className="flex min-h-12 items-center gap-3 rounded-ui px-3 hover:bg-surface-2">
              <Icon icon={ReceiptText} className="text-primary" />
              Pesanan saya
            </Link>
          </div>
          <div className="mt-auto flex flex-col gap-3 border-t border-line p-4">
            <LanguageToggle className="w-fit" />
            <p className="text-xs text-muted">{site.address}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
