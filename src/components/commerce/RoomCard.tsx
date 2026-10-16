"use client";

import { Maximize2, MessageCircle, UsersRound } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buttonClasses } from "@/components/ui/buttonClasses";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { PriceTag } from "@/components/ui/PriceTag";
import { Tabs } from "@/components/ui/Tabs";
import { ratePlanLabel } from "@/data/rooms";
import { site } from "@/data/site";
import type { RatePlanId, Room } from "@/data/types";
import { formatRupiah } from "@/lib/format";

type RoomCardProps = {
  room: Room;
  nights: number;
  rooms: number;
  onSelect: (room: Room, plan: RatePlanId) => void;
};

/** Satu tipe kamar dengan tab "Room Only" / "Dengan sarapan", harga coret, harga terbaik, luas, dan kapasitas. */
export function RoomCard({ room, nights, rooms, onSelect }: RoomCardProps) {
  const [plan, setPlan] = useState<RatePlanId>("breakfast");
  const rate = room.rates?.[plan];
  const discount = rate ? Math.round((1 - rate.best / rate.publish) * 100) : 0;

  return (
    <article className="grid gap-5 border-b border-line py-8 md:grid-cols-[2fr_3fr] md:gap-8">
      <Photo image={room.image} ratio="aspect-[3/2]" sizes="(min-width: 768px) 40vw, 100vw" />
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">{room.name}</h2>
          <p className="text-sm text-muted">{room.description}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <li className="flex items-center gap-1.5">
              <Icon icon={Maximize2} />
              {room.size ? `${room.size} m²` : "Luas [konfirmasi ke hotel]"}
            </li>
            <li className="flex items-center gap-1.5">
              <Icon icon={UsersRound} />
              {room.capacity} dewasa
            </li>
            <li>{room.units} kamar</li>
          </ul>
        </div>

        {room.rates && rate ? (
          <>
            <Tabs
              label={`Pilihan tarif ${room.name}`}
              idPrefix={`plan-${room.id}`}
              items={(["room-only", "breakfast"] as RatePlanId[]).map((id) => ({ id, label: ratePlanLabel[id] }))}
              value={plan}
              onChange={setPlan}
            />
            <div
              id={`plan-${room.id}-panel`}
              role="tabpanel"
              aria-labelledby={`plan-${room.id}-tab-${plan}`}
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <Badge>Hemat {discount}%</Badge>
                <PriceTag amount={rate.best} was={rate.publish} suffix="/ malam, termasuk pajak" size="lg" />
                {nights > 0 && (
                  <p className="text-sm text-muted">
                    {formatRupiah(rate.best * nights * rooms)} untuk {nights} malam, {rooms} kamar
                  </p>
                )}
              </div>
              <Button onClick={() => onSelect(room, plan)} className="sm:shrink-0">
                Pilih kamar
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 rounded-ui bg-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">Tarif belum tersedia online untuk tipe ini.</p>
            <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className={buttonClasses("secondary", "sm")}>
              <Icon icon={MessageCircle} />
              Cek ketersediaan
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
