"use client";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/app/hooks/use-toast";
import useAxios from "@/app/hooks/use-axios";
import UploadThumbnail from "@/app/components/image-field/upload-thumbnail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { RoomProps } from "@/app/hotel-detail/components/room-list";
import { ANY } from "@/app/components/custom-table/custom-table";

export default function EditRoomDialog({
  open,
  fetchRooms,
  selectedRow,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  selectedRow: RoomProps | undefined;
  fetchRooms: ((data?: undefined) => void) | undefined;
}) {
  const [roomType, setRoomType] = useState("standard");
  const [preview, setPreview] = useState<File>();
  const [customRoomType, setCustomRoomType] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RoomProps>();

  useEffect(() => {
    if (selectedRow) {
      setValue("price_per_night", selectedRow.price_per_night);
      setValue("img", selectedRow.img);
      setValue("room_type", selectedRow.room_type);
      setRoomType(
        selectedRow.room_type === "standard" ||
          selectedRow.room_type === "deluxe" ||
          selectedRow.room_type === "suite"
          ? selectedRow.room_type
          : "other"
      );
      setCustomRoomType(
        selectedRow.room_type !== "standard" &&
          selectedRow.room_type !== "deluxe" &&
          selectedRow.room_type !== "suite"
          ? selectedRow.room_type
          : ""
      );
      setPreview(undefined);
    }
  }, [selectedRow, setValue]);

  const handleThumbnailChange = (file?: File | undefined) => {
    if (file) {
      // Create a FileReader to convert the file to Base64
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // When the file is successfully read, you can store the Base64 string
        setPreview(file);
        setValue("img", reader.result as string);  // Cast the result as a string (Base64)
      };
  
      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
    }
  };
  

  const {
    triggerFetch: addRoom,
    responseData: success,
    finished,
  } = useAxios<any, any>({
    method: "POST",
    endpoint: `/api/hotel/update-room/${selectedRow?.id}`,
    config: {},
  });

  useEffect(() => {
    if (success && finished) {
      fetchRooms?.();
      toast({
        title: "Room Updated",
        description: "Room is updated successfully.",
        variant: "success",
      });
    }
  }, [success, finished, fetchRooms]);

  useEffect(() => {
    if (finished) {
      setRoomType("standard");
      setCustomRoomType("");
      setPreview(undefined);
      reset();
      fetchRooms?.();
      onClose();
    }
  }, [finished, reset, fetchRooms, onClose]);

  const onSubmit: SubmitHandler<ANY> = async (data) => {
    const finalRoomType = roomType === "other" ? customRoomType : roomType;
    const formData = new FormData();
    formData.append("room_type",  finalRoomType ?? "Not a room");
    if (data?.price_per_night) {
      formData.append("price_per_night", data?.price_per_night.toString());
    }
    if (data.img && typeof data.img !== "string") {
      formData.append("img", data.img);
    }
    try {
      addRoom?.(formData);
    } catch (err) {
      console.error("Failed to update room:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>Update the details of your room</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="room-type">Room Type</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger id="room-type">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {roomType === "other" && (
            <div>
              <Label htmlFor="custom-room-type">Custom Room Type</Label>
              <Input
                id="custom-room-type"
                {...register("room_type", {
                  required: "Room Type is required",
                })}
                value={customRoomType}
                onChange={(e) => setCustomRoomType(e.target.value)}
                placeholder="Enter custom room type"
              />
              {errors.room_type && (
                <span className="text-red-500">{errors.room_type.message}</span>
              )}
            </div>
          )}
          <div>
            <Label htmlFor="price">Price per Night</Label>
            <Input
              id="price"
              type="number"
              {...register("price_per_night", {
                required: "Price is required",
              })}
              placeholder="Enter price per night"
            />
            {errors.price_per_night && (
              <span className="text-red-500">
                {errors.price_per_night.message}
              </span>
            )}
          </div>
          <div>
            <UploadThumbnail
              isRequired
              title="Room Image Preview"
              thumbnail={preview}
              setThumbnail={handleThumbnailChange}
              {...register("img", { required: "Room image is required" })}
            />
            {errors.img && (
              <span className="text-red-500 pt-0 text-sm">
                {errors.img.message}
              </span>
            )}
          </div>
          <div className="flex gap-x-2">
            <Button onClick={onClose} size={"sm"} variant={"outline"}>
              Done
            </Button>
            <Button size={"sm"} type="submit">
              Update Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
