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

const GridCard = () => {
  const { triggerFetch: fetchPopular, responseData: response } = useAxios<
    {
      result_message: string;
      result_code: number;
      body: any;
      email: string;
      password: string;
    },
    any
  >({
    endpoint: "/api/popular/hotels",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchPopular?.();
  }, []);
  console.log(response);
  const items = [
    { image: "/path/to/image1.jpg", alt: "Image 1" },
    { image: "/path/to/image2.jpg", alt: "Image 2" },
    { image: "/path/to/image3.jpg", alt: "Image 3" },
  ];

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold leading-none tracking">
        Popular searches
      </h2>
      <Tabs defaultValue="hotel">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent
          className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          value="hotel"
        >
          {items.map((item, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <Link href="/" passHref>
                <Image
                  src="https://via.placeholder.com/300" // Use item.image if available, otherwise default to hero
                  width={300}
                  height={300}
                  className="object-cover hover:scale-110 duration-200 transition-all ease-in " // Ensure the image covers the div while maintaining aspect ratio
                  alt={item.alt || "placeholder"} // Meaningful alt text fallback
                />
              </Link>
            </div>
          ))}
        </TabsContent>

        <TabsContent
          className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          value="restaurant"
        >
          {items.map((item, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <Link href="/" passHref>
                <Image
                  src="https://via.placeholder.com/300" // Use item.image if available, otherwise default to hero
                  width={300}
                  height={300}
                  className="object-cover hover:scale-110 duration-200 transition-all ease-in " // Ensure the image covers the div while maintaining aspect ratio
                  alt={item.alt || "placeholder"} // Meaningful alt text fallback
                />
              </Link>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default GridCard;
