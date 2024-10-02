"use client";
import { useParams } from "next/navigation";
import DashboardLayout from "../../dashboard-layout";
import PageContainer from "../../components/page-container";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

export default function HotelDashboard() {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <PageContainer>
        <div className="space-y-2">
          sadf
          {id}asdfffffffffffffff
          {id}asdfffffffffffffff
          {id}asdfffffffffffffff 
          {id}asdfffffffffffffff 
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
