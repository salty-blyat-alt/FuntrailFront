"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageSelectProps {
  images?: string[];
}

const ImageSelect: React.FC<ImageSelectProps> = ({ images }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setThumbnailIndex(index);
  };

  // Function to get the image source with base URL
  const getImageSrc = (src: string) => {
    const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:8000";
    if (src && src.startsWith("/storage/")) {
      // For local development
      if (baseUrl.includes("localhost")) {
        return `${baseUrl}${src}`;
      }
      // For production
      return `${baseUrl}/storage${src}`;
    }
    return src;
  };

  // Fallback for the main image if images array is empty or undefined
  const imageSrc =
    Array.isArray(images) && images.length > 0
      ? getImageSrc(images[thumbnailIndex])
      : getImageSrc(
          "/storage/hotels/thumbnails/fig_removebg_preview_66f5988242de6.png"
        );

  return (
    <>
      {/* Display the main image */}
      <div className="relative aspect-video mb-4">
        <Image
          fill
          src={imageSrc}
          alt={`Image ${thumbnailIndex}`}
          className="rounded-lg object-cover"
        />
      </div>
      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-video cursor-pointer ${
                index === thumbnailIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                fill
                src={getImageSrc(image)}
                alt={`Thumbnail ${index}`}
                className="rounded-lg object-cover"
              />
            </div>
          ))
        ) : (
          <div>No images available</div>
        )}
      </div>
    </>
  );
};

export default ImageSelect;