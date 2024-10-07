"use client";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import { restaurantNavItem } from "../page";
import PageContainer from "@/app/dashboard/components/page-container";
import CustomTable, {
  HeaderProps,
} from "@/app/components/custom-table/custom-table";

const Orders = () => {
  
  const data = [
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
      status: "Fulfilled",
      date: "2023-06-26",
      amount: "450.00",
    },
  ];
  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "customer", label: "Hotel ID", hidden: true },
    { key: "type", label: "Room Type", hidden: false },
    { key: "total", label: "Price", hidden: false },
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
        <CustomTable
          title="Orders"
          subtitle="order history"
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          headers={headers}
        />
      </PageContainer>
    </DashboardLayout>
  );
};

export default Orders;
