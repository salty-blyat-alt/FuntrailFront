"use client";
import { SidebarProvider } from "../hooks/use-sidebar";
import { NavItem } from "./components/dashboard-nav";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import CustomBreadcrumb from "../components/custom-breadcrumb/custom-breadcrumb";

const DashboardLayout = ({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
}) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar navItems={navItems} title={""} />
        <main className="w-full flex-1 bg-muted/40 overflow-hidden">
          <div className="p-4">
          <CustomBreadcrumb pathname={pathname} />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
