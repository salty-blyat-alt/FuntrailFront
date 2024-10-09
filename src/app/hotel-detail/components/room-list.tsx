import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { toast } from "@/app/hooks/use-toast";
import BookingCart from "./booking-cart";
import BookingModal from "./booking-modal";

export interface RoomProps {
  id: number;
  room_type: string;
  price_per_night: number;
  isAvailable: boolean;
}

const initialRooms: RoomProps[] = [
  {
    id: 1,
    room_type: "Single",
    price_per_night: 100,
    isAvailable: true,
  },
  {
    id: 2,
    room_type: "Double",
    price_per_night: 150,
    isAvailable: true,
  },
  {
    id: 3,
    room_type: "Suite",
    price_per_night: 300,
    isAvailable: true,
  },
  {
    id: 4,
    room_type: "Single",
    price_per_night: 100,
    isAvailable: true,
  },
  {
    id: 5,
    room_type: "Double",
    price_per_night: 150,
    isAvailable: true,
  },
];

export default function MultiRoomBooking() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomProps[]>(initialRooms);
  const [bookingCart, setBookingCart] = useState<RoomProps[]>([]);
  // for sending to backend
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const addToBookingCart = (room: RoomProps) => {
    setBookingCart([...bookingCart, room]);
    toast({
      title: "Room Added",
      description: `Room ${room.room_type} has been added to your booking.`,
    });
  };

  const handleBookNow = () => {
    if (bookingCart.length > 0) {
      setIsBookingModalOpen(true);
    } else {
      toast({
        title: "No Rooms Selected",
        description: "Please select at least one room to book.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Available Rooms</h1>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* list out the rooms */}
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.room_type}</TableCell>
                <TableCell>${room.price_per_night}</TableCell>
                <TableCell>
                  <Badge variant={room.isAvailable ? "success" : "destructive"}>
                    {room.isAvailable ? "Available" : "Occupied"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => addToBookingCart(room)}
                    disabled={
                      !room.isAvailable ||
                      bookingCart.some((r) => r.id === room.id)
                    }
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <BookingCart
          handleBookNow={handleBookNow}
          bookingCart={bookingCart}
          setBookingCart={setBookingCart}
        />
        <BookingModal
          bookingDetails={bookingDetails}
          bookingCart={bookingCart}
          isBookingModalOpen={isBookingModalOpen}
          setIsBookingModalOpen={setIsBookingModalOpen}
          setBookingDetails={setBookingDetails}
          setRooms={setRooms}
          setBookingCart={setBookingCart}
          rooms={rooms}
        />
      </div>
    </>
  );
}
