import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { GekLink } from "@/data/types";
import { cn } from "@/lib/cn";
import { GekAvatar } from "./GekAvatar";

export type ChatMessage = { id: number; from: "gek" | "user"; text: string; links?: GekLink[] };

type MessageBubbleProps = {
  message: ChatMessage;
  /** Dipanggil saat tautan internal diklik (menutup chat di mobile). */
  onNavigate: () => void;
};

/** Satu gelembung pesan. Pesan Gek Inna dapat berisi tombol tautan ke halaman terkait. */
export function MessageBubble({ message, onNavigate }: MessageBubbleProps) {
  const isGek = message.from === "gek";
  return (
    <div className={cn("flex animate-fade gap-2", isGek ? "justify-start" : "justify-end")}>
      {isGek && <GekAvatar size="sm" />}
      <div className={cn("flex max-w-[85%] flex-col gap-2", !isGek && "items-end")}>
        <p
          className={cn(
            "rounded-ui px-3.5 py-2.5 text-sm",
            isGek ? "border border-line bg-surface text-ink" : "bg-primary text-surface",
          )}
        >
          {message.text}
        </p>
        {message.links && message.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={onNavigate}
                  className="inline-flex min-h-11 items-center rounded-ui border border-primary px-3 text-sm font-medium text-primary hover:bg-primary-soft"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-ui border border-primary px-3 text-sm font-medium text-primary hover:bg-primary-soft"
                >
                  {link.label}
                  <Icon icon={ExternalLink} size={16} />
                  <span className="sr-only">(membuka tab baru)</span>
                </a>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
