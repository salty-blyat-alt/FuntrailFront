"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { facilities, policies } from "@/app/constant/constant";
import { HotelProps, mockHotel } from "@/app/data/mockupData";
import { Button } from "@components/ui/button";
import PageContainer from "@/app/dashboard/components/page-container";
import useAxios from "@/app/hooks/use-axios";
import { useAuth } from "@/app/context/auth-context";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import NameTextBox from "./name-textbox";
import AddressTextBox from "./address-textbox";
import ProvinceTextBox from "./province-textbox";
import DescriptionTextBox from "./description-textbox";
import RedStar from "@/app/components/redstar/redstar";
import Operational from "./operational_time";
import UploadImage from "./upload_hotel_images";
import Facilities from "./facilities";

const ITEMS_LIMIT = 4;


const EditHotel = () => {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [showAllPolicies, setShowAllPolicies] = useState(false); 
  const { user } = useAuth();
  const { triggerFetch: fetchHotel, responseData: hotel } = useAxios<any, undefined>({
    endpoint: `/api/hotel/show/${user?.establishment_id}`,
    config: {},
    method: "GET",
  });


  const { register,formState: {errors}} = useForm ();
  
 
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

        {/* Operational Times */}
          <Operational hotel={hotel} fetchHotel={fetchHotel}/>
      </div>

      {/* Right Side Panel */}
      <div className="w-full lg:w-1/3 space-y-8">
        {/* Image Upload Section */}
        <div>
          <UploadImage hotel={hotel} fetchHotel={fetchHotel}/>
        </div>

        {/* Additional Facilities Section */}
        <div>
          <Facilities hotel={hotel} fetchHotel={fetchHotel}/>
        </div>

        {/* Additional Policies Section */}
        <div className="rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Hotel Policies</h3>
          <p className="text-sm text-gray-500 mb-6">What policies do you have in place?</p>
          <div>
            {showAllPolicies
              ? policies.map((policy, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="text-gray-700">{policy}</span>
                  </div>
                ))
              : policies.slice(0, ITEMS_LIMIT).map((policy, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="text-gray-700">{policy}</span>
                  </div>
                ))}
            <Button
              type="button"
              onClick={() => setShowAllPolicies((prev) => !prev)}
              className="mt-4">
              {showAllPolicies ? "Show Less" : "Show All"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
