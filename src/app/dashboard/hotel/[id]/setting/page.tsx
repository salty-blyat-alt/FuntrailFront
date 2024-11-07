"use client";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout"; 
import useHotelNavItems from "@/app/dashboard/routes/routes";
import { mockHotel } from "@/app/data/mockupData"; 
import { useState } from "react";  
import EditHotel from "./components/edit-hotel"; 
 
const HotelSetting = () => { 
  const hotelNavItems = useHotelNavItems();
  return (
    <>
      <DashboardLayout
        navItems={hotelNavItems}
      >
        <PageContainer scrollable={true}>
            <h3>Setting</h3>
            <EditHotel /> 
        </PageContainer>
      </DashboardLayout>
    </>
  );
};

export default HotelSetting;
