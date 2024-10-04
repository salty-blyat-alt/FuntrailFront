"use client";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import { hotelNavItem } from "../page";
import PageContainer from "@/app/dashboard/components/page-container";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import HotelDetailPreview from "@/app/components/hotel-detail-preview/hotel-detail-preview";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import EditHotelDialog from "./components/edit-hotel-dialog";
import { PenIcon } from "lucide-react";

const HotelSetting = () => {
  const [hotel, setHotel] = useState({
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
  }); 
  return (
    <DashboardLayout navItems={hotelNavItem}>
      <PageContainer scrollable={true}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between">
              <CardTitle>Preview of your hotel page</CardTitle>
              <div>
                <EditHotelDialog setHotel={setHotel} item={hotel}/>
 
                <Button size="sm"  >
                  <PenIcon className="mr-2 size-4 flex-none" /> Save Changes
                </Button>
              </div>
            </div>
            <CardDescription>aasdf</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <HotelDetailPreview hotel={hotel} />
          </CardContent>
        </Card>

        
      </PageContainer>
    </DashboardLayout>
  );
};

export default HotelSetting;
