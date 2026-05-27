import Link from "next/link";
import Image from "next/image";
import { Building, formatVND } from "@/data/buildings";
import { MapPin } from "lucide-react";

type Props = {
  building: Building;
  queryString?: string;
};

export default function BuildingCard({ building, queryString = "" }: Props) {
  return (
    <article
      data-reveal
      className="group grid overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10 md:grid-cols-[340px_1fr_230px]"
    >
      <div className="relative h-72 overflow-hidden bg-slate-200 md:h-full">
        <Image
          src={building.images[0]}
          alt={building.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 bg-[#09183f] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
          Còn Phòng
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 text-xs font-inter font-bold uppercase tracking-[0.22em] text-[#b99655]">
          {building.area}
        </div>

        <h2 className="text-2xl font-inter font-bold tracking-[-0.04em] text-[#09183f]">
          {building.name}
        </h2>

        <p className="mt-3 flex items-start gap-2 text-sm leading-7 text-slate-500">
          <MapPin className="mt-1 shrink-0" size={15} />
          {building.address}
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {building.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {building.amenities.slice(0, 4).map((item) => (
            <span
              key={item}
              className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between border-t border-slate-200 p-6 md:border-l md:border-t-0">
        <div>
          <div className="text-sm text-slate-500">Giá/phòng/đêm từ</div>
          <div className="mt-2 text-2xl font-black text-[#09183f]">
            VND {formatVND(building.priceFrom)}
          </div>
        </div>

        <Link
          href={`/buildings/${building.slug}${queryString ? `?${queryString}` : ""}`}
          className="mt-6 block bg-[#09183f] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]"
        >
          Xem phòng
        </Link>
      </div>
    </article>
  );
}