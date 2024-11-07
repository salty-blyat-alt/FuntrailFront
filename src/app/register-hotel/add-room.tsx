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
import { toast } from "../hooks/use-toast";
import { Card } from "@components/ui/card";
import { ScrollArea } from "@components/ui/scroll-area";
import useAxios from "../hooks/use-axios";
import UploadThumbnail from "../components/image-field/upload-thumbnail";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ANY } from "../components/custom-table/custom-table";

interface RoomProps {
  room_type: string;
  price_per_night: number;
  img: File;
}

interface Room {
  id: number;
  room_type: string;
  price_per_night: number;
  img: string;
}

export default function AddRoom() {
  const [roomType, setRoomType] = useState("standard");
  const [preview, setPreview] = useState<File>();
  const [customRoomType, setCustomRoomType] = useState("");
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Retrieve establishment_id from cookies
  const establishmentId = getCookie("establishment_id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RoomProps>();

  const { triggerFetch: fetchRooms, responseData: rooms } = useAxios<
    Room[],
    undefined
  >({
    endpoint: establishmentId ? `/api/hotel/rooms/${establishmentId}` : "",
    config: {},
    method: "GET",
  });

  const { triggerFetch: deleteRoom } = useAxios<ANY, FormData>({
    endpoint: "/api/hotel/delete-room",
    config: {},
    method: "POST",
  });

  const handleThumbnailChange = (file?: File) => {
    setPreview(file);
    if(file){
      setValue("img", file);
    }
  };

  const {
    triggerFetch: addRoom,
    responseData: success,
    finished,
  } = useAxios<ANY, FormData>({
    method: "POST",
    endpoint: "/api/hotel/add-room",
    config: {},
  });

  useEffect(() => {
    if (success) {
      fetchRooms?.()
      toast({
        title: "Room Added",
        description: "Room is added to your hotel successfully.",
        variant: "success",
      });
    }
  }, [success]);

  const router = useRouter();

  useEffect(() => {
    if (finished) {
      setRoomType("standard");
      setCustomRoomType("");
      setPreview(undefined);
      reset();
      fetchRooms?.();
    }
  }, [finished]);

  useEffect(() => {
    if (establishmentId) {
      fetchRooms?.();
    } else {
      toast({
        title: "Error",
        description: "Establishment ID is required to fetch rooms.",
        variant: "destructive",
      });
    }
  }, [establishmentId]);

  const onSubmit: SubmitHandler<RoomProps> = async (data) => {
    const finalRoomType = roomType === "other" ? customRoomType : roomType;
    const formData = new FormData();

    formData.append("room_type", finalRoomType);
    formData.append("price_per_night", data.price_per_night.toString());
    formData.append("img", data.img);

    try {
      addRoom?.(formData);
    } catch (err) {
      console.error("Failed to add room:", err);
    }
  };

  // Function to handle room deletion confirmation
  const handleDeleteRoom = (id: number) => {
    setDeleteRoomId(id);
    setShowDialog(true);
  };

  // Function to confirm deletion
  const confirmDelete = async () => {
    if (deleteRoomId !== null) {
      const formData = new FormData();
      formData.append("room_id", deleteRoomId.toString()); // Ensure the ID is a string

      try {
        if(formData){
          deleteRoom?.(formData); // Call deleteRoom with the FormData
        }

        toast({
          title: "Room Deleted",
          description: `Room has been deleted successfully.`,
          variant: "success",
        });

        // Fetch updated rooms after deletion
        fetchRooms?.();
      } catch (err) {
        console.error("Failed to delete room:", err);
        toast({
          title: "Error",
          description: "Failed to delete the room. Please try again.",
          variant: "destructive",
        });
      } finally {
        setShowDialog(false);
        setDeleteRoomId(null); // Reset the delete ID
      }
    }
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setDeleteRoomId(null); // Reset the delete ID
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <div className="w-full md:w-1/2">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">
            Please add some rooms to your hotel
          </h1>
          <span className="text-muted-foreground">
            You can skip this and add rooms later in your dashboard
          </span>
        </div>
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/dashboard/hotel/${establishmentId}`);
              }}
              size={"sm"}
              variant={"outline"}
            >
              Done
            </Button>
            <Button size={"sm"} type="submit">
              Add Room
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Added Rooms</h2>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <Card key={room.id} className="mb-4 hover:cursor-pointer">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                  <Image
                    alt={`Room id: ${room?.id}`}
                    height={100}
                    width={100}
                    src={process.env.NEXT_PUBLIC_BASE_URL + room?.img}
                    className="rounded-md"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {room.room_type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Price per night: ${room.price_per_night}
                    </p>
                    <Button
                      onClick={() => handleDeleteRoom(room.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete Room
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">No rooms added yet.</p>
          )}
        </ScrollArea>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="text-lg font-bold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this room?</p>
            <div className="mt-4 flex justify-end">
              <Button onClick={cancelDelete} variant="outline" className="mr-2">
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="destructive">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
