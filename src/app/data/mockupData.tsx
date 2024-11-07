 

export interface HotelProps {
  province: string;
  id?: number; // prod
  name: string;
  address?: string;
  province_id: string;
  description?: string;
  thumbnail?: string;
  images?: string[] | string;
  open_at: string;
  close_at: string;
  facilities: string[];
  policies: string[];
}
export const mockHotel: HotelProps = {
  name: "Le Tonle",
  address:
    "Street Preah Somramrth (River Road), Psar Veng village, Sangkat Kratie, Kratie Town, Kratie Province, Kratie, Cambodia",
  description: `Le Tonle is a recently renovated guest house in Kratie where guests can make the most of its terrace and shared lounge.`,
  open_at: "07:00",
  close_at: "12:00",
  facilities: [
    "Free Wi-Fi",
    "Swimming Pool",
    "Spa and Wellness Center",
    "24-hour Front Desk",
    "Restaurant & Bar",
    "Gym",
    "Room Service",
    "Parking",
  ],
  policies: [
    "Free cancellation within 48 hours of booking.",
    "Children of all ages are welcome.",
    "Pets are allowed on request.",
  ],
  images: [ ],
  province_id: "",
  thumbnail: "",
};

