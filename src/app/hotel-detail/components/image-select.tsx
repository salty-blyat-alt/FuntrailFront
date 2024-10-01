import React, { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js for images

interface ImageData {
  id: number;
  src: string;
  alt: string;
}

interface ImageSelectProps {
  images: ImageData[];
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
          src={images[thumbnailIndex].src}
          alt={images[thumbnailIndex].alt}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Display the thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative aspect-video cursor-pointer ${
              index === thumbnailIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              fill
              src={image.src}
              alt={image.alt}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageSelect;
