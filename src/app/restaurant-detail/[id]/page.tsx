"use client";

import { usePathname } from "next/navigation";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import ImageSelect from "@/app/hotel-detail/components/image-select";
import HotelComment from "@/app/hotel-detail/components/hotel-comment";
import { HeartIcon, Share1Icon } from "@radix-ui/react-icons";
import { MapPinIcon, ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

// Sample restaurant data
const restaurant = {
  id: 2,
  name: "Rose Hotel",
  address:
    "Street Preah Somramrth (River Road), Psar Veng village, Sangkat Kratie, Kratie Town, Kratie Province, Kratie, Cambodia",
  phone_number: "012345343",
  open_at: "07:00",
  close_at: "22:00",
};

const image = [
  "https://via.placeholder.com/400",
  "https://via.placeholder.com/500",
  "https://via.placeholder.com/600",
  "https://via.placeholder.com/700",
  "https://via.placeholder.com/900",
];

// Unified food menu with thumbnails
const foodMenu = [
  {
    name: "Spring Rolls",
    price: "$5.00",
    thumbnail: "https://via.placeholder.com/50",
  },
  {
    name: "Chicken Satay",
    price: "$6.00",
    thumbnail: "https://via.placeholder.com/50",
  },
  {
    name: "Garlic Bread",
    price: "$3.50",
    thumbnail: "https://via.placeholder.com/50",
  },
  {
    name: "Bruschetta",
    price: "$4.50",
    thumbnail: "https://via.placeholder.com/50",
  },
  {
    name: "Chocolate Cake",
    price: "$6.00",
    thumbnail: "https://via.placeholder.com/50",
  },
  {
    name: "Ice Cream",
    price: "$4.00",
    thumbnail: "https://via.placeholder.com/50",
  },
];

export default function RestaurantDetail() {
  const pathname = usePathname();

  // State to track quantity for each item (default is 1 for each)
  const [quantities, setQuantities] = useState(
    foodMenu.map(() => 1) // Set initial quantity for each item
  );

  // Function to handle quantity increment
  const handleIncrement = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index ? quantity + 1 : quantity
      )
    );
  };

  // Function to handle quantity decrement
  const handleDecrement = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity > 1 ? quantity - 1 : quantity
      )
    );
  };

  const handleCheckout = () => {
    alert("Proceeding to Checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-sm breadcrumbs">
        <CustomBreadcrumb pathname={pathname} />

        <div className="flex justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <HeartIcon className="h-4 w-4 " />
            </Button>
            <Button variant="outline" size="icon">
              <Share1Icon className="h-4 w-4 " />
            </Button>
            <Button>Reserve</Button>
          </div>
        </div>

        <p className="mb-4 text-sm ">
          <MapPinIcon className="inline-block mr-1 h-4 w-4 " />
          {restaurant.address}
        </p>

        {/* Image Carousel */}
        <div className="mb-8">
          <ImageSelect images={image} />
        </div>

        {/* Food Menu Section and Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Food Menu */}
          <div className="md:col-span-1 lg:col-span-1">
            {" "}
            {/* Keep it responsive */}
            <h2 className="text-lg font-bold mb-4">Food Menu</h2>
            {/* Unified Food Menu */}
            <div className="mb-6">
              <ScrollArea className="h-72 w-full">
                <ul className="space-y-4">
                  {foodMenu.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <span className="ml-2 text-sm">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDecrement(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm">{quantities[index]}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleIncrement(index)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="ml-2 text-sm">{item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <Button className="" onClick={handleCheckout}>
              <ShoppingCart className="mr-2" /> Checkout
            </Button>
          </div>

          {/* Flex Container for Cards */}
          <div className="flex flex-col gap-3 md:col-span-1 lg:col-span-2">
            {" "}
            {/* Adjusted for responsiveness */}
            {/* Overview Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <ScrollArea className="h-48">
                <CardDescription className="w-full text-balance leading-relaxed p-4">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.Introducing Our Dynamic
                  Orders Dashboard for Seamless Management and Insightful
                  Analysis.Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.Introducing Our Dynamic
                  Orders Dashboard for Seamless Management and Insightful
                  Analysis.Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.Introducing Our Dynamic
                  Orders Dashboard for Seamless Management and Insightful
                  Analysis.Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.Introducing Our Dynamic
                  Orders Dashboard for Seamless Management and Insightful
                  Analysis.Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.Introducing Our Dynamic
                  Orders Dashboard for Seamless Management and Insightful
                  Analysis.Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </ScrollArea>
              <CardFooter></CardFooter>
            </Card>
            {/* Phone Number Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Phone Number</CardTitle>
              </CardHeader>
              <CardDescription className="leading-relaxed p-4">
                Contact us at:{" "}
                <span className="font-bold">{restaurant.phone_number}</span>
              </CardDescription>
              <CardFooter></CardFooter>
            </Card>
            {/* Operating Hours Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardDescription className="leading-relaxed p-4">
                Open from{" "}
                <span className="font-bold">{restaurant.open_at}</span> to{" "}
                <span className="font-bold">{restaurant.close_at}</span>
              </CardDescription>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>

        <HotelComment />
      </div>
    </div>
  );
}
