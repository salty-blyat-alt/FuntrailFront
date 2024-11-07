"use client";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout"; 
import useHotelNavItems from "@/app/dashboard/routes/routes"; 
import EditHotel from "./components/edit-hotel"; 
 
const HotelSetting = () => { 
  const hotelNavItems = useHotelNavItems();
  return (
    <>
      <DashboardLayout  >
        <PageContainer scrollable={true}>
            <h3>Setting</h3>
            <EditHotel /> 
        </PageContainer>
      </DashboardLayout>
    </>
  );
};

export default HotelSetting;
