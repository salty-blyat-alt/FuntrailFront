"use client";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";

import HotelDetailPreview from "@/app/components/hotel-detail-preview/hotel-detail-preview";
import { Button } from "@/app/components/ui/button";
import useHotelNavItems from "@/app/dashboard/routes/routes";
import { mockHotel } from "@/app/data/mockupData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import EditHotelDialog from "./components/edit-hotel-dialog";

const HotelSetting = () => {
  const [hotel, setHotel] = useState(mockHotel);
  const hotelNavItems = useHotelNavItems();

  const handleHotelPageClick = () => {
    setRedirectUrl(`/hotel-detail/${user?.establishment_id}`);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirect to hotel page
    }
    setDialogOpen(false); // Close the dialog
  }; 
  return (
    <>
    
     <DashboardLayout navItems={hotelNavItems.map(item => {
        if (item.title === "Hotel Page") {
          return {
            ...item,
            onClick: handleHotelPageClick, // Attach click handler
          };
        }
        return item;
      })}>
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
    </>
  );
};

export default HotelSetting;
