import React, { useState } from 'react';
import RedStar from '@/app/components/redstar/redstar';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';

interface OperationalProps {
  hotel: any;
  fetchHotel: (() => void) | undefined;
}

const Operational: React.FC<OperationalProps> = ({ hotel, fetchHotel }) => {
  const [isEditingOperationTime, setIsEditingOperationTime] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    open_at: string;
    close_at: string;
  }>();

  const toggleOperationalTime = () => {
    setIsEditingOperationTime((prev) => !prev);
  };

  const onSubmit = handleSubmit((data) => {
    console.log('Submitted data:', data);
    toggleOperationalTime(); // Close editing mode after saving
    // You would submit the form data here to your API
  });

  return (
    <div className="h-96 rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold">Operational Times</h3>
      <p className="text-sm text-gray-500">When is your hotel available for bookings?</p>

      {isEditingOperationTime ? (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {/* Open At */}
          <div className="flex-1">
            <Label htmlFor="open_at">
              Open At <RedStar />
            </Label>
            <Input
              id="open_at"
              aria-label="Open At"
              type="time"
              {...register('open_at', {
                required: 'Opening hour is required',
              })}
            />
            <p className="text-gray-600 text-sm">Format: HH:MM (24-hour) e.g., 07:00</p>
            {errors.open_at && (
              <span className="text-red-500 text-sm">{errors.open_at.message}</span>
            )}
          </div>

          {/* Close At */}
          <div className="flex-1">
            <Label htmlFor="close_at">
              Close At <RedStar />
            </Label>
            <Input
              id="close_at"
              aria-label="Close At"
              type="time"
              {...register('close_at', {
                required: 'Closing hour is required',
              })}
            />
            <p className="text-gray-600 text-sm">Format: HH:MM (24-hour) e.g., 17:00</p>
            {errors.close_at && (
              <span className="text-red-500 text-sm">{errors.close_at.message}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={toggleOperationalTime}
              className="text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          {/* Displaying Operational Times */}
          {/* Displaying Operational Times with Input-like Styling */}
          <div className="flex-1">
            {/* Open At */}
            <div>
              <Label htmlFor="open_at">
                Open At <RedStar />
              </Label>
              <p className="text-gray-700 font-medium">{hotel?.open_at}</p>
            </div>
            <p className="text-gray-600 text-sm">Format: HH:MM (24-hour) e.g., 07:00</p>
          </div>

          {/* Close At */}
          <div className="flex-1">
            <div>
              <Label htmlFor="close_at">
                Close At <RedStar />
              </Label>
              <p className="text-gray-700 font-medium">{hotel?.close_at}</p>
            </div>
            <p className="text-gray-600 text-sm">Format: HH:MM (24-hour) e.g., 17:00</p>
          </div>


          {/* Pencil Icon to edit */}
          <Button
            type="button"
            variant="ghost"
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={toggleOperationalTime}
          >
            <Pencil1Icon className="text-gray-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Operational;
