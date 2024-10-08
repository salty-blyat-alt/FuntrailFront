"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import { restaurantNavItem } from "../page";
import PageContainer from "@/app/dashboard/components/page-container";
import CustomTable, { HeaderProps } from "@/app/components/custom-table/custom-table";

// Simulated fetch function (replace with your actual API call)
const fetchOrders = async () => {
  // Simulate API call delay
  return [
    {
      customer: "Liam Johnson",
      email: "liam@example.com",
      type: "Sale",
      status: "Fulfilled",
      date: "2023-06-23",
      amount: "250.00",
    },
    {
      customer: "Olivia Smith",
      email: "olivia@example.com",
      type: "Refund",
      status: "Declined",
      date: "2023-06-24",
      amount: "150.00",
    },
    {
      customer: "Noah Williams",
      email: "noah@example.com",
      type: "Subscription",
      status: "Fulfilled",
      date: "2023-06-25",
      amount: "350.00",
    },
    {
      customer: "Emma Brown",
      email: "emma@example.com",
      type: "Sale",
      status: "Pending",
      date: "2023-06-26",
      amount: "450.00",
    },
  ];
};

const Orders = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch data when the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      const orders = await fetchOrders();
      setData(orders); // Update state with fetched data
      setLoading(false); // Update loading state
    };

    loadOrders();
  }, []);

  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "customer", label: "Resturant ID", hidden: true },
    { key: "type", label: "Food", hidden: false },
    { key: "amount", label: "Price", hidden: false }, // Fixed key to match the price data
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ];

  const handleEdit = (row: any) => {
    console.log("selected", row);
  };

  const handleDelete = (row: any) => {
    console.log("delete", row);
  };

  return (
    <DashboardLayout navItems={restaurantNavItem}>
      <PageContainer scrollable={true}>
        {loading ? (
          <div>Loading...</div> // Loading state while data is being fetched
        ) : (
          <CustomTable
            title="Orders"
            subtitle="Order History"
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            headers={headers}
          />
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default Orders;
