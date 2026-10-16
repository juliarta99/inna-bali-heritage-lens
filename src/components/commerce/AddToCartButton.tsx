"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { CartItem } from "@/data/types";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  /** Kembalikan item yang akan ditambahkan, atau `null` bila validasi gagal. */
  build: () => CartItem | null;
  label?: string;
  full?: boolean;
  onAdded?: (item: CartItem) => void;
};

/**
 * Tombol "Tambah ke keranjang". Menjalankan `build()` (tempat validasi),
 * menambah item, lalu menampilkan notifikasi "Ditambahkan ke keranjang".
 */
export function AddToCartButton({ build, label = "Tambah ke keranjang", full, onAdded }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const toast = useToast();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  function onClick() {
    const item = build();
    if (!item) return;
    addItem(item);
    setAdded(true);
    toast({ message: "Ditambahkan ke keranjang", action: { label: "Lihat keranjang", href: "/keranjang" } });
    onAdded?.(item);
  }

  return (
    <Button onClick={onClick} full={full}>
      <Icon icon={added ? Check : ShoppingBag} />
      {added ? "Ditambahkan" : label}
    </Button>
  );
}
