"use client";

import useAxios from "@/app/hooks/use-axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Skeleton } from "@components/ui/skeleton";

interface PopularProvinceProps {
  id: number;
  name: string;
  img?: string;
  hotels_count: number;
  restaurants_count: number;
}

export function BentoGrid({ className = "" }) {
  const {
    triggerFetch: fetchPopularProvinces,
    error,
    loading,
    responseData: popularProvinces,
  } = useAxios<
    // incoming
    PopularProvinceProps[],
    // outgoing
    undefined
  >({
    endpoint: "/api/popular/provinces",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchPopularProvinces?.();
  }, []);

  return (
    <section className={className}>
      <div>
        <h2 className="text-2xl font-bold leading-none tracking">
          Trending Destination
        </h2>
        <p className="muted mb-2">
          Angkor Wat, a magnificent temple complex in Cambodia, is renowned for
          its intricate architecture and historical significance. Stunning and
          iconic.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularProvinces?.slice(0, 5).map((p, index) => {
          return (
            <Link
              key={p.id}
              className={`overflow-hidden h-52 rounded-md ${
                index === 0 ? "col-span-2" : ""
              }`}
              href={`/search?province=${p?.id}`}
              passHref
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${p?.img}`}
                alt={p?.name}
                width={500}
                height={300}
                className="rounded-md h-full w-full object-cover"
              />
            </Link>
          );
        })}
        {loading && (
          <>
            <Skeleton className=" h-52  rounded-md col-span-2" />
            <Skeleton className=" h-52  rounded-md col-span-1" />
            <Skeleton className=" h-52  rounded-md col-span-1" />
            <Skeleton className=" h-52  rounded-md col-span-1" />
            <Skeleton className=" h-52  rounded-md col-span-1" />
          </>
        )}
      </div>
    </section>
  );
}
