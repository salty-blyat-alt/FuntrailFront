import React from "react";
import { Button } from "../ui/button";
import { HeartIcon, MapPinIcon, ShareIcon } from "lucide-react";
import ImageSelect from "@/app/hotel-detail/components/image-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Result } from "postcss";

const RestaurantDetailPreview = ({ restaurant }) => {
  const { images } = restaurant;
  console.log(restaurant);
  return (
    <>
      <div className="flex justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
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
        <MapPinIcon className="inline-block mr-1 h-4 w-4" /> {restaurant?.address}
      </p>

      <div className="mb-4">
        <ImageSelect images={images} />
      </div>

     
    </>
  );
};

export default RestauraDetailPreview;
