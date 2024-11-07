import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import {facilities} from '@/app/constant/constant'
import { HotelSettingProps } from './name-textbox';



const ITEMS_LIMIT = 5;  // Set the limit for how many facilities to show initially


const Facilities: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);


  const handleCheckboxChange = (facility: string) => {
    setSelectedFacilities((prevSelected) =>
      prevSelected.includes(facility)
        ? prevSelected.filter((item) => item !== facility) // Remove if already selected
        : [...prevSelected, facility] // Add to selected list
    );
  };

  return (
    <div className="rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Facilities</h3>
      <p className="text-sm text-gray-500 mb-6">What facilities do you offer?</p>
      <div>
        {showAllFacilities
          ? facilities.map((facility, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`facility-${index}`}
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => handleCheckboxChange(facility)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={`facility-${index}`} className="ml-2 text-gray-700">
                  {facility}
                </label>
              </div>
            ))
          : facilities.slice(0, ITEMS_LIMIT).map((facility, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`facility-${index}`}
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => handleCheckboxChange(facility)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={`facility-${index}`} className="ml-2 text-gray-700">
                  {facility}
                </label>
              </div>
            ))}
        <Button
          type="button"
          onClick={() => setShowAllFacilities((prev) => !prev)}
          className="mt-4"
        >
          {showAllFacilities ? "Show Less" : "Show All"}
        </Button>
      </div>
    </div>
  );
}

export default Facilities;
