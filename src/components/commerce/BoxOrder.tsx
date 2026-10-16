"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";
import { Textarea } from "@/components/ui/Textarea";
import { heritageBox } from "@/data/box";
import type { CartItem } from "@/data/types";
import { cn } from "@/lib/cn";
import { makeId } from "@/lib/code";
import { formatRupiah } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

type Delivery = "kirim" | "ambil";
type Errors = Partial<Record<"address" | "recipient", string>>;

const MESSAGE_MAX = 200;

/** Form Heritage Box: cara terima (kirim/ambil), jumlah, dan opsi kirim sebagai hadiah. */
export function BoxOrder() {
  const router = useRouter();
  const [delivery, setDelivery] = useState<Delivery>("kirim");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);
  const [asGift, setAsGift] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function build(): CartItem | null {
    const e: Errors = {};
    if (delivery === "kirim" && address.trim().length < 10)
      e.address = "Tulis alamat lengkap, termasuk kota dan kode pos.";
    if (asGift && recipient.trim().length < 2) e.recipient = "Tulis nama penerima hadiah.";
    setErrors(e);
    const first = e.recipient ? "box-recipient" : e.address ? "box-address" : null;
    if (first) {
      document.getElementById(first)?.focus();
      return null;
    }
    const details = [delivery === "kirim" ? `Kirim ke: ${address.trim()}` : "Ambil di hotel"];
    if (asGift) {
      details.push(`Hadiah untuk ${recipient.trim()}`);
      if (message.trim()) details.push(`Ucapan: "${message.trim()}"`);
    }
    return {
      id: makeId("box"),
      kind: "box",
      title: asGift ? "Heritage Box (hadiah)" : "Heritage Box",
      details,
      unitPrice: heritageBox.price,
      quantity: qty,
      maxQuantity: 10,
      href: "/heritage-box",
    };
  }

  const radio = (value: Delivery, label: string, note: string) => (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-ui border p-4 transition-colors",
        delivery === value ? "border-primary bg-primary-soft" : "border-line hover:border-muted",
      )}
    >
      <input
        type="radio"
        name="delivery"
        value={value}
        checked={delivery === value}
        onChange={() => setDelivery(value)}
        className="mt-1 size-5 shrink-0 accent-primary"
      />
      <span className="flex flex-col">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted">{note}</span>
      </span>
    </label>
  );

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">Cara terima</legend>
        {radio("kirim", "Kirim ke alamat", heritageBox.shippingNote)}
        {radio("ambil", "Ambil di hotel", heritageBox.pickupNote)}
      </fieldset>

      {delivery === "kirim" && (
        <Field id="box-address" label="Alamat pengiriman" error={errors.address}>
          <Textarea
            id="box-address"
            rows={3}
            autoComplete="street-address"
            value={address}
            invalid={!!errors.address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Field>
      )}

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Jumlah</span>
        <div className="flex items-center gap-4">
          <Stepper label="Jumlah Heritage Box" value={qty} min={1} max={10} onChange={setQty} />
          <span className="text-sm text-muted">{formatRupiah(heritageBox.price * qty)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5">
        <label className="flex min-h-11 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={asGift}
            onChange={(e) => setAsGift(e.target.checked)}
            className="size-5 shrink-0 accent-primary"
          />
          <span className="font-medium">Kirim sebagai hadiah</span>
        </label>
        {asGift && (
          <div className="flex animate-fade flex-col gap-4">
            <Field id="box-recipient" label="Nama penerima" error={errors.recipient}>
              <Input
                id="box-recipient"
                value={recipient}
                invalid={!!errors.recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </Field>
            <Field
              id="box-message"
              label="Ucapan"
              optional
              hint={`${message.length}/${MESSAGE_MAX} karakter. Dicetak di kartu dalam box.`}
            >
              <Textarea
                id="box-message"
                rows={3}
                maxLength={MESSAGE_MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
          </div>
        )}
      </div>

      <AddToCartButton build={build} full onAdded={() => asGift && router.push("/keranjang")} />
    </div>
  );
}
