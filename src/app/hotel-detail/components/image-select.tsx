"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ImageSelectProps {
  images?: string; // Expecting images as a JSON string
}

const ImageSelect: React.FC<ImageSelectProps> = ({ images }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0); // Default to 0

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""; // Fallback to empty string

  // Safely parse images
  let parsedImages: string[] = [];
  if (images) {
    try {
      parsedImages = JSON.parse(images); 
    } catch (error) {
      console.error("Failed to parse images:", error);
    }
  }

  // Prepend base URL to each image path
  const completeImageUrls = parsedImages.map(image => 
    image.startsWith("https://via.placeholder.com") ? image : `${baseUrl}${image}`
  );
 

  const handleImageClick = (index: number) => {
    setThumbnailIndex(index); // Update the thumbnail index
  };

  return (
    <>
      {/* Display the main image */}
      <div className="mx-auto relative aspect-video mb-4 max-w-lg border-4">
        {completeImageUrls.length > 0 ? (
          <Image
            fill
            src={completeImageUrls[thumbnailIndex]} // Use the selected image as thumbnail
            alt={`Image ${thumbnailIndex}`}
            onLoadingComplete={() => console.log("Image loaded")}
            onError={() => console.log("Image failed to load")}
          />
        ) : (
          <div>No image available</div> // Fallback if no images are available
        )}
      </div>
      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {completeImageUrls.length > 0 ? (
          completeImageUrls.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-video cursor-pointer ${
                index === thumbnailIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                fill
                src={image} // Use each image as thumbnail
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
