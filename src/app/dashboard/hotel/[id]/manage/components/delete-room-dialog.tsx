import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@components/ui/dialog";
import useAxios from "@/app/hooks/use-axios";
import { toast } from "@/app/hooks/use-toast";
import React, { useEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ANY } from "@/app/components/custom-table/custom-table";

interface DeleteRoomDialogProps {
  room_id: number | undefined;
  open: boolean;
  onClose: () => void;
  fetchRooms: ((data?: undefined) => void) | undefined;
}

const DeleteRoomDialog = ({
  room_id,
  open,
  onClose,
  fetchRooms,
}: DeleteRoomDialogProps) => {
  const {
    triggerFetch: deleteRoom,
    finished,
    error,
    responseDataWithStat: errorStat,
    responseData: success,
  } = useAxios< ANY ,FormData>({
    endpoint: "/api/hotel/delete-room",
    method: "POST",
  });

  const { handleSubmit, register, reset, setValue } = useForm<{ room_id: string }>();

  // Update form value when room_id changes
  useEffect(() => {
    if (room_id) {
      setValue("room_id", room_id.toString());
    }
  }, [room_id, setValue]);

  // Handle API response
  useEffect(() => {
    if (finished) {
      if (success) {
        toast({
          title: "Success",
          description: "Room deleted successfully"
        });
        fetchRooms?.();
        onClose();
      } else if (error && errorStat) {
        toast({
          title: "Failed to delete room",
          description:
            errorStat?.result_message + ". code: " + errorStat.result_code,
          variant: "destructive",
        });
      }
      reset();
    }
  }, [finished, success, error, errorStat, fetchRooms, onClose]);

  const onSubmit: SubmitHandler<{ room_id: string }> = useCallback((data) => {
    if (!data.room_id) return;
    
    const formData = new FormData();
    formData.append("room_id", data.room_id);
    deleteRoom?.(formData);
  }, [deleteRoom]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this room? This action cannot be
          undone.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            {...register("room_id", { required: true })}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoomDialog;