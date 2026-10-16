"use client";

import { CircleCheck, Info } from "lucide-react";
import Link from "next/link";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

type ToastInput = { message: string; tone?: "success" | "info"; action?: { label: string; href: string } };
type ToastItem = ToastInput & { id: number };

const ToastContext = createContext<(toast: ToastInput) => void>(() => {});

/** Hook untuk menampilkan notifikasi singkat, contoh: `toast({ message: "Ditambahkan ke keranjang" })`. */
export function useToast() {
  return useContext(ToastContext);
}

/** Penyedia notifikasi global. Notifikasi hilang sendiri setelah 3,5 detik. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const push = useCallback((toast: ToastInput) => {
    const id = ++counter.current;
    setItems((prev) => [...prev.slice(-2), { ...toast, id }]);
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4 sm:top-auto sm:bottom-6"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm animate-rise items-center gap-3 rounded-ui bg-ink px-4 py-3 text-sm text-surface shadow-float"
          >
            <Icon icon={t.tone === "info" ? Info : CircleCheck} className="shrink-0" />
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <Link href={t.action.href} className="shrink-0 font-semibold underline underline-offset-4">
                {t.action.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
