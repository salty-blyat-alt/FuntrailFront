import { AlertDialogHeader } from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { toast } from "@/app/hooks/use-toast";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { RoomProps } from "./room-list";

export interface BookingModalProps {
  bookingCart: RoomProps[];
  isBookingModalOpen: boolean;
  setBookingCart: React.Dispatch<React.SetStateAction<RoomProps[]>>;
  setRooms: React.Dispatch<React.SetStateAction<RoomProps[]>>;
  setIsBookingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line
  setBookingDetails: React.Dispatch<React.SetStateAction<any>>;
  // eslint-disable-next-line
  bookingDetails: any;
  rooms: RoomProps[];
}

const BookingModal: React.FC<BookingModalProps> = ({
  bookingCart,
  isBookingModalOpen,
  setBookingCart,
  setRooms,
  setIsBookingModalOpen,
  setBookingDetails,
  bookingDetails,
  rooms,
}) => {
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", {
      rooms: bookingCart,
      ...bookingDetails,
    });

    // Update room availability
    setRooms(
      rooms.map((room) =>
        bookingCart.some((bookedRoom) => bookedRoom.id === room.id)
          ? { ...room, isAvailable: false }
          : room
      )
    );

    // Close modal and reset form
    setIsBookingModalOpen(false);
    setBookingCart([]);
    setBookingDetails({ name: "", email: "", checkIn: "", checkOut: "" });
    console.log("bookingcart", bookingCart);
    // Show success message
    toast({
      title: "Booking Successful",
      description: `You have successfully booked ${bookingCart.length} room(s).`,
    });
  };

  return (
    <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleBookingSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={bookingDetails.name}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    name: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={bookingDetails.email}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    email: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="checkIn" className="text-right">
                Check-in
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={bookingDetails.checkIn}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    checkIn: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="checkOut" className="text-right">
                Check-out
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={bookingDetails.checkOut}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    checkOut: e.target.value,
                  })
                }
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
