"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { getPackage } from "@/data/packages";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";

export type AddOnChoice = { slug: string; name: string; price: number; note: string };

type AddOnDialogProps = {
  open: boolean;
  adults: number;
  onClose: () => void;
  /** `null` berarti tamu melewati add-on. */
  onConfirm: (addOn: AddOnChoice | null) => void;
};

/** Dialog "Tambahkan pengalaman?" sebelum kamar masuk keranjang: Day Pass atau Heritage Walk, bisa dilewati. */
export function AddOnDialog({ open, adults, onClose, onConfirm }: AddOnDialogProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const day = getPackage("heritage-day-pass")!;
  const walk = getPackage("denpasar-heritage-walk")!;
  const people = Math.max(1, adults);

  const options: AddOnChoice[] = [
    {
      slug: day.slug,
      name: "Heritage Day Pass",
      price: day.experiencePrice * people,
      note: `Tur mini museum, heritage walk singkat, passport digital, dan snack. ${formatRupiah(day.experiencePrice)} x ${people} orang.`,
    },
    {
      slug: walk.slug,
      name: "Heritage Walk",
      price: walk.experiencePrice,
      note: "Jalan kaki pagi ke Lapangan Puputan Badung, Museum Bali, Pura Jagatnatha, dan Pasar Badung. Untuk 2 orang.",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Tambahkan pengalaman?"
      description="Lengkapi menginap dengan cerita hotel. Bisa dilewati."
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Pilih pengalaman tambahan</legend>
        {options.map((opt) => (
          <label
            key={opt.slug}
            className={cn(
              "flex cursor-pointer gap-3 rounded-ui border p-4 transition-colors",
              picked === opt.slug ? "border-primary bg-primary-soft" : "border-line hover:border-muted",
            )}
          >
            <input
              type="radio"
              name="addon"
              value={opt.slug}
              checked={picked === opt.slug}
              onChange={() => setPicked(opt.slug)}
              className="mt-1 size-5 shrink-0 accent-primary"
            />
            <span className="flex flex-1 flex-col gap-1">
              <span className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium">{opt.name}</span>
                <span className="font-semibold">{formatRupiah(opt.price)}</span>
              </span>
              <span className="text-sm text-muted">{opt.note}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={() => onConfirm(null)}>
          Lewati
        </Button>
        <Button disabled={!picked} onClick={() => onConfirm(options.find((o) => o.slug === picked) ?? null)}>
          Tambahkan pengalaman
        </Button>
      </div>
    </Dialog>
  );
}
