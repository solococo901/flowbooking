export type Room = {
  id: string;
  name: string;
  image: string;
  guests: number;
  size: number;
  beds: string;
  price: number;
  amenities: string[];
  benefits: string[];
};

export type Building = {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  shortDescription: string;
  description: string;
  priceFrom: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
};

const roomImages = [
  "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1600&auto=format&fit=crop",
];

const buildingImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1800&auto=format&fit=crop",
];

function makeRooms(basePrice: number): Room[] {
  return [
    {
      id: "studio",
      name: "Studio Apartment",
      image: roomImages[0],
      guests: 2,
      size: 36,
      beds: "1 giường queen",
      price: basePrice,
      benefits: ["Giá tốt hôm nay", "Wifi miễn phí", "Không gian riêng tư"],
      amenities: ["Wifi", "Bàn làm việc", "Smart TV", "Phòng tắm riêng"],
    },
    {
      id: "one-bedroom",
      name: "1 Bedroom Apartment",
      image: roomImages[1],
      guests: 2,
      size: 48,
      beds: "1 giường king",
      price: basePrice + 350000,
      benefits: ["Phù hợp công tác", "Có bếp riêng", "Dọn phòng"],
      amenities: ["Wifi", "Bếp", "Máy lạnh", "Máy giặt"],
    },
    {
      id: "two-bedroom",
      name: "2 Bedrooms Apartment",
      image: roomImages[2],
      guests: 4,
      size: 72,
      beds: "2 giường queen",
      price: basePrice + 850000,
      benefits: ["Phù hợp gia đình", "Diện tích rộng", "View đẹp"],
      amenities: ["Wifi", "Bếp", "Phòng khách", "Ban công"],
    },
  ];
}

export const buildings: Building[] = [
  {
    id: "nestdc",
    slug: "nestdc",
    name: "CityHouse - Nest DC",
    area: "TP. Hồ Chí Minh",
    address: "Trung tâm TP. Hồ Chí Minh",
    shortDescription: "Không gian lưu trú hiện đại, phù hợp khách công tác và lưu trú ngắn ngày.",
    description:
      "CityHouse - Nest DC mang phong cách căn hộ dịch vụ hiện đại, tối giản và riêng tư. Phù hợp cho khách cần vị trí thuận tiện, dịch vụ nhanh và trải nghiệm lưu trú gọn gàng.",
    priceFrom: 1100000,
    images: buildingImages,
    amenities: ["Wifi miễn phí", "Dọn phòng", "Bảo vệ 24/7", "Bãi đậu xe", "Thang máy"],
    rooms: makeRooms(1100000),
  },
  {
    id: "lighthouse",
    slug: "lighthouse",
    name: "CityHouse - Lighthouse",
    area: "Quận trung tâm",
    address: "TP. Hồ Chí Minh",
    shortDescription: "Tòa nhà phong cách boutique, hình ảnh đẹp, phù hợp khách yêu thích không gian sang trọng.",
    description:
      "CityHouse - Lighthouse là lựa chọn phù hợp cho khách tìm kiếm không gian lưu trú có gu thẩm mỹ, riêng tư và tiện nghi.",
    priceFrom: 1350000,
    images: [...buildingImages].reverse(),
    amenities: ["Wifi miễn phí", "Bảo vệ 24/7", "Phòng gym", "Dọn phòng", "Bếp riêng"],
    rooms: makeRooms(1350000),
  },
  {
    id: "atelier",
    slug: "atelier",
    name: "CityHouse - Atelier Thảo Điền",
    area: "Thảo Điền, Quận 2",
    address: "45 Nguyễn Duy Hiệu, Thảo Điền, TP. Hồ Chí Minh",
    shortDescription: "Căn hộ dịch vụ cao cấp tại Thảo Điền, phù hợp chuyên gia và khách lưu trú dài hạn.",
    description:
      "CityHouse - Atelier Thảo Điền mang tinh thần sống hiện đại, yên tĩnh và sang trọng. Không gian phù hợp cho chuyên gia, doanh nhân và khách cần lưu trú tại khu vực Thảo Điền.",
    priceFrom: 1650000,
    images: buildingImages,
    amenities: ["Wifi miễn phí", "Bảo vệ 24/7", "Phòng gym", "Bể bơi", "Bãi đậu xe", "Dọn phòng"],
    rooms: makeRooms(1650000),
  },
  {
    id: "kim-nguyen",
    slug: "kim-nguyen",
    name: "CityHouse - Kim Nguyên",
    area: "Phú Nhuận",
    address: "Trương Quốc Dung, Phú Nhuận, TP. Hồ Chí Minh",
    shortDescription: "Vị trí thuận tiện gần sân bay, phù hợp khách công tác và di chuyển nhanh.",
    description:
      "CityHouse - Kim Nguyên là lựa chọn lưu trú tiện lợi cho khách công tác, chuyên gia và khách cần di chuyển nhanh đến sân bay Tân Sơn Nhất.",
    priceFrom: 950000,
    images: [...buildingImages].slice(1).concat(buildingImages[0]),
    amenities: ["Wifi miễn phí", "Bảo vệ 24/7", "Thang máy", "Dọn phòng", "Bãi đậu xe"],
    rooms: makeRooms(950000),
  },
  {
    id: "elpino",
    slug: "elpino",
    name: "CityHouse - Elpino",
    area: "TP. Hồ Chí Minh",
    address: "TP. Hồ Chí Minh",
    shortDescription: "Không gian căn hộ dịch vụ hiện đại, riêng tư và dễ đặt phòng.",
    description:
      "CityHouse - Elpino phù hợp cho khách tìm kiếm không gian lưu trú hiện đại, sạch sẽ và dễ dàng di chuyển trong thành phố.",
    priceFrom: 1200000,
    images: buildingImages,
    amenities: ["Wifi miễn phí", "Bảo vệ 24/7", "Bếp riêng", "Dọn phòng"],
    rooms: makeRooms(1200000),
  },
];

export const allBuildingNames = [
  "nestdc",
  "lighthouse",
  "nest mk",
  "bellita",
  "nest metro td",
  "villea",
  "emeral",
  "tera the s",
  "kim nguyen",
  "mta calmete",
  "oasis",
  "ariosa",
  "atelier",
  "elpino",
];

export function formatVND(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}