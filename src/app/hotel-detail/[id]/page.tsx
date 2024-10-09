"use client";

import { Button } from "@components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { HeartIcon, MapPinIcon, ShareIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import HotelComment from "../components/hotel-comment";
import ImageSelect from "../components/image-select";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import RoomList from "../components/room-list";

export default function HotelDetail() {
  const hotel = {
    id: 2,
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
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/600",
      "https://via.placeholder.com/700",
      "https://via.placeholder.com/900",
    ],
  };
  const { id } = useParams();
  console.log("id", id);

  const pathname = usePathname();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-sm breadcrumbs">
        <CustomBreadcrumb pathname={pathname} />
      </div>

      <div className="flex justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">{hotel?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <HeartIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ShareIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        <MapPinIcon className="inline-block mr-1 h-4 w-4" /> {hotel?.address}
      </p>

      <div className="mb-4">
        <ImageSelect images={hotel.images} />
      </div>

      <Tabs defaultValue="overview" className="mb-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview" className="mb-2 mr-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="info" className="mb-2 mr-2">
            Info & prices
          </TabsTrigger>
          <TabsTrigger value="facilities" className="mb-2 mr-2">
            Facilities
          </TabsTrigger>
          <TabsTrigger value="policies" className="mb-2 mr-2">
            Policies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>{hotel.description}</p>
        </TabsContent>

        {/* Info & Prices Tab */}
        <TabsContent value="info">
          <p>
            <strong>Hotel Name:</strong> {hotel.name}
          </p>
          <p>
            <strong>Address:</strong> {hotel.address}
          </p>
          <p>
            <strong>Check-in Time:</strong> {hotel.open_at}
          </p>
          <p>
            <strong>Check-out Time:</strong> {hotel.close_at}
          </p>
        </TabsContent>
        {/* render rooms */}
        {/* <Room> 
        </Room> */}

        <RoomList />

        {/* Facilities Tab */}
        <TabsContent value="facilities">
          <ul>
            {hotel.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies">
          <ul>
            {hotel.policies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      <HotelComment />
    </div>
  );
}
