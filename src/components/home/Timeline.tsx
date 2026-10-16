"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import type { TimelineEvent } from "@/data/types";

/** Linimasa horizontal 1927–2027 yang bisa digulir, dengan tombol geser di layar lebar. */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  const rowRef = useRef<HTMLOListElement>(null);

  function scroll(direction: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Geser linimasa ke kiri"
          className="grid size-11 place-items-center rounded-ui border border-line hover:border-primary hover:text-primary"
        >
          <Icon icon={ChevronLeft} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Geser linimasa ke kanan"
          className="grid size-11 place-items-center rounded-ui border border-line hover:border-primary hover:text-primary"
        >
          <Icon icon={ChevronRight} />
        </button>
      </div>
      <ol
        ref={rowRef}
        tabIndex={0}
        aria-label="Linimasa 1927 sampai 2027"
        className="scroll-row -mx-5 flex snap-x overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8"
      >
        {events.map((event, i) => (
          <li key={event.year} className="relative w-[78vw] max-w-[20rem] shrink-0 snap-start pr-8">
            <div className="flex items-center gap-3">
              <span className="size-3 shrink-0 rounded-full border-2 border-primary bg-surface" />
              {i < events.length - 1 && <span className="h-px flex-1 bg-line" />}
            </div>
            <p className="mt-4 font-display text-3xl text-primary">{event.year}</p>
            <h3 className="mt-2 text-lg">{event.title}</h3>
            <p className="mt-2 text-sm text-muted">{event.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
