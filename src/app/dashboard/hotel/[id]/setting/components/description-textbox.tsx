import { Button } from '@/app/components/ui/button';

import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { HotelProps } from '@/app/data/mockupData';
import useAxios from '@/app/hooks/use-axios';
import { Pencil1Icon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface DescriptionTextBoxProps {
  hotel: HotelProps;
  fetchHotel: (() => void) | undefined;
}
const DescriptionTextBox: React.FC<DescriptionTextBoxProps> = ({ hotel, fetchHotel }) => {
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
      fetchHotel?.()
    }
  }, [success, finished]);

  const onSubmit: SubmitHandler<{ description: string }> = (data) => {
    const formData = new FormData();        
    formData.append("description", data.description);
    editHotel?.(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="description" className="text-gray-600">Description</Label>
      {isEditingDescription ? (
        <>
          <Textarea
            id="description"
            className="w-96 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
            defaultValue={hotel?.description}
            {...register("description", { required: true })}
            onChange={(e) => setValue("description", e.target.value)}
          />
          {errors.description && <span className="text-red-500">Description is required</span>}
          <Button
            type="button"
            variant="ghost"
            onClick={toggleDescription}
            className="text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
            Save
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-x-2">
          <span className="text-gray-700 font-medium">{hotel?.description}</span>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              toggleDescription();
            }}
            size="icon">
            <Pencil1Icon className="text-gray-500" />
          </Button>
        </div>
      )}
    </form>
  );
};

export default DescriptionTextBox;
