import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { toast } from "@/app/hooks/use-toast";
import BookingCart from "./booking-cart";
import useAxios from "@/app/hooks/use-axios";
import BookingModal from "./booking-modal";
import { format } from "date-fns";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";

export interface RoomProps {
  img?: string;
  hotel_id?: number;
  id?: number;
  price_per_night?: number;
  room_type?: string;
  status?: string;
  updated_at?: string;
  available_rooms?: string; 
}

export default function RoomList({ hotelId }: { hotelId: string }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [bookingCart, setBookingCart] = useState<RoomProps[]>([]);

  const handleApply = () => {
    if (dateStart && dateEnd) {
      fetchRooms?.();
    } else {
      toast({
        title: "Invalid Date Range",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
    }
  };

  // get room
  const {
    triggerFetch: fetchRooms,
    error,
    responseDataWithStat,
    finished,
    responseData: rooms,
  } = useAxios<RoomProps[], undefined>({
    endpoint: `/api/hotel/rooms/${hotelId}`,
    method: "GET",
    config: {
      params: {
        date_start: dateStart ? format(dateStart, "dd/MM/yyyy") : undefined,
        date_end: dateEnd ? format(dateEnd, "dd/MM/yyyy") : undefined,
      },
    },
  });

  useEffect(() => {
    if (dateStart && dateEnd) {
      fetchRooms?.();
    }
  }, [dateStart, dateEnd]);

  useEffect(() => {
    if (error && finished) {
      toast({
        title: "Fail to get rooms",
        description:
          responseDataWithStat?.result_message +
          ". code: " +
          responseDataWithStat?.result_code,
          variant: 'destructive'
      });
    }
  }, [error, finished]);

  const addToBookingCart = (room: RoomProps) => {
    setBookingCart([...bookingCart, room]);
    toast({
      title: "Room Added",
      description: `Room ${room.room_type} has been added to your booking.`,
    });
  };

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    fetchRooms?.();
  };

  const dateRange = {
    from: dateStart,
    to: dateEnd,
  };
  return (
    <>
      <div
        className={`grid ${
          bookingCart.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"
        } gap-4`}
      >
        <div className="">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Available Rooms</h1>
            <div className="flex items-center gap-x-2">
              <div className="flex gap-x-4">
                {/* check in date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !dateStart && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateStart ? (
                        format(dateStart, "dd/MM/yyyy") // Adjusted format
                      ) : (
                        <span>Check in</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateStart}
                      onSelect={setDateStart}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* checkout date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !dateEnd && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateEnd ? (
                        format(dateEnd, "dd/MM/yyyy") // Adjusted format
                      ) : (
                        <span>Check out date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateEnd}
                      onSelect={setDateEnd}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button onClick={handleApply} className="submit-button">
                Apply Date
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* list out the rooms */}
            <TableBody>
              {Array.isArray(rooms) && rooms?.length > 0 ? (
                rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Image
                            alt={room.room_type || "room"}
                            src={
                              room.img
                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${room.img}`
                                : "https://placehold.co/600x400"
                            }
                            width={50}
                            height={50}
                            style={{ cursor: "pointer" }}
                          />
                        </DialogTrigger>
                        <DialogContent className="p-4">
                          <DialogClose className="absolute right-2 top-2" />
                          <Image
                            alt={room.room_type || "room"}
                            src={
                              room.img
                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${room.img}`
                                : "https://placehold.co/600x400"
                            }
                            width={500} // Larger image size for preview
                            height={500}
                            className="rounded-md"
                          />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{room.room_type}</TableCell>
                    <TableCell>${room.price_per_night}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => addToBookingCart(room)}
                        disabled={bookingCart.some((r) => r.id === room.id)}
                      >
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No rooms available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {bookingCart.length > 0 && (
          <BookingCart
            handleOpenBookingModal={handleOpenBookingModal}
            bookingCart={bookingCart}
            setBookingCart={setBookingCart}
          />
        )}
        <BookingModal
          bookingCart={bookingCart}
          setBookingCart={setBookingCart}
          isBookingModalOpen={isBookingModalOpen}
          setIsBookingModalOpen={setIsBookingModalOpen}
          handleCloseModal={handleCloseModal}
          dateRange={dateRange}
        />
      </div>
    </>
  );
}
