import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { HotelProps } from "@/app/data/mockupData";
import useAxios from "@/app/hooks/use-axios";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface HotelSettingProps {
  hotel: HotelProps;
  fetchHotel: ((data?: undefined) => void) | undefined;
}

const NameTextBox: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const { register, handleSubmit } = useForm<{
    name: string;
  }>();

  const toggleName = () => {
    setIsEditingName((prev) => !prev);
  };
  const {
    triggerFetch: editHotel,
    responseData: success,
    finished,
  } = useAxios<any, FormData>({
    endpoint: `/api/hotel/update`,
    config: {},
    method: "POST",
  });

  useEffect(() => {
    fetchHotel?.();
  }, []);

  useEffect(() => {
    if (success && finished) {
      setIsEditingName(false);
      fetchHotel?.();
    }
  }, [success, finished]);

  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    editHotel?.(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  items-center gap-x-4"
    >
      <Label htmlFor="name" className="font-medium">
        Hotel Name
      </Label>

      {isEditingName ? (
        <>
          <Input
            defaultValue={hotel?.name}
            className="w-36 h-fit"
            id="name"
            {...register("name")}
          />
        </>
      ) : (
        <span>{hotel?.name}</span>
      )}
      {isEditingName ? (
        <>
          <Button type="button" variant="ghost" onClick={toggleName}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            toggleName();
          }}
          size="icon"
        >
          <Pencil1Icon className="text-gray-500" />
        </Button>
      )}
    </form>
  );
};

export default NameTextBox;
