import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";  
import { RoomProps } from "./room-list";
import { toast } from "@/app/hooks/use-toast";

export interface BookingCartProps {
  bookingCart: RoomProps[];
  handleOpenBookingModal: () => void;
  setBookingCart: React.Dispatch<React.SetStateAction<RoomProps[]>>;
}

const BookingCart: React.FC<BookingCartProps> = ({
  bookingCart,
  handleOpenBookingModal,
  setBookingCart,
}) => {


  const removeFromBookingCart = (roomId: number|undefined) => {
    if(!roomId){
      toast({
        title: "Invalid room type",
        description: "Please reselect the room.",
        variant: "destructive",
      });
    }
    setBookingCart(bookingCart.filter((room) => room.id !== roomId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {bookingCart.map((room) => (
            <div
              key={room.id}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex flex-col">
                <span className="text-base">{room.room_type}</span>
                <br />
                <span className="text-xs text-muted-foreground">
                  $ {room.price_per_night}
                </span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeFromBookingCart(room.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </ScrollArea>
        {bookingCart.length > 0 && (
          <div className="mt-4">
            <div className="font-bold">
              Total: $
              {bookingCart.reduce((sum, room) => sum + (room?.price_per_night||0), 0)}
            </div>
            <Button className="w-full mt-2" onClick={handleOpenBookingModal}>
              Proceed to Book
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCart;
