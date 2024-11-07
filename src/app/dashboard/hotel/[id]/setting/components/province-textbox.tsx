import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { HotelProps } from '@/app/data/mockupData';
import { Province } from '@/app/home/components/search-group';
import useAxios from '@/app/hooks/use-axios';
import { Pencil1Icon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HotelSettingProps } from './name-textbox';
 
const ProvinceTextBox: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [isEditingProvince, setIsEditingProvince] = useState(false);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors } } =
    useForm<{ province_id: number; }>();

  const { triggerFetch: editHotel, responseData: success, finished } = useAxios<any, FormData>({
    endpoint: `/api/hotel/update`,
    config: {},
    method: "POST",
  });
  const { triggerFetch: fetchProvinces, responseData: provinces } = useAxios<
    // incoming
    Province[],
    // outgoing
    undefined
  >({
    endpoint: "/api/province/list",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchHotel?.();
    fetchProvinces?.();
  }, []);

  useEffect(() => {
    if (success && finished) {
      setIsEditingProvince(false);
      fetchHotel?.()
    }
  }, [success, finished]);

  const toggleProvince = () => {
    setIsEditingProvince((prev) => !prev);
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    const selectedProvinceData = provinces?.find((p) => p.name === value);
    const id = selectedProvinceData ? selectedProvinceData.id : null;
    setProvinceId(Number(id));
    setValue("province_id", Number(id));
  };

  const onSubmit: SubmitHandler<{ province_id: string }> = (data) => {
    const formData = new FormData();
    formData.append("province_id", data.province_id);
    editHotel?.(formData);
  };
  console.log(provinces);

  return (
    <>
      <Label htmlFor="province" className="text-gray-600">Province</Label>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-x-4">

        <Select
          value={selectedProvince}
          onValueChange={handleProvinceChange} // Update onValueChange
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a province" />
          </SelectTrigger>
          <SelectContent>
            {provinces?.map((p) => (
              <SelectItem key={p.id} value={p.name}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isEditingProvince ? (
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={toggleProvince}
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
            <span className="text-gray-700 font-medium">{hotel?.province_id}</span>
            <Button
              type="button"
              variant="ghost"
              className="rounded-full p-1 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                toggleProvince();
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

export default ProvinceTextBox;
