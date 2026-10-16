/**
 * Pembungkus localStorage yang aman. Semua akses dibungkus try/catch
 * sehingga aplikasi tetap berjalan bila storage diblokir atau penuh.
 */

const PREFIX = "ibhl:";

/** Baca dan parse nilai JSON dari localStorage. Mengembalikan `fallback` bila gagal. */
export function safeGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** Simpan nilai sebagai JSON ke localStorage. Mengembalikan `false` bila gagal. */
export function safeSet<T>(key: string, value: T): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
