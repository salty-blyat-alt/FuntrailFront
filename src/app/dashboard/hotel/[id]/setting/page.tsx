"use client";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
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
import { hotelNavItem } from "@/app/dashboard/routes/routes";
import { mockHotel } from "@/app/data/mockupData";

const HotelSetting = () => {
  const [hotel, setHotel] = useState(mockHotel);
  return (
    <DashboardLayout navItems={hotelNavItem}>
      <PageContainer scrollable={true}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between">
              <CardTitle>Preview of your hotel page</CardTitle>
              <div>
                <EditHotelDialog setHotel={setHotel} item={hotel} />

                <Button size="sm">
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
