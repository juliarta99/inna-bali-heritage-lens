"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { DEMO_VOUCHER } from "@/data/gift";
import type { CartItem, Order } from "@/data/types";
import { safeGet, safeSet } from "@/lib/storage";

type State = { items: CartItem[]; orders: Order[]; hydrated: boolean };

type Action =
  | { type: "hydrate"; items: CartItem[]; orders: Order[] }
  | { type: "add"; item: CartItem }
  | { type: "remove"; id: string }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "clear" }
  | { type: "order"; order: Order };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, orders: action.orders, hydrated: true };
    case "add":
      return { ...state, items: [...state.items, action.item] };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "quantity":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: Math.min(i.maxQuantity, Math.max(1, action.quantity)) } : i,
        ),
      };
    case "clear":
      return { ...state, items: [] };
    case "order":
      return { ...state, orders: [action.order, ...state.orders] };
  }
}

type VoucherResult = { ok: true; code: string; value: number } | { ok: false; message: string };

type CartContextValue = {
  items: CartItem[];
  orders: Order[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  placeOrder: (order: Order) => void;
  /** Cek kode Heritage Gift: kode demo atau kode dari gift yang sudah dibayar. */
  checkVoucher: (code: string) => VoucherResult;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Akses keranjang dan pesanan. Harus dipakai di dalam `CartProvider`. */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}

/**
 * Menyimpan keranjang dan pesanan di React state (useReducer),
 * lalu menyalinnya ke localStorage sebagai pelengkap.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], orders: [], hydrated: false });
  const skipFirstSave = useRef(true);

  useEffect(() => {
    dispatch({ type: "hydrate", items: safeGet<CartItem[]>("cart", []), orders: safeGet<Order[]>("orders", []) });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    safeSet("cart", state.items);
    safeSet("orders", state.orders);
  }, [state.items, state.orders, state.hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const usedCodes = new Set(state.orders.map((o) => o.voucherCode).filter(Boolean));
    return {
      items: state.items,
      orders: state.orders,
      hydrated: state.hydrated,
      count: state.items.reduce((n, i) => n + i.quantity, 0),
      subtotal: state.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0),
      addItem: (item) => dispatch({ type: "add", item }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      setQuantity: (id, quantity) => dispatch({ type: "quantity", id, quantity }),
      clear: () => dispatch({ type: "clear" }),
      placeOrder: (order) => dispatch({ type: "order", order }),
      checkVoucher: (raw) => {
        const code = raw.trim().toUpperCase();
        if (!code) return { ok: false, message: "Masukkan kode voucher." };
        if (code === DEMO_VOUCHER.code) return { ok: true, code, value: DEMO_VOUCHER.value };
        const purchased = state.orders.flatMap((o) => o.items).find((i) => i.gift?.code === code);
        if (purchased?.gift) {
          if (usedCodes.has(code)) return { ok: false, message: "Kode ini sudah dipakai." };
          return { ok: true, code, value: purchased.gift.value };
        }
        return { ok: false, message: "Kode tidak dikenali. Periksa lagi penulisannya." };
      },
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
