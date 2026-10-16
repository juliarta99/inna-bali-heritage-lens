import type { Credit, PassportPoint } from "./types";
import { locations } from "./locations";

/** Informasi umum hotel dan teks yang dipakai di banyak halaman. */
export const site = {
  name: "Inna Bali Heritage Lens",
  /** Versi web dari public/images/logo_primary.svg (gambar emblem diperkecil, 57 KB). */
  logo: { src: "/images/logo-primary-web.svg", width: 273, height: 85 },
  hotel: "INNA Bali Heritage Hotel",
  address: "Jl. Veteran No. 3, Denpasar, Bali",
  whatsappLabel: "+62 813-3733-7088",
  whatsappUrl: "https://wa.me/6281337337088",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=INNA+Bali+Heritage+Hotel+Jl.+Veteran+No.+3+Denpasar",
  prototypeNote: "Prototipe untuk INNA Heritage Business Idea Challenge 2026",
};

export const nav = [
  { href: "/jelajahi", label: "Jelajahi" },
  { href: "/paket", label: "Paket" },
  { href: "/kamar", label: "Kamar" },
  { href: "/heritage-box", label: "Heritage Box" },
  { href: "/heritage-gift", label: "Heritage Gift" },
  { href: "/gallery", label: "Gallery" },
];

export const homeCopy = {
  title: "Menginap di tempat pariwisata Bali dimulai",
  subtitle:
    "Bali Hotel dibuka tahun 1928 sebagai hotel internasional pertama di Bali. Geser lensa untuk melihat Suite 77 dari dalam.",
  lensHint: "Geser untuk melihat sekeliling",
  doors: [
    {
      href: "/jelajahi",
      title: "Jelajahi",
      text: "Masuk ke tujuh ruang dan sudut kota lewat tur 3D/360°, lengkap dengan ceritanya.",
      cta: "Mulai tur",
      imageKey: "jelajahi" as const,
    },
    {
      href: "/paket",
      title: "Menginap",
      text: "Pilih paket heritage atau pesan kamar langsung dengan tarif terbaik.",
      cta: "Lihat paket dan kamar",
      imageKey: "menginap" as const,
    },
    {
      href: "/heritage-box",
      title: "Belanja",
      text: "Bawa pulang Heritage Box karya UMKM Bali, atau hadiahkan Heritage Gift.",
      cta: "Lihat Heritage Box",
      imageKey: "belanja" as const,
    },
  ],
  quote:
    "Di Suite 77, meja kerja masih menghadap jendela yang sama. Anda bisa menginap di sana dan menutup malam dengan kopi di teras yang menghadap Jl. Veteran.",
  quoteSource: "Paket Jejak Bung Karno",
};

/** Sepuluh titik passport: 7 lokasi tur ditambah lobby, teras, dan taman. */
export const passportPoints: PassportPoint[] = [
  ...locations.map((l) => ({ id: l.slug, name: l.name, hint: l.summary, href: `/jelajahi/${l.slug}` })),
  { id: "lobby", name: "Lobby", hint: "Titik awal setiap tur dan heritage walk." },
  { id: "teras", name: "Teras Jl. Veteran", hint: "Teras yang menghadap Jl. Veteran." },
  { id: "taman", name: "Taman hotel", hint: "Taman di antara bangunan kamar." },
];

export const passportCopy = {
  intro: 'Kumpulkan stempel di 10 titik hotel dan sekitarnya. Saat berada di lokasi, tekan "Saya di lokasi ini".',
  certificateTitle: "Bali Hotel Passenger 1928",
  certificateText:
    "Sertifikat ini menyatakan bahwa pemegangnya telah menjelajahi seluruh titik Inna Bali Heritage, mengikuti jejak penumpang pertama Bali Hotel tahun 1928.",
};

/** Kredit aset selain panorama (panorama ada di locations.ts). */
export const otherCredits: Credit[] = [
  {
    title: "Lantern",
    author: "Microsoft (sbtron); kompresi Draco oleh Frank Galligan",
    license: "CC0 1.0",
    url: "https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Lantern",
    usedFor: "Model AR pengganti untuk Suite 77 dan Mini Museum",
  },
  {
    title: "Lucide Icons",
    author: "Lucide Contributors",
    license: "ISC",
    url: "https://lucide.dev",
    usedFor: "Semua ikon di website",
  },
  {
    title: "Bodoni Moda dan Plus Jakarta Sans",
    author: "Owen Earl; Tokotype",
    license: "SIL Open Font License 1.1",
    url: "https://fonts.google.com",
    usedFor: "Huruf judul dan teks",
  },
  {
    title: "Photo Sphere Viewer",
    author: "Damien Sorel dan kontributor",
    license: "MIT",
    url: "https://photo-sphere-viewer.js.org",
    usedFor: "Viewer 360°",
  },
  {
    title: "model-viewer",
    author: "Google",
    license: "Apache 2.0",
    url: "https://modelviewer.dev",
    usedFor: "Viewer 3D dan AR",
  },
];
