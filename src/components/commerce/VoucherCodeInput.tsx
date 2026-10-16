"use client";

import { CircleCheck, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { DEMO_VOUCHER } from "@/data/gift";
import { formatRupiah } from "@/lib/format";
import { useCart } from "./CartProvider";

type Applied = { code: string; value: number } | null;

type VoucherCodeInputProps = { applied: Applied; onChange: (voucher: Applied) => void };

/** Kolom kode voucher Heritage Gift di checkout. Kode demo: LENS-7K2Q-1928 (potongan Rp250.000). */
export function VoucherCodeInput({ applied, onChange }: VoucherCodeInputProps) {
  const { checkVoucher } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();

  function apply() {
    const result = checkVoucher(code);
    if (result.ok) {
      onChange({ code: result.code, value: result.value });
      setError(undefined);
      setCode("");
    } else {
      setError(result.message);
    }
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-ui border border-primary bg-primary-soft p-3">
        <p className="flex items-start gap-2 text-sm">
          <Icon icon={CircleCheck} className="mt-0.5 shrink-0 text-primary" />
          <span>
            <span className="font-semibold">{applied.code}</span> dipakai, potongan {formatRupiah(applied.value)}.
          </span>
        </p>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Lepas kode voucher"
          className="grid size-11 shrink-0 place-items-center rounded-ui hover:bg-surface"
        >
          <Icon icon={X} />
        </button>
      </div>
    );
  }

  return (
    <Field
      id="voucher"
      label="Kode voucher Heritage Gift"
      optional
      error={error}
      hint={`Coba kode demo ${DEMO_VOUCHER.code}.`}
    >
      <div className="flex gap-2">
        <Input
          id="voucher"
          value={code}
          invalid={Boolean(error)}
          placeholder="LENS-XXXX-1928"
          autoCapitalize="characters"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
          className="uppercase"
        />
        <Button variant="secondary" onClick={apply} className="shrink-0">
          Pakai
        </Button>
      </div>
    </Field>
  );
}
