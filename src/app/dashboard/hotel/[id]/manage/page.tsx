"use client";

import { Button } from "@/app/components/ui/button"; 
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { hotelNavItem } from "../page";
import AddRoomDialog from "./components/add-room-dialog";
import CustomTable, { HeaderProps } from "@/app/components/custom-table/custom-table";
export default function Manage() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const data  = [
    {
      id: 1,
      hotel_id: 1, // Assuming hotel_id is a number
      room_type: "Laser Lemonade Machine", // This should describe the room type
      price_per_night: 499.99, // Correct property name
      status: "Draft", // Must be one of the defined statuses
    },
    {
      id: 2,
      hotel_id: 2, // Assuming hotel_id is a number
      room_type: "Hypernova Headphones", // Corrected as a room type
      price_per_night: 129.99, // Correct property name
      status: "Active", // Must be one of the defined statuses
    },
  ];

  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "hotel_id", label: "Hotel ID", hidden: true },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "price_per_night", label: "Price", hidden: false },
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ];

  const handleEdit = (productId: number) => {
    console.log(`Edit product with ID: ${productId}`);
    // Navigate to the edit page or open a modal
  };
  const handleDelete = (productId: number) => {
    console.log(`Edit product with ID: ${productId}`);
    // Navigate to the edit page or open a modal
  };
  return (
    <DashboardLayout navItems={hotelNavItem}>
      <PageContainer scrollable={true}>
        <div className="flex mb-2 justify-between">
          <h2>Room Management</h2>
          <Button
            onClick={() => setOpenDialog(true)} // Open dialog on button click
            variant="outline" // Optionally apply a variant
          >
            <PlusIcon className="mr-2" /> Add Room {/* Optional icon */}
          </Button>
          <AddRoomDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
        />
        </div>
        
        <CustomTable
          title="Rooms"
          subtitle="Manage your rooms"
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          headers={headers}
        />
      </PageContainer>
    </DashboardLayout>
  );
}
