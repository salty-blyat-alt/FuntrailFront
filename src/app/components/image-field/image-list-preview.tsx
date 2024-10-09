// ImageListPreview.tsx
import React from "react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { X } from "lucide-react";

interface ImageListPreviewProps {
  images: File[] | null | undefined;

  handleDeleteImage: (index: number) => void;
}

const ImageListPreview: React.FC<ImageListPreviewProps> = ({
  images,
  handleDeleteImage,
}) => {
  return (
    <div className="mt-2 flex flex-col space-y-2">
      {images?.map((image, index) => {
        const fileName = image.name;
        const fileSize = (image.size / 1024).toFixed(2) + " KB";

        return (
          <div key={index} className="flex items-center border rounded-md p-2">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Additional image ${index + 1}`}
              width={80} // 5rem = 80px
              height={80} // 5rem = 80px
              className="object-cover h-20 w-20 rounded-md"
            />
            <div className="ml-4 flex-grow">
              <div className="font-medium">{fileName}</div>
              <div className="muted text-sm">{fileSize}</div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="ml-2"
              onClick={() => handleDeleteImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ImageListPreview;
