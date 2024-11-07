import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Province } from "@/app/home/components/search-group";
import useAxios from "@/app/hooks/use-axios";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HotelSettingProps } from "./name-textbox";

const ProvinceTextBox: React.FC<HotelSettingProps> = ({
  hotel,
  fetchHotel,
}) => {
  const [isEditingProvince, setIsEditingProvince] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [provinceId, setProvinceId] = useState<number | null>(null);

  const { register, setValue, handleSubmit, reset } = useForm<{
    province_id: string;
  }>();

  const {
    triggerFetch: editHotel,
    responseData: success,
    finished,
  } = useAxios<any, FormData>({
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
  const toggleOperationalTime = () => {
    setIsEditingOperationTime((prev) => !prev);
  };

  useEffect(() => {
    fetchHotel?.();
    fetchProvinces?.();
  }, []);

  useEffect(() => {
    if (success && finished) {
      setIsEditingProvince(false);
      fetchHotel?.();
      reset();
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

  const onSubmit: SubmitHandler<{ province_id: string | number }> = (data) => {
    const formData = new FormData();
    formData.append("province_id", data.province_id.toString());
    editHotel?.(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  items-center gap-x-4"
    >
      <Label htmlFor="name" className="font-medium">
        Province
      </Label>

      {isEditingProvince ? (
        <>
          <Select
            value={selectedProvince} 
            onValueChange={handleProvinceChange}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={hotel?.province ?? "Select a province"}
              />
            </SelectTrigger>
            <SelectContent>
              {provinces?.map((p) => (
                <SelectItem key={p.id} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="hidden"
            {...register("province_id", {
              required: "Province is required",
            })}
          />
        </>
      ) : (
        <span>{hotel?.province}</span>
      )}
      {isEditingProvince ? (
        <>
          <Button type="button" variant="ghost" onClick={toggleProvince}>
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
            toggleProvince();
          }}
          size="icon"
        >
          <Pencil1Icon className="text-gray-500" />
        </Button>
      )}
    </form>
  );
};

export default ProvinceTextBox;
