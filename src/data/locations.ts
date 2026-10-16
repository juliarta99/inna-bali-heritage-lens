import { images } from "./images";
import type { Credit, Location } from "./types";

/** Kredit panorama pengganti dari Poly Haven (CC0). */
function polyhaven(slug: string, title: string, author: string, usedFor: string): Credit {
  return {
    title: `${title} (${slug})`,
    author,
    license: "CC0 1.0",
    url: `https://polyhaven.com/a/${slug}`,
    usedFor,
  };
}

const LANTERN = {
  src: "/models/lantern.glb",
  name: "Lentera kayu",
  alt: "Model 3D lentera kayu tua yang bisa diputar dan ditempatkan di ruangan",
  note: "Model pengganti sementara. Nanti diganti hasil pemindaian 3D koleksi hotel.",
};

/** Tujuh lokasi tur 3D/360°. Yaw dan pitch dalam derajat. */
export const locations: Location[] = [
  {
    slug: "suite-77",
    name: "Suite Soekarno (77)",
    summary: "Kamar yang dikenal sebagai tempat Bung Karno menginap di Bali Hotel.",
    panorama: "/panoramas/aft_lounge.jpg",
    panoramaCredit: polyhaven("aft_lounge", "Aft Lounge", "Greg Zaal", "Pengganti panorama Suite 77"),
    startYaw: 0,
    hotspots: [
      {
        id: "meja-kerja",
        yaw: 15,
        pitch: -20,
        title: "Meja kerja",
        story:
          "Meja kerja di dekat jendela adalah sudut yang paling sering ditanyakan tamu. Cerita tentang apa yang ditulis di meja ini masih dikumpulkan dari arsip [konfirmasi ke hotel].",
      },
      {
        id: "jendela-teras",
        yaw: -15,
        pitch: 6,
        title: "Jendela teras",
        story:
          "Jendela ini membuka ke teras yang menghadap Jl. Veteran. Di teras inilah paket Jejak Bung Karno menyajikan Kopi Malam Bung Karno.",
      },
      {
        id: "foto-bung-karno",
        yaw: -122,
        pitch: 2,
        title: "Foto Bung Karno",
        story:
          "Foto Bung Karno dipajang di dinding suite sebagai pengingat tamu paling terkenal kamar ini. Detail tanggal kunjungannya akan dilengkapi [konfirmasi ke hotel].",
        archiveImage: images.arsip.suiteBungKarno,
      },
    ],
    relatedPackage: "jejak-bung-karno",
    archiveCompare: { before: images.compare.suiteDulu, after: images.compare.suiteKini },
    model: LANTERN,
  },
  {
    slug: "suite-nehru",
    name: "Suite Nehru",
    summary: "Suite yang mengenang kunjungan Perdana Menteri India, Jawaharlal Nehru.",
    panorama: "/panoramas/cabin.jpg",
    panoramaCredit: polyhaven("cabin", "Cabin", "Greg Zaal", "Pengganti panorama Suite Nehru"),
    hotspots: [
      {
        id: "kunjungan-nehru",
        yaw: 0,
        pitch: 10,
        title: "Kunjungan Jawaharlal Nehru",
        story:
          "Suite ini dinamai untuk mengenang kunjungan Jawaharlal Nehru. Tahun dan rincian kunjungannya akan dilengkapi dari arsip hotel [konfirmasi ke hotel].",
        archiveImage: images.arsip.nehru,
      },
      {
        id: "meja-tulis",
        yaw: -85,
        pitch: -5,
        title: "Meja tulis",
        story:
          "Sudut kerja yang tenang untuk tamu yang datang dengan urusan dinas. Koleksi perabot asli yang masih tersimpan sedang didata [konfirmasi ke hotel].",
      },
    ],
    relatedPackage: "jejak-bung-karno",
  },
  {
    slug: "mini-museum",
    name: "Mini Museum",
    summary: "Ruang kecil berisi benda-benda yang menemani hotel sejak masa lalu.",
    panorama: "/panoramas/church_museum.jpg",
    panoramaCredit: polyhaven("church_museum", "Church Museum", "Dario Barresi", "Pengganti panorama Mini Museum"),
    hotspots: [
      {
        id: "mesin-ketik",
        yaw: -142,
        pitch: -14,
        title: "Mesin ketik",
        story:
          "Mesin ketik tua ini dipakai untuk urusan administrasi hotel. Tahun pembuatannya masih dikonfirmasi [konfirmasi ke hotel].",
      },
      {
        id: "sepeda-onthel",
        yaw: 4,
        pitch: -10,
        title: "Sepeda onthel",
        story:
          "Sepeda onthel menjadi pengingat zaman ketika jalan di sekitar hotel masih lengang. Asal-usul sepeda ini sedang ditelusuri [konfirmasi ke hotel].",
      },
      {
        id: "album-foto",
        yaw: 125,
        pitch: 5,
        title: "Album foto lawas",
        story:
          "Album foto lawas menyimpan wajah hotel dari berbagai masa. Sebagian foto akan direproduksi menjadi kartu pos di Heritage Box.",
        archiveImage: images.arsip.album,
      },
    ],
    relatedPackage: "heritage-day-pass",
    model: LANTERN,
  },
  {
    slug: "pendopo",
    name: "Pendopo Mahapuri",
    summary: "Panggung tari Jumat malam dengan tiang kayu berukir berusia hampir 100 tahun.",
    panorama: "/panoramas/ballroom.jpg",
    panoramaCredit: polyhaven("ballroom", "Ballroom", "Sergej Majboroda", "Pengganti panorama Pendopo Mahapuri"),
    hotspots: [
      {
        id: "tiang-kayu",
        yaw: 100,
        pitch: 2,
        title: "Tiang kayu berukir",
        story:
          "Tiang-tiang kayu berukir di pendopo ini berusia hampir 100 tahun. Ukirannya dirawat agar tetap seperti saat pertama dipasang.",
      },
      {
        id: "tari-jumat",
        yaw: -12,
        pitch: -20,
        title: "Tari Jumat malam",
        story:
          "Sejak tahun 1930-an, tari Bali digelar setiap Jumat malam di hotel ini. Tradisi itu dihidupkan lagi lewat paket Weekend Passage 1928.",
        archiveImage: images.arsip.tariJumat,
      },
    ],
    relatedPackage: "weekend-passage-1928",
    archiveCompare: { before: images.compare.pendopoDulu, after: images.compare.pendopoKini },
  },
  {
    slug: "puputan-badung",
    name: "Lapangan Puputan Badung",
    summary: "Lapangan bersejarah di depan hotel, saksi Puputan 20 September 1906.",
    panorama: "/panoramas/belvedere.jpg",
    panoramaCredit: polyhaven(
      "belvedere",
      "Belvedere",
      "Greg Zaal, Rico Cilliers",
      "Pengganti panorama Lapangan Puputan Badung",
    ),
    hotspots: [
      {
        id: "puputan-1906",
        yaw: 0,
        pitch: -5,
        title: "Puputan 20 September 1906",
        story:
          "Pada 20 September 1906, Puputan Badung terjadi di kawasan ini. Lapangan ini kini menjadi ruang publik dan titik awal heritage walk dari hotel.",
      },
      {
        id: "monumen",
        yaw: -142,
        pitch: 14,
        title: "Monumen",
        story:
          "Monumen di lapangan ini didirikan untuk mengenang Puputan Badung. Pemandu heritage walk akan bercerita lebih lengkap di lokasi.",
        archiveImage: images.arsip.puputan,
      },
    ],
    relatedPackage: "denpasar-heritage-walk",
  },
  {
    slug: "museum-bali",
    name: "Museum Bali",
    summary: "Museum dengan arsitektur puri, beberapa menit berjalan kaki dari hotel.",
    panorama: "/panoramas/bloem_olive_house.jpg",
    panoramaCredit: polyhaven(
      "bloem_olive_house",
      "Bloem Olive House",
      "Jenelle van Heerden, Greg Zaal",
      "Pengganti panorama Museum Bali",
    ),
    hotspots: [
      {
        id: "arsitektur-puri",
        yaw: 17,
        pitch: 12,
        title: "Arsitektur puri",
        story:
          "Bangunan Museum Bali mengikuti tata ruang puri, dengan halaman dan gerbang khas Bali. Rincian sejarah gedungnya akan dilengkapi [konfirmasi ke hotel].",
      },
      {
        id: "koleksi-budaya",
        yaw: -20,
        pitch: -2,
        title: "Koleksi budaya",
        story: "Museum ini menyimpan koleksi budaya Bali. Kunjungannya termasuk dalam paket Denpasar Heritage Walk.",
      },
    ],
    relatedPackage: "denpasar-heritage-walk",
  },
  {
    slug: "pasar-badung",
    name: "Pasar Badung",
    summary: "Pasar tradisional tempat mencicipi jajan Bali di akhir heritage walk.",
    panorama: "/panoramas/buikslotermeerplein.jpg",
    panoramaCredit: polyhaven(
      "buikslotermeerplein",
      "Buikslotermeerplein",
      "Greg Zaal",
      "Pengganti panorama Pasar Badung",
    ),
    hotspots: [
      {
        id: "pasar-tradisional",
        yaw: 70,
        pitch: 0,
        title: "Pasar tradisional",
        story:
          "Pasar Badung adalah pasar tradisional di pusat Denpasar. Pagi hari adalah waktu terbaik untuk melihat pedagang menata dagangan.",
      },
      {
        id: "jajan-bali",
        yaw: -60,
        pitch: -10,
        title: "Jajan Bali",
        story: "Heritage walk ditutup dengan jajan Bali dari pasar. Jajan Bali kering juga ada di dalam Heritage Box.",
      },
    ],
    relatedPackage: "denpasar-heritage-walk",
  },
];

/** Cari lokasi berdasarkan slug. */
export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Lokasi untuk lensa di beranda. */
export const HERO_LOCATION_SLUG = "suite-77";
