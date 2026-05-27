import BookingSummary from "@/components/BookingSummary";
import GsapProvider from "@/components/GsapProvider";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildings } from "@/data/buildings";
import { notFound } from "next/navigation";

type PageProps = {
    searchParams: Promise<{
        property?: string;
        room?: string;
        checkin?: string;
        checkout?: string;
        guests?: string;
    }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
    const query = await searchParams;

    const building = buildings.find((item) => item.slug === query.property);

    if (!building) {
        notFound();
    }

    const room = building.rooms.find((item) => item.id === query.room);

    if (!room) {
        notFound();
    }

    const checkin = query.checkin || "2026-05-29";
    const checkout = query.checkout || "2026-05-30";
    const guests = query.guests || "2";

    return (
        <>
            <GsapProvider />
            <SiteHeader />

            <main className="bg-[#f7f7f8] pb-20">
                <section className="relative overflow-hidden bg-[#07112f] py-20">
                    <div
                        data-parallax
                        className="absolute inset-0 scale-110 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2200&auto=format&fit=crop')] bg-cover bg-center opacity-25"
                    />

                    <div className="relative mx-auto max-w-7xl px-5" data-reveal>
                        <div className="text-xs font-inter font-bold uppercase tracking-[0.3em] text-[#c9a45c]">
                            Checkout
                        </div>

                        <h1 className="mt-3 text-5xl font-inter font-bold tracking-[-0.07em] text-white">
                            Điền thông tin đặt phòng
                        </h1>

                        <p className="mt-4 max-w-2xl text-white/65">
                            Vui lòng kiểm tra lại thông tin phòng trước khi xác nhận.
                        </p>
                    </div>
                </section>

                <section className="mx-auto mt-10 grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_380px]">
                    <div data-reveal className="border border-slate-200 bg-white p-7">
                        <div className="mb-8">
                            <h2 className="text-2xl font-inter font-bold tracking-[-0.04em] text-[#09183f]">
                                Thông tin khách hàng
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Thông tin này dùng để xác nhận đặt phòng và liên hệ trước khi nhận phòng.
                            </p>
                        </div>

                        <form className="grid gap-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-[11px] font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Họ và tên
                                    </label>
                                    <input
                                        placeholder="Nhập họ tên"
                                        className="w-full border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#09183f]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Số điện thoại
                                    </label>
                                    <input
                                        placeholder="Nhập số điện thoại"
                                        className="w-full border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#09183f]"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-[11px] font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Email
                                    </label>
                                    <input
                                        placeholder="Nhập email"
                                        className="w-full border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#09183f]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-[11px] font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Giờ nhận phòng dự kiến
                                    </label>
                                    <select className="w-full border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#09183f]">
                                        <option>14:00 - 15:00</option>
                                        <option>15:00 - 16:00</option>
                                        <option>16:00 - 18:00</option>
                                        <option>Sau 18:00</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-[11px] font-inter font-bold uppercase tracking-[0.18em] text-slate-500">
                                    Ghi chú
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Ví dụ: Tôi muốn nhận phòng sớm, cần chỗ đậu xe..."
                                    className="w-full border border-slate-200 px-4 py-4 text-sm outline-none focus:border-[#09183f]"
                                />
                            </div>

                            <div className="border border-[#d8c7a1] bg-[#f5f1e8] p-5">
                                <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                                    <input type="checkbox" className="mt-1" />
                                    <span>
                                        Tôi đã kiểm tra thông tin đặt phòng, ngày lưu trú và chính sách hủy phòng.
                                    </span>
                                </label>
                            </div>

                            <button
                                type="button"
                                className="bg-[#09183f] px-6 py-5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#c9a45c] hover:text-[#09183f]"
                            >
                                Xác nhận và tiếp tục thanh toán
                            </button>
                        </form>
                    </div>

                    <div data-reveal>
                        <BookingSummary
                            building={building}
                            room={room}
                            checkin={checkin}
                            checkout={checkout}
                            guests={guests}
                            showAction={false}
                        />
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}