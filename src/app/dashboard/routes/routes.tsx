import {
  Bed,
  Hotel,
  LayoutDashboard,
  ListOrdered,
  Settings,
} from "lucide-react";
import { NavItem } from "../components/dashboard-nav";
import { useAuth } from "@/app/context/auth-context";
import { ExitIcon } from "@radix-ui/react-icons";

// Define a function component
const useHotelNavItems = () => {
  const { user } = useAuth(); // Use the hook inside a component

  const topNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/hotel/${user?.establishment_id}`, // Dynamically use user ID
      icon: <LayoutDashboard className="ml-3 size-5 flex-none" />,
      label: "Dashboard",
    },
    {
      title: "Manage",
      href: `/dashboard/hotel/${user?.establishment_id}/manage`,
      icon: <Bed className="ml-3 size-5 flex-none" />,
      label: "Manage",
    },
    {
      title: "Orders",
      href: `/dashboard/hotel/${user?.establishment_id}/orders`,
      icon: <ListOrdered className="ml-3 size-5 flex-none" />,
      label: "Orders",
    },
    {
      title: "Setting",
      href: `/dashboard/hotel/${user?.establishment_id}/setting`,
      icon: <Settings className="ml-3 size-5 flex-none" />,
      label: "Setting",
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      title: "Hotel Page",
      href: `/hotel-detail/${user?.establishment_id}`,
      icon: <Hotel className="ml-3 size-5 flex-none" />,
      label: "User",
    },
    {
      title: "Exit",
      href: "/",
      icon: <ExitIcon className="ml-3 size-5 flex-none" />,
      label: "Exit",
    },
  ];
  // Return topNavItems and bottomNavItems separately
  return { topNavItems, bottomNavItems };
};

export default useHotelNavItems; // Export the function
