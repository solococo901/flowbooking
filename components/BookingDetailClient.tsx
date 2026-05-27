"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building, Room, formatVND } from "@/data/buildings";
import { Maximize2, Users } from "lucide-react";

type Props = {
  building: Building;
  checkin: string;
  checkout: string;
  guests: number;
};

function getNights(checkin: string, checkout: string) {
  const start = new Date(checkin);
  const end = new Date(checkout);

  const diff = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diff > 0 ? diff : 1;
}

export default function BookingDetailClient({
  building,
  checkin,
  checkout,
  guests,
}: Props) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [localCheckin, setLocalCheckin] = useState(checkin);
  const [localCheckout, setLocalCheckout] = useState(checkout);
  const [localGuests, setLocalGuests] = useState(String(guests));

  const activeGuests = Number(localGuests);
  const nights = getNights(localCheckin, localCheckout);
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  const suitableRooms = building.rooms.filter(
    (room) => activeGuests <= room.guests
  );

  const checkoutUrl = useMemo(() => {
    if (!selectedRoom) return "#";

    const params = new URLSearchParams({
      property: building.slug,
      room: selectedRoom.id,
      checkin: localCheckin,
      checkout: localCheckout,
      guests: localGuests,
    });

    return `/checkout?${params.toString()}`;
  }, [building.slug, selectedRoom, localCheckin, localCheckout, localGuests]);

  function handleUpdateBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSelectedRoom(null);

    document.getElementById("rooms")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 pb-12 sm:px-5 sm:pt-8 lg:pt-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0">
          {/* PROPERTY HEAD */}
          <div
            data-reveal
            className="border border-slate-200 bg-white p-4 sm:p-6"
          >
            <div className="mb-3 inline-flex bg-[#f5f1e8] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b7636] sm:text-xs">
              Còn phòng
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <h1 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#09183f] sm:text-4xl sm:tracking-[-0.07em]">
                  {building.name}
                </h1>

                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                  {building.address}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 text-left md:border-t-0 md:pt-0 md:text-right">
                <div className="text-sm text-slate-500">Giá/phòng/đêm từ</div>

                <div className="mt-1 text-2xl font-bold text-[#09183f] sm:text-3xl">
                  VND {formatVND(building.priceFrom)}
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY */}
          <div
            data-reveal
            className="mt-4 grid h-[360px] grid-cols-2 grid-rows-3 gap-2 sm:h-[460px] sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 lg:h-[520px]"
          >
            <div className="relative col-span-2 row-span-2 overflow-hidden bg-slate-200 sm:col-span-2 sm:row-span-2">
              <Image
                src={building.images[0]}
                alt={building.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            {building.images.slice(1, 5).map((image, index) => (
              <div key={image} className="relative overflow-hidden bg-slate-200">
                <Image
                  src={image}
                  alt={building.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />

                {index === 3 && (
                  <div className="absolute inset-0 grid place-items-center bg-[#09183f]/60 text-xl font-black text-white sm:text-3xl">
                    +14
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LOCAL BOOKING FORM */}
          <section
            id="booking-search"
            data-reveal
            className="mt-4 border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5 sm:mt-6 sm:p-5"
          >
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b99655] sm:text-xs">
                  Cập nhật ngày lưu trú
                </div>

                <h2 className="mt-2 text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
                  Chọn ngày và số khách
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Thay đổi thông tin bên dưới sẽ chỉ cập nhật danh sách phòng
                  của {building.name}.
                </p>
              </div>

              <div className="w-full border border-[#d8c7a1] bg-[#f5f1e8] px-4 py-3 text-sm font-black text-[#8a651f] md:w-auto">
                {localCheckin} → {localCheckout}
              </div>
            </div>

            <form
              onSubmit={handleUpdateBooking}
              className="grid gap-3 md:grid-cols-[1fr_1fr_0.8fr_auto]"
            >
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Check-in
                </label>

                <input
                  type="date"
                  value={localCheckin}
                  onChange={(e) => {
                    setLocalCheckin(e.target.value);
                    setSelectedRoom(null);
                  }}
                  className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Check-out
                </label>

                <input
                  type="date"
                  value={localCheckout}
                  onChange={(e) => {
                    setLocalCheckout(e.target.value);
                    setSelectedRoom(null);
                  }}
                  className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Khách
                </label>

                <select
                  value={localGuests}
                  onChange={(e) => {
                    setLocalGuests(e.target.value);
                    setSelectedRoom(null);
                  }}
                  className="h-12 w-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#09183f]"
                >
                  <option value="1">1 khách</option>
                  <option value="2">2 khách</option>
                  <option value="3">3 khách</option>
                  <option value="4">4 khách</option>
                  <option value="6">6 khách</option>
                </select>
              </div>

              <button
                type="submit"
                className="h-12 w-full self-end bg-[#09183f] px-6 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f] md:w-auto"
              >
                Cập nhật phòng
              </button>
            </form>
          </section>

          {/* TABS */}
          <nav className="sticky top-16 z-30 mt-4 border border-slate-200 bg-white/95 px-3 py-3 backdrop-blur-xl sm:mt-6 md:top-20 md:px-4">
            <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                ["booking-search", "Đổi ngày"],
                ["overview", "Tổng quan"],
                ["rooms", "Phòng"],
                ["amenities", "Tiện nghi"],
                ["policy", "Chính sách"],
                ["location", "Vị trí"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="shrink-0 whitespace-nowrap border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-[#09183f] hover:bg-[#09183f] hover:text-white sm:text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* OVERVIEW */}
          <section
            id="overview"
            data-reveal
            className="mt-4 border border-slate-200 bg-white p-5 sm:mt-6 sm:p-7"
          >
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
              Tổng quan
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              {building.description}
            </p>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Khu vực", building.area],
                ["Loại hình", "Căn hộ dịch vụ"],
                ["Check-in", "Từ 14:00"],
                ["Phù hợp", "Công tác / Dài hạn"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b99655] sm:text-xs">
                    {title}
                  </div>

                  <div className="mt-2 text-sm font-bold text-[#09183f]">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ROOMS */}
          <section
            id="rooms"
            className="mt-4 border border-slate-200 bg-white p-4 sm:mt-6 sm:p-7"
          >
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
                  Thông tin & Giá
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {suitableRooms.length > 0
                    ? `Có ${suitableRooms.length} loại phòng phù hợp với ngày và số khách bạn chọn.`
                    : "Tòa này hiện không có phòng phù hợp với số khách bạn chọn."}
                </p>
              </div>

              <div className="w-full border border-[#d8c7a1] bg-[#f5f1e8] px-4 py-3 text-sm font-black text-[#8a651f] md:w-auto">
                {localCheckin} → {localCheckout}
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {building.rooms.map((room) => {
                const isAvailable = activeGuests <= room.guests;
                const isSelected = selectedRoom?.id === room.id;

                return (
                  <article
                    key={room.id}
                    data-reveal
                    className={[
                      "grid overflow-hidden border bg-white transition md:grid-cols-[280px_1fr_220px]",
                      isSelected
                        ? "border-[#c9a45c] shadow-2xl shadow-slate-950/10"
                        : "border-slate-200",
                      isAvailable ? "" : "opacity-45",
                    ].join(" ")}
                  >
                    <div className="relative h-56 overflow-hidden bg-slate-200 sm:h-64 md:h-full">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-2xl font-bold leading-tight tracking-[-0.04em] text-[#09183f]">
                        {room.name}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-500 sm:gap-4">
                        <span>{room.beds}</span>

                        <span className="flex items-center gap-1">
                          <Users size={15} /> {room.guests} khách
                        </span>

                        <span className="flex items-center gap-1">
                          <Maximize2 size={15} /> {room.size}m²
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {room.benefits.map((item) => (
                          <span
                            key={item}
                            className="bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
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

                    <div className="border-t border-slate-200 p-5 sm:p-6 md:flex md:flex-col md:justify-between md:border-l md:border-t-0">
                      <div>
                        <div className="text-sm text-slate-500">
                          {nights} đêm, {activeGuests} khách
                        </div>

                        <div className="mt-2 text-2xl font-bold text-[#09183f]">
                          VND {formatVND(room.price)}
                        </div>
                      </div>

                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={() => setSelectedRoom(room)}
                          className={[
                            "mt-5 w-full px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] transition",
                            isSelected
                              ? "bg-[#c9a45c] text-[#09183f]"
                              : "bg-[#09183f] text-white hover:bg-[#c9a45c] hover:text-[#09183f]",
                          ].join(" ")}
                        >
                          {isSelected ? "Đã chọn" : "Đặt phòng"}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="mt-5 w-full bg-slate-300 px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500"
                        >
                          Không phù hợp
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* AMENITIES */}
          <section
            id="amenities"
            data-reveal
            className="mt-4 border border-slate-200 bg-white p-5 sm:mt-6 sm:p-7"
          >
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
              Tiện nghi
            </h2>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {building.amenities.map((item) => (
                <div
                  key={item}
                  className="border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </section>

          {/* POLICY */}
          <section
            id="policy"
            data-reveal
            className="mt-4 border border-slate-200 bg-white p-5 sm:mt-6 sm:p-7"
          >
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
              Chính sách
            </h2>

            <div className="mt-5 grid gap-4 sm:mt-6 md:grid-cols-2">
              {[
                [
                  "Nhận phòng",
                  "Từ 14:00. Vui lòng liên hệ trước nếu cần nhận phòng sớm.",
                ],
                ["Trả phòng", "Trước 12:00. Trả muộn tùy vào tình trạng phòng."],
                [
                  "Thanh toán",
                  "Hỗ trợ chuyển khoản, tiền mặt hoặc phương thức theo chính sách vận hành.",
                ],
                [
                  "Hủy phòng",
                  "Chính sách hủy phụ thuộc vào từng loại giá và thời điểm đặt phòng.",
                ],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="font-bold text-[#09183f]">{title}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* LOCATION */}
          <section
            id="location"
            data-reveal
            className="mt-4 border border-slate-200 bg-white p-5 sm:mt-6 sm:p-7"
          >
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[#09183f] sm:text-2xl">
              Vị trí
            </h2>

            <div className="mt-5 flex h-[280px] items-end bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center p-4 sm:h-[360px] sm:p-5">
              <div className="max-w-md bg-white p-4 shadow-2xl shadow-slate-950/15 sm:p-5">
                <h3 className="font-black text-[#09183f]">{building.name}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {building.address}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR SUMMARY */}
        <aside
          data-reveal
          className="border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-6 lg:sticky lg:top-28 lg:h-fit"
        >
          <h3 className="text-xl font-bold tracking-[-0.03em] text-[#09183f]">
            Tóm tắt đặt phòng
          </h3>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-5 border-b border-slate-100 pb-4">
              <span className="text-slate-500">Tòa nhà</span>

              <strong className="text-right text-[#09183f]">
                {building.name}
              </strong>
            </div>

            <div className="flex justify-between gap-5 border-b border-slate-100 pb-4">
              <span className="text-slate-500">Phòng</span>

              <strong className="text-right text-[#09183f]">
                {selectedRoom ? selectedRoom.name : "Chưa chọn"}
              </strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500">Check-in</span>
              <strong>{localCheckin}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500">Check-out</span>
              <strong>{localCheckout}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500">Khách</span>
              <strong>{activeGuests}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500">Số đêm</span>
              <strong>{nights}</strong>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <span className="text-sm text-slate-500">Tổng tạm tính</span>

            <strong className="text-right text-2xl font-black text-[#09183f]">
              VND {formatVND(total)}
            </strong>
          </div>

          <div className="mt-6 grid gap-3">
              

            {selectedRoom ? (
              <Link
                href={checkoutUrl}
                className="block bg-[#09183f] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]"
              >
                Tiếp tục
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  document.getElementById("rooms")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="w-full bg-slate-300 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-600"
              >
                Chọn phòng trước
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Bạn chưa bị tính phí ở bước này. Hệ thống sẽ kiểm tra lại tình trạng
            phòng trước khi xác nhận.
          </p>
        </aside>
      </div>
    </section>
  );
}