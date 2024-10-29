"use client";

import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Province } from "@/app/home/components/search-group";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Skeleton } from "@/app/components/ui/skeleton";

const Filter = ({
  selectedProvince,
  provinces,
  onProvinceChange,
  isLoading
}: {
  selectedProvince: string | null;
  provinces: Province[] | null;
  onProvinceChange: (provinceId: string) => void;
  isLoading:boolean;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleClearFilters = () => {
    onProvinceChange(""); // Clear the selected province
  };

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
        {/* Filter content in dialog for small screens */}
        <FilterContent
        isLoading={isLoading}
          selectedProvince={selectedProvince}
          provinces={provinces}
          onProvinceChange={onProvinceChange}
        />
        <DialogFooter className="sm:justify-start gap-2">
          {/* Clear Filters Button */}
          <Button type="button" variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const FilterContent = ({
  provinces,
  onProvinceChange,
  selectedProvince,
  isLoading,
}: {
  selectedProvince: string | null;
  provinces: Province[] | null;
  onProvinceChange: (provinceId: string) => void;
  isLoading: boolean;
}) => { 
  return (
    <div className="space-y-2">
      <h2 className="text-nowrap">Filter by:</h2>
      <p className="muted text-nowrap">Filters others picked</p>
      <ScrollArea className="h-80">
        <RadioGroup
          value={selectedProvince ? selectedProvince.toString() : ""}
          onValueChange={onProvinceChange}
        >
          {isLoading || !provinces
            ? // Show skeletons if loading
              [...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-36 ml-2 rounded" />
                </div>
              ))
            : // Show actual provinces if not loading
              provinces?.map((province) => (
                <div key={province.id} className="flex items-center">
                  <RadioGroupItem
                    value={province.id.toString()}
                    id={province.id.toString()}
                  />
                  <Label
                    htmlFor={province.id.toString()}
                    className="ml-2 text-sm"
                  >
                    {province.name}
                  </Label>
                </div>
              ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export { Filter, FilterContent };
