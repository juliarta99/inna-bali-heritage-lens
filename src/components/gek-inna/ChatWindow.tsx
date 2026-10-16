"use client";

import { SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { gekCopy, quickReplies } from "@/data/gek-inna";
import { answer, typingDelay } from "./engine";
import { GekAvatar } from "./GekAvatar";
import { MessageBubble, type ChatMessage } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";

type ChatWindowProps = {
  messages: ChatMessage[];
  setMessages: (update: (prev: ChatMessage[]) => ChatMessage[]) => void;
  onClose: () => void;
};

/**
 * Jendela chat Gek Inna: layar penuh di mobile, 380px di desktop.
 * Menampilkan indikator mengetik 600–900 ms sebelum jawaban muncul.
 */
export function ChatWindow({ messages, setMessages, onClose }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    return () => window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function ask(text: string) {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: question }]);
    setInput("");
    setTyping(true);
    timer.current = window.setTimeout(() => {
      const reply = answer(question);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "gek", text: reply.text, links: reply.links }]);
      setTyping(false);
    }, typingDelay());
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

  return (
    <section
      role="dialog"
      aria-label="Chat dengan Gek Inna"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="fixed inset-0 z-50 flex animate-rise flex-col bg-surface-2 sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(620px,calc(100dvh-8rem))] sm:w-[380px] sm:overflow-hidden sm:rounded-ui sm:border sm:border-line sm:shadow-float"
    >
      <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <GekAvatar />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight">{gekCopy.name}</p>
          <p className="text-xs text-muted">Pemandu digital INNA Bali Heritage</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup chat"
          className="grid size-11 place-items-center rounded-ui hover:bg-surface-2"
        >
          <Icon icon={X} />
        </button>
      </header>

      <div ref={listRef} className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onNavigate={() => isMobile() && onClose()} />
        ))}
        {typing && (
          <div className="flex items-center gap-2" aria-label="Gek Inna sedang mengetik">
            <GekAvatar size="sm" />
            <span className="flex gap-1 rounded-ui border border-line bg-surface px-3.5 py-3.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="size-1.5 animate-pulse rounded-full bg-muted"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-line bg-surface pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <QuickReplies options={quickReplies} onPick={ask} disabled={typing} />
        <form onSubmit={onSubmit} className="flex gap-2 px-4">
          <label htmlFor="gek-input" className="sr-only">
            Pertanyaan untuk Gek Inna
          </label>
          <input
            ref={inputRef}
            id="gek-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={gekCopy.placeholder}
            autoComplete="off"
            className="min-h-12 min-w-0 flex-1 rounded-ui border border-line bg-surface px-3.5 text-base placeholder:text-muted focus-visible:border-primary"
          />
          <button
            type="submit"
            aria-label="Kirim pertanyaan"
            disabled={!input.trim() || typing}
            className="grid size-12 shrink-0 place-items-center rounded-ui bg-primary text-surface disabled:opacity-50"
          >
            <Icon icon={SendHorizontal} />
          </button>
        </form>
        <p className="px-4 text-xs text-muted">{gekCopy.disclaimer}</p>
      </div>
    </section>
  );
}
