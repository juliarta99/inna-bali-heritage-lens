import { gekCopy, intents, whatsappLink } from "@/data/gek-inna";
import type { GekLink } from "@/data/types";

export type GekAnswer = { intentId: string | null; text: string; links: GekLink[] };

/** Ubah teks menjadi huruf kecil tanpa tanda baca dan spasi ganda. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Cocokkan pertanyaan ke intent dengan pencocokan kata kunci utuh.
 * Skor intent = jumlah kata dari setiap kata kunci yang cocok, sehingga
 * frasa panjang ("sejarah suite 77") mengalahkan kata tunggal ("sejarah").
 * Mengembalikan jawaban fallback beserta tombol WhatsApp bila tidak ada yang cocok.
 */
export function answer(question: string): GekAnswer {
  const text = ` ${normalize(question)} `;
  let best: { id: string; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const kw = normalize(keyword);
      if (kw && text.includes(` ${kw} `)) score += kw.split(" ").length;
    }
    if (score > 0 && (!best || score > best.score)) best = { id: intent.id, score };
  }

  const match = best ? intents.find((i) => i.id === best.id) : undefined;
  if (!match) return { intentId: null, text: gekCopy.fallback, links: [whatsappLink] };
  return { intentId: match.id, text: match.answer, links: match.links };
}

/** Durasi acak indikator mengetik, 600 sampai 900 ms. */
export function typingDelay(): number {
  return 600 + Math.floor(Math.random() * 300);
}
