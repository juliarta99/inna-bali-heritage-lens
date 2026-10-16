import type { GekIntent, GekLink } from "./types";
import { site } from "./site";

export const gekCopy = {
  name: "Gek Inna",
  launcherLabel: "Tanya Gek Inna",
  greeting:
    "Om Swastiastu, saya Gek Inna, pemandu digital INNA Bali Heritage. Mau tahu sejarah hotel, paket, atau kamar?",
  fallback:
    "Saya belum bisa menjawab itu. Coba tanyakan soal sejarah, paket, kamar, lokasi, atau hubungi WhatsApp reservasi.",
  disclaimer: "Prototipe: jawaban Gek Inna masih terskrip.",
  placeholder: "Tulis pertanyaan",
};

export const whatsappLink: GekLink = { label: "WhatsApp reservasi", href: site.whatsappUrl };

export const quickReplies = [
  "Sejarah Suite 77",
  "Paket untuk 2 orang",
  "Harga kamar",
  "Cara ke hotel",
  "Apa itu Heritage Box?",
];

/**
 * Daftar intent Gek Inna. Kata kunci ditulis huruf kecil tanpa tanda baca.
 * Kata kunci boleh berupa frasa; frasa yang lebih panjang diberi bobot lebih besar.
 */
export const intents: GekIntent[] = [
  {
    id: "salam",
    keywords: ["halo", "hai", "hello", "hi", "om swastiastu", "selamat pagi", "selamat siang", "selamat malam"],
    answer: "Om Swastiastu. Silakan tanya soal sejarah hotel, paket heritage, kamar, atau cara ke hotel.",
    links: [],
  },
  {
    id: "sejarah-hotel",
    keywords: [
      "sejarah",
      "sejarah hotel",
      "bali hotel",
      "berdiri",
      "dibangun",
      "tua",
      "1927",
      "cagar budaya",
      "natour",
    ],
    answer:
      "Bali Hotel mulai dibangun tahun 1927 dan dibuka 22 Agustus 1928 oleh KPM sebagai hotel internasional pertama di Bali. Tahun 1956 hotel dinasionalisasi menjadi Natour Bali, lalu berganti nama menjadi Inna Bali Heritage pada 2017. Sejak Oktober 2019 hotel ini menjadi Cagar Budaya Peringkat Kota Denpasar.",
    links: [
      { label: "Lihat linimasa", href: "/#linimasa" },
      { label: "Buka gallery", href: "/gallery" },
    ],
  },
  {
    id: "suite-77",
    keywords: ["suite 77", "77", "kamar 77", "soekarno", "sukarno", "bung karno", "sejarah suite 77"],
    answer:
      "Suite 77 dikenal sebagai Suite Soekarno, kamar yang dikaitkan dengan Bung Karno saat berada di Bali Hotel. Anda bisa melihatnya lewat tur 360° atau menginap di sana dengan paket Jejak Bung Karno.",
    links: [
      { label: "Tur 360° Suite 77", href: "/jelajahi/suite-77" },
      { label: "Paket Jejak Bung Karno", href: "/paket/jejak-bung-karno" },
    ],
  },
  {
    id: "tokoh",
    keywords: [
      "tokoh",
      "siapa saja",
      "pernah menginap",
      "tamu terkenal",
      "chaplin",
      "walter spies",
      "margaret mead",
      "colin mcphee",
      "nehru",
      "artis",
    ],
    answer:
      "Pada tahun 1930-an, Walter Spies, Colin McPhee, Margaret Mead, dan Charlie Chaplin berkumpul di Bali Hotel. Hotel ini juga menyimpan cerita tentang Bung Karno dan Jawaharlal Nehru, yang namanya diabadikan menjadi nama suite.",
    links: [
      { label: "Suite Nehru", href: "/jelajahi/suite-nehru" },
      { label: "Suite 77", href: "/jelajahi/suite-77" },
    ],
  },
  {
    id: "kpm",
    keywords: ["kpm", "1928", "kapal", "pelayaran", "belanda", "dibuka", "hotel pertama", "internasional pertama"],
    answer:
      "KPM adalah perusahaan pelayaran yang membuka Bali Hotel pada 22 Agustus 1928. Penumpang kapalnya menjadi tamu internasional pertama di Bali. Paket Weekend Passage 1928 menapak tilas paket akhir pekan KPM.",
    links: [{ label: "Weekend Passage 1928", href: "/paket/weekend-passage-1928" }],
  },
  {
    id: "mini-museum",
    keywords: ["museum", "mini museum", "koleksi", "mesin ketik", "sepeda", "onthel", "album"],
    answer:
      "Mini museum hotel menyimpan mesin ketik tua, sepeda onthel, dan album foto lawas. Anda bisa melihatnya lewat tur 360° atau datang langsung dengan Heritage Day Pass.",
    links: [
      { label: "Tur 360° Mini Museum", href: "/jelajahi/mini-museum" },
      { label: "Heritage Day Pass", href: "/paket/heritage-day-pass" },
    ],
  },
  {
    id: "paket-umum",
    keywords: ["paket", "paket untuk 2 orang", "2 orang", "berdua", "pasangan", "honeymoon", "bulan madu", "promo"],
    answer:
      "Ada tiga paket menginap untuk 2 orang: Jejak Bung Karno (Suite 77, contoh total Rp1.220.000), Denpasar Heritage Walk (contoh total Rp708.800), dan Weekend Passage 1928 (Jumat sampai Minggu, contoh total Rp2.034.400). Semua termasuk sarapan.",
    links: [
      { label: "Bandingkan paket", href: "/paket" },
      { label: "Jejak Bung Karno", href: "/paket/jejak-bung-karno" },
    ],
  },
  {
    id: "paket-bung-karno",
    keywords: ["jejak bung karno", "kopi malam"],
    answer:
      "Jejak Bung Karno: menginap 1 malam di Suite 77 dengan sarapan, tur privat mini museum, Kopi Malam Bung Karno di teras, dan sertifikat digital. Harga pengalaman Rp450.000 untuk 2 orang, ditambah tarif Suite.",
    links: [{ label: "Lihat paket", href: "/paket/jejak-bung-karno" }],
  },
  {
    id: "paket-walk",
    keywords: ["heritage walk", "jalan kaki", "walking tour", "denpasar heritage walk", "pura jagatnatha"],
    answer:
      "Denpasar Heritage Walk: jalan kaki pagi ke Lapangan Puputan Badung, Museum Bali, Pura Jagatnatha, dan Pasar Badung, plus jajan Bali. Harga pengalaman Rp300.000 untuk 2 orang, ditambah 1 malam Standard Garden View.",
    links: [{ label: "Lihat paket", href: "/paket/denpasar-heritage-walk" }],
  },
  {
    id: "paket-weekend",
    keywords: ["weekend", "akhir pekan", "weekend passage", "jumat", "rijsttafel", "warung sintha", "tari", "gamelan"],
    answer:
      "Weekend Passage 1928 berlangsung Jumat sampai Minggu: tiket kapal digital, tari dan gamelan Jumat malam di Pendopo, heritage walk, dan rijsttafel di Warung Sintha. Harga pengalaman Rp1.200.000 untuk 2 orang, ditambah 2 malam Deluxe Garden View.",
    links: [{ label: "Lihat paket", href: "/paket/weekend-passage-1928" }],
  },
  {
    id: "paket-daypass",
    keywords: ["day pass", "tanpa menginap", "pelajar", "sekolah", "mahasiswa", "kunjungan", "study tour", "rombongan"],
    answer:
      "Heritage Day Pass berlangsung 3 jam tanpa menginap: tur mini museum, heritage walk singkat, passport digital, dan snack. Harganya Rp125.000 per orang, atau Rp75.000 untuk pelajar.",
    links: [{ label: "Pesan Day Pass", href: "/paket/heritage-day-pass" }],
  },
  {
    id: "harga-kamar",
    keywords: [
      "harga kamar",
      "harga",
      "kamar",
      "tarif",
      "berapa",
      "room",
      "menginap",
      "booking",
      "pesan kamar",
      "suite",
      "deluxe",
      "standard",
    ],
    answer:
      "Tarif terbaik per malam (sudah termasuk pajak): Standard Garden View mulai Rp378.000, Deluxe Garden View mulai Rp383.600, dan Suite mulai Rp730.800. Deluxe Pool View perlu cek ketersediaan. Tambah sarapan mulai Rp30.800 per malam.",
    links: [{ label: "Cek kamar", href: "/kamar" }],
  },
  {
    id: "sarapan",
    keywords: ["sarapan", "breakfast", "makan pagi"],
    answer:
      "Setiap tipe kamar punya pilihan Room Only atau Dengan sarapan. Semua paket menginap sudah termasuk sarapan untuk 2 orang. Jam sarapan: [konfirmasi ke hotel].",
    links: [{ label: "Lihat kamar", href: "/kamar" }],
  },
  {
    id: "check-in",
    keywords: [
      "check in",
      "checkin",
      "check out",
      "checkout",
      "jam masuk",
      "jam keluar",
      "late check out",
      "early check in",
    ],
    answer:
      "Jadwal di itinerary paket memakai check-in 14.00 dan check-out 12.00 sebagai contoh. Jam resmi dan kebijakan early check-in atau late check-out: [konfirmasi ke hotel].",
    links: [whatsappLink],
  },
  {
    id: "lokasi",
    keywords: [
      "lokasi",
      "alamat",
      "cara ke hotel",
      "dimana",
      "di mana",
      "arah",
      "bandara",
      "rute",
      "maps",
      "jalan veteran",
    ],
    answer:
      "Hotel berada di Jl. Veteran No. 3, Denpasar, di dekat Lapangan Puputan Badung. Museum Bali dan Pasar Badung bisa dicapai dengan berjalan kaki. Waktu tempuh dari bandara: [konfirmasi ke hotel].",
    links: [
      { label: "Buka di Google Maps", href: site.mapsUrl },
      { label: "Tur Lapangan Puputan Badung", href: "/jelajahi/puputan-badung" },
    ],
  },
  {
    id: "heritage-box",
    keywords: [
      "heritage box",
      "box",
      "oleh oleh",
      "souvenir",
      "kopi",
      "kartu pos",
      "endek",
      "umkm",
      "apa itu heritage box",
    ],
    answer:
      "Heritage Box seharga Rp250.000 berisi Kopi Kintamani 250 g, jajan Bali kering, 5 kartu pos foto arsip Bali Hotel, pouch kain endek, dan kemasan bermotif. Bisa dikirim ke alamat, diambil di hotel, atau dikirim sebagai hadiah.",
    links: [{ label: "Lihat Heritage Box", href: "/heritage-box" }],
  },
  {
    id: "heritage-gift",
    keywords: ["gift", "heritage gift", "hadiah", "voucher", "kado", "kode voucher"],
    answer:
      "Heritage Gift adalah voucher digital senilai Rp250.000, Rp500.000, Rp1.000.000, atau satu paket. Penerima menukarkan kodenya di checkout.",
    links: [{ label: "Buat Heritage Gift", href: "/heritage-gift" }],
  },
  {
    id: "ar-vr",
    keywords: [
      "ar",
      "vr",
      "virtual",
      "360",
      "3d",
      "kacamata",
      "cardboard",
      "gyroscope",
      "cara pakai",
      "tur virtual",
      "augmented",
    ],
    answer:
      "Di halaman tur, geser layar untuk melihat sekeliling dan ketuk titik ungu untuk membaca cerita. Tekan Gerakkan HP agar tampilan mengikuti gerakan ponsel, atau Mode VR untuk layar terbelah bila memakai kacamata VR. Di Suite 77 dan Mini Museum ada tombol AR untuk menempatkan model 3D di ruangan Anda.",
    links: [{ label: "Coba di Suite 77", href: "/jelajahi/suite-77" }],
  },
  {
    id: "puputan",
    keywords: ["puputan", "puputan badung", "1906", "lapangan", "monumen"],
    answer:
      "Puputan Badung terjadi pada 20 September 1906 di kawasan yang kini menjadi Lapangan Puputan Badung, tidak jauh dari hotel. Lapangan ini menjadi titik awal heritage walk.",
    links: [
      { label: "Tur 360° Lapangan Puputan", href: "/jelajahi/puputan-badung" },
      { label: "Denpasar Heritage Walk", href: "/paket/denpasar-heritage-walk" },
    ],
  },
  {
    id: "passport",
    keywords: ["passport", "stempel", "sertifikat", "paspor"],
    answer:
      "Passport digital berisi 10 titik stempel di hotel dan sekitarnya. Kumpulkan semuanya untuk mendapat sertifikat Bali Hotel Passenger 1928.",
    links: [{ label: "Buka passport", href: "/passport" }],
  },
  {
    id: "kontak",
    keywords: ["kontak", "hubungi", "whatsapp", "wa", "telepon", "nomor", "reservasi", "cs", "admin", "email"],
    answer: "Tim reservasi bisa dihubungi lewat WhatsApp +62 813-3733-7088.",
    links: [whatsappLink],
  },
];
