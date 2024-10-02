"use client";
import { toast } from "@/app/hooks/use-toast";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageListPreview from "../components/image-field/image-list-preview";
import UploadImages from "../components/image-field/upload-images";
import UploadThumbnail from "../components/image-field/upload-thumbnail";
import RedStar from "../components/redstar/redstar";
import { ComboBox, ItemProps } from "../components/ui/combo-box";
import { Textarea } from "../components/ui/textarea";

export interface HotelProps {
  name: string;
  address?: string;
  province_id: string;
  description?: string;
  thumbnail: File | null;
  images: File[];
  open_at: string;
  close_at: string;
}

const RegisterHotel = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<HotelProps>();

  const [hotel, setHotel] = useState<HotelProps>({
    name: "",
    address: "",
    province_id: "",
    description: "",
    thumbnail: null,
    images: [],
    open_at: "",
    close_at: "",
  });

  const onSubmit: SubmitHandler<HotelProps> = async (data) => {
    // Trim whitespace from string fields
    const trimmedData = {
      ...data,
      name: data.name.trim(),
      address: data.address?.trim(),
      province_id: data.province_id.trim(),
      description: data.description?.trim(),
      open_at: data.open_at.trim(),
      close_at: data.close_at.trim(),
    };

    const formData = new FormData();
    formData.append("name", trimmedData.name);
    formData.append("address", trimmedData.address || "");
    formData.append("province_id", trimmedData.province_id);
    formData.append("description", trimmedData.description || "");
    formData.append("open_at", trimmedData.open_at);
    formData.append("close_at", trimmedData.close_at);

    // Append thumbnail
    if (trimmedData.thumbnail) {
      formData.append("thumbnail", trimmedData.thumbnail);
    }

    // Append additional images if they exist
    if (trimmedData.images) {
      trimmedData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    console.log("Submitting the form with the following data:", formData);

    toast({
      title: "Hotel Registered",
      description: "Your hotel has been successfully registered.",
    });

    // Reset the form values
    reset();
    setHotel({
      name: "",
      address: "",
      province_id: "",
      description: "",
      thumbnail: null,
      images: [],
      open_at: "",
      close_at: "",
    });
  };

  const handleThumbnailChange = (file: File | null) => {
    setHotel((prev) => ({ ...prev, thumbnail: file }));
    setValue("thumbnail", file);
  };

  const handleDeleteImage = (index: number) => {
    setHotel((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setValue(
      "images",
      hotel.images.filter((_, i) => i !== index)
    );
  };

  const items: ItemProps[] = [
    {
      label: "Phnom Penh",
      value: "1",
    },
    {
      label: "Kandal",
      value: "2",
    },
    {
      label: "Siem Reap",
      value: "3",
    },
    {
      label: "Battambang",
      value: "4",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Register Your Hotel</CardTitle>
            <CardDescription>
              Enter the details of your hotel to register it on our platform.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div>
                <Label htmlFor="name">
                  Hotel Name <RedStar />
                </Label>
                <Input
                  className="w-full"
                  id="name"
                  placeholder="Please enter name"
                  {...register("name", { required: "Hotel name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 pt-0 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  className="w-full"
                  id="address"
                  placeholder="Please enter address"
                  {...register("address")}
                />
                {errors.address && (
                  <span className="text-red-500 pt-0 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>

              {/* Province */}
              <div>
                <Label htmlFor="province_id">
                  Province <RedStar />
                </Label>

                <ComboBox
                  items={items}
                  title="Please select a province"
                  value={hotel.province_id}
                  setValue={(value: string) => {
                    setHotel((prev) => ({ ...prev, province_id: value }));
                    setValue("province_id", value, { shouldValidate: true });
                  }}
                  {...register("province_id", {
                    required: "Province is required",
                  })}
                />

                {errors.province_id && (
                  <span className="text-red-500 pt-0 text-sm">
                    {errors.province_id.message || "Province is required"}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="w-full"
                  id="description"
                  placeholder="Please enter description"
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-red-500 pt-0 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
              {/* Thumbnail Upload */}
              <div className="flex flex-col space-y-1.5">
                <UploadThumbnail
                  isRequired
                  title="Please upload hotel profile"
                  thumbnail={hotel.thumbnail}
                  setThumbnail={handleThumbnailChange}
                  {...register("thumbnail", {
                    required: "Hotel profile is required",
                  })}
                />
                {errors.thumbnail && (
                  <span className="text-red-500 pt-0 text-sm">
                    {errors.thumbnail.message}
                  </span>
                )}
              </div>

              {/* Additional Images */}
              <div className="flex flex-col space-y-1.5">
                <UploadImages
                  hotel={hotel}
                  setHotel={setHotel}
                  setValue={setValue}
                />
                <ImageListPreview
                  images={hotel.images}
                  handleDeleteImage={handleDeleteImage}
                />
              </div>

              {/* Time Selection */}
              <div className="flex space-x-4">
                {/* Open At */}
                <div className="flex-1">
                  <Label htmlFor="open_at">
                    Open At <RedStar />
                  </Label>
                  <Input
                    id="open_at"
                    aria-label="Open At"
                    type="time"
                    {...register("open_at", {
                      required: "Open At is required",
                    })}
                  />
                  <p className="text-gray-600 text-sm">
                    Format: hh:mm AM/PM e.g 07:00 AM
                  </p>
                  {errors.open_at && (
                    <span className="text-red-500 text-sm">
                      {errors.open_at.message}
                    </span>
                  )}
                </div>
                {/* Close At */}
                <div className="flex-1">
                  <Label htmlFor="close_at">
                    Close At <RedStar />
                  </Label>
                  <Input
                    id="close_at"
                    aria-label="Close At"
                    type="time"
                    {...register("close_at", {
                      required: "Close At is required",
                    })}
                  />
                  <p className="text-gray-600 text-sm">
                    Format: hh:mm AM/PM e.g 05:00 PM
                  </p>
                  {errors.close_at && (
                    <span className="text-red-500 text-sm">
                      {errors.close_at.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => reset()}>
              Cancel
            </Button>
            <div className="space-x-4">
              <Button variant="secondary" type="button" onClick={() => reset()}>
                Preview
              </Button>
              <Button type="submit">Register Hotel</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RegisterHotel;
