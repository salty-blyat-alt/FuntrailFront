"use client";

import PageContainer from "../../components/page-container";
import DashboardLayout from "../../dashboard-layout";

import StatsCard from "../../components/stats-card";
import CustomTable, {
  HeaderProps,
} from "@/app/components/custom-table/custom-table";
import { hotelNavItem } from "../../routes/routes";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { Navbar } from "@/app/components/navbar/navbar";

export default function HotelDashboard() {
  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "username", label: "Customer", hidden: false },
    { key: "ordered_at", label: "Ordered At", hidden: false },
    { key: "date_start", label: "Date From", hidden: false },
    { key: "date_end", label: "Date To", hidden: false },
    { key: "hotel_id", label: "hotel_id", hidden: true },
    { key: "room_id", label: "room_id", hidden: true },
    { key: "total", label: "Total", hidden: false },
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
  const { triggerFetch: fetchPending, responseData: pendingOrders } = useAxios<
    any,
    undefined
  >({
    endpoint: "/api/dashboard/pending",
    method: "GET",
  });

  useEffect(() => {
    const fetchData = async () => {
      fetchWeekRev?.();
      fetchMonthRev?.();
      fetchPending?.();
    };
    fetchData?.();
  }, []);

  return (
    <>
      <Navbar />
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
              data={pendingOrders}
              headers={headers}
              onPageChange={() => console.log()}
              onPerPageChange={() => console.log()}
            />
          </div>
        </PageContainer>
      </DashboardLayout>
    </>
  );
}
