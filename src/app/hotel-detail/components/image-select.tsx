"use client";
import { Skeleton } from "@/app/components/ui/skeleton";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ImageSelectProps {
  images?: string | undefined; // Allowing undefined for API call delays
}

const ImageSelect: React.FC<ImageSelectProps> = ({ images }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);

  let parsedImages: string[] = [];

  try {
    parsedImages = images && images.trim() ? JSON.parse(images) : [];
  } catch (error) {
    console.error("Invalid JSON format:", error);
    parsedImages = []; // Handle invalid JSON gracefully
  }

  const handleImageClick = (index: number) => {
    setThumbnailIndex(index);
  };

  return (
    <>
      {/* Display the main image */}
      <div className="mx-auto relative aspect-video mb-4 max-w-lg">
        {parsedImages.length > 0 ? (
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${parsedImages[thumbnailIndex]}`}
            alt={`Image ${thumbnailIndex}`}
            className="rounded-lg object-cover"
          />
        ) : (
          <>
            <Skeleton className=" h-52  rounded-md col-span-2" />
          </>
        )}
      </div>

      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {parsedImages.length > 0 ? (
          parsedImages.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-video cursor-pointer ${
                index === thumbnailIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                alt={`Thumbnail ${index}`}
                className="rounded-lg object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <Skeleton className="rounded-md h-30" />
            <Skeleton className="rounded-md h-30" />
            <Skeleton className="rounded-md h-30" />
            <Skeleton className="rounded-md h-30" />
            <Skeleton className="rounded-md h-30" />
          </>
        )}
      </div>
    </>
  );
};

export default ImageSelect;
