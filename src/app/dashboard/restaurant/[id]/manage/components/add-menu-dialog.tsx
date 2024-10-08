"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/app/components/ui/alert-dialog";
import { useForm } from "react-hook-form";

export interface AddMenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  menuName: string;
  items: string;
}

const AddMenuDialog: React.FC<AddMenuDialogProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Menu added:", data);
    // Add logic to handle form submission, e.g., API call to add a menu
    reset(); // Reset the form fields
    onClose(); // Close the dialog after submission
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <h3 className="font-semibold text-lg">Add Menu</h3>
        </AlertDialogHeader>
        <form className="grid gap-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="menuName">Menu Name</Label>
            <Input
              type="text"
              id="menuName"
              {...register("menuName", { required: "Menu name is required." })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.menuName && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.menuName.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="items">Items</Label>
            <Input
              id="items"
              type="text"
              {...register("items", { required: "Items are required." })}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {errors.items && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.items.message}
              </span>
            )}
          </div>

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
                Add Menu
              </Button>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddMenuDialog;
