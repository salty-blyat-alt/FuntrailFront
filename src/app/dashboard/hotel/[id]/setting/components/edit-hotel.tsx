"use client";
import useAxios from "@/app/hooks/use-axios";
import { useAuth } from "@/app/context/auth-context";
import NameTextBox from "./name-textbox";
import AddressTextBox from "./address-textbox";
import ProvinceTextBox from "./province-textbox";
import DescriptionTextBox from "./description-textbox";
import Operational from "./operational_time";
import UploadImage from "./upload_hotel_images";
import Facilities from "./facilities";
import HotelPolicy from "./policies";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import ChangeHotelThumbnail from "./change-hotel-thumbnail";

const EditHotel = () => {
  const [isEditingOperationTime, setIsEditingOperationTime] =
    useState<boolean>(false);
  const { user } = useAuth();
  const { triggerFetch: fetchHotel, responseData: hotel } = useAxios<
    any,
    undefined
  >({
    endpoint: `/api/hotel/show/${user?.establishment_id}`,
    config: {},
    method: "GET",
  });

  const toggleOperationalTime = () => {
    setIsEditingOperationTime((prev) => !prev);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Side Panel */}
      <div className="w-full lg:w-2/3 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Public information about your hotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <ChangeHotelThumbnail hotel={hotel} fetchHotel={fetchHotel} />
              <div>
                <NameTextBox hotel={hotel} fetchHotel={fetchHotel} />
                <AddressTextBox hotel={hotel} fetchHotel={fetchHotel} />

                <ProvinceTextBox hotel={hotel} fetchHotel={fetchHotel} />

                <DescriptionTextBox hotel={hotel} fetchHotel={fetchHotel} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          {/* not working */}
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Operational Times</CardTitle>
              <Button
                type="button"
                variant="ghost"
                onClick={toggleOperationalTime}
              >
                <Pencil1Icon className="text-gray-500" />
              </Button>
            </div>
            <CardDescription>
              When is your hotel available for bookings?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Operational
              isEditingOperationTime={isEditingOperationTime}
              setIsEditingOperationTime={setIsEditingOperationTime}
              hotel={hotel}
              fetchHotel={fetchHotel}
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3 space-y-8"> 
        <div>
          <Facilities hotel={hotel} fetchHotel={fetchHotel} />
        </div>
        <div>
          <HotelPolicy hotel={hotel} fetchHotel={fetchHotel} />
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
