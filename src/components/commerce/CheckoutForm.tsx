"use client";

import { CreditCard, Landmark, Loader, Lock, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Customer, Order, PaymentMethod } from "@/data/types";
import { cn } from "@/lib/cn";
import { makeOrderCode } from "@/lib/code";
import { formatRupiah } from "@/lib/format";
import { useCart } from "./CartProvider";
import { KindIcon } from "./KindIcon";
import { PriceBreakdown } from "./PriceBreakdown";
import { VoucherCodeInput } from "./VoucherCodeInput";

const methods: { id: PaymentMethod; label: string; note: string; icon: typeof QrCode }[] = [
  { id: "qris", label: "QRIS", note: "Pindai dengan aplikasi bank atau dompet digital.", icon: QrCode },
  { id: "va", label: "Virtual Account", note: "Transfer ke nomor virtual account bank pilihan.", icon: Landmark },
  { id: "kartu", label: "Kartu kredit/debit", note: "Visa, Mastercard, JCB.", icon: CreditCard },
];

type Errors = Partial<Record<keyof Customer | "payment", string>>;

/**
 * Checkout: data pemesan, kode voucher, metode bayar (dummy), dan tombol "Bayar Rp…".
 * Setelah proses 1,5 detik, pesanan tersimpan dan pengguna dibawa ke halaman sukses.
 */
export function CheckoutForm() {
  const { items, hydrated, subtotal, clear, placeOrder } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "", note: "" });
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [voucher, setVoucher] = useState<{ code: string; value: number } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const discount = Math.min(voucher?.value ?? 0, subtotal);
  const total = subtotal - discount;

  useEffect(() => {
    if (!paying) return;
    const t = window.setTimeout(() => {
      const order: Order = {
        code: makeOrderCode(),
        createdAt: new Date().toISOString(),
        items,
        subtotal,
        discount,
        voucherCode: voucher?.code ?? null,
        total,
        payment: payment!,
        customer,
      };
      placeOrder(order);
      clear();
      setDone(true);
      router.push(`/checkout/sukses?kode=${order.code}`);
    }, 1500);
    return () => window.clearTimeout(t);
    // Proses bayar dijalankan sekali saat `paying` berubah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paying]);

  function validate(): Errors {
    const e: Errors = {};
    if (customer.name.trim().length < 2) e.name = "Tulis nama lengkap pemesan.";
    if (!/^\S+@\S+\.\S+$/.test(customer.email.trim())) e.email = "Tulis email yang valid, contoh nama@email.com.";
    if (customer.phone.replace(/\D/g, "").length < 9) e.phone = "Tulis nomor WhatsApp minimal 9 digit.";
    if (!payment) e.payment = "Pilih metode pembayaran.";
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (["name", "email", "phone"] as const).find((k) => e[k]);
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    if (e.payment) {
      document.getElementById("co-payment")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setPaying(true);
  }

  const update = (key: keyof Customer) => (value: string) => {
    setCustomer((c) => ({ ...c, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  if (!hydrated) return <p className="py-12 text-muted">Memuat checkout</p>;

  if (items.length === 0 && !done && !paying) {
    return (
      <div className="flex flex-col items-start gap-4 border-t border-line py-12">
        <p className="font-display text-2xl">Belum ada yang perlu dibayar.</p>
        <p className="text-muted">Keranjang Anda kosong.</p>
        <ButtonLink href="/paket">Lihat paket</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
      <div className="flex min-w-0 flex-col gap-10">
        <fieldset className="flex flex-col gap-4" disabled={paying}>
          <legend className="mb-4 font-display text-2xl">Data pemesan</legend>
          <Field id="co-name" label="Nama lengkap" error={errors.name}>
            <Input
              id="co-name"
              autoComplete="name"
              value={customer.name}
              invalid={!!errors.name}
              onChange={(e) => update("name")(e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="co-email" label="Email" error={errors.email} hint="E-voucher dikirim ke email ini.">
              <Input
                id="co-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={customer.email}
                invalid={!!errors.email}
                onChange={(e) => update("email")(e.target.value)}
              />
            </Field>
            <Field id="co-phone" label="Nomor WhatsApp" error={errors.phone}>
              <Input
                id="co-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="08xx"
                value={customer.phone}
                invalid={!!errors.phone}
                onChange={(e) => update("phone")(e.target.value)}
              />
            </Field>
          </div>
          <Field id="co-note" label="Catatan untuk hotel" optional>
            <Textarea id="co-note" rows={3} value={customer.note} onChange={(e) => update("note")(e.target.value)} />
          </Field>
        </fieldset>

        <fieldset id="co-payment" className="flex flex-col gap-3" disabled={paying} aria-describedby="co-payment-desc">
          <legend className="mb-4 font-display text-2xl">Metode pembayaran</legend>
          {methods.map((m) => (
            <label
              key={m.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-ui border p-4 transition-colors",
                payment === m.id ? "border-primary bg-primary-soft" : "border-line hover:border-muted",
              )}
            >
              <input
                type="radio"
                name="payment"
                value={m.id}
                checked={payment === m.id}
                onChange={() => {
                  setPayment(m.id);
                  setErrors((er) => ({ ...er, payment: undefined }));
                }}
                className="mt-1 size-5 shrink-0 accent-primary"
              />
              <Icon icon={m.icon} size={24} className="shrink-0 text-primary" />
              <span className="flex flex-col">
                <span className="font-medium">{m.label}</span>
                <span className="text-sm text-muted">{m.note}</span>
              </span>
            </label>
          ))}
          <p id="co-payment-desc" className="text-xs font-medium text-primary" aria-live="polite">
            {errors.payment}
          </p>
          <p className="flex items-center gap-2 text-xs text-muted">
            <Icon icon={Lock} size={16} />
            Prototipe: tidak ada pembayaran sungguhan.
          </p>
        </fieldset>
      </div>

      <aside aria-label="Ringkasan pesanan" className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-5 rounded-ui border border-line p-5 sm:p-6">
          <h2 className="text-xl">Ringkasan pesanan</h2>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <KindIcon kind={item.kind} />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium">
                    {item.title}
                    {item.quantity > 1 && <span className="text-muted"> x {item.quantity}</span>}
                  </p>
                  <p className="truncate text-xs text-muted">{item.details[0]}</p>
                </div>
                <p className="shrink-0 text-sm tabular-nums">{formatRupiah(item.unitPrice * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <VoucherCodeInput applied={voucher} onChange={setVoucher} />
          <PriceBreakdown
            lines={[
              { label: "Subtotal", amount: subtotal },
              ...(discount > 0 ? [{ label: `Voucher ${voucher?.code}`, amount: discount, negative: true }] : []),
            ]}
            total={total}
          />
          <Button type="submit" full disabled={paying} aria-live="polite">
            {paying ? (
              <>
                <Icon icon={Loader} className="animate-spin" />
                Memproses pembayaran
              </>
            ) : (
              `Bayar ${formatRupiah(total)}`
            )}
          </Button>
        </div>
      </aside>
    </form>
  );
}
