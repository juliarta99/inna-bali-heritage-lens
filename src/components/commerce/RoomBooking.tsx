"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";
import { useToast } from "@/components/ui/Toast";
import { RATE_NOTE, ratePlanLabel, rooms as roomTypes } from "@/data/rooms";
import type { RatePlanId, Room } from "@/data/types";
import { makeId } from "@/lib/code";
import { addDays, formatTanggal, nightsBetween } from "@/lib/format";
import { useToday } from "@/lib/useToday";
import { AddOnDialog, type AddOnChoice } from "./AddOnDialog";
import { useCart } from "./CartProvider";
import { RoomCard } from "./RoomCard";

type Errors = Partial<Record<"checkIn" | "checkOut" | "guests", string>>;

/**
 * Alur Book Kamar: form pencarian, daftar tipe kamar, dialog add-on,
 * lalu kamar (dan add-on bila dipilih) masuk keranjang.
 */
export function RoomBooking() {
  const today = useToday();
  const router = useRouter();
  const toast = useToast();
  const { addItem } = useCart();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [searched, setSearched] = useState(false);
  const [pending, setPending] = useState<{ room: Room; plan: RatePlanId } | null>(null);

  const nights = searched ? nightsBetween(checkIn, checkOut) : 0;

  function validate(): Errors {
    const e: Errors = {};
    if (!checkIn) e.checkIn = "Pilih tanggal check-in.";
    else if (today && checkIn < today) e.checkIn = "Tanggal sudah lewat.";
    if (!checkOut) e.checkOut = "Pilih tanggal check-out.";
    else if (checkIn && nightsBetween(checkIn, checkOut) < 1) e.checkOut = "Check-out harus setelah check-in.";
    if (adults > roomCount * 2)
      e.guests = `Maksimal 2 dewasa per kamar. Tambah jumlah kamar menjadi ${Math.ceil(adults / 2)}.`;
    return e;
  }

  function onSearch(ev?: FormEvent) {
    ev?.preventDefault();
    const e = validate();
    setErrors(e);
    const ok = Object.keys(e).length === 0;
    setSearched(ok);
    if (!ok) {
      document.getElementById(e.checkIn ? "room-in" : e.checkOut ? "room-out" : "room-count")?.focus();
      return false;
    }
    return true;
  }

  function onSelect(room: Room, plan: RatePlanId) {
    if (!onSearch()) {
      toast({ message: "Isi tanggal menginap terlebih dahulu.", tone: "info" });
      document.getElementById("cari-kamar")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setPending({ room, plan });
  }

  function confirm(addOn: AddOnChoice | null) {
    if (!pending) return;
    const { room, plan } = pending;
    const rates = room.rates;
    if (!rates) return;
    const n = nightsBetween(checkIn, checkOut);
    addItem({
      id: makeId("kamar"),
      kind: "kamar",
      title: `${room.name}, ${ratePlanLabel[plan]}`,
      details: [
        `${formatTanggal(checkIn, true)} sampai ${formatTanggal(checkOut, true)}`,
        `${n} malam`,
        `${adults} dewasa${children ? `, ${children} anak` : ""}`,
      ],
      unitPrice: rates[plan].best * n,
      quantity: roomCount,
      maxQuantity: Math.min(room.units, 5),
      href: "/kamar",
    });
    if (addOn) {
      addItem({
        id: makeId("paket"),
        kind: "paket",
        title: `${addOn.name} (tambahan)`,
        details: [`Selama menginap, ${formatTanggal(checkIn)} sampai ${formatTanggal(checkOut)}`],
        unitPrice: addOn.price,
        quantity: 1,
        maxQuantity: 3,
        href: `/paket/${addOn.slug}`,
      });
    }
    setPending(null);
    toast({ message: "Ditambahkan ke keranjang" });
    router.push("/keranjang");
  }

  return (
    <>
      <form
        id="cari-kamar"
        onSubmit={onSearch}
        noValidate
        className="scroll-mt-20 rounded-ui border border-line bg-surface-2 p-4 sm:p-6"
        aria-label="Cari kamar"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto_auto] lg:items-start">
          <Field id="room-in" label="Check-in" error={errors.checkIn}>
            <Input
              id="room-in"
              type="date"
              min={today || undefined}
              value={checkIn}
              invalid={Boolean(errors.checkIn)}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setSearched(false);
                if (!checkOut || nightsBetween(e.target.value, checkOut) < 1) setCheckOut(addDays(e.target.value, 1));
              }}
            />
          </Field>
          <Field id="room-out" label="Check-out" error={errors.checkOut}>
            <Input
              id="room-out"
              type="date"
              min={checkIn ? addDays(checkIn, 1) : today || undefined}
              value={checkOut}
              invalid={Boolean(errors.checkOut)}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setSearched(false);
              }}
            />
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium" id="room-count-label">
              Kamar
            </span>
            <Stepper
              id="room-count"
              label="Jumlah kamar"
              value={roomCount}
              min={1}
              max={5}
              onChange={(v) => {
                setRoomCount(v);
                setSearched(false);
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Dewasa</span>
            <Stepper
              label="Jumlah dewasa"
              value={adults}
              min={1}
              max={10}
              onChange={(v) => {
                setAdults(v);
                setSearched(false);
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Anak</span>
            <Stepper label="Jumlah anak" value={children} min={0} max={6} onChange={setChildren} />
          </div>
        </div>
        {errors.guests && (
          <p className="mt-3 text-sm font-medium text-primary" role="alert">
            {errors.guests}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted" aria-live="polite">
            {searched
              ? `${nights} malam, ${roomCount} kamar, ${adults} dewasa${children ? `, ${children} anak` : ""}.`
              : "Pilih tanggal untuk melihat total harga."}
          </p>
          <Button type="submit">
            <Icon icon={Search} />
            Cari kamar
          </Button>
        </div>
      </form>

      <p className="mt-4 text-xs text-muted">{RATE_NOTE}</p>

      <div className="mt-4 border-t border-line">
        {roomTypes.map((room) => (
          <RoomCard key={room.id} room={room} nights={nights} rooms={roomCount} onSelect={onSelect} />
        ))}
      </div>

      <AddOnDialog
        key={pending ? pending.room.id + pending.plan : "none"}
        open={pending !== null}
        adults={adults}
        onClose={() => setPending(null)}
        onConfirm={confirm}
      />
    </>
  );
}
