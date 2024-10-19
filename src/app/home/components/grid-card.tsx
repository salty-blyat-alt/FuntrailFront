"use client";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Link from "next/link";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

const GridCard = () => {
  const {
    triggerFetch: fetchPopularHotels,
    loading,
    responseData: popularHotels,
  } = useAxios<any, undefined>({
    endpoint: "/api/popular/hotels",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchPopularHotels?.();
  }, []);

  const items = [
    { image: "/path/to/image1.jpg", alt: "Image 1" },
    { image: "/path/to/image2.jpg", alt: "Image 2" },
    { image: "/path/to/image3.jpg", alt: "Image 3" },
  ];

  return (
    <section className="mt-20">
      <h2 className="my-4 text-2xl font-bold leading-none tracking">
        Popular searches
      </h2>
      {/* <Tabs defaultValue="hotel">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
        </TabsList> */}

      {/* <TabsContent
          className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          value="hotel"
        > */}
      <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {popularHotels?.map((h, index) => (
          <Link key={index} href={`/hotel-detail/${h.hotel_id}`} passHref>
            <div className="rounded-md border h-32 overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${h.thumbnail}`}
                width={500}
                height={500}
                className="object-cover size-full hover:scale-110 duration-200 transition-all ease-in"
                alt={h.hotel_name}
              />
            </div>
            {h.hotel_name}
          </Link>
        ))}

        {/* not working */}
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </div>
            </div>
          ))}
      </div>
      {/* </TabsContent> */}

      {/* <TabsContent
          className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          value="restaurant"
          >
          {items.map((item, index) => (
            <Link
            className="rounded-md overflow-hidden"
              href="/"
              key={index}
              passHref
            >
              <Image
                src="https://via.placeholder.com/300"
                width={300}
                height={300}
                className="object-cover hover:scale-110 duration-200 transition-all ease-in "
                alt={item.alt || "placeholder"}
              />
            </Link>
          ))}
        </TabsContent>
      </Tabs> */}
    </section>
  );
};

export default GridCard;
