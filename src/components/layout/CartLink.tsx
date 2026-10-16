"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";
import { Icon } from "@/components/ui/Icon";

/** Ikon keranjang di header beserta jumlah item. */
export function CartLink() {
  const { count } = useCart();
  return (
    <Link
      href="/keranjang"
      aria-label={count > 0 ? `Keranjang, ${count} item` : "Keranjang kosong"}
      className="relative grid size-11 place-items-center rounded-ui text-ink hover:bg-surface-2"
    >
      <Icon icon={ShoppingBag} size={24} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-1 right-0.5 grid h-5 min-w-5 animate-fade place-items-center rounded-full bg-primary px-1 text-[0.6875rem] font-semibold text-surface"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
