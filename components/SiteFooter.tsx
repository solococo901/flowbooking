export default function SiteFooter() {
  return (
    <footer className="bg-[#07112f] py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="text-2xl font-black tracking-[0.22em]">CITYHOUSE</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.34em] text-[#c9a45c]">
            Apartment · Hotel · Office
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            Hệ thống căn hộ dịch vụ, khách sạn và không gian lưu trú tại TP. Hồ Chí Minh.
          </p>
        </div>

        {[
          ["Hệ thống", ["Khách sạn", "CityHouse & More", "Đối tác"]],
          ["Hỗ trợ", ["Về chúng tôi", "Chính sách bảo mật", "Chính sách thanh toán"]],
          ["Liên hệ", ["485B Nguyễn Đình Chiểu, TP. Hồ Chí Minh", "+84 872 25 25 45", "info@cityhousemore.com"]],
        ].map(([title, items]) => (
          <div key={String(title)}>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c9a45c]">
              {String(title)}
            </h4>
            <div className="space-y-3 text-sm text-white/65">
              {(items as string[]).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}