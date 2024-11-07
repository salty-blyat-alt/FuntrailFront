import React, { useState } from 'react';
import RedStar from '@/app/components/redstar/redstar';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import UploadThumbnail from '@/app/components/image-field/upload-thumbnail';

interface UploadImageProps {
  hotel: any;
  fetchHotel: (() => void) | undefined;
}

const UploadImage: React.FC<UploadImageProps> = ({ hotel, fetchHotel }) => {
  const [isEditingUploadImage, setIsEditingUploadImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the uploaded image
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    images: FileList;
  }>();

  // Toggle edit mode for image upload
  const toggleImageEdit = () => {
    setIsEditingUploadImage((prev) => !prev);
  };

  // Handle image file change
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file); // Update the state with the new file
    }
  };

  // Form submission handler
  const onSubmit = handleSubmit((data) => {
    console.log('Submitted data:', data);
    // Handle image upload here (e.g., send to API)
    if (imageFile) {
      // Assuming you have an API endpoint to upload the image
      console.log('Uploading image:', imageFile);
    }
    toggleImageEdit(); // Close editing mode after saving
  });

  return (
    <div className=" rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold">Hotel Image Upload</h3>
      <p className="text-sm text-gray-500">Upload a profile image for your hotel.</p>

      {isEditingUploadImage ? (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {/* Thumbnail Upload */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="thumbnail">
              Hotel Profile Image <RedStar />
            </Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              {...register('images', { required: 'Hotel profile image is required' })}
              onChange={handleThumbnailChange}
            />
            {errors.images && (
              <span className="text-red-500 pt-0 text-sm">{errors.images.message}</span>
            )}
          </div>

          {/* Display selected image */}
          {imageFile && (
            <div className="mt-4">
              <p className="text-gray-600">Selected Image:</p>
              <img
                src={URL.createObjectURL(imageFile)} // Create an object URL for preview
                alt="Hotel Profile"
                className="mt-2 w-32 h-32 object-cover"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={toggleImageEdit}
              className="text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">Hotel Profile Image</p>
            {hotel?.thumbnail ? (
              <img
                src={hotel?.thumbnail}
                alt="Hotel Profile"
                className="w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <p className="text-gray-500">No image uploaded yet.</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={toggleImageEdit}
          >
            <Pencil1Icon className="text-gray-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
