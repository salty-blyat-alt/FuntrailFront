"use client";

import { Button } from "@components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ArrowBigLeft, HeartIcon, MapPinIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import HotelComment from "../components/hotel-comment";
import ImageSelect from "../components/image-select";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import RoomList from "../components/room-list";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { ANY } from "@/app/components/custom-table/custom-table";
import ReviewStatistic from "@/app/home/components/review-statistic";

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
      <div className="flex justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">{hotel?.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <HeartIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        <MapPinIcon className="inline-block mr-1 h-4 w-4" /> {hotel?.address}
      </p>

      <div className="mb-4">
        <ImageSelect images={hotel?.images ?? []} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
            {hotel?.description ? (
              <p>{hotel.description}</p>
            ) : (
              <p>No overview available.</p>
            )}
          </TabsContent>

          <TabsContent value="info">
            {hotel ? (
              <>
                <p>
                  <strong>Hotel Name:</strong> {hotel.name || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {hotel.address || "N/A"}
                </p>
                <p>
                  <strong>Check-in Time:</strong> {hotel.open_at || "N/A"}
                </p>
                <p>
                  <strong>Check-out Time:</strong> {hotel.close_at || "N/A"}
                </p>
              </>
            ) : (
              <p>No information available.</p>
            )}
          </TabsContent>

          <TabsContent value="facilities">
            {Array.isArray(hotel?.facilities) && hotel.facilities.length > 0 ? (
              <ul>
                {hotel.facilities.map((facility: ANY, index: number) => {
                  <li key={index}>{facility}</li>;
                })}
              </ul>
            ) : (
              <p>No facilities available.</p>
            )}
          </TabsContent>

          <TabsContent value="policies">
            {Array.isArray(hotel?.facilities) && hotel.facilities.length > 0 ? (
              <ul>
                {hotel.policies.map((policy: ANY, index: number) => {
                  <li key={index}>{policy}</li>;
                })}
              </ul>
            ) : (
              <p>No policies available.</p>
            )}
          </TabsContent>
        </Tabs>
        <ReviewStatistic hotel_id={Number(id)} />
      </div>
      {/* <RoomList hotelId={id.toString()} /> */}

      <HotelComment hotel_id={id.toString()} />
    </div>
  );
}
