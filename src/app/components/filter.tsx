"use client";
import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <FilterIcon className="mr-2 h-4 w-4" /> Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter by</DialogTitle>
        </DialogHeader>
        {/* content */}
        <FilterContent />
      </DialogContent>
    </Dialog>
  );
};

const FilterContent = () => {
  const filters = [
    "Restaurant",
    "Guesthouses",
    "Hostels",
    "Hotels",
    "Apartments",
    "Motels",
    "Swimming pool",
    "Bed and Breakfasts",
  ];

  return (
    <div className="space-y-2">
            <h2 className="text-nowrap">Filter by:</h2> 

      <p className="muted text-nowrap" >Filters others picked</p>
      {filters.map((filter) => (
        <div key={filter} className="flex items-center">
          <Checkbox id={filter} />
          <label htmlFor={filter} className="ml-2 text-sm">
            {filter}
          </label>
        </div>
      ))}
    </div>
  );
};

export { Filter, FilterContent };
