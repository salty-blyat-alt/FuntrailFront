"use client";

import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import { Filter, FilterContent } from "@/app/search/components/filter";
import List from "@/app/search/components/list";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import useAxios from "../hooks/use-axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import CustomPagination from "../components/custom-pagination/custom-pagination";

export default function SearchPage() {
  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [page, setPage] = useState<number>();

  const searchParams = useSearchParams();

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

  useEffect(() => {
    fetchList?.();
    setProvinceId(searchParams.get("province"));
    setPage(page);
  }, [name, provinceId, page]);

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

  const pathname = usePathname();

  console.log(response);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-20 relative text-primary-foreground">
        <Input placeholder="Search" type="text" onChange={handleSearch} />
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
              <Filter />
            </div>
            {/* Filters for Large Screens */}
            <div className="hidden md:block md:w-1/4 sticky top-20">
              <FilterContent />
            </div>
          </div>

          {/* Search Results */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3>Results: {response?.paginate.total} properties found</h3>
              <Button variant="outline" className="w-full sm:w-auto">
                Sort by: Top Picks for Solo Travelers
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {response?.items?.map((item, index) => (
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
