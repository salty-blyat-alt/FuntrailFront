import React from "react";
import { Button } from "../ui/button";
import { HeartIcon, MapPinIcon, ShareIcon } from "lucide-react";
import ImageSelect from "@/app/hotel-detail/components/image-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const RestaurantDetailPreview = ({ restaurant }) => {
  const { images } = restaurant;
  console.log(restaurant);
  return (
    <>
      <div className="flex justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">{hotel?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <HeartIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ShareIcon className="h-4 w-4" />
          </Button>
          <Button>Reserve</Button>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        <MapPinIcon className="inline-block mr-1 h-4 w-4" /> {hotel?.address}
      </p>

      <div className="mb-4">
        <ImageSelect images={images} />
      </div>

      <Tabs defaultValue="overview" className="mb-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview" className="mb-2 mr-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="info" className="mb-2 mr-2">
            Info & prices
          </TabsTrigger>
          <TabsTrigger value="facilities" className="mb-2 mr-2">
            Facilities
          </TabsTrigger>
          <TabsTrigger value="policies" className="mb-2 mr-2">
            Policies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>{hotel.description}</p>
        </TabsContent>

        {/* Info & Prices Tab */}
        <TabsContent value="info">
          <p>
            <strong>Hotel Name:</strong> {hotel.name}
          </p>
          <p>
            <strong>Address:</strong> {hotel.address}
          </p>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities">
          <ul>
            {hotel.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies">
          <ul>
            {hotel.policies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default HotelDetailPreview;
