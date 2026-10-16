import { BedDouble, Gift, Package, Ticket } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { CartKind } from "@/data/types";

const icons = { paket: Ticket, kamar: BedDouble, box: Package, gift: Gift } as const;
export const kindLabel: Record<CartKind, string> = {
  paket: "Paket",
  kamar: "Kamar",
  box: "Heritage Box",
  gift: "Heritage Gift",
};

/** Kotak ikon yang menandai jenis item keranjang (paket, kamar, box, gift). */
export function KindIcon({ kind }: { kind: CartKind }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-ui bg-primary-soft text-primary">
      <Icon icon={icons[kind]} size={24} />
    </span>
  );
}
