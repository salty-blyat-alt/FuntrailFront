"use client";
import { SidebarProvider } from "../hooks/use-sidebar";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import CustomBreadcrumb from "../components/custom-breadcrumb/custom-breadcrumb";

const DashboardLayout = ({
  children, 
}: {
  children: React.ReactNode; 
}) => {


  const pathname = usePathname();
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar  title={""} />
        <main className="w-full flex-1 bg-muted/40 overflow-hidden">
          <div className="p-4">
            {/* admin navbar */}

            <CustomBreadcrumb pathname={pathname} />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
