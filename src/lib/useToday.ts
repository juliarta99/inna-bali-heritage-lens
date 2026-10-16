"use client";

import { useSyncExternalStore } from "react";
import { toIsoDate } from "./format";

const subscribe = () => () => {};

/**
 * Tanggal hari ini (YYYY-MM-DD) di browser. Mengembalikan string kosong saat
 * prerender agar HTML server dan klien tidak berbeda.
 */
export function useToday(): string {
  return useSyncExternalStore(
    subscribe,
    () => toIsoDate(new Date()),
    () => "",
  );
}
