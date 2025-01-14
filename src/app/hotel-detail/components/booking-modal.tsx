import { AlertDialogHeader } from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { toast } from "@/app/hooks/use-toast";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RoomProps } from "./room-list";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/app/hooks/use-axios";
import {
  redirect,
  usePathname, useSearchParams
} from "next/navigation";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ANY } from "@/app/components/custom-table/custom-table";

export interface BookingModalProps {
  bookingCart?: RoomProps[];
  isBookingModalOpen?: boolean;
  setBookingCart: Dispatch<SetStateAction<RoomProps[]>>;
  setIsBookingModalOpen?: Dispatch<SetStateAction<boolean>>;
  handleCloseModal?: () => void;
  dateRange: DateRange | undefined;
}

export interface BookingDetailProps {
  room_ids: number[];
  hotel_id: string;
  date_start: string;
  date_end: string;
  setBookingCart: Dispatch<SetStateAction<RoomProps[]>>;
}

const BookingModal: React.FC<BookingModalProps> = ({
  bookingCart,
  isBookingModalOpen,
  setIsBookingModalOpen,
  handleCloseModal,
  setBookingCart,
  dateRange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session_id_param = searchParams.get("session_id");

  const { handleSubmit } = useForm<{ room_ids: (number | undefined)[]; hotel_id: string; date_start: string; date_end: string; }>({
    defaultValues: {
      date_start: dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "",
      date_end: dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "",
      hotel_id: bookingCart?.[0]?.hotel_id?.toString() || "",
      room_ids: [],
    },
  });

  const {
    triggerFetch: triggerBook,
    error,
    responseDataWithStat: errorStat,
    responseData: response,
    finished: finishedBook,
  } = useAxios<ANY, { room_ids: (number | undefined)[]; hotel_id: string; date_start: string; date_end: string; }>({
    endpoint: "/api/hotel/book",
    method: "POST",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  useEffect(() => {
    if (response?.startsWith("https://checkout.stripe.com/c/pay/")) { 
      toast({
        title: "Redirecting to payment",
        description: "Please complete your payment to confirm the booking.",
        variant: "default",
      });
      redirect(response);
    }
    // for owner
    if (response === "Rooms booked successfully") {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        variant: "success",
      });
       
    }
    setBookingCart([]);
    setIsLoading(false);
    handleCloseModal?.(); 
    history.replaceState(null, '', pathname);
  }, [response, finishedBook]);

  useEffect(() => {
    if (errorStat && error) {
      toast({
        title: "Failed to book the hotel",
        description:
          errorStat?.result_message + ". code: " + errorStat.result_code,
        variant: "destructive",
      });

      history.replaceState(null, '', pathname);
    }
  }, [errorStat, error]);

  const {
    triggerFetch: triggerSuccess, 
    finished: finishedBooking,
    error: errPayment,
  } = useAxios<ANY, undefined>({
    endpoint: `/api/success/${session_id_param}`,
    method: "GET",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  useEffect(() => {
    if (session_id_param) {
      triggerSuccess?.();
    }
  }, [session_id_param]); 

  useEffect(() => {
    if (errPayment) {
      toast({
        title: "Payment Failed",
        description: "Your payment has been failed.",
        variant: "destructive",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("session_id"); 
    }
  }, [errPayment]);



  useEffect(() => {
    if (response && finishedBooking) {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        variant: "success",
      });
    }
  }, [response, finishedBooking]);

  const onSubmit: SubmitHandler<{ room_ids: (number | undefined)[]; hotel_id: string; date_start: string; date_end: string; }> = async () => {
    setIsLoading(true);

    try {
      const bookingData = {
        room_ids: bookingCart?.map((room) => room.id) || [],
        hotel_id: bookingCart?.[0]?.hotel_id?.toString() || "",
        date_start: dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "",
        date_end: dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "",
      };

      // Validate booking data
      if (
        !bookingData.room_ids.length ||
        !bookingData.hotel_id ||
        !bookingData.date_start ||
        !bookingData.date_end
      ) {
        throw new Error("Please select rooms and dates for your booking");
      }

        triggerBook?.(bookingData);
    } catch (err: ANY) {
      toast({
        title: "Validation Error",
        description: err.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </AlertDialogHeader>

        {/* Booking Summary */}
        <div className="py-4">
          <h3 className="font-medium mb-2">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <p>
              Check-in:{" "}
              {dateRange?.from ? format(dateRange.from, "PP") : "Not selected"}
            </p>
            <p>
              Check-out:{" "}
              {dateRange?.to ? format(dateRange.to, "PP") : "Not selected"}
            </p>
            <p>Rooms: {bookingCart?.length || 0}</p>
          </div>
        </div>

        <DialogFooter className="flex gap-x-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex gap-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
