"use client";

import { Button } from "@components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  ArrowBigLeft,
  Clock,
  HeartIcon,
  LogIn,
  MapPin,
  MapPinIcon,
  Wifi,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import HotelComment from "../components/hotel-comment";
import ImageSelect from "../components/image-select";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { ANY } from "@/app/components/custom-table/custom-table";
import ReviewStatistic from "@/app/home/components/review-statistic";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

export default function HotelDetail() {
  const { id } = useParams();

  const { triggerFetch: fetchHotel, responseData: hotel } = useAxios<
    ANY,
    undefined
  >({
    endpoint: `/api/hotel/show/${id}`,
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchHotel?.();
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  let policiesArray = [];
  if (hotel?.policies) {
    try {
      policiesArray = JSON.parse(hotel.policies);
    } catch (error) {
      console.error("Failed to parse policies:", error);
    }
  }

  let facilitiesArray = [];
  if (hotel?.facilities) {
    try {
      facilitiesArray = JSON.parse(hotel?.facilities);
    } catch (error) {
      console.error("Failed to parse policies:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-sm breadcrumbs">
        <CustomBreadcrumb pathname={pathname} />
      </div>

      <Button
        className="mb-4"
        variant="outline"
        size="sm"
        onClick={() => router.back()}
      >
        <ArrowBigLeft />
      </Button>

      <div className=" mx-auto p-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">{hotel?.name}</h1>
          <div className=" ">
            <ImageSelect images={hotel?.images ?? []} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Owner:</strong> {hotel?.owner}
              </p>
              <Separator className="my-2" />
              <p>
                <strong>Address:</strong> {hotel?.address}
              </p>
              <Separator className="my-2" />
              <p>
                <strong>Province:</strong> {hotel?.province}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/2 space-y-6 flex flex-col  first:">
          <Card className="flex-grow h-full">
            <CardHeader>
              <CardTitle>Location & Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center mb-4">
                <MapPin className="mr-2" size={20} />
                {hotel?.province}, {hotel?.address}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground mt-auto">
              <p className="flex items-center">
                <Clock className="mr-2" size={16} />
                Open: {hotel?.open_at}
              </p>
              <p className="flex items-center">
                <Clock className="mr-2" size={16} />
                Close: {hotel?.close_at}
              </p>
            </CardFooter>
          </Card>

          <Card className="flex-grow h-full">
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {facilitiesArray.length > 0 ? (
                  facilitiesArray.map((facility, index) => (
                    <li key={index} className="flex items-center">
                      {facility}
                    </li>
                  ))
                ) : (
                  <p>No policies available.</p>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex-grow h-full">
            <CardHeader>
              <CardTitle>Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {policiesArray.length > 0 ? (
                  policiesArray.map((policy, index) => (
                    <li key={index} className="flex items-center">
                      {policy}
                    </li>
                  ))
                ) : (
                  <p>No policies available.</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-8 p-4">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{hotel?.description}</p>
          </CardContent>
        </Card>
        <ReviewStatistic hotel_id={Number(id)} />
      </div>
      {/* <RoomList hotelId={id.toString()} /> */}

      <HotelComment hotel_id={id.toString()} />
    </div>
  );
}
