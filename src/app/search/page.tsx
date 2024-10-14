"use client";

import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import { Filter, FilterContent } from "@/app/search/components/filter";
import List from "@/app/search/components/list";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAxios from "../hooks/use-axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Province } from "../home/components/search-group";
import CustomPagination from "../components/custom-pagination/custom-pagination";
import { HotelProps } from "../data/mockupData";

export default function SearchPage() {
  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState<string|null>('');
  const [page, setPage] = useState<number>();

  const searchParams = useSearchParams(); 
  // fetch hotels
  const { triggerFetch: fetchList, responseData: response } = useAxios<
    any,
    any
  >({
    endpoint: "/api/hotel/list/",
    method: "GET",
    config: {
      params: {
        name: name,
        page: page,
        province_id: provinceId,
      },
      headers: {
        Accept: "application/json",
      },
    },
  });

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

  const router = useRouter();

  useEffect(() => {
    fetchList?.();
    const provinceParam = searchParams.get("province")
    setProvinceId(provinceParam);
    setPage(page);
  }, [name, provinceId, page]);

  useEffect(() => {
    fetchProvinces?.();
  }, []);

  let debounceTimeout: NodeJS.Timeout;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setName((prevQuery) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        setName(newQuery);
      }, 400);
      return prevQuery;
    });
  };

  useEffect(() => {
    // Sync the `province` query param with `provinceId` state
    const provinceParam = searchParams.get("province");
    if (provinceParam !== provinceId) {
      setProvinceId(provinceParam); // Sync province ID from URL
    }
  }, [searchParams]);
  
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleProvinceChange = (provinceId: string) => {
    setProvinceId(provinceId);
     const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("province", provinceId);
    router.push(`?${newSearchParams.toString()}`);
  }; 
  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-20 relative text-primary-foreground">
      <div className="absolute -bottom-5 container -translate-x-1/2   left-1/2 right-1/2 "> 
        <Input className="bg-input border border-black text-foreground" placeholder="Search" type="text" onChange={handleSearch} />
      </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <CustomBreadcrumb pathname={pathname} />
        </div>

        <div className="flex flex-col md:flex-row gap-4  ">
          <div>
            {/* Filter Button for Small Screens */}
            <div className="md:hidden mb-4">
              <Filter
              selectedProvince={provinceId}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
              />
            </div>
            {/* Filters for Large Screens */}
            <div className="hidden md:block sticky top-40">
              <FilterContent
              selectedProvince={provinceId}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3>Results: {response?.paginate.total || 0} properties found</h3>
              <Button variant="outline" className="w-full sm:w-auto">
                Sort by: Top Picks for Solo Travelers
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {response?.items?.map((item:HotelProps, index) => (
                <div
                  key={index}
                  className="col-span-2 sm:col-span-1 md:col-span-2"
                >
                  <Link href={`/hotel-detail/${item.id}`}>
                    <List item={item} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CustomPagination
        currentPage={response?.paginate.current_page}
        totalPages={Math.ceil(response?.paginate.total / 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
