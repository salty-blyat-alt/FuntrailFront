import { AlertDialogHeader } from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { toast } from "@/app/hooks/use-toast";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { RoomProps } from "./room-list";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/app/hooks/use-axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
export interface BookingModalProps {
  bookingCart?: RoomProps[];
  isBookingModalOpen?: boolean;
  setBookingCart?: Dispatch<SetStateAction<boolean>>;
  setIsBookingModalOpen?: Dispatch<SetStateAction<boolean>>;
  handleCloseModal?: () => void;
  dateRange: DateRange | undefined;
}
export interface BookingDetailProps {
  room_ids: number[];
  hotel_id: string;
  date_start: string;
  date_end: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  bookingCart,
  isBookingModalOpen,
  setIsBookingModalOpen,
  handleCloseModal,
  dateRange,
}) => {
  const { handleSubmit } = useForm<BookingDetailProps>({
    defaultValues: {
      date_start: dateRange?.from
        ? dayjs(dateRange.from).format("DD/MM/YYYY")
        : "",
      date_end: dateRange?.to ? dayjs(dateRange.to).format("DD/MM/YYYY") : "",
      hotel_id: bookingCart?.[0]?.hotel_id?.toString() || "",
      room_ids: [],
    },
  });
  console.log(bookingCart?.[0]?.hotel_id);
  const {
    triggerFetch: triggerBook,
    error,
    responseDataWithStat: response,
  } = useAxios<any, any>({
    endpoint: "/api/hotel/book",
    method: "POST",
    config: {},
  });
  const router = useRouter();

  useEffect(() => {
    if (response?.result === true) {
      toast({
        title: "Booking Successful",
        description: `You have successfully booked ${bookingCart?.length} room(s).`,
        variant: "success",
      });

      const paymentUrl = response.body?.session?.payment_url;
      if (paymentUrl) {
        router.push(paymentUrl);
      }
    } else if (error) {
      toast({
        title: "Booking Failed",
        description: "An unknown error occurred.",
        variant: "destructive",
      });
    }
    handleCloseModal?.();
  }, [response, error]);

  const formattedFrom = dateRange?.from
    ? format(dateRange.from, "dd/MM/yyyy")
    : "";

  const formattedTo = dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "";

  const onSubmit: SubmitHandler<BookingDetailProps> = async () => {
    const formData = new FormData();
    bookingCart?.forEach((item) => {
      if (item?.id) {
        formData.append("room_ids[]", item.id.toString());
      }
    });

    const hotelId = bookingCart?.[0]?.hotel_id?.toString() || "";
    formData.append("hotel_id", hotelId);

    formData.append("date_start", formattedFrom || "");
    formData.append("date_end", formattedTo || "");

    triggerBook?.(formData);
  };

  return (
    <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </AlertDialogHeader>
        <DialogFooter className="flex gap-x-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit">Pay via Stripe</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
