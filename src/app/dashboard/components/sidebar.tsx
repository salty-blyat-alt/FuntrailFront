"use client";
import { useSidebar } from "@/app/hooks/use-sidebar";
import { cn } from "@/lib/utils";

import { ChevronLeft, LayoutDashboard, User, UserIcon } from "lucide-react";
import Link from "next/link";
import { DashboardNav, NavItem } from "./dashboard-nav";

interface SidebarProps extends NavItem  {
  className?: string;
  navItems: NavItem[];
};

export default function Sidebar({ className,navItems }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative  hidden hscre flex-none border-r bg-card transition-[width] duration-500 md:block`,
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
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
