"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  useCallback,
  useEffect,
  useState
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@components/ui/select";
import useAxios from "@/app/hooks/use-axios";

export type Province = {
  id: string;
  name: string;
};

const SearchGroup = () => {
  const [selectedValue, setSelectedValue] = useState<string>("hotel");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
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
    // Adding province query if selected
    if (selectedProvince) {
      queries.push(createQueryString("province", selectedProvince));
    }

    // Redirecting to search page with constructed query strings
    router.push("/search?" + queries.join("&"));
  };

  const { triggerFetch: fetchProvinces, responseData: provinces } = useAxios<
    // incoming
    Province[],
    // outgoing
    undefined
  >({
    endpoint: "/api/province/list",
    method: "GET",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  useEffect(() => {
    fetchProvinces?.();
  }, []);

  return (
    <div className="absolute container -translate-x-1/2 -bottom-5 left-1/2 right-1/2">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-4 mx-auto">
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger>
            <SelectValue placeholder="Hotel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a province" />
          </SelectTrigger>
          <SelectContent>
            {provinces?.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* {selectedValue === "hotel" && (
        <CalendarDateRangePicker date={date} setDate={setDate} />
      )} */}
        <Button onClick={handleSearch}>
          <SearchIcon className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  );
};

export default SearchGroup;
