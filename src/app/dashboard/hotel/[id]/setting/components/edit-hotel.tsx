"use client";
import useAxios from "@/app/hooks/use-axios";
import { useAuth } from "@/app/context/auth-context";
import { useForm } from "react-hook-form";
import NameTextBox from "./name-textbox";
import AddressTextBox from "./address-textbox";
import ProvinceTextBox from "./province-textbox";
import DescriptionTextBox from "./description-textbox";
import Operational from "./operational_time";
import UploadImage from "./upload_hotel_images";
import Facilities from "./facilities";
import HotelPolicy from "./Policies";

const EditHotel = () => {
  const { user } = useAuth();
  const { triggerFetch: fetchHotel, responseData: hotel } = useAxios<any, undefined>({
    endpoint: `/api/hotel/show/${user?.establishment_id}`,
    config: {},
    method: "GET",
  });
  const { register, formState: { errors } } = useForm();
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Side Panel */}
      <div className="w-full lg:w-2/3 space-y-8">
        {/* General Section */}
        <div className="rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">General</h3>
          <p className="text-sm text-gray-500 mb-6">Public information about your hotel</p>
          {/* Hotel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-x-4">
              <NameTextBox hotel={hotel} fetchHotel={fetchHotel} />
            </div>
            <div className="col-span-3">
              <AddressTextBox hotel={hotel} fetchHotel={fetchHotel} />
            </div>
            <div className="col-span-2">
              <ProvinceTextBox hotel={hotel} fetchHotel={fetchHotel} />
            </div>
            <div className="col-span-2">
              <DescriptionTextBox hotel={hotel} fetchHotel={fetchHotel} />
            </div>
          </div>
        </div>
        <Operational hotel={hotel} fetchHotel={fetchHotel} />
      </div>
      <div className="w-full lg:w-1/3 space-y-8">
        <div>
          <UploadImage hotel={hotel} fetchHotel={fetchHotel} />
        </div>
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
