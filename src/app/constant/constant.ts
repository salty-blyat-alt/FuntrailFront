 
 export interface HotelProps {
  id?: number; 
  average_stars: string;
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
  rating_label: string;
  total_comments: string;
} 


export const facilities = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Gym",
  "Spa & Wellness Center",
  "Room Service",
  "Restaurant",
  "Bar",
  "Conference Room",
  "Free Parking",
  "Pet-Friendly",
  "Laundry Service",
  "Airport Shuttle",
  "24-hour Front Desk",
  "Fitness Center",
  "Business Center",
  "Electric Vehicle Charging Station",
  "Kids' Club",
  "Hot Tub",
  "Tennis Court",
  "Private Beach Access",
];

export const policies = [
  "No Smoking",
  "Check-in after 3 PM",
  "Check-out before 11 AM",
  "Pets Allowed",
  "No Pets Allowed",
  "Cancellation Policy: Free up to 24 hours before check-in",
  "Cancellation Policy: Non-refundable",
  "Guests must be 18 or older to check in",
  "Late Check-out Available",
  "No Parties or Events Allowed",
  "Quiet Hours from 10 PM to 7 AM",
  "Valid ID Required at Check-in",
  "Credit Card Required at Check-in",
  "Children Allowed",
  "No Outside Food or Drink Allowed",
  "Maximum Occupancy: 4 guests per room",
  "Early Check-in Available Upon Request",
  "Luggage Storage Available",
  "Daily Housekeeping",
];
 