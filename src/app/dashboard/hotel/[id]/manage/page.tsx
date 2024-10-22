"use client";

import CustomTable, {
  HeaderProps,
} from "@/app/components/custom-table/custom-table";
import { Button } from "@/app/components/ui/button";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import { hotelNavItem } from "@/app/dashboard/routes/routes";
import useAxios from "@/app/hooks/use-axios";
import { RoomProps } from "@/app/hotel-detail/components/room-list";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddRoomDialog from "./components/add-room-dialog";
import DeleteRoomDialog from "./components/delete-room-dialog";

export default function Manage() {
  const [selectedRoom, setSelectedRoom] = useState<number>();
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // Ensure this starts as false

  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "hotel_id", label: "Hotel ID", hidden: true },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "price_per_night", label: "Price", hidden: false },
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ];

  const { triggerFetch: fetchProfile, responseData: responseUser } = useAxios<
    any,
    undefined
  >({
    endpoint: "/api/auth/profile",
    method: "GET",
  });

  useEffect(() => {
    fetchProfile?.();
  }, []);

  const {
    triggerFetch: fetchRooms,
    loading,
    responseData: rooms,
  } = useAxios<any, undefined>({
    endpoint:
      responseUser?.establishment_id &&
      `/api/hotel/rooms/${responseUser.establishment_id}`,
  });
  // console.log(rooms);

  useEffect(() => {
    if (responseUser?.establishment_id) {
      fetchRooms?.();
    }
  }, [responseUser]);

  const handleEdit = (row: RoomProps) => {
    console.log(row);
  };

  // add dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    fetchRooms?.();
  };

  // delete dialog
  const handleOpenDeleteDialog = (row: RoomProps) => {
    setSelectedRoom(row.id); // Set the room id for deletion
    setOpenDeleteDialog(true); // Open dialog only when delete button is clicked
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    fetchRooms?.();
  };

  return (
    <>
      
      <DashboardLayout navItems={hotelNavItem}>
        <PageContainer scrollable={true}>
          <div className="flex mb-2 justify-between">
            <h2>Room Management</h2>
            <Button onClick={handleOpenAddDialog} variant="outline">
              <PlusIcon className="mr-2" /> Add Room
            </Button>
          </div>

          <CustomTable
            title="Rooms"
            subtitle="Manage your rooms"
            data={rooms}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleOpenDeleteDialog}
            headers={headers}
          />

          <AddRoomDialog open={openAddDialog} onClose={handleCloseAddDialog} />
          <DeleteRoomDialog
            open={openDeleteDialog}
            room_id={selectedRoom}
            onClose={handleCloseDeleteDialog}
          />
        </PageContainer>
      </DashboardLayout>
    </>
  );
}
