import { X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RedStar from "../redstar/redstar";
import { toast } from "@/app/hooks/use-toast";

interface UploadThumbnailProps {
  title: string;
  thumbnail: File | null;
  isRequired?: boolean | null;
  setThumbnail: (thumbnail: File | null) => void; 
}

const UploadThumbnail: React.FC<UploadThumbnailProps> = ({
  title,
  thumbnail,
  setThumbnail,
  isRequired = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (file: File) => {
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        setThumbnail(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Only JPEG and PNG files are allowed.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleThumbnailChange(file);
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleThumbnailChange(file);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    thumbnailInputRef.current?.click();
  };

  return (
    <div>
      <Label htmlFor="thumbnail">
        {title} {isRequired && <RedStar />}
      </Label>
      {!thumbnail ? (
        <div
          className={`flex items-center h-40 justify-center border-2 rounded-md p-4 cursor-pointer transition-all duration-200 ${
            isDragOver
              ? "border-blue-500 bg-blue-100"
              : "border-dashed border-gray-300 bg-white"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {isDragOver ? (
            <span className="text-blue-500">Drop your image here</span>
          ) : (
            <span>{title}</span>
          )}
        </div>
      ) : (
        <div className="flex items-center border rounded-md p-2">
          <Image
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail"
            width={80}
            height={80}
            className="object-cover h-20 w-20 rounded-md"
          />
          <div className="ml-4 flex-grow">
            <div className="font-medium">{thumbnail.name}</div>
            <div className="text-gray-500 text-sm">
              {(thumbnail.size / 1024).toFixed(2)} KB
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="ml-2"
            onClick={handleDeleteThumbnail}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Input
        type="file"
        id="thumbnail"
        ref={thumbnailInputRef}
        className="hidden"
        accept="image/jpeg, image/png" 
        onChange={handleFileSelect}
      /> 
    </div>
  );
};

export default UploadThumbnail;
