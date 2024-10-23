"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@hooks/use-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  label?: string;
  description?: string;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  // Separate the Home item from the rest
  const mainItems = items.filter((item) => item.href !== "/");
  const homeItem = items.find((item) => item.href === "/");

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {/* Render main items */}
        {mainItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                {item.icon}
                {isMobileNav || (!isMinimized && !isMobileNav) ? (
                  <span className="mr-2 truncate">{item.title}</span>
                ) : (
                  ""
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              align="center"
              side="right"
              sideOffset={8}
              className={!isMinimized ? "hidden" : "inline-block"}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Render the Home item at the bottom */} 
          {homeItem && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={homeItem.href || "/"}
                  className={cn(
                    "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === homeItem.href ? "bg-accent" : "transparent",
                    homeItem.disabled && "cursor-not-allowed opacity-80"
                  )}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  {homeItem.icon}
                  {isMobileNav || (!isMinimized && !isMobileNav) ? (
                    <span className="mr-2 truncate">{homeItem.title}</span>
                  ) : (
                    ""
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                className={!isMinimized ? "hidden" : "inline-block"}
              >
                {homeItem.title}
              </TooltipContent>
            </Tooltip>
          )} 
      </TooltipProvider>
    </nav>
  );
}
