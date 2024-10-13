"use client";
import PageContainer from "../../components/page-container";
import DashboardLayout from "../../dashboard-layout";

import StatsCard from "../../components/stats-card";
import CustomTable, {
  HeaderProps,
} from "@/app/components/custom-table/custom-table";
import Transactions from "../../components/transaction";
import { hotelNavItem } from "../../routes/routes";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";

// const data = [
//   {
//     customer: "Liam Johnson",
//     email: "liam@example.com",
//     type: "Sale",
//     status: "Fulfilled",
//     date: "2023-06-23",
//     amount: "250.00",
//   },
//   {
//     customer: "Olivia Smith",
//     email: "olivia@example.com",
//     type: "Refund",
//     status: "Declined",
//     date: "2023-06-24",
//     amount: "150.00",
//   },
//   {
//     customer: "Noah Williams",
//     email: "noah@example.com",
//     type: "Subscription",
//     status: "Fulfilled",
//     date: "2023-06-25",
//     amount: "350.00",
//   },
//   {
//     customer: "Emma Brown",
//     email: "emma@example.com",
//     type: "Sale",
//     status: "Fulfilled",
//     date: "2023-06-26",
//     amount: "450.00",
//   },
// ];

export default function HotelDashboard() {
  const data = [
    {
      id: 1,
      hotel_id: 101, // Corrected hotel ID
      customer_name: "John Doe",
      room_type: ["Single", "Double", "Suite"], // Array of room types
      total: 599.99, // Corrected field for the total price
      status: "Draft",
    },
    {
      id: 2,
      hotel_id: 102,
      customer_name: "Jane Smith",
      room_type: ["Double", "Suite"], // Array of room types
      total: 799.99,
      status: "Active",
    },
    {
      id: 3,
      hotel_id: 103,
      customer_name: "Alice Johnson",
      room_type: ["Single", "Deluxe Suite"], // Array of room types
      total: 999.99,
      status: "Secondary",
    },
  ];

  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "customer_name", label: "Hotel ID", hidden: true },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "total", label: "Price", hidden: false },
    { key: "status", label: "Status", hidden: false },
  ];

  const { triggerFetch: fetchWeekRev, responseData: weekRev } = useAxios<
    any,
    undefined
  >({
    endpoint: "/api/dashboard/week",
    method: "GET",
  });
  const { triggerFetch: fetchMonthRev, responseData: monthRev } = useAxios<
    any,
    undefined
  >({
    endpoint: "/api/dashboard/month",
    method: "GET",
  });

  useEffect(() => {
    fetchWeekRev?.();
    fetchMonthRev?.();
  }, []);
  console.log(weekRev);
  return (
    <DashboardLayout navItems={hotelNavItem}>
      <PageContainer scrollable={true}>
        <div className="grid gap-2">
          <div className="flex gap-2">
            <StatsCard
              description="This Week"
              title={`$${weekRev?.total_sales_current_week || "0.00"}`}
              percentage={weekRev?.total_sales_last_week}
              progressValue={weekRev?.percentage_change}
              duration="week"
            />
            <StatsCard
              description="This Month"
              title={`$${monthRev?.total_sales_current_month || "0.00"}`}
              percentage={monthRev?.total_sales_last_month}
              progressValue={monthRev?.percentage_change}
              duration="month"
            />
          </div>
          {/* pending order */}
          <CustomTable
            title="Pending Orders"
            subtitle="Manage the pending orders"
            data={data}
            headers={headers}
          />
          <Transactions />
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
