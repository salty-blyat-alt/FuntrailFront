"use client";

import { useParams, usePathname } from "next/navigation";
import CustomBreadcrumb from "@/app/components/custom-breadcrumb/custom-breadcrumb";

export default function RestaurantDetail() {
  const { id } = useParams();
  console.log("id", id);

  const pathname = usePathname();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-sm breadcrumbs">
        <CustomBreadcrumb pathname={pathname} />

{/* put stuff inside here  */}




      </div>
    </div>
  );
}
