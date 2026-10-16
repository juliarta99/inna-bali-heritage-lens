import { giftCopy } from "@/data/gift";
import { site } from "@/data/site";
import { formatRupiah } from "@/lib/format";

type GiftCardProps = {
  code: string;
  value: number;
  /** Nama paket bila gift berupa paket. */
  packageName?: string;
  recipient: string;
  sender: string;
  message: string;
};

/** Pratinjau kartu voucher Heritage Gift digital. Lingkaran di pojok mengikuti motif lensa. */
export function GiftCard({ code, value, packageName, recipient, sender, message }: GiftCardProps) {
  return (
    <div
      aria-label="Pratinjau kartu Heritage Gift"
      role="img"
      className="relative overflow-hidden rounded-ui bg-primary p-6 text-surface sm:p-8"
    >
      <span aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full border border-surface/30" />
      <span aria-hidden="true" className="absolute -top-8 -right-8 size-32 rounded-full border border-surface/30" />
      <div className="relative flex flex-col gap-6">
        <div>
          <p className="text-sm opacity-90">{site.hotel}</p>
          <p className="font-display text-3xl">Heritage Gift</p>
        </div>
        <div>
          <p className="text-sm opacity-90">Untuk</p>
          <p className="font-display text-2xl break-words">{recipient || "Nama penerima"}</p>
        </div>
        {message && (
          <p className="max-w-[44ch] border-l-2 border-surface/60 pl-4 text-sm break-words italic">{message}</p>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-surface/30 pt-5">
          <div>
            <p className="text-sm opacity-90">{packageName ? "Paket" : "Nilai"}</p>
            <p className="font-display text-2xl">{packageName ?? formatRupiah(value)}</p>
            {packageName && <p className="text-xs opacity-90">senilai {formatRupiah(value)}</p>}
          </div>
          <div className="sm:text-right">
            <p className="text-sm opacity-90">Kode</p>
            <p className="font-semibold tracking-wider">{code}</p>
          </div>
        </div>
        <p className="text-xs opacity-90">
          Dari {sender || "pengirim"}. {giftCopy.validity}
        </p>
      </div>
    </div>
  );
}
