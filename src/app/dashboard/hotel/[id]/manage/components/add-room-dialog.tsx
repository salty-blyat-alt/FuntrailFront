"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import useAxios from "@/app/hooks/use-axios";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

export interface AddRoomDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  roomType: string;
  price_per_night: number;
}

const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { triggerFetch: addRoom, responseData: success } = useAxios<
  FormData,
    any
  >({
    endpoint: "/api/hotel/add-room",
    config: {},
    method: "POST",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append("room_type", data.roomType);
    formData.append("price_per_night", data.price_per_night.toString());
    addRoom?.(formData);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
      aria-describedby="dialog-description"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
          <DialogDescription>
            <p id="dialog-description" className="text-muted-foreground">
              Please enter the room details below:
            </p>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Room Type */}
          <div>
            <Label htmlFor="roomType">Room Type</Label>
            <Input
              type="text"
              id="roomType"
              {...register("roomType", { required: "Room type is required." })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.roomType && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.roomType.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price_per_night">Price per Night</Label>
            <Input
              id="price_per_night"
              type="number"
              {...register("price_per_night", {
                required: "Price is required.",
                valueAsNumber: true, // Automatically convert to number
              })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.price_per_night && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.price_per_night.message}
              </span>
            )}
          </div>

          {/* Footer */}
          <DialogFooter>
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="font-semibold text-sm">
                Add Room
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
