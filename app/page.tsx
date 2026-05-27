import BookingSearch from "@/components/BookingSearch";
import GsapProvider from "@/components/GsapProvider";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildings, formatVND } from "@/data/buildings";
import Link from "next/link";

export default function HomePage() {
  const featured = buildings.slice(0, 3);

  return (
    <>
      <GsapProvider />
      <SiteHeader />

      <main>
        <section className="relative min-h-[820px] overflow-hidden bg-[#07112f]">
          <div
            data-parallax
            className="absolute inset-0 scale-110 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2200&auto=format&fit=crop')] bg-cover bg-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07112f] via-[#07112f]/85 to-[#07112f]/20" />

          <div className="pointer-events-none absolute left-0 top-40 w-[200vw] -rotate-6 overflow-hidden">
            <div
              data-marquee
              className="whitespace-nowrap text-[120px] font-inter font-bold uppercase leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,0.32)] md:text-[180px]"
            >
              CITYHOUSE BOOKING · LUXURY STAY · MODERN LIVING · CITYHOUSE BOOKING ·
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[820px] max-w-7xl flex-col justify-center px-5 py-24">
            <div className="max-w-4xl" data-reveal>
              <div className="mb-6 text-xs font-inter font-bold uppercase tracking-[0.38em] text-[#c9a45c]">
                CityHouse Booking
              </div>

              <h1 className="text-5xl font-inter font-bold uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-8xl">
                Stay Sharp.
                <br />
                Live Better.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
                Tìm căn hộ dịch vụ, khách sạn và không gian lưu trú trong hệ thống CityHouse.
                Flow đặt phòng rõ ràng, sang trọng và không làm khách bị mất ngữ cảnh.
              </p>

              <div className="mt-10 max-w-6xl">
                <BookingSearch />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
              <div>
                <div className="text-xs font-inter font-bold uppercase tracking-[0.3em] text-[#b99655]">
                  Featured Properties
                </div>
                <h2 className="mt-3 text-4xl font-inter font-bold tracking-[-0.06em] text-[#09183f] md:text-6xl">
                  Tòa nhà nổi bật
                </h2>
              </div>

              <Link
                href="/booking"
                className="border border-[#09183f] px-6 py-4 text-sm font-inter font-bold uppercase tracking-[0.14em] text-[#09183f] transition hover:bg-[#09183f] hover:text-white"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((building) => (
                <Link
                  data-reveal
                  key={building.id}
                  href={`/buildings/${building.slug}`}
                  className="group border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
                >
                  <div className="h-80 overflow-hidden bg-slate-200">
                    <div
                      className="h-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${building.images[0]})` }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-inter font-bold uppercase tracking-[0.2em] text-[#b99655]">
                      {building.area}
                    </div>
                    <h3 className="mt-3 text-2xl font-inter font-bold tracking-[-0.04em] text-[#09183f]">
                      {building.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
                      {building.shortDescription}
                    </p>

                    <div className="mt-6 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Giá từ</div>
                        <div className="text-xl font-inter font-bold text-[#09183f]">
                          VND {formatVND(building.priceFrom)}
                        </div>
                      </div>
                      <div className="text-sm font-inter font-bold   uppercase tracking-[0.14em] text-[#b99655]">
                        Xem phòng
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f5f1e8] py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <div className="text-xs font-inter font-bold uppercase tracking-[0.3em] text-[#b99655]">
                Booking Flow
              </div>
              <h2 className="mt-3 text-4xl font-inter font-bold tracking-[-0.06em] text-[#09183f] md:text-6xl">
                Đặt phòng mạch lạc từ trang chủ đến checkout
              </h2>
            </div>

            <div className="grid gap-4">
              {[
                "Chọn ngày và số khách ngay từ trang chủ.",
                "Xem danh sách tòa nhà còn phòng.",
                "Vào chi tiết tòa nhà và đổi ngày ngay tại đó.",
                "Chọn phòng phù hợp.",
                "Điền thông tin và xác nhận đặt phòng.",
              ].map((item, index) => (
                <div
                  data-reveal
                  key={item}
                  className="grid grid-cols-[70px_1fr] border border-[#d8c7a1] bg-white"
                >
                  <div className="flex items-center justify-center bg-[#09183f] text-xl font-inter font-bold text-[#c9a45c]">
                    0{index + 1}
                  </div>
                  <div className="p-6 text-sm font-inter font-bold text-slate-700">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}