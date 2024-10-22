"use client";
import { Skeleton } from "@/app/components/ui/skeleton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ImageSelectProps {
  images?: string | undefined; // Allowing undefined for API call delays
}

const ImageSelect: React.FC<ImageSelectProps> = ({ images }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);
  const [parsedImages, setParsedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // Start loading
    try {
      const parsed = images && images.trim() ? JSON.parse(images) : [];
      setParsedImages(parsed);
    } catch (error) {
      console.error("Invalid JSON format:", error);
      setParsedImages([]); // Handle invalid JSON gracefully
    } finally {
      setLoading(false); // End loading
    }
  }, [images]);

  const handleImageClick = (index: number) => {
    setThumbnailIndex(index);
  };
  console.log(loading);
  return (
    <>
      {/* Display the main image */}
      <div className="mx-auto relative aspect-video mb-4 max-w-lg">
        {loading ? (
          <Skeleton className="h-52 rounded-md" />
        ) : parsedImages.length > 0 ? (
          <motion.div
            className="size-full"
            initial={{ opacity: 0, y: -20 }} // Start slightly above
            animate={{ opacity: 1, y: 0 }} // Animate to original position
            transition={{
              duration: 0.5, // Staggered delay based on index
            }}
          >
            <Image
              priority
              fill
              sizes="40rem"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${parsedImages[thumbnailIndex]}`}
              alt={`Image ${thumbnailIndex}`}
              className="rounded-lg object-cover "
            />
          </motion.div>
        ) : (
          <Skeleton className="h-52 rounded-md" />
        )}
      </div>

      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="rounded-md h-30" />
            ))
          : parsedImages.map((image, index) => (
              <motion.div
                key={index}
                className={`relative aspect-video cursor-pointer ${
                  index === thumbnailIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleImageClick(index)}
                initial={{ opacity: 0, y: -20 }} // Start slightly above
                animate={{ opacity: 1, y: 0 }} // Animate to original position
                transition={{
                  duration: 0.5, // Duration of the animation
                  delay: index * 0.1, // Staggered delay based on index
                }}
              >
                <Image
                  fill
                  sizes="40rem"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                  alt={`Thumbnail ${index}`}
                  className="rounded-lg object-cover"
                />
              </motion.div>
            ))}
      </div>
    </>
  );
};

export default ImageSelect;
