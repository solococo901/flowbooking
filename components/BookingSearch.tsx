"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

type Props = {
  compact?: boolean;
  defaultLocation?: string;
  currentBuildingSlug?: string;
};

export default function BookingSearch({
  compact = false,
  defaultLocation = "",
  currentBuildingSlug,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(defaultLocation || searchParams.get("location") || "");
  const [checkin, setCheckin] = useState(searchParams.get("checkin") || "2026-05-29");
  const [checkout, setCheckout] = useState(searchParams.get("checkout") || "2026-05-30");
  const [guests, setGuests] = useState(searchParams.get("guests") || "2");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      location,
      checkin,
      checkout,
      guests,
    });

    if (currentBuildingSlug) {
      router.push(`/buildings/${currentBuildingSlug}?checkin=${checkin}&checkout=${checkout}&guests=${guests}`);
      return;
    }

    router.push(`/booking?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "grid gap-3 border border-white/15 bg-white p-4 shadow-2xl shadow-slate-950/20",
        compact
          ? "grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_0.8fr_auto]"
          : "grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto]",
      ].join(" ")}
    >
      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Tòa nhà / Khu vực
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Atelier, Kim Nguyên, Elpino..."
          className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Check-in
        </label>
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Check-out
        </label>
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Khách
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
        >
          <option value="1">1 khách</option>
          <option value="2">2 khách</option>
          <option value="3">3 khách</option>
          <option value="4">4 khách</option>
          <option value="6">6 khách</option>
        </select>
      </div>

      <button className="flex h-12 items-center justify-center gap-2 self-end bg-[#09183f] px-7 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]">
        <Search size={16} />
        Tìm
      </button>
    </form>
  );
}