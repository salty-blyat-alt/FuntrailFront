import { Button } from '@/app/components/ui/button'; 
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea'; 
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  items-center gap-x-4"
    >
      <Label htmlFor="name" className="font-medium">
        Address
      </Label>

      {isEditingAddress ? (
        <>
          <Textarea
            defaultValue={hotel?.address}
            className="w-36 h-fit"
            id="address"
            {...register("address")}
          />
        </>
      ) : (
        <span>{hotel?.address}</span>
      )}
      {isEditingAddress ? (
        <>
          <Button type="button" variant="ghost" onClick={toggleAddress}>
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
            toggleAddress();
          }}
          size="icon"
        >
          <Pencil1Icon className="text-gray-500" />
        </Button>
      )}
    </form>
  );
};


export default AddressTextBox;
