"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CalendarDateRangePicker } from "@/app/components/ui/date-range-picker";
import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { ComboBox } from "@/app/components/ui/combo-box";
import { provinces } from "@/app/constant/constant";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@components/ui/select";

const SearchGroup = () => {
  const [selectedValue, setSelectedValue] = useState<string>("hotel");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    const queries = [];

    // Adding date queries if available
    if (date?.from && date?.to && selectedValue === 'hotel') {
      const fromDate = format(date.from, "MM-dd");
      const toDate = format(date.to, "MM-dd");
      queries.push(createQueryString("datefrom", fromDate));
      queries.push(createQueryString("dateto", toDate));
    }

    // Adding province query if selected
    if (selectedProvince) {
      queries.push(createQueryString("province", selectedProvince));
    }

    // Redirecting to search page with constructed query strings
    router.push("/search?" + queries.join("&"));
  };

  return (
    <div className="absolute flex gap-2 px-6 container -translate-x-1/2 -bottom-5 left-1/2 right-1/2">
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        
        <SelectTrigger className="w-[180px]"> 
          <SelectValue placeholder="Hotel" /> 
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hotel">Hotel</SelectItem>
          <SelectItem value="restaurant">Restaurant</SelectItem>
        </SelectContent>
      </Select>

      <ComboBox
        value={selectedProvince}
        setValue={setSelectedProvince}
        className="flex-grow"
        items={provinces}
        title="Please select a province"
      />

      {/* {selectedValue === "hotel" && (
        <CalendarDateRangePicker date={date} setDate={setDate} />
      )} */}
      <Button onClick={handleSearch}>
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchGroup;
