import BookingSearch from "@/components/BookingSearch";
import BuildingCard from "@/components/BuildingCard";
import GsapProvider from "@/components/GsapProvider";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildings } from "@/data/buildings";

type Props = {
  searchParams: {
    location?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
  };
};

export default function BookingPage({ searchParams }: Props) {
  const location = searchParams.location?.toLowerCase() || "";

  const filtered = buildings.filter((building) => {
    if (!location) return true;

    return (
      building.name.toLowerCase().includes(location) ||
      building.area.toLowerCase().includes(location) ||
      building.address.toLowerCase().includes(location)
    );
  });

  const query = new URLSearchParams({
    checkin: searchParams.checkin || "2026-05-29",
    checkout: searchParams.checkout || "2026-05-30",
    guests: searchParams.guests || "2",
  }).toString();

  return (
    <>
      <GsapProvider />
      <SiteHeader />

      <main className="bg-[#f7f7f8] pb-20">
        <section className="relative overflow-hidden bg-[#07112f] py-20">
          <div
            data-parallax
            className="absolute inset-0 scale-110 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2200&auto=format&fit=crop')] bg-cover bg-center opacity-25"
          />
          <div className="relative mx-auto max-w-7xl px-5">
            <div className="mb-8" data-reveal>
              <div className="text-xs font-inter uppercase tracking-[0.3em] text-[#c9a45c]">
                Search Result
              </div>
              <h1 className="mt-3 text-5xl font-inter tracking-[-0.07em] text-white">
                Chọn tòa nhà phù hợp
              </h1>
              <p className="mt-4 max-w-2xl text-white/65">
                Danh sách tòa nhà còn phòng theo ngày và số khách bạn chọn.
              </p>
            </div>

            <BookingSearch compact />
          </div>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-8 px-5 lg:grid-cols-[280px_1fr]">
          <aside data-reveal className="h-fit border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-inter text-[#09183f]">Bộ lọc</h2>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-3 text-xs font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                  Khu vực
                </div>
                {["Thảo Điền", "Phú Nhuận", "Quận 1", "Tân Bình"].map((item) => (
                  <label key={item} className="mb-3 flex items-center gap-3 text-sm text-slate-600">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>

              <div>
                <div className="mb-3 text-xs font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                  Tiện nghi
                </div>
                {["Bể bơi", "Phòng gym", "Bãi đậu xe", "Dọn phòng"].map((item) => (
                  <label key={item} className="mb-3 flex items-center gap-3 text-sm text-slate-600">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Tìm thấy <strong className="text-[#09183f]">{filtered.length}</strong> tòa nhà
              </p>

              <select className="border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">
                <option>Sắp xếp: Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Đề xuất</option>
              </select>
            </div>

            <div className="grid gap-6">
              {filtered.map((building) => (
                <BuildingCard key={building.id} building={building} queryString={query} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}