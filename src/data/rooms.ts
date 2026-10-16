import { images } from "./images";
import type { RatePlanId, Room } from "./types";

/** Tanggal pengambilan tarif contoh dari mesin pemesanan resmi hotel. */
export const RATE_NOTE = "Tarif contoh dari mesin pemesanan resmi hotel, 16 Oktober 2026.";

export const ratePlanLabel: Record<RatePlanId, string> = {
  "room-only": "Room Only",
  breakfast: "Dengan sarapan",
};

/** Tipe kamar dan tarif contoh. Semua tarif sudah termasuk pajak. */
export const rooms: Room[] = [
  {
    id: "standard-garden-view",
    name: "Standard Garden View",
    units: 38,
    size: 39,
    capacity: 2,
    description: "Kamar dengan jendela ke taman, tipe yang paling banyak di hotel.",
    features: ["Pemandangan taman", "Maks. 2 dewasa", "Termasuk pajak"],
    rates: {
      "room-only": { publish: 1_350_000, best: 378_000 },
      breakfast: { publish: 1_460_000, best: 408_800 },
    },
    image: images.kamar.standard,
  },
  {
    id: "deluxe-garden-view",
    name: "Deluxe Garden View",
    units: 22,
    size: 32,
    capacity: 2,
    description: "Kamar deluxe menghadap taman dengan tata ruang yang ringkas.",
    features: ["Pemandangan taman", "Maks. 2 dewasa", "Termasuk pajak"],
    rates: {
      "room-only": { publish: 1_370_000, best: 383_600 },
      breakfast: { publish: 1_490_000, best: 417_200 },
    },
    image: images.kamar.deluxeGarden,
  },
  {
    id: "deluxe-pool-view",
    name: "Deluxe Pool View",
    units: 7,
    size: null,
    capacity: 2,
    description: "Hanya tujuh kamar dengan pemandangan kolam renang.",
    features: ["Pemandangan kolam", "Maks. 2 dewasa"],
    rates: null,
    image: images.kamar.deluxePool,
  },
  {
    id: "suite",
    name: "Suite",
    units: 2,
    size: 74,
    capacity: 2,
    description: "Dua suite dengan ruang duduk terpisah, salah satunya Suite 77.",
    features: ["Ruang duduk terpisah", "Maks. 2 dewasa", "Termasuk pajak"],
    rates: {
      "room-only": { publish: 2_610_000, best: 730_800 },
      breakfast: { publish: 2_750_000, best: 770_000 },
    },
    image: images.kamar.suite,
  },
];

/** Cari kamar berdasarkan ID. */
export function getRoom(id: string | null | undefined): Room | undefined {
  return rooms.find((room) => room.id === id);
}
