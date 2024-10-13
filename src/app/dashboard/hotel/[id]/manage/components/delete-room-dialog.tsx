import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/app/components/ui/dialog"; // Ensure this import matches your setup
import useAxios from "@/app/hooks/use-axios";
import { toast } from "@/app/hooks/use-toast";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface DeleteRoomDialogProps {
  room_id: number | undefined;
  open: boolean;
  onClose: () => void;
}

const DeleteRoomDialog = ({
  room_id,
  open,
  onClose,
}: DeleteRoomDialogProps) => {
  const { triggerFetch: deleteRoom, responseData: success } = useAxios<
    any,
    { room_id?: number }
  >({
    endpoint: "/api/hotel/delete-room",
    method: "POST",
  });

  const { handleSubmit, register, reset } = useForm<{ room_id: string }>();

  const onSubmit: SubmitHandler<{ room_id: string }> = (data) => {
    const formData = new FormData();
    formData.append("room_id", data.room_id); // Use the hidden input value
    deleteRoom?.(formData);
    onClose();
    reset();
  };

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
          {/* Hidden input for room_id */}
          <input
            type="hidden"
            value={room_id}
            {...register("room_id", { required: true })}
          />

          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={onClose} variant="outline">
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
