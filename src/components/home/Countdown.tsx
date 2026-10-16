"use client";

import { useEffect, useState } from "react";
import { parseIsoDate } from "@/lib/format";

type CountdownProps = { target: string };

function remaining(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    hari: Math.floor(ms / 86_400_000),
    jam: Math.floor(ms / 3_600_000) % 24,
    menit: Math.floor(ms / 60_000) % 60,
    detik: Math.floor(ms / 1000) % 60,
  };
}

/** Hitung mundur sederhana menuju tanggal `target` (YYYY-MM-DD, waktu lokal). */
export function Countdown({ target }: CountdownProps) {
  const [parts, setParts] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const date = parseIsoDate(target);
    if (!date) return;
    const tick = () => setParts(remaining(date));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: Array<[keyof ReturnType<typeof remaining>, string]> = [
    ["hari", "Hari"],
    ["jam", "Jam"],
    ["menit", "Menit"],
    ["detik", "Detik"],
  ];

  return (
    <dl className="grid grid-cols-4 divide-x divide-line rounded-ui border border-line bg-surface" aria-live="off">
      {units.map(([key, label]) => (
        <div key={key} className="flex flex-col-reverse items-center gap-1 px-1 py-4 sm:py-6">
          <dt className="text-xs text-muted sm:text-sm">{label}</dt>
          <dd className="font-display text-2xl tabular-nums sm:text-3xl lg:text-4xl">
            {parts ? String(parts[key]).padStart(key === "hari" ? 1 : 2, "0") : "–"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
