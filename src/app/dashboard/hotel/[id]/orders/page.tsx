"use client";
import CustomTable, {
  ANY,
    HeaderProps,
} from "@/app/components/custom-table/custom-table";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import useAxios from "@/app/hooks/use-axios";
import { useEffect, useState } from "react";

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
    useAxios<ANY, undefined>({
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
    { key: "id", label: "Receipt ID", hidden: false },
    { key: "b_id", label: "bid", hidden: false },
    { key: "username", label: "Customer", hidden: false },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "date_start", label: "Checkin", hidden: false },
    { key: "date_end", label: "Checkout", hidden: false },
    { key: "total", label: "Total", hidden: false },
    { key: "ordered_at", label: "Ordered At", hidden: false },
  ]; 

  useEffect(() => {
    fetchOrderHistory?.();
  }, [perPage, currentPage]); // Fetch data when page or perPage changes
  
  console.log(orderHistory)
  return (
    <>
      
      <DashboardLayout >
        <PageContainer scrollable={true}>
          <CustomTable
            title="Order History"
            subtitle=""
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
    </>
  );
};

export default Orders;
