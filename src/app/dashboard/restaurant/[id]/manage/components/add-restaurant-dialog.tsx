"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@components/ui/alert-dialog"; // Importing AlertDialog components
import { useForm } from "react-hook-form";

export interface AddRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  restaurantName: string;
  location: string;
}

const AddRestaurantDialog: React.FC<AddRestaurantDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Restaurant added:", data);
    // Add logic to handle form submission, e.g., API call to add a restaurant
    reset(); // Reset the form fields
    onClose(); // Close the dialog after submission
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {/* Use AlertDialog for the restaurant adding confirmation */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <h3 className="font-semibold text-lg">Add Restaurant</h3>
        </AlertDialogHeader>
        <form className="grid gap-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input
              type="text"
              id="restaurantName"
              {...register("restaurantName", {
                required: "Restaurant name is required.",
              })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.restaurantName && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.restaurantName.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              {...register("location", {
                required: "Location is required.",
              })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.location && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.location.message}
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
                Add Restaurant
              </Button>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddRestaurantDialog;
