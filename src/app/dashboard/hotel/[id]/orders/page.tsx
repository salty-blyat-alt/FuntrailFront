"use client";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/dashboard/components/page-container";
import CustomTable, {
  HeaderProps,
} from "@/app/components/custom-table/custom-table";
import { hotelNavItem } from "@/app/dashboard/routes/routes";
import useAxios from "@/app/hooks/use-axios";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); 
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);  
    setCurrentPage(1); 
  };

  
  const { triggerFetch: fetchOrderHistory, responseData: orderHistory } =
  useAxios<any, undefined>({
    endpoint: "/api/dashboard/history",
    method: "GET",
    config: {
      params: {
        perPage: perPage,
        page: currentPage,
      },
    },
  });
   
  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: false },
    { key: "username", label: "Customer", hidden: false },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "ordered_at", label: "Ordered At", hidden: false },
    { key: "date_start", label: "Date From", hidden: false },
    { key: "date_end", label: "Date To", hidden: false }, 
    { key: "total", label: "Total", hidden: false },
];
// console.log(orderHistory)

  useEffect(() => {
    fetchOrderHistory?.();
  }, [perPage, currentPage]); // Fetch data when page or perPage changes

  return (
    <DashboardLayout navItems={hotelNavItem}>
      <PageContainer scrollable={true}>
        <CustomTable
          title="Pending Orders"
          subtitle="Manage the pending orders"
          data={orderHistory?.items} 
          headers={headers}
          currentPage={orderHistory?.paginate.current_page}
          totalPages={orderHistory?.paginate.last_page}
          perPage={perPage}
          totalItems={orderHistory?.paginate.total}
          onPageChange={handlePageChange}  
          onPerPageChange={handlePerPageChange} 
          havePagination
        />
      </PageContainer>
    </DashboardLayout>
  );
};

export default Orders;
