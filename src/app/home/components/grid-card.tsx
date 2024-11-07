"use client";
import Image from "next/image";
import Link from "next/link";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { motion } from "framer-motion";
import { ANY } from "@/app/components/custom-table/custom-table"; 

const GridCard = () => {
  const {
    triggerFetch: fetchPopularHotels,
    loading,
    responseData: popularHotels,
  } = useAxios<ANY, undefined>({
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

  return (
    <section className="mt-20">
      <h2 className="my-4 text-2xl font-bold leading-none tracking">
        Popular searches
      </h2>
      <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {popularHotels?.map((h:ANY, index:number) => (
          <Link key={h.id} href={`/hotel-detail/${h.hotel_id}`} passHref>
            <motion.div
              initial={{ opacity: 0, y: -20 }} // Start slightly above
              animate={{ opacity: 1, y: 0 }} // Animate to original position
              transition={{
                duration: 0.5, // Duration of the animation
                delay: index * 0.1, // Staggered delay based on index
              }}
              className="rounded-md border h-32 overflow-hidden"
            >
              <Image
                src={h.thumbnail ? `${process.env.NEXT_PUBLIC_BASE_URL}${h.thumbnail}` : "https://placehold.co/600x400"}
                width={500}
                height={500}
                className="object-cover size-full hover:scale-110 duration-200 transition-all ease-in"
                alt={h.hotel_name}
              />
            </motion.div>
            {h.hotel_name}
          </Link>
        ))}

        {/* not working */}
        {loading || !popularHotels &&
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
    </section>
  );
};

export default GridCard;
