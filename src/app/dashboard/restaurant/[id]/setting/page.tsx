'use client'

import DashboardLayout from "@/app/dashboard/dashboard-layout";
import PageContainer from "@/app/dashboard/components/page-container";
import { Button } from "@/app/components/ui/button";
import { HeartIcon, MapPinIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import ImageSelect from "@/app/hotel-detail/components/image-select";
import { ScrollArea } from "@/app/components/ui/scroll-area"; // Import ScrollArea component
import Image from "next/image"; // Import next/image for thumbnails
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card"; // Import Card components
import { Share1Icon } from "@radix-ui/react-icons";
import { restaurantNavItem } from "@/app/dashboard/routes/routes";

const RestaurantSetting = ( ) => { 
 
  const  restaurant=  {
    id: 2,
    name: "Rose Hotel",
    address:
      "Street Preah Somramrth (River Road), Psar Veng village, Sangkat Kratie, Kratie Town, Kratie Province, Kratie, Cambodia",
    phone_number: "012345343",
    open_at: "07:00", 
    close_at: "22:00",
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/600",
      "https://via.placeholder.com/700",
      "https://via.placeholder.com/900",
    ]
  };

  // Food menu and quantities (example data)
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

  return (
    <DashboardLayout navItems={restaurantNavItem}>
      <PageContainer scrollable={true}>
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
          <ImageSelect images={restaurant.images} />
        </div>

        {/* Food Menu Section and Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Food Menu */}
          <div className="md:col-span-1 lg:col-span-1"> {/* Keep it responsive */}
            <h2 className="text-lg font-bold mb-4">Food Menu</h2>

            {/* Unified Food Menu */}
            <div className="mb-6">
              <ScrollArea className="h-72 w-full">
                <ul className="space-y-4">
                  {foodMenu.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
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
                        // onClick={() => handleDecrement(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm">1</span>
                        <Button
                          variant="outline"
                          size="icon"

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

            <Button className=""  >
              <ShoppingCart className="mr-2" /> Checkout
            </Button>
          </div>

          {/* Flex Container for Cards */}
          <div className="flex flex-col gap-3 md:col-span-1 lg:col-span-2"> {/* Adjusted for responsiveness */}
            {/* Overview Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <ScrollArea className="h-48">
                <CardDescription className="w-full text-balance leading-relaxed p-4">
                  Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
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
                Contact us at: <span className="font-bold">{restaurant.phone_number}</span>
              </CardDescription>
              <CardFooter></CardFooter>
            </Card>

            {/* Operating Hours Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardDescription className="leading-relaxed p-4">
                Open from <span className="font-bold">{restaurant.open_at}</span> to <span className="font-bold">{restaurant.close_at}</span>
              </CardDescription>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>

      </PageContainer>
    </DashboardLayout>
  );
};

export default RestaurantSetting;
