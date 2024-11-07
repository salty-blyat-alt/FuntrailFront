import React, { Dispatch, useEffect } from "react";
import RedStar from "@/app/components/redstar/redstar";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ANY } from "@/app/components/custom-table/custom-table";
import useAxios from "@/app/hooks/use-axios";
import { format } from "date-fns";

interface OperationalProps {
  isEditingOperationTime: boolean;
  setIsEditingOperationTime: Dispatch<boolean>;
  hotel: ANY;
  fetchHotel: (() => void) | undefined;
}

const Operational: React.FC<OperationalProps> = ({
  isEditingOperationTime,
  setIsEditingOperationTime,
  hotel,
  fetchHotel,
}) => {
  const {
    triggerFetch: editHotel,
    responseData: success,
    finished,
  } = useAxios<any, FormData>({
    endpoint: `/api/hotel/update`,
    config: {},
    method: "POST",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    open_at: string;
    close_at: string;
  }>();
  useEffect(() => {
    if (success && finished) {
      setIsEditingOperationTime(false);
      fetchHotel?.();
    }
  }, [success, finished]);
  const onSubmitOpenAt: SubmitHandler<{ open_at: string }> = (data) => {
    const formData = new FormData();
    formData.append("name", data.open_at);
    editHotel?.(formData);
  };
  const onSubmitCloseAt: SubmitHandler<{ close_at: string }> = (data) => {
    const formData = new FormData();
    formData.append("name", data.close_at);
    editHotel?.(formData);
  };
  function formatTime(timeString: string) {
    // Assuming hotel.open_at is in the "HH:mm" format, e.g., "17:00"
    const date = new Date(`1970-01-01T${timeString}Z`); // Add a dummy date to work with the time only
    return format(date, "hh:mm a"); // Format to 12-hour format with AM/PM
  }
  console.log(isEditingOperationTime);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitOpenAt)}
        className="flex flex-col space-y-4"
      >
        <Label htmlFor="open_at">
          Open at <RedStar />
        </Label>
        {isEditingOperationTime ? (
          <>
            <Input
              id="open_at"
              aria-label="Open At"
              defaultValue={hotel?.open_at}
              type="time"
              {...register("open_at", {
                required: "Opening hour is required",
              })}
            />
            <p className="text-gray-600 text-sm">Format: hh:mm AM/PM e.g</p>
            {errors.open_at && (
              <span className="text-red-500 text-sm">
                {errors.open_at.message}
              </span>
            )}
          </>
        ) : (
          <p>{hotel?.open_at && formatTime(hotel.open_at)}</p>
        )}
      </form>
      {/* Close At */}
      <form
        onSubmit={handleSubmit(onSubmitCloseAt)}
        className="flex flex-col space-y-4"
      >
        <Label htmlFor="close_at">
          Close at <RedStar />
        </Label>
        {isEditingOperationTime ? (
          <>
            <Input
              id="close_at"
              aria-label="Close at"
              type="time"
              defaultValue={hotel?.close_at}
              {...register("close_at", {
                required: "Closing hour is required",
              })}
            />
            <p className="text-gray-600 text-sm">
              Format: hh:mm AM/PM e.g 07:00 PM
            </p>
            {errors.close_at && (
              <span className="text-red-500 text-sm">
                {errors.close_at.message}
              </span>
            )}
          </>
        ) : (
          <p>{hotel?.close_at && formatTime(hotel.close_at)}</p>
        )}

        {/* Action Buttons */}
        {isEditingOperationTime && (
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditingOperationTime(false)}
              className="text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default Operational;
