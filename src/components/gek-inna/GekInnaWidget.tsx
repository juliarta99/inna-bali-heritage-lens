"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { gekCopy } from "@/data/gek-inna";
import { ChatWindow } from "./ChatWindow";
import type { ChatMessage } from "./MessageBubble";

/**
 * Widget global Gek Inna: tombol di kanan bawah yang membuka jendela chat.
 * Riwayat chat tetap tersimpan selama berpindah halaman.
 */
export function GekInnaWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, from: "gek", text: gekCopy.greeting }]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
    if (!open) return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {open && <ChatWindow messages={messages} setMessages={setMessages} onClose={() => setOpen(false)} />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Tutup chat Gek Inna" : gekCopy.launcherLabel}
        className={`gek-launcher fixed right-4 bottom-4 z-40 items-center gap-2 rounded-full bg-primary text-surface shadow-float transition-transform hover:scale-[1.03] sm:right-6 sm:bottom-6 ${
          open
            ? "hidden sm:flex sm:size-14 sm:justify-center"
            : "flex size-14 justify-center sm:size-auto sm:min-h-14 sm:pr-5 sm:pl-4"
        }`}
      >
        <Icon icon={MessageCircle} size={24} />
        {!open && <span className="hidden text-sm font-semibold sm:inline">{gekCopy.launcherLabel}</span>}
      </button>
    </>
  );
}
