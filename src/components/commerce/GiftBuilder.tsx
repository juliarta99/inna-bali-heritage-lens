"use client";

import { ChevronLeft, ShoppingBag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { giftAmounts, giftCopy } from "@/data/gift";
import { getPackage, packages, packageTotal } from "@/data/packages";
import { cn } from "@/lib/cn";
import { makeId, makeVoucherCode } from "@/lib/code";
import { formatRupiah } from "@/lib/format";
import { useCart } from "./CartProvider";
import { GiftCard } from "./GiftCard";

const STEPS = ["Pilih nilai", "Penerima", "Pratinjau"];
const MESSAGE_MAX = 200;

type Choice = { type: "nominal"; amount: number } | { type: "paket"; slug: string };
type Errors = Partial<Record<"choice" | "recipient" | "contact" | "sender", string>>;

/** Nilai gift untuk paket: contoh total 2 orang (atau 1 orang untuk Day Pass). */
function packageValue(slug: string) {
  const pkg = getPackage(slug);
  if (!pkg) return 0;
  return packageTotal(pkg, pkg.priceUnit === "per-orang" ? 1 : 2).total;
}

/**
 * Alur Heritage Gift 3 langkah: pilih nominal atau paket, isi penerima dan ucapan,
 * lalu pratinjau kartu voucher dan tambahkan ke keranjang.
 * Parameter `?paket=slug` memilih paket secara otomatis.
 */
export function GiftBuilder() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const { addItem } = useCart();
  const presetSlug = getPackage(params.get("paket"))?.slug;

  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(presetSlug ? { type: "paket", slug: presetSlug } : null);
  const [recipient, setRecipient] = useState("");
  const [contactType, setContactType] = useState<"email" | "whatsapp">("whatsapp");
  const [contact, setContact] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [code] = useState(makeVoucherCode);

  const value = choice?.type === "nominal" ? choice.amount : choice ? packageValue(choice.slug) : 0;
  const pkgName = choice?.type === "paket" ? getPackage(choice.slug)?.name : undefined;

  function next() {
    const e: Errors = {};
    if (step === 0 && !choice) e.choice = "Pilih nominal atau satu paket.";
    if (step === 1) {
      if (recipient.trim().length < 2) e.recipient = "Tulis nama penerima.";
      if (contactType === "email" && !/^\S+@\S+\.\S+$/.test(contact.trim()))
        e.contact = "Tulis email penerima yang valid.";
      if (contactType === "whatsapp" && contact.replace(/\D/g, "").length < 9)
        e.contact = "Tulis nomor WhatsApp penerima, minimal 9 digit.";
      if (sender.trim().length < 2) e.sender = "Tulis nama pengirim.";
    }
    setErrors(e);
    const first = (["recipient", "contact", "sender"] as const).find((k) => e[k]);
    if (first) document.getElementById(`gift-${first}`)?.focus();
    if (Object.keys(e).length) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart() {
    if (!choice) return;
    addItem({
      id: makeId("gift"),
      kind: "gift",
      title: pkgName ? `Heritage Gift: ${pkgName}` : `Heritage Gift ${formatRupiah(value)}`,
      details: [
        `Untuk ${recipient.trim()} (${contactType === "email" ? "email" : "WhatsApp"} ${contact.trim()})`,
        `Dari ${sender.trim()}`,
        ...(message.trim() ? [`Ucapan: "${message.trim()}"`] : []),
      ],
      unitPrice: value,
      quantity: 1,
      maxQuantity: 1,
      href: "/heritage-gift",
      gift: { code, value },
    });
    toast({ message: "Ditambahkan ke keranjang" });
    router.push("/keranjang");
  }

  const option = (selected: boolean) =>
    cn(
      "flex cursor-pointer items-center gap-3 rounded-ui border p-4 transition-colors",
      selected ? "border-primary bg-primary-soft" : "border-line hover:border-muted",
    );

  return (
    <div className="flex flex-col gap-8">
      <StepIndicator steps={STEPS} current={step} />

      {step === 0 && (
        <section aria-labelledby="langkah-1" className="flex flex-col gap-6">
          <h2 id="langkah-1" className="text-2xl">
            Pilih nilai hadiah
          </h2>
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-sm font-medium">Nominal</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {giftAmounts.map((amount) => {
                const selected = choice?.type === "nominal" && choice.amount === amount;
                return (
                  <label key={amount} className={option(selected)}>
                    <input
                      type="radio"
                      name="gift-choice"
                      checked={selected}
                      onChange={() => setChoice({ type: "nominal", amount })}
                      className="size-5 shrink-0 accent-primary"
                    />
                    <span className="font-display text-xl">{formatRupiah(amount)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-sm font-medium">Atau satu paket</legend>
            <label className={option(choice?.type === "paket")}>
              <input
                type="radio"
                name="gift-choice"
                checked={choice?.type === "paket"}
                onChange={() => setChoice({ type: "paket", slug: presetSlug ?? packages[0].slug })}
                className="size-5 shrink-0 accent-primary"
              />
              <span className="font-medium">Satu paket</span>
            </label>
            {choice?.type === "paket" && (
              <Field
                id="gift-paket"
                label="Paket"
                hint={`Nilai voucher ${formatRupiah(value)}, sesuai contoh total paket.`}
              >
                <Select
                  id="gift-paket"
                  value={choice.slug}
                  onChange={(e) => setChoice({ type: "paket", slug: e.target.value })}
                >
                  {packages.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({formatRupiah(packageValue(p.slug))})
                    </option>
                  ))}
                </Select>
              </Field>
            )}
          </fieldset>
          {errors.choice && (
            <p role="alert" className="text-sm font-medium text-primary">
              {errors.choice}
            </p>
          )}
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby="langkah-2" className="flex flex-col gap-5">
          <h2 id="langkah-2" className="text-2xl">
            Untuk siapa hadiahnya?
          </h2>
          <Field id="gift-recipient" label="Nama penerima" error={errors.recipient}>
            <Input
              id="gift-recipient"
              value={recipient}
              invalid={!!errors.recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </Field>
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 text-sm font-medium">Kirim voucher lewat</legend>
            <div className="grid grid-cols-2 gap-3">
              {(["whatsapp", "email"] as const).map((t) => (
                <label key={t} className={option(contactType === t)}>
                  <input
                    type="radio"
                    name="contact-type"
                    checked={contactType === t}
                    onChange={() => {
                      setContactType(t);
                      setContact("");
                    }}
                    className="size-5 shrink-0 accent-primary"
                  />
                  {t === "email" ? "Email" : "WhatsApp"}
                </label>
              ))}
            </div>
          </fieldset>
          <Field
            id="gift-contact"
            label={contactType === "email" ? "Email penerima" : "Nomor WhatsApp penerima"}
            error={errors.contact}
          >
            <Input
              id="gift-contact"
              type={contactType === "email" ? "email" : "tel"}
              inputMode={contactType === "email" ? "email" : "tel"}
              value={contact}
              invalid={!!errors.contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Field>
          <Field id="gift-sender" label="Nama pengirim" error={errors.sender}>
            <Input
              id="gift-sender"
              value={sender}
              invalid={!!errors.sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </Field>
          <Field id="gift-message" label="Ucapan" optional hint={`${message.length}/${MESSAGE_MAX} karakter`}>
            <Textarea
              id="gift-message"
              rows={3}
              maxLength={MESSAGE_MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Field>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="langkah-3" className="flex flex-col gap-5">
          <h2 id="langkah-3" className="text-2xl">
            Pratinjau voucher
          </h2>
          <GiftCard
            code={code}
            value={value}
            packageName={pkgName}
            recipient={recipient}
            sender={sender}
            message={message}
          />
          <p className="text-sm text-muted">
            Setelah dibayar, kartu ini dikirim ke {contactType === "email" ? "email" : "WhatsApp"} {contact}.{" "}
            {giftCopy.redeemHint}
          </p>
        </section>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
            <Icon icon={ChevronLeft} />
            Kembali
          </Button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button onClick={next}>{step === 0 ? "Lanjut isi penerima" : "Lihat pratinjau"}</Button>
        ) : (
          <Button onClick={addToCart}>
            <Icon icon={ShoppingBag} />
            Tambah ke keranjang, {formatRupiah(value)}
          </Button>
        )}
      </div>
    </div>
  );
}
