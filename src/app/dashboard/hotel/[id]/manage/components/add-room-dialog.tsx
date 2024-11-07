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
import { ANY } from "@/app/components/custom-table/custom-table";

interface RoomProps {
  room_type: string;
  price_per_night: number;
  img: File;
} 

export default function AddRoomDialog({
  open,
  fetchRooms,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  fetchRooms: ((data?: undefined) => void) | undefined;
}) {
  const [roomType, setRoomType] = useState("standard");
  const [preview, setPreview] = useState<File>();
  const [customRoomType, setCustomRoomType] = useState(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RoomProps>();

  const handleThumbnailChange = (file?: File) => {
    setPreview(file);
    if( file){ 
      setValue("img", file);
    }
  };

  const {
    triggerFetch: addRoom,
    responseData: success,
    finished,
  } = useAxios<ANY,ANY>({
    method: "POST",
    endpoint: "/api/hotel/add-room",
    config: {},
  });

  useEffect(() => {
    if (success && finished) {
      fetchRooms?.();
      toast({
        title: "Room Added",
        description: "Room is added to your hotel successfully.",
        variant: "success",
      });
    }
  }, [success, finished]);

  useEffect(() => {
    if (finished) {
      setRoomType("standard");
      setCustomRoomType("");
      setPreview(undefined);
      reset();
      fetchRooms?.();
    }
  }, [finished]); 

  const onSubmit: SubmitHandler<RoomProps> = async (data) => {
    const finalRoomType = roomType === "other" ? customRoomType : roomType;
    const formData = new FormData();

    formData.append("room_type", finalRoomType);
    formData.append("price_per_night", data.price_per_night.toString());
    formData.append("img", data.img);
    addRoom?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Please add some rooms to your hotel
            <DialogDescription>
              You can skip this and add rooms later in your dashboard
            </DialogDescription>
          </DialogTitle>
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
          <div className="flex gap-x-2 ">
            <Button onClick={onClose} size={"sm"} variant={"outline"}>
              Done
            </Button>
            <Button size={"sm"} type="submit">
              Add Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
