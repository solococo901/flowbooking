"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Đặt phòng", href: "/booking" },
    { label: "Lưu trú dài hạn", href: "#" },
    { label: "Hỗ trợ", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07112f]">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 md:h-20 md:px-5">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex min-w-0 flex-col justify-center leading-none text-white"
        >
          <div className="text-[15px] font-black tracking-[0.2em] md:text-xl md:tracking-[0.24em]">
            CITYHOUSE
          </div>

          <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.28em] text-[#c9a45c] md:text-[10px] md:tracking-[0.36em]">
            Booking
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/65 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white transition hover:border-[#c9a45c] hover:text-[#c9a45c] md:h-11 md:w-11"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#07112f] md:hidden">
          <nav className="grid px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/75 transition hover:text-[#c9a45c]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-[#c9a45c] px-5 py-4 text-center text-[13px] font-black uppercase tracking-[0.14em] text-[#07112f]"
            >
              Đặt phòng ngay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}