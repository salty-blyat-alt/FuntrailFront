import { CalendarIcon, HeartIcon, UtensilsIcon } from "lucide-react";
import React from "react";

const Amenities = () => {
  return (
    <section className="w-full container py-12 mt-6">
      <div className="grid gap-6 grid-cols-3">
        <div className="flex flex-col items-center space-y-4 text-center">
          <CalendarIcon className="h-10 w-10" />
          <h2 className="text-2xl font-bold">Flexible Booking</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Change your reservation up to 24 hours before your stay, free of
            charge.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <UtensilsIcon className="h-10 w-10" />
          <h2 className="text-2xl font-bold">Fine Dining</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Experience culinary excellence at our Michelin-starred restaurant.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <HeartIcon className="h-10 w-10" />
          <h2 className="text-2xl font-bold">Wellness Center</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Rejuvenate your body and mind at our state-of-the-art spa and
            fitness center.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
