/**
 * Tipe data bersama untuk seluruh aplikasi Inna Bali Heritage Lens.
 */

/**
 * Slot gambar. `src` adalah path di folder `public/` yang direncanakan.
 * Selama file belum ada, komponen `Photo` menampilkan placeholder berisi `caption`.
 */
export type ImageSlot = {
  src: string;
  alt: string;
  /** Keterangan foto yang akan dipasang (juga dipakai di placeholder). */
  caption: string;
  /** Rasio dan ukuran yang disarankan, contoh "4:3, min. 1600px". */
  spec: string;
  /** Sumber foto singkat untuk keterangan (penulis, lisensi). */
  source?: string;
  /** Atribusi lengkap untuk halaman kredit. */
  credit?: { title: string; author: string; license: string; url: string };
  /** `true` bila foto hanya ilustrasi, bukan foto hotel atau lokasi itu sendiri. */
  illustrative?: boolean;
};

export type Credit = {
  title: string;
  author: string;
  license: string;
  url: string;
  usedFor: string;
};

export type Hotspot = {
  id: string;
  /** Sudut horizontal dalam derajat. */
  yaw: number;
  /** Sudut vertikal dalam derajat. */
  pitch: number;
  title: string;
  story: string;
  archiveImage?: ImageSlot;
};

export type Location = {
  slug: string;
  name: string;
  summary: string;
  panorama: string;
  panoramaCredit: Credit;
  /** Sudut awal kamera dalam derajat. */
  startYaw?: number;
  hotspots: Hotspot[];
  relatedPackage: string;
  archiveCompare?: { before: ImageSlot; after: ImageSlot };
  model?: { src: string; name: string; alt: string; note: string };
};

export type RatePlanId = "room-only" | "breakfast";

export type Rate = { publish: number; best: number };

export type Room = {
  id: string;
  name: string;
  units: number;
  /** Luas dalam m². `null` bila belum ada data. */
  size: number | null;
  capacity: number;
  description: string;
  features: string[];
  /** `null` berarti tampilkan "Cek ketersediaan". */
  rates: Record<RatePlanId, Rate> | null;
  image: ImageSlot;
};

export type ItineraryStep = { day: string; time: string; activity: string };

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  /** Jumlah malam menginap, 0 untuk paket tanpa menginap. */
  nights: number;
  /** ID kamar dari rooms.ts (tarif dengan sarapan). */
  roomId: string | null;
  experiencePrice: number;
  /** Harga pelajar per orang (khusus Day Pass). */
  studentPrice?: number;
  /** "per-2" = harga untuk 2 orang, "per-orang" = dikali jumlah tamu. */
  priceUnit: "per-2" | "per-orang";
  /** Hari check-in yang diwajibkan (0 = Minggu, 5 = Jumat). */
  checkInWeekday?: number;
  maxGuests: number;
  includes: string[];
  excludes: string[];
  itinerary: ItineraryStep[];
  locations: string[];
  cover: ImageSlot;
  gallery: ImageSlot[];
};

export type BoxItem = {
  id: string;
  name: string;
  maker: string;
  story: string;
  image: ImageSlot;
};

export type HeritageBox = {
  name: string;
  price: number;
  description: string;
  items: BoxItem[];
  cover: ImageSlot;
  pickupNote: string;
  shippingNote: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  text: string;
};

export type GalleryEra = "1928-1945" | "1950-1999" | "2000-sekarang" | "100-cerita";

export type GalleryItem = {
  id: string;
  era: GalleryEra;
  image: ImageSlot;
  year: string;
};

export type GekLink = { label: string; href: string };

export type GekIntent = {
  id: string;
  keywords: string[];
  answer: string;
  links: GekLink[];
};

export type PassportPoint = {
  id: string;
  name: string;
  hint: string;
  href?: string;
};

/* ---------- Commerce ---------- */

export type CartKind = "paket" | "kamar" | "box" | "gift";

export type CartItem = {
  id: string;
  kind: CartKind;
  title: string;
  /** Baris rincian yang ditampilkan di keranjang dan e-voucher. */
  details: string[];
  unitPrice: number;
  quantity: number;
  maxQuantity: number;
  href: string;
  /** Data khusus Heritage Gift agar kodenya bisa ditukar setelah dibayar. */
  gift?: { code: string; value: number };
};

export type PaymentMethod = "qris" | "va" | "kartu";

export type Customer = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

export type Order = {
  code: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  voucherCode: string | null;
  total: number;
  payment: PaymentMethod;
  customer: Customer;
};
