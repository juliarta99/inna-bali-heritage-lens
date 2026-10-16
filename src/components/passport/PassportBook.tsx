"use client";

import { Award, Check, Loader, MapPin, RotateCcw, Stamp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { passportCopy, passportPoints } from "@/data/site";
import { cn } from "@/lib/cn";
import { usePassport } from "@/lib/usePassport";

/**
 * Passport digital: 10 stempel. Tombol "Saya di lokasi ini" menyimulasikan GPS
 * lalu menambah stempel. Sertifikat tampil bila semua stempel terkumpul.
 */
export function PassportBook() {
  const { stamps, hydrated, collect, reset } = usePassport();
  const [checking, setChecking] = useState<string | null>(null);
  const toast = useToast();
  const total = passportPoints.length;
  const complete = hydrated && stamps.length >= total;

  function checkIn(id: string, name: string) {
    setChecking(id);
    window.setTimeout(() => {
      collect(id);
      setChecking(null);
      toast({ message: `Stempel ${name} terkumpul` });
    }, 900);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-medium">
            {hydrated ? stamps.length : 0} dari {total} stempel
          </p>
          {stamps.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="flex min-h-11 items-center gap-1.5 rounded-ui px-2 text-sm text-muted hover:text-ink"
            >
              <Icon icon={RotateCcw} size={16} />
              Ulangi
            </button>
          )}
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={stamps.length}
          aria-label="Kemajuan passport"
        >
          <div
            className="h-full bg-primary transition-[width] duration-500"
            style={{ width: `${(stamps.length / total) * 100}%` }}
          />
        </div>
      </div>

      {complete && (
        <section
          aria-labelledby="sertifikat"
          className="flex animate-rise flex-col items-center gap-4 rounded-ui border-2 border-primary p-6 text-center sm:p-10"
        >
          <Icon icon={Award} size={40} className="text-primary" />
          <p className="text-sm text-muted">Sertifikat</p>
          <h2 id="sertifikat" className="text-2xl text-primary sm:text-3xl">
            {passportCopy.certificateTitle}
          </h2>
          <p className="max-w-[52ch] text-muted">{passportCopy.certificateText}</p>
          <p className="font-display text-lg">INNA Bali Heritage Hotel, Denpasar</p>
        </section>
      )}

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {passportPoints.map((point, i) => {
          const got = stamps.includes(point.id);
          const busy = checking === point.id;
          return (
            <li
              key={point.id}
              className={cn(
                "flex flex-col gap-4 rounded-ui border p-4 transition-colors",
                got ? "border-primary bg-primary-soft" : "border-line",
              )}
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-16 shrink-0 place-items-center rounded-ui border-2",
                    got ? "border-primary bg-primary text-surface" : "border-dashed border-line text-line",
                  )}
                >
                  <Icon icon={Stamp} size={32} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted">Titik {i + 1}</p>
                  <p className="font-medium">{point.name}</p>
                  <p className="text-sm text-muted">{point.hint}</p>
                </div>
              </div>
              {got ? (
                <p className="flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
                  <Icon icon={Check} />
                  Stempel terkumpul
                </p>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy || !hydrated}
                    onClick={() => checkIn(point.id, point.name)}
                  >
                    <Icon icon={busy ? Loader : MapPin} className={busy ? "animate-spin" : undefined} />
                    {busy ? "Mencari lokasi" : "Saya di lokasi ini"}
                  </Button>
                  {point.href && (
                    <Link
                      href={point.href}
                      className="flex min-h-11 items-center px-2 text-sm text-primary hover:underline"
                    >
                      Lihat 360°
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-muted">Prototipe: lokasi GPS disimulasikan.</p>
    </div>
  );
}
