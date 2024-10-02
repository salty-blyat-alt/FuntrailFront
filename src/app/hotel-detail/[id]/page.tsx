"use client";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { HeartIcon, MapPinIcon, ShareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import HotelBreadcrumb from "../components/hotel-breadcrumb";
import HotelComment from "../components/hotel-comment";
import ImageSelect from "../components/image-select";

export default function HotelDetail() {
  const { id } = useParams();

  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=500&width=800",
      alt: "Hotel exterior",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Room interior",
    },
    { id: 3, src: "/placeholder.svg?height=300&width=400", alt: "Bathroom" },
    { id: 4, src: "/placeholder.svg?height=300&width=400", alt: "Restaurant" },
    { id: 5, src: "/placeholder.svg?height=300&width=400", alt: "Pool" },
    { id: 6, src: "/placeholder.svg?height=300&width=400", alt: "View" },
  ];

  const hotel = {
    name: "Le Tonle",
    address:
      "Street Preah Somramrth (River Road), Psar Veng village, Sangkat Kratie, Kratie Town, Kratie Province, Kratie, Cambodia",
    description: `Le Tonle is a recently renovated guest house in Kratie where guests
    can make the most of its terrace and shared lounge. Among the
    facilities at this property are a 24-hour front desk and full-day
    security, along with free WiFi throughout the property. Parking
    on-site is available, and the guest house offers car rental for
    guests who want to explore the surrounding area.`,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-sm breadcrumbs">
        <HotelBreadcrumb id="0" />
      </div>

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
          <TabsTrigger value="reviews" className="mb-2 mr-2">
            Guest reviews (220)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>{hotel?.description}</p>
        </TabsContent>
      </Tabs> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Property highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Top Location: Highly rated by recent guests (9.2)</li>
              <li>Free Parking Available On Site</li>
              <li>24-hour front desk</li>
              <li>Free WiFi throughout the property</li>
              <li>Car rental service available</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Very Good</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">8.3</div>
            <p>220 reviews</p>
            <p>"Great location across the street from the Mekong River."</p>
          </CardContent>
        </Card>
      </div>

      <HotelComment />
    </div>
  );
}
