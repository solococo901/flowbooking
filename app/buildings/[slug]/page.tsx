import BookingDetailClient from "@/components/BookingDetailClient";
import GsapProvider from "@/components/GsapProvider";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildings } from "@/data/buildings";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    checkin?: string;
    checkout?: string;
    guests?: string;
  }>;
};

export default async function BuildingDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  const building = buildings.find((item) => item.slug === slug);

  if (!building) {
    notFound();
  }

  const checkin = query.checkin || "2026-05-29";
  const checkout = query.checkout || "2026-05-30";
  const guests = Number(query.guests || "2");

  return (
    <>
      <GsapProvider />
      <SiteHeader />

      <main className="bg-[#f7f7f8] pb-20">
        <BookingDetailClient
          building={building}
          checkin={checkin}
          checkout={checkout}
          guests={guests}
        />
      </main>

      <SiteFooter />
    </>
  );
}