"use client";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import EditHotel from "./components/edit-hotel";
 
const HotelSetting = () => {  
  return (
    <>
      <DashboardLayout  >
        <PageContainer scrollable={true}>
            <h3 className="mb-8">Setting</h3>
            <EditHotel /> 
        </PageContainer>
      </DashboardLayout>
    </>
  );
};

export default HotelSetting;
