import Link from "next/link";
import { Building, Room, formatVND } from "@/data/buildings";

type Props = {
  building: Building;
  room?: Room;
  checkin: string;
  checkout: string;
  guests: string;
  showAction?: boolean;
};

function getNights(checkin: string, checkout: string) {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

export default function BookingSummary({
  building,
  room,
  checkin,
  checkout,
  guests,
  showAction = true,
}: Props) {
  const nights = getNights(checkin, checkout);
  const total = room ? room.price * nights : 0;

  return (
    <aside className="sticky top-28 border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
      <h3 className="text-xl font-inter font-bold tracking-[-0.03em] text-[#09183f]">
        Tóm tắt đặt phòng
      </h3>

      <div className="mt-6 space-y-4 text-sm">
        {[
          ["Tòa nhà", building.name],
          ["Phòng", room ? room.name : "Chưa chọn"],
          ["Check-in", checkin],
          ["Check-out", checkout],
          ["Khách", guests],
          ["Số đêm", String(nights)],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-5 border-b border-slate-100 pb-4">
            <span className="text-slate-500">{label}</span>
            <strong className="text-right text-[#09183f]">{value}</strong>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between">
        <span className="text-sm text-slate-500">Tổng tạm tính</span>
        <strong className="text-2xl font-black text-[#09183f]">
          VND {formatVND(total)}
        </strong>
      </div>

      {showAction && room && (
        <Link
          href={`/checkout?property=${building.slug}&room=${room.id}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`}
          className="mt-6 block bg-[#09183f] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]"
        >
          Tiếp tục
        </Link>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Bạn chưa bị tính phí ở bước này. Hệ thống sẽ kiểm tra lại tình trạng phòng trước khi xác nhận.
      </p>
    </aside>
  );
}