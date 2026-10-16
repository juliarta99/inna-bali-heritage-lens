import type { TimelineEvent } from "./types";

/** Tanggal sementara peringatan 100 tahun (menyesuaikan agenda hotel). */
export const CENTENARY_DATE = "2027-08-22";
export const CENTENARY_NOTE = "Tanggal menyesuaikan agenda hotel.";

/** Linimasa 1927 sampai 2027. */
export const timeline: TimelineEvent[] = [
  { year: "1927", title: "Pembangunan dimulai", text: "Bali Hotel mulai dibangun di Denpasar." },
  {
    year: "1928",
    title: "Hotel internasional pertama di Bali",
    text: "Pada 22 Agustus 1928, perusahaan pelayaran KPM membuka Bali Hotel sebagai hotel internasional pertama di Bali.",
  },
  {
    year: "1930-an",
    title: "Tempat berkumpul seniman dunia",
    text: "Walter Spies, Colin McPhee, Margaret Mead, dan Charlie Chaplin berkumpul di sini. Tari Bali digelar setiap Jumat malam.",
  },
  { year: "1956", title: "Menjadi Natour Bali", text: "Hotel dinasionalisasi dan berganti nama menjadi Natour Bali." },
  {
    year: "2014",
    title: "Renovasi bangunan utama",
    text: "Bangunan utama direnovasi dengan tetap menjaga karakter aslinya.",
  },
  { year: "2017", title: "Inna Bali Heritage", text: "Hotel berganti nama menjadi Inna Bali Heritage." },
  {
    year: "2019",
    title: "Cagar Budaya",
    text: "Pada Oktober 2019, hotel ditetapkan sebagai Cagar Budaya Peringkat Kota Denpasar.",
  },
  { year: "2027", title: "100 tahun", text: "Seratus tahun sejak pembangunan Bali Hotel." },
];
