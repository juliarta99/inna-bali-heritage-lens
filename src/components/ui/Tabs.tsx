"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type TabsProps<T extends string> = {
  label: string;
  items: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  /** `idPrefix` dipakai untuk menautkan tab dengan panel (`{prefix}-panel`). */
  idPrefix: string;
  full?: boolean;
};

/**
 * Tab bergaya segmen. Mendukung navigasi panah kiri/kanan.
 * Panel terkait sebaiknya diberi `id={`${idPrefix}-panel`}` dan `role="tabpanel"`.
 */
export function Tabs<T extends string>({ label, items, value, onChange, idPrefix, full }: TabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex gap-1 overflow-x-auto rounded-ui border border-line p-1",
        full ? "w-full" : "w-fit max-w-full",
      )}
    >
      {items.map((item, i) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-11 shrink-0 rounded-[4px] px-3 text-sm font-medium whitespace-nowrap transition-colors",
              full && "flex-1",
              selected ? "bg-primary-soft text-primary" : "text-muted hover:text-ink",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
