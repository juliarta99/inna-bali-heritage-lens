"use client";

import { useSyncExternalStore } from "react";
import { safeGet, safeSet } from "./storage";

const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache === null) cache = safeGet<string[]>("passport", []);
  return cache;
}

function write(next: string[]) {
  cache = next;
  safeSet("passport", next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Status stempel passport, tersimpan di localStorage dan dibagi ke semua komponen. */
export function usePassport() {
  const stamps = useSyncExternalStore(subscribe, read, () => EMPTY);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return {
    stamps,
    hydrated,
    collect: (id: string) => {
      const current = read();
      if (!current.includes(id)) write([...current, id]);
    },
    reset: () => write([]),
  };
}
