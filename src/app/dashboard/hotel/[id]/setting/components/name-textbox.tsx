import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { HotelProps } from '@/app/data/mockupData';
import useAxios from '@/app/hooks/use-axios';
import { Pencil1Icon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export interface HotelSettingProps {
  hotel: HotelProps;
  fetchHotel: ((data?: undefined) => void) | undefined;
}

const NameTextBox: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{
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
      fetchHotel?.()
    }
  }, [success, finished]);
  
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    editHotel?.(formData);
  };
  return (
    <>
      <Label htmlFor="name" className="text-gray-600 font-medium">Hotel Name</Label>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-x-2">
        {isEditingName ? (
          <>
            <Input
              id="name"
              className="w-64 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
              defaultValue={hotel?.name}
              {...register("name")}
              onChange={(e) => setValue("name", e.target.value)}
            />
            {/* button save and cancel */}
            <Button
              type="button"
              variant="ghost"
              onClick={toggleName}
              className="text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
              Save
            </Button>
          </>
        ) : (
          //icon edit
          <div className="flex items-center gap-x-2">
            <span className="text-gray-700 font-medium">{hotel?.name}</span>
            <Button
              type="button"
              variant="ghost"
              className="rounded-full p-1 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                toggleName();
              }}
              size="icon">
              <Pencil1Icon className="text-gray-500" />
            </Button>
          </div>
        )}
      </form>
    </>
  )
};

export default NameTextBox 