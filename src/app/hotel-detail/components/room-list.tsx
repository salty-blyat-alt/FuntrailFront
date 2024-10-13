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
import { CalendarDateRangePicker } from "@components/ui/date-range-picker";
import { format } from "date-fns";
import { DateRange } from "react-day-picker"; // Make sure to import DateRange

export interface RoomProps {
  hotel_id?: number;
  id?: number ;
  price_per_night?: number;
  room_type?: string;
  status?: string;
  updated_at?: string;
  available_rooms?: string;
}

export default function RoomList({ hotelId }: { hotelId: string }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingCart, setBookingCart] = useState<RoomProps[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const handleApply = () => {
    if (selectedRange && selectedRange.from && selectedRange.to) {
      setDateRange(selectedRange);
      fetchRooms?.();
    } else {
      toast({
        title: "Invalid Date Range",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
    }
  };

  // prep to send to backend with correct format
  const formattedFrom = dateRange?.from
    ? format(dateRange.from, "dd/MM/yyyy")
    : "";
  const formattedTo = dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "";

  // get room
  const { triggerFetch: fetchRooms, responseData: rooms } = useAxios<
    RoomProps[],
    undefined
  >({
    endpoint: `/api/hotel/rooms/${hotelId}`,
    method: "GET",
    config: {
      params: {
        date_start: formattedFrom,
        date_end: formattedTo,
      },
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      fetchRooms?.();
    }
  }, [dateRange]);

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

  const handleDateChange = (newDate: DateRange | undefined) => {
    setSelectedRange(newDate);
  };

  return (
    <>
      <div
        className={`grid ${
          bookingCart.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"
        } gap-4`}
      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Available Rooms</h1>
            <div className="flex items-center gap-x-2">
              <CalendarDateRangePicker
                date={dateRange}
                onDateChange={handleDateChange}
              />

              <Button onClick={handleApply} className="submit-button">
                Apply Date
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
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
                    <TableCell>{room.id}</TableCell>
                    <TableCell>{room.room_type}</TableCell>
                    <TableCell>${room.price_per_night}</TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => addToBookingCart(room)}
                        disabled={
                          // room.status === "busy" ||
                          bookingCart.some((r) => r.id === room.id)
                        }
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
          isBookingModalOpen={isBookingModalOpen}
          setIsBookingModalOpen={setIsBookingModalOpen}
          handleCloseModal={handleCloseModal}
          dateRange={dateRange}
        />
      </div>
    </>
  );
}
