"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { AccountMenu } from "./AccountMenu";
import { CartLink } from "./CartLink";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/** Header situs: logo teks, menu utama, bahasa, keranjang, akun, dan menu mobile. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-ui focus:bg-primary focus:px-4 focus:py-2 focus:text-surface"
      >
        Lewati ke konten
      </a>
      <div className="page-x flex h-16 items-center gap-4">
        <Link
          href="/"
          aria-label={`${site.name}, ke beranda`}
          className="mr-auto flex shrink-0 items-center rounded-ui"
        >
          <Logo className="h-10 sm:h-11" priority />
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-ui px-3 text-sm font-medium transition-colors",
                      active ? "text-primary" : "text-ink hover:bg-surface-2",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <LanguageToggle className="hidden lg:flex" />
          <CartLink />
          <div className="hidden sm:block">
            <AccountMenu />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
