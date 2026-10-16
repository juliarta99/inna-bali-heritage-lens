"use client";

import { Gift } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";
import type { CartItem, Package } from "@/data/types";
import { getRoom } from "@/data/rooms";
import { packageTotal } from "@/data/packages";
import { makeId } from "@/lib/code";
import { addDays, formatRupiah, formatTanggal, parseIsoDate } from "@/lib/format";
import { useToday } from "@/lib/useToday";
import { AddToCartButton } from "./AddToCartButton";
import { PriceBreakdown, type BreakdownLine } from "./PriceBreakdown";

const WEEKDAY = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/**
 * Form pemesanan paket: tanggal check-in, jumlah tamu (stepper), rincian harga,
 * tombol "Tambah ke keranjang", dan tautan "Jadikan hadiah".
 * Rumus: harga kamar per malam x jumlah malam + harga pengalaman.
 */
export function PackageBooking({ pkg }: { pkg: Package }) {
  const today = useToday();
  const isDayPass = pkg.priceUnit === "per-orang";
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(isDayPass ? 1 : 2);
  const [students, setStudents] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const room = getRoom(pkg.roomId);
  const { roomRate, roomTotal, experienceTotal, total } = packageTotal(pkg, guests, students);

  const lines: BreakdownLine[] = [];
  if (room) {
    lines.push({
      label: `${room.name} dengan sarapan`,
      note: `${formatRupiah(roomRate)} x ${pkg.nights} malam`,
      amount: roomTotal,
    });
  }
  if (isDayPass) {
    if (guests > 0)
      lines.push({
        label: "Dewasa",
        note: `${formatRupiah(pkg.experiencePrice)} x ${guests}`,
        amount: pkg.experiencePrice * guests,
      });
    if (students > 0)
      lines.push({
        label: "Pelajar",
        note: `${formatRupiah(pkg.studentPrice ?? 0)} x ${students}`,
        amount: (pkg.studentPrice ?? 0) * students,
      });
  } else {
    lines.push({ label: "Harga pengalaman", note: "untuk 2 orang", amount: experienceTotal });
  }

  function validate(value: string): string | undefined {
    if (!value) return isDayPass ? "Pilih tanggal kunjungan." : "Pilih tanggal check-in.";
    if (today && value < today) return "Tanggal sudah lewat. Pilih tanggal lain.";
    const d = parseIsoDate(value);
    if (pkg.checkInWeekday !== undefined && d && d.getDay() !== pkg.checkInWeekday)
      return `Paket ini dimulai hari ${WEEKDAY[pkg.checkInWeekday]}. Pilih tanggal hari ${WEEKDAY[pkg.checkInWeekday]}.`;
    if (isDayPass && guests + students < 1) return "Tambahkan minimal 1 peserta.";
    return undefined;
  }

  function build(): CartItem | null {
    const err = validate(date);
    setError(err);
    if (err) {
      document.getElementById("pkg-date")?.focus();
      return null;
    }
    const details = isDayPass
      ? [
          `Kunjungan ${formatTanggal(date, true)}`,
          [guests && `${guests} dewasa`, students && `${students} pelajar`].filter(Boolean).join(", "),
        ]
      : [
          `Check-in ${formatTanggal(date, true)}`,
          `Check-out ${formatTanggal(addDays(date, pkg.nights), true)}`,
          `${room?.name} dengan sarapan, ${pkg.nights} malam`,
          `${guests} tamu`,
        ];
    return {
      id: makeId("paket"),
      kind: "paket",
      title: `Paket ${pkg.name}`,
      details,
      unitPrice: total,
      quantity: 1,
      maxQuantity: isDayPass ? 1 : 3,
      href: `/paket/${pkg.slug}`,
    };
  }

  const nextFriday = (() => {
    if (!today || pkg.checkInWeekday === undefined) return undefined;
    const d = parseIsoDate(today)!;
    const diff = (pkg.checkInWeekday - d.getDay() + 7) % 7 || 7;
    return addDays(today, diff);
  })();

  return (
    <div className="flex flex-col gap-5">
      <Field
        id="pkg-date"
        label={isDayPass ? "Tanggal kunjungan" : "Tanggal check-in"}
        error={error}
        hint={
          pkg.checkInWeekday !== undefined
            ? `Check-in hari ${WEEKDAY[pkg.checkInWeekday]}${nextFriday ? `, contoh ${formatTanggal(nextFriday)}` : ""}.`
            : !isDayPass
              ? `Check-out ${pkg.nights} malam setelahnya.`
              : undefined
        }
      >
        <Input
          id="pkg-date"
          type="date"
          min={today || undefined}
          value={date}
          invalid={Boolean(error)}
          onChange={(e) => {
            setDate(e.target.value);
            if (error) setError(validate(e.target.value));
          }}
        />
      </Field>

      {isDayPass ? (
        <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Dewasa</span>
            <Stepper label="Jumlah dewasa" value={guests} min={0} max={pkg.maxGuests} onChange={setGuests} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Pelajar</span>
            <Stepper label="Jumlah pelajar" value={students} min={0} max={pkg.maxGuests} onChange={setStudents} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Jumlah tamu</span>
          <div className="flex items-center gap-4">
            <Stepper label="Jumlah tamu" value={guests} min={1} max={pkg.maxGuests} onChange={setGuests} />
            <span className="text-xs text-muted">Maks. {pkg.maxGuests} orang per kamar</span>
          </div>
        </div>
      )}

      <PriceBreakdown lines={lines} total={total} />

      <AddToCartButton build={build} full />

      <Link
        href={`/heritage-gift?paket=${pkg.slug}`}
        className="flex min-h-11 items-center justify-center gap-2 rounded-ui text-sm font-medium text-primary hover:bg-primary-soft"
      >
        <Icon icon={Gift} />
        Jadikan hadiah
      </Link>
    </div>
  );
}
