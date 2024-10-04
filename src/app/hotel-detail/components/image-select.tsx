import React, { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js for images

interface ImageSelectProps {
  images: string[]; // Updated to accept an array of strings (image URLs)
}

const ImageSelect: React.FC<ImageSelectProps> = ({ images }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setThumbnailIndex(index);
  };

  return (
    <>
      {/* Display the main image */}
      <div className="relative aspect-video mb-4">
        <Image
          fill
          src={images[thumbnailIndex]}
          alt={`Image ${thumbnailIndex}`}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-video cursor-pointer ${
              index === thumbnailIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              fill
              src={image}
              alt={`Thumbnail ${index}`}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageSelect;
