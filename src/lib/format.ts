/**
 * Format angka rupiah tanpa spasi setelah "Rp", contoh: `formatRupiah(1220000)` -> "Rp1.220.000".
 */
export function formatRupiah(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}Rp${Math.abs(rounded).toLocaleString("id-ID")}`;
}

/**
 * Format tanggal ISO (YYYY-MM-DD) menjadi "16 Oktober 2026".
 * Opsi `withDay` menambahkan nama hari di depan.
 */
export function formatTanggal(iso: string, withDay = false): string {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  return date.toLocaleDateString("id-ID", {
    weekday: withDay ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Ubah string YYYY-MM-DD menjadi Date lokal (tanpa geser zona waktu). */
export function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

/** Ubah Date menjadi string YYYY-MM-DD berdasarkan waktu lokal. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Tambah sejumlah hari ke tanggal ISO dan kembalikan tanggal ISO baru. */
export function addDays(iso: string, days: number): string {
  const date = parseIsoDate(iso) ?? new Date();
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** Selisih malam antara dua tanggal ISO (minimal 0). */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseIsoDate(checkIn);
  const b = parseIsoDate(checkOut);
  if (!a || !b) return 0;
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86_400_000));
}

/** Format tanggal-waktu ISO lengkap menjadi "16 Okt 2026, 14.30". */
export function formatWaktu(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  if (Number.isNaN(date.getTime())) return isoDateTime;
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
