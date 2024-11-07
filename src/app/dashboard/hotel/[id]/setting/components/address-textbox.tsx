import { Button } from '@/app/components/ui/button'; 
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { HotelProps } from '@/app/data/mockupData';
import useAxios from '@/app/hooks/use-axios';
import { Pencil1Icon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HotelSettingProps } from './name-textbox';
 

const AddressTextBox: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    address: string; 
  }>();

  const toggleAddress = () => {
    setIsEditingAddress((prev) => !prev);
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
      setIsEditingAddress(false);
      fetchHotel?.()
    }
  }, [success, finished]);

  const onSubmit: SubmitHandler<{ address: string }> = (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    editHotel?.(formData);
  };

  return (
    <>
      <Label htmlFor="address" className="text-gray-600 mr-4">Address</Label>
      <form onSubmit={handleSubmit(onSubmit)}>
      {isEditingAddress ? (
        <>
          <Textarea
            id="address"
            className="w-96 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
            defaultValue={hotel?.address}
            {...register("address")}
            onChange={(e) => setValue("address", e.target.value)}
          />
          {errors.address && <span className="text-red-500">Address is required</span>}
          <Button
            type="button"
            variant="ghost"
            onClick={toggleAddress}
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
          <span className="text-gray-700 font-medium">{hotel?.address}</span>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              toggleAddress();
            }}
            size="icon">
            <Pencil1Icon className="text-gray-500" />
          </Button>
        </div>
      )}
    </form>
    </>
  );
};

export default AddressTextBox;
