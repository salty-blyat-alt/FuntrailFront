"use client";
import { ComboBox } from "./components/ui/combo-box";
import { BentoGrid } from "./home/components/bento-grid";
import GridCard from "./home/components/grid-card";
import { Hero } from "./home/components/hero";
import Slide from "./home/components/slide";
import { provinces } from "./constant/constant";
import { CalendarDateRangePicker } from "./components/ui/date-range-picker";
import { Button } from "./components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState({
    selectedProvince: "",
    dateRange: [null, null],
  });
  const handleProvinceChange = (province) => {
    setQuery((prev) => ({ ...prev, selectedProvince: province }));
  };

  const handleDateRangeChange = (range) => {
    setQuery((prev) => ({ ...prev, dateRange: range }));
  };

  const handleSearch = () => {};
  return (
    <>
      <div className="relative">
        <Hero />
        {/* fix later */}
        <div className="absolute flex gap-2 px-6 container -translate-x-1/2 -bottom-5 left-1/2 right-1/2">
          <ComboBox
            className="flex-grow bg-background text-foreground"
            items={provinces}
            title="Please select a province"
            value={query.selectedProvince}
            setValue={handleProvinceChange}
          />
          <CalendarDateRangePicker
            className="bg-background text-foreground"
            onChange={handleDateRangeChange} // Call the handler here
          />
          <Button className="">
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
      <main className="container relative mx-auto space-y-8 px-6 md:px-16">
        {/* show popular provinces */}
        <BentoGrid className="mt-12" />

        {/* affordable option for hotels */}
        <Slide
          title={"Afforable options"}
          subtitle={"Find the best deals that won't break the bank."}
        />

        {/* show popular hotels / restaurant */}
        <GridCard />

        {/* affordable option for restaurant */}
        <Slide
          title={"Eat with us for small cost"}
          subtitle={"Delicious meals at prices you'll love."}
        />
      </main>
    </>
  );
}
