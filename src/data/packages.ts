import { images } from "./images";
import { getRoom } from "./rooms";
import type { Package } from "./types";

/** Empat paket heritage. Harga pengalaman dalam rupiah. */
export const packages: Package[] = [
  {
    slug: "jejak-bung-karno",
    name: "Jejak Bung Karno",
    tagline: "Satu malam di Suite 77, kamar yang menyimpan nama Bung Karno.",
    description:
      "Menginap di Suite (kamar 77), tur privat mini museum, dan secangkir kopi malam di teras yang menghadap Jl. Veteran. Anda pulang membawa sertifikat digital.",
    duration: "2 hari 1 malam",
    nights: 1,
    roomId: "suite",
    experiencePrice: 450_000,
    priceUnit: "per-2",
    maxGuests: 2,
    includes: [
      "Menginap 1 malam di Suite (kamar 77) dengan sarapan untuk 2 orang",
      "Tur privat mini museum bersama pemandu hotel",
      "Kopi Malam Bung Karno di teras yang menghadap Jl. Veteran",
      "Sertifikat digital Jejak Bung Karno",
    ],
    excludes: ["Transportasi dari dan ke bandara", "Makan siang dan makan malam", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", time: "14.00", activity: "Check-in di Suite 77 dan minuman sambutan" },
      { day: "Hari 1", time: "16.00", activity: "Tur privat mini museum" },
      { day: "Hari 1", time: "19.30", activity: "Kopi Malam Bung Karno di teras" },
      { day: "Hari 2", time: "07.00", activity: "Sarapan" },
      { day: "Hari 2", time: "12.00", activity: "Check-out, sertifikat digital dikirim" },
    ],
    locations: ["suite-77", "mini-museum"],
    cover: images.paket.jejakCover,
    gallery: [images.paket.jejakCover, images.paket.jejak2, images.paket.jejak3],
  },
  {
    slug: "denpasar-heritage-walk",
    name: "Denpasar Heritage Walk",
    tagline: "Jalan kaki pagi menyusuri jantung kota tua Denpasar.",
    description:
      "Heritage walk pagi ke Lapangan Puputan Badung, Museum Bali, Pura Jagatnatha, dan Pasar Badung, ditutup dengan jajan Bali.",
    duration: "2 hari 1 malam",
    nights: 1,
    roomId: "standard-garden-view",
    experiencePrice: 300_000,
    priceUnit: "per-2",
    maxGuests: 2,
    includes: [
      "Menginap 1 malam di Standard Garden View dengan sarapan untuk 2 orang",
      "Heritage walk pagi bersama pemandu",
      "Lapangan Puputan Badung, Museum Bali, Pura Jagatnatha, dan Pasar Badung",
      "Jajan Bali",
    ],
    excludes: [
      "Tiket masuk Museum Bali [konfirmasi ke hotel]",
      "Transportasi dari dan ke bandara",
      "Pengeluaran pribadi",
    ],
    itinerary: [
      { day: "Hari 1", time: "14.00", activity: "Check-in" },
      { day: "Hari 2", time: "06.30", activity: "Berkumpul di lobby, berjalan ke Lapangan Puputan Badung" },
      { day: "Hari 2", time: "07.15", activity: "Museum Bali dan Pura Jagatnatha" },
      { day: "Hari 2", time: "08.30", activity: "Pasar Badung dan jajan Bali" },
      { day: "Hari 2", time: "09.30", activity: "Kembali ke hotel untuk sarapan" },
      { day: "Hari 2", time: "12.00", activity: "Check-out" },
    ],
    locations: ["puputan-badung", "museum-bali", "pasar-badung"],
    cover: images.paket.walkCover,
    gallery: [images.paket.walkCover, images.paket.walk2, images.paket.walk3],
  },
  {
    slug: "weekend-passage-1928",
    name: "Weekend Passage 1928",
    tagline: "Napak tilas paket akhir pekan KPM, Jumat sampai Minggu.",
    description:
      "Paket ini menapak tilas paket akhir pekan KPM: tiket kapal digital, tari dan gamelan Jumat malam di Pendopo, heritage walk, dan rijsttafel di Warung Sintha.",
    duration: "3 hari 2 malam (Jumat sampai Minggu)",
    nights: 2,
    roomId: "deluxe-garden-view",
    experiencePrice: 1_200_000,
    priceUnit: "per-2",
    checkInWeekday: 5,
    maxGuests: 2,
    includes: [
      "Menginap 2 malam di Deluxe Garden View dengan sarapan untuk 2 orang",
      "Tiket kapal digital bergaya 1928",
      "Tari dan gamelan Jumat malam di Pendopo",
      "Heritage walk bersama pemandu",
      "Rijsttafel di Warung Sintha",
    ],
    excludes: ["Transportasi dari dan ke bandara", "Minuman tambahan", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Jumat", time: "14.00", activity: "Check-in, tiket kapal digital dikirim" },
      { day: "Jumat", time: "19.00", activity: "Tari dan gamelan di Pendopo" },
      { day: "Sabtu", time: "06.30", activity: "Heritage walk ke Lapangan Puputan Badung" },
      { day: "Sabtu", time: "19.00", activity: "Rijsttafel di Warung Sintha" },
      { day: "Minggu", time: "12.00", activity: "Check-out" },
    ],
    locations: ["pendopo", "puputan-badung"],
    cover: images.paket.weekendCover,
    gallery: [images.paket.weekendCover, images.paket.weekend2, images.paket.weekend3],
  },
  {
    slug: "heritage-day-pass",
    name: "Heritage Day Pass",
    tagline: "Tiga jam mengenal hotel internasional pertama di Bali, tanpa menginap.",
    description:
      "Cocok untuk pelajar dan wisatawan yang tidak menginap: tur mini museum, heritage walk singkat, passport digital, dan snack.",
    duration: "3 jam, tanpa menginap",
    nights: 0,
    roomId: null,
    experiencePrice: 125_000,
    studentPrice: 75_000,
    priceUnit: "per-orang",
    maxGuests: 20,
    includes: ["Tur mini museum", "Heritage walk singkat", "Passport digital", "Snack"],
    excludes: ["Kamar dan sarapan", "Makan siang", "Transportasi"],
    itinerary: [
      { day: "Hari kunjungan", time: "09.00", activity: "Registrasi di lobby dan aktivasi passport digital" },
      { day: "Hari kunjungan", time: "09.15", activity: "Tur mini museum" },
      { day: "Hari kunjungan", time: "10.15", activity: "Heritage walk singkat di sekitar hotel" },
      { day: "Hari kunjungan", time: "11.30", activity: "Snack dan penutupan" },
    ],
    locations: ["mini-museum"],
    cover: images.paket.dayCover,
    gallery: [images.paket.dayCover, images.paket.day2, images.paket.day3],
  },
];

/** Cari paket berdasarkan slug. */
export function getPackage(slug: string | null | undefined): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

/** Harga kamar dengan sarapan per malam untuk paket (0 bila tanpa kamar). */
export function packageRoomRate(pkg: Package): number {
  return getRoom(pkg.roomId)?.rates?.breakfast.best ?? 0;
}

/**
 * Hitung total paket.
 * Paket menginap: harga kamar per malam x jumlah malam + harga pengalaman.
 * Day Pass: harga per orang x dewasa + harga pelajar x pelajar.
 */
export function packageTotal(pkg: Package, adults = 2, students = 0) {
  const roomRate = packageRoomRate(pkg);
  const roomTotal = roomRate * pkg.nights;
  const experienceTotal =
    pkg.priceUnit === "per-orang"
      ? pkg.experiencePrice * adults + (pkg.studentPrice ?? pkg.experiencePrice) * students
      : pkg.experiencePrice;
  return { roomRate, roomTotal, experienceTotal, total: roomTotal + experienceTotal };
}
