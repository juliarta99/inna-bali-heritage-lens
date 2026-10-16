import { images } from "./images";
import type { HeritageBox } from "./types";

/** Heritage Box: satu produk berisi karya UMKM Bali. */
export const heritageBox: HeritageBox = {
  name: "Heritage Box",
  price: 250_000,
  description:
    "Sepotong cerita Bali Hotel yang bisa dibawa pulang atau dikirim sebagai hadiah. Setiap isinya dibuat oleh UMKM Bali.",
  cover: images.box.cover,
  pickupNote: "Ambil di resepsionis hotel, Jl. Veteran No. 3, Denpasar. Tanpa ongkos kirim.",
  shippingNote: "Ongkos kirim dihitung saat konfirmasi pesanan (prototipe: belum dihitung).",
  items: [
    {
      id: "kopi",
      name: "Kopi Kintamani 250 g",
      maker: "[Nama UMKM]",
      story: "Kopi arabika dari dataran tinggi Kintamani, disangrai dalam jumlah kecil.",
      image: images.box.kopi,
    },
    {
      id: "jajan",
      name: "Jajan Bali kering",
      maker: "[Nama UMKM]",
      story: "Pilihan jajan Bali kering yang tahan dibawa pulang.",
      image: images.box.jajan,
    },
    {
      id: "kartu-pos",
      name: "5 kartu pos foto arsip",
      maker: "[Nama UMKM]",
      story: "Reproduksi foto arsip Bali Hotel, dicetak sebagai kartu pos yang bisa dikirim.",
      image: images.box.kartupos,
    },
    {
      id: "pouch",
      name: "Pouch kain endek",
      maker: "[Nama UMKM]",
      story: "Pouch dari kain tenun endek Bali, cukup untuk dompet atau ponsel.",
      image: images.box.pouch,
    },
    {
      id: "kemasan",
      name: "Kemasan bermotif",
      maker: "[Nama UMKM]",
      story: "Kotak dengan motif yang terinspirasi dari ornamen bangunan hotel.",
      image: images.box.kemasan,
    },
  ],
};
