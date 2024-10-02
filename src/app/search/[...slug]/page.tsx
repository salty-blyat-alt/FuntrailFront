"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import SearchGroup from "@/app/home/components/search-group";
import { Filter, FilterContent } from "@/app/search/components/filter";
import List from "@/app/search/components/list";
import { Button } from "@components/ui/button";
import React from "react";

export default function SearchPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const slugArray = Array.isArray(slug) ? slug : [slug];
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

  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-20 relative text-primary-foreground">
        <SearchGroup className="absolute px-6 container -translate-x-1/2 -bottom-5 left-1/2 right-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Search Link */}
            <BreadcrumbItem>
              <BreadcrumbPage>Search</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Map through the slug array to dynamically generate the breadcrumb links */}
            {slugArray.map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/search/${slugArray.slice(0, index + 1).join("/")}`}
                  >
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < slugArray.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

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

            <div className="grid grid-cols-2 md:block space-y-4">
              {mockData.map((item, index) => (
                <List key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
