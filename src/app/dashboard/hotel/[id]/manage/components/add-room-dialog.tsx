"use client";
import { Input } from "@/app/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from "@components/ui/alert-dialog"; // Importing AlertDialog components
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { useForm } from "react-hook-form";

export interface AddRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  roomType: string;
  price: number;
}

const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Room added:", data);
    // Add logic to handle form submission, e.g., API call to add a room
    reset(); // Reset the form fields
    onClose(); // Close the dialog after submission
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}> 
      {/* Use AlertDialog for the room adding confirmation */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <h3 className="font-semibold text-lg">Add Room</h3>
        </AlertDialogHeader>
        <form className="grid gap-y-2" onSubmit={handleSubmit(onSubmit)}>
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

          <div>
            <Label htmlFor="price">Price per Night</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {required: "Price is required." ,
                setValueAs: v => parseInt(v),
              })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.price && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          {/* Add more fields as needed */}
          <AlertDialogFooter>
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
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddRoomDialog;
