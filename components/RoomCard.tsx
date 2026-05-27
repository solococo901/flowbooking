import Image from "next/image";
import Link from "next/link";
import { Room, formatVND } from "@/data/buildings";
import { Users, Maximize2 } from "lucide-react";

type Props = {
  room: Room;
  buildingSlug: string;
  guests: number;
  searchParams: {
    checkin?: string;
    checkout?: string;
    guests?: string;
  };
};

export default function RoomCard({ room, buildingSlug, guests, searchParams }: Props) {
  const isAvailable = guests <= room.guests;

  const params = new URLSearchParams({
    property: buildingSlug,
    room: room.id,
    checkin: searchParams.checkin || "2026-05-29",
    checkout: searchParams.checkout || "2026-05-30",
    guests: searchParams.guests || "2",
  });

  return (
    <article
      data-reveal
      className={[
        "grid border border-slate-200 bg-white transition md:grid-cols-[280px_1fr_220px]",
        isAvailable ? "hover:shadow-2xl hover:shadow-slate-950/10" : "opacity-45",
      ].join(" ")}
    >
      <div className="relative h-64 overflow-hidden md:h-full">
        <Image src={room.image} alt={room.name} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black tracking-[-0.04em] text-[#09183f]">
          {room.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
          <span>{room.beds}</span>
          <span className="flex items-center gap-1"><Users size={15} /> {room.guests} khách</span>
          <span className="flex items-center gap-1"><Maximize2 size={15} /> {room.size}m²</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {room.benefits.map((item) => (
            <span
              key={item}
              className="bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 text-sm text-slate-600">
          {room.amenities.map((item) => (
            <div key={item}>✓ {item}</div>
          ))}
        </div>

        {!isAvailable && (
          <div className="mt-5 border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
            Phòng này chỉ phù hợp tối đa {room.guests} khách.
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between border-t border-slate-200 p-6 md:border-l md:border-t-0">
        <div>
          <div className="text-sm text-slate-500">1 đêm, {guests} khách</div>
          <div className="mt-2 text-2xl font-black text-[#09183f]">
            VND {formatVND(room.price)}
          </div>
        </div>

        {isAvailable ? (
          <Link
            href={`/checkout?${params.toString()}`}
            className="mt-6 block bg-[#09183f] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]"
          >
            Đặt phòng
          </Link>
        ) : (
          <button
            disabled
            className="mt-6 bg-slate-300 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-500"
          >
            Không phù hợp
          </button>
        )}
      </div>
    </article>
  );
}