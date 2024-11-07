"use client";
import  {
  ANY,
  HeaderProps,
} from "@/app/components/custom-table/custom-table";
import { Button } from "@/app/components/ui/button";
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import useAxios from "@/app/hooks/use-axios";
import { RoomProps } from "@/app/hotel-detail/components/room-list";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddRoomDialog from "./components/add-room-dialog";
import DeleteRoomDialog from "./components/delete-room-dialog";
import EditRoomDialog from "./components/edit-room-dialog";
import { useAuth } from "@/app/context/auth-context";
import ManageRoomTable from "./components/manage-room-table";

export default function Manage() {
  const [selectedRoom, setSelectedRoom] = useState<number | undefined>();
  const [selectedRow, setSelectedRow] = useState<RoomProps | undefined>();
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const { user } = useAuth();

  const headers: HeaderProps[] = [
    { key: "id", label: "ID", hidden: false },
    { key: "hotel_id", label: "Hotel ID", hidden: true },
    { key: "img", label: "Image", hidden: false },
    { key: "room_type", label: "Room Type", hidden: false },
    { key: "price_per_night", label: "Price", hidden: false },
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ]; 

  const {
    triggerFetch: fetchRooms,
    loading,
    responseData: rooms,
  } = useAxios<ANY, undefined>({
    endpoint: `/api/hotel/rooms/${user?.establishment_id}`,
  });

  console.log();

  useEffect(() => {
    if (user?.establishment_id) {
      fetchRooms?.();
    }
  }, [user]);

  const handleEdit = (row: RoomProps) => {
    setSelectedRow(row);
    setOpenEditDialog(true);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenDeleteDialog = (row: RoomProps) => {
    setSelectedRoom(row.id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
   
  return (
    <DashboardLayout>
      <PageContainer scrollable={true}>
        <div className="w-full flex justify-end mb-4"> 
          <Button onClick={handleOpenAddDialog} variant="outline">
            <PlusIcon className="mr-2" /> Add Room
          </Button>
        </div>

        <ManageRoomTable
          title="Rooms"
          subtitle="Manage your rooms"
          data={rooms}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleOpenDeleteDialog}
          headers={headers}
          onPageChange={function (): void {
            throw new Error("Function not implemented.");
          }}
          onPerPageChange={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <AddRoomDialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
          fetchRooms={fetchRooms}
        />
        <DeleteRoomDialog
          fetchRooms={fetchRooms}
          open={openDeleteDialog}
          room_id={selectedRoom}
          onClose={handleCloseDeleteDialog}
        />
        <EditRoomDialog
          fetchRooms={fetchRooms}
          open={openEditDialog}
          selectedRow={selectedRow}
          onClose={handleCloseEditDialog}
        />
      </PageContainer>
    </DashboardLayout>
  );
}
