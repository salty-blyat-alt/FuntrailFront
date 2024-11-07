import { policies } from '@/app/constant/constant';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';  
import { HotelSettingProps } from './name-textbox';

const ITEMS_LIMIT = 5;  

const HotelPolicy: React.FC<HotelSettingProps> = ({ hotel, fetchHotel }) => {
  const [showAllPolicies, setShowAllPolicies] = useState(false); // State for showing all policies
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]); // Store selected policies

  // Toggle checkbox selection
  const handleCheckboxChange = (policy: string) => {
    setSelectedPolicies((prevSelected) =>
      prevSelected.includes(policy)
        ? prevSelected.filter((item) => item !== policy) 
        : [...prevSelected, policy]
    );
  };

  return (
    <div className="rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Hotel Policies</h3>
      <p className="text-sm text-gray-500 mb-6">What policies do you have in place?</p>
      <div>
        {showAllPolicies
          ? policies.map((policy, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`policy-${index}`}
                  checked={selectedPolicies.includes(policy)} // Check if policy is selected
                  onChange={() => handleCheckboxChange(policy)} // Handle checkbox change
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={`policy-${index}`} className="ml-2 text-gray-700">
                  {policy}
                </label>
              </div>
            ))
          : policies.slice(0, ITEMS_LIMIT).map((policy, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`policy-${index}`}
                  checked={selectedPolicies.includes(policy)} // Check if policy is selected
                  onChange={() => handleCheckboxChange(policy)} // Handle checkbox change
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={`policy-${index}`} className="ml-2 text-gray-700">
                  {policy}
                </label>
              </div>
            ))}
        <Button
          type="button"
          onClick={() => setShowAllPolicies((prev) => !prev)} // Toggle the visibility
          className="mt-4">
          {showAllPolicies ? 'Show Less' : 'Show All'}
        </Button>
      </div>
    </div>
  );
}

export default HotelPolicy;
