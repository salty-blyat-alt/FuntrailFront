import { LayoutDashboard, ListOrdered, Settings, Wrench } from "lucide-react";
import { NavItem } from "../components/dashboard-nav";

export const restaurantNavItem: NavItem[] = [
  // replace all the /id/ with :id
  {
    title: "Dashboard",
    href: "/dashboard/restaurant/id",
    icon: <LayoutDashboard className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "LayoutDashboard",
  },
  {
    title: "Manage",
    href: "/dashboard/restaurant/id/manage",
    icon: <Wrench className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "User",
  },
  {
    title: "Orders",
    href: "/dashboard/restaurant/id/orders",
    icon: <ListOrdered className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "User",
  },
  {
    title: "Setting",
    href: "/dashboard/restaurant/id/setting",
    icon: <Settings className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "Setting",
  },
];


export const hotelNavItem: NavItem[] = [
  // replace all the /id/ with :id
  {
    title: "Dashboard",
    href: "/dashboard/hotel/id",
    icon: <LayoutDashboard className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "LayoutDashboard",
  },
  {
    title: "Manage",
    href: "/dashboard/hotel/id/manage",
    icon: <Wrench className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "User",
  },
  {
    title: "Orders",
    href: "/dashboard/hotel/id/orders",
    icon: <ListOrdered className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "User",
  },
  {
    title: "Setting",
    href: "/dashboard/hotel/id/setting",
    icon: <Settings className="ml-3 size-5 flex-none" />, // Store the icon component directly
    label: "Setting",
  },
];
