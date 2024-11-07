import { Button } from "@/app/components/ui/button";

import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { HotelProps } from "@/app/data/mockupData";
import useAxios from "@/app/hooks/use-axios";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HotelSettingProps } from "./name-textbox";

 
const DescriptionTextBox: React.FC<HotelSettingProps> = ({
  hotel,
  fetchHotel,
}) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    description: string; // Updated to match the field
  }>();

  const toggleDescription = () => {
    setIsEditingDescription((prev) => !prev);
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
      setIsEditingDescription(false);
      fetchHotel?.();
    }
  }, [success, finished]);

  const onSubmit: SubmitHandler<{ description: string }> = (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    editHotel?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  items-center gap-x-4"
    >
      <Label htmlFor="name" className="font-medium">
        Description
      </Label>

      {isEditingDescription ? (
        <>
          <Textarea
            defaultValue={hotel?.description}
            className="w-36 h-fit"
            id="description"
            {...register("description")}
          />
        </>
      ) : (
        <span>{hotel?.description}</span>
      )}
      {isEditingDescription ? (
        <>
          <Button type="button" variant="ghost" onClick={toggleDescription}>
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
            toggleDescription();
          }}
          size="icon"
        >
          <Pencil1Icon className="text-gray-500" />
        </Button>
      )}
    </form>
  );
};

export default DescriptionTextBox;
