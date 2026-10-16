import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

/** Footer: alamat, WhatsApp reservasi, tautan, kredit aset, dan catatan prototipe. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-2">
      <div className="page-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
        <div className="flex flex-col gap-4">
          <Logo className="h-14 self-start" />
          <p className="max-w-[40ch] text-sm text-muted">
            Website imersif {site.hotel}, dulu Bali Hotel, hotel internasional pertama di Bali sejak 1928.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold">Kunjungi</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-start gap-2 hover:text-primary"
          >
            <Icon icon={MapPin} className="mt-0.5 shrink-0 text-primary" />
            {site.address}
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-start gap-2 hover:text-primary"
          >
            <Icon icon={MessageCircle} className="mt-0.5 shrink-0 text-primary" />
            WhatsApp reservasi {site.whatsappLabel}
          </a>
        </div>
        <nav aria-label="Tautan footer" className="grid grid-cols-2 gap-x-4 text-sm">
          {[...nav, { href: "/passport", label: "Passport" }, { href: "/kredit", label: "Kredit aset" }].map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-11 items-center hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="page-x py-5 text-xs text-muted">{site.prototypeNote}</p>
      </div>
    </footer>
  );
}
