"use client";
import { motion } from "framer-motion";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";
import { Filter, FilterContent } from "@/app/search/components/filter";
import List from "@/app/search/components/list";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import BackButton from "../components/back-button/back-button";
import CustomPagination from "../components/custom-pagination/custom-pagination";
import { Input } from "../components/ui/input";
import { HotelProps } from "../data/mockupData";
import { Province } from "../home/components/search-group";
import useAxios from "../hooks/use-axios";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState<string | null>("");
  const [page, setPage] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isProvinceInitialized, setIsProvinceInitialized] = useState(false);

  const searchParams = useSearchParams();

  const {
    triggerFetch: fetchProvinces,
    loading: loadingProvinces,
    responseData: provinces,
  } = useAxios<Province[], undefined>({
    endpoint: "/api/province/list",
    method: "GET",
    config: {},
  });

  const {
    triggerFetch: fetchList,
    loading,
    responseData: response,
  } = useAxios<any, undefined>({
    endpoint: "/api/hotel/list",
    method: "GET",
    config: {
      params: {
        name: name,
        page: page,
        province_id: provinceId,
        sort_direction: sortDirection,
      },
    },
  });

  // Initialize provinceId from URL params
  useEffect(() => {
    const provinceParam = searchParams.get("province");
    setProvinceId(provinceParam);
    setIsProvinceInitialized(true);
  }, [searchParams]);

  // Fetch hotels only after province is initialized
  useEffect(() => {
    if (isProvinceInitialized) {
      fetchList?.();
    }
  }, [name, provinceId, sortDirection, page, isProvinceInitialized]);

  // Fetch provinces once on mount
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

  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleProvinceChange = (provinceId: string) => {
    setProvinceId(provinceId);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("province", provinceId);
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
  };

  const handleClearFilters = () => {
    setName("");
    setProvinceId(null);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("province");
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen">
      <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-green-100 text-green-800">
        <div className="container px-4 md:px-6   flex-col space-y-2 items-center ">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Stay</h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-8"
              type="text"
              value={name}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 lg:px-12 py-8">
        <div className="mb-4 flex gap-4">
          <BackButton path="/" />
          <CustomBreadcrumb pathname={pathname} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <div className="md:hidden mb-4">
              <Filter
                isLoading={loadingProvinces}
                selectedProvince={provinceId}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
              />
            </div>
            <div className="hidden md:block sticky top-20">
              <FilterContent
                isLoading={loadingProvinces}
                selectedProvince={provinceId}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
              />
              <Button
                variant="outline"
                className="w-full mt-2 sm:w-auto"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="w-full md:w-3/4 mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3>Results: {response?.paginate.total || 0} properties found</h3>

              <Button
                onClick={handleSort}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Sort by Name:{" "}
                {sortDirection === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                <div className="flex justify-center items-center col-span-2">
                  <div className="pt-[20%]">
                    <h3 className="pb-2 text-center">Loading</h3>
                    <BarLoader />
                  </div>
                </div>
              ) : response?.paginate.total === 0 ? (
                <div className="flex justify-center mt-[20%] flex-col items-center col-span-2">
                  <h3 className="text-center">No result found</h3>
                  <p className="text-center text-muted-foreground">
                    Please try searching with other terms
                  </p>
                </div>
              ) : (
                response?.items?.map((item: HotelProps, index) => (
                  <motion.div
                    key={index}
                    className="col-span-2 sm:col-span-1 md:col-span-2"
                    initial={{ opacity: 0, y: -20 }} // Start slightly above
                    animate={{ opacity: 1, y: 0 }} // Animate to original position
                    transition={{
                      duration: 0.5, // Duration of the animation
                      delay: index * 0.1, // Delay based on the index
                    }}
                  >
                    <Link href={`/hotel-detail/${item.id}`}>
                      <List item={item} />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            <style jsx>{`
              .grid {
                min-height: 150px; /* Set a minimum height for each grid item */
              }
              .loading-placeholder {
                height: 150px; /* Match the height of the actual items */
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}</style>
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
