"use client";
import { useSidebar } from "@/app/hooks/use-sidebar";
import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";
import { DashboardNav, NavItem } from "./dashboard-nav";
import logo from "@public/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/app/components/ui/separator";
import useHotelNavItems from "../routes/routes";

interface SidebarProps extends NavItem {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const { topNavItems, bottomNavItems } = useHotelNavItems();

  const handleToggle = () => {
    toggle();
  };
  console.log(bottomNavItems)

  return (
    <aside
      className={cn(
        `relative bg-red-700 hidden hscre flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-60" : "w-[72px]",
        className
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4  ">
        <div className="px-3 py-2">
          <Link
            href="/"
            className={`${
              isMinimized ? "justify-center" : ""
            } flex items-center space-x-2 my-4`}
          >
            <Image src={logo} alt="Funtrail Logo" width={36} height={36} />{" "}
            {!isMinimized && (
              <span className="text-xl font-bold">Funtrail</span>
            )}
          </Link>

          <div className="mt-3 space-y-1 ">
            <DashboardNav items={topNavItems} />
          </div>
          <Separator className="my-2" />
          <div className="mt-3 space-y-1 ">
            <DashboardNav items={bottomNavItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
