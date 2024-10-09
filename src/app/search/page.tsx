"use client";

import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import SearchGroup from "@/app/home/components/search-group";
import { Filter, FilterContent } from "@/app/search/components/filter";
import List from "@/app/search/components/list";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  console.log(search);

  const mockData = [
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Beautiful Beach House",
      distance: "5 miles",
      rating: 4.5,
      reviewCount: 120,
      description: "A stunning beach house with amazing ocean views.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Mountain Cabin Retreat",
      distance: "15 miles",
      rating: 4.8,
      reviewCount: 95,
      description:
        "A cozy cabin in the mountains, perfect for a weekend getaway.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "City Center Apartment",
      distance: "1 mile",
      rating: 4.2,
      reviewCount: 200,
      description: "Modern apartment located in the heart of the city.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
    {
      imageSrc: "https://via.placeholder.com/300",
      title: "Countryside Villa",
      distance: "10 miles",
      rating: 4.7,
      reviewCount: 80,
      description: "A charming villa surrounded by beautiful countryside.",
    },
  ];

  const pathname = usePathname();
  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-20 relative   text-primary-foreground">
        <SearchGroup />
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <CustomBreadcrumb pathname={pathname} />
        </div>

        <div className="flex flex-col md:flex-row gap-4  ">
          <div>
            {/* Filter Button for Small Screens */}
            <div className="md:hidden mb-4">
              <Filter />
            </div>
            {/* Filters for Large Screens */}
            <div className="hidden md:block md:w-1/4 sticky top-20">
              <FilterContent />
            </div>
          </div>

          {/* Search Results */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3>Eilat: 819 properties found</h3>
              <Button variant="outline" className="w-full sm:w-auto">
                Sort by: Top Picks for Solo Travelers
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockData.map((item, index) => (
                <div  key={index} className="col-span-2 sm:col-span-1 md:col-span-2">
                  <Link href="/hotel-detail/id">
                    <List item={item} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
