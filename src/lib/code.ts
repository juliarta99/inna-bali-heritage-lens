/**
 * Pembuat kode dummy untuk pesanan dan voucher.
 * Huruf yang mirip (O/0, I/1) dihindari agar mudah dibaca.
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Buat string acak sepanjang `length` dari alfabet yang mudah dibaca. */
export function randomChunk(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

/** Kode voucher Heritage Gift, contoh "LENS-7K2Q-1928". */
export function makeVoucherCode(): string {
  return `LENS-${randomChunk(4)}-1928`;
}

/** Kode pesanan, contoh "IBH-261016-4KQ9". */
export function makeOrderCode(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `IBH-${yy}${mm}${dd}-${randomChunk(4)}`;
}

/** ID unik sederhana untuk item keranjang. */
export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${randomChunk(4)}`;
}
