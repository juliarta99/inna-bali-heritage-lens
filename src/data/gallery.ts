import { images } from "./images";
import type { GalleryEra, GalleryItem } from "./types";

export const galleryEras: { id: GalleryEra; label: string }[] = [
  { id: "1928-1945", label: "1928–1945" },
  { id: "1950-1999", label: "1950–1999" },
  { id: "2000-sekarang", label: "2000–sekarang" },
  { id: "100-cerita", label: "100 Tahun, 100 Cerita" },
];

/** Foto galeri per era. Foto belum terpasang tampil sebagai placeholder. */
export const gallery: GalleryItem[] = [
  { id: "g1", era: "1928-1945", year: "[tahun]", image: images.gallery.g1 },
  { id: "g2", era: "1928-1945", year: "[tahun]", image: images.gallery.g2 },
  { id: "g3", era: "1928-1945", year: "[tahun]", image: images.gallery.g3 },
  { id: "g4", era: "1928-1945", year: "Sekitar 1940", image: images.gallery.g4 },
  { id: "g5", era: "1950-1999", year: "Sekitar 1957", image: images.gallery.g5 },
  { id: "g6", era: "1950-1999", year: "Sekitar 1958", image: images.gallery.g6 },
  { id: "g7", era: "1950-1999", year: "[tahun]", image: images.gallery.g7 },
  { id: "g8", era: "2000-sekarang", year: "2023", image: images.gallery.g8 },
  { id: "g9", era: "2000-sekarang", year: "Sekarang", image: images.gallery.g9 },
  { id: "g10", era: "2000-sekarang", year: "2023", image: images.gallery.g10 },
  { id: "g11", era: "2000-sekarang", year: "2018", image: images.gallery.g11 },
  { id: "g12", era: "2000-sekarang", year: "2018", image: images.gallery.g12 },
  { id: "c1", era: "100-cerita", year: "1946", image: images.gallery.c1 },
  { id: "c2", era: "100-cerita", year: "[tahun]", image: images.gallery.c2 },
  { id: "c3", era: "100-cerita", year: "Sebelum 1931", image: images.gallery.c3 },
];

export const storyCopy = {
  intro:
    "Menuju 100 tahun, kami mengumpulkan cerita dari tamu, karyawan, dan warga Denpasar. Punya foto atau kenangan di Bali Hotel? Kirimkan di sini.",
  success: "Cerita terkirim untuk dikurasi",
  successDetail: "Terima kasih. Tim kurasi akan menghubungi Anda sebelum cerita ditampilkan.",
};
