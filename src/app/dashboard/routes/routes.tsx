import {
  Bed,
  Hotel,
  House,
  LayoutDashboard,
  ListOrdered,
  Settings
} from "lucide-react";
import { NavItem } from "../components/dashboard-nav";
import { useAuth } from "@/app/context/auth-context";
import { ExitIcon } from "@radix-ui/react-icons";

// Define a function component
const useHotelNavItems = (): NavItem[] => {
  const { user } = useAuth(); // Use the hook inside a component

  return [
    {
      title: "Exit",
      href: "/",
      icon: <ExitIcon className="ml-3 size-5 flex-none" />,
      label: "LayoutDashboard",
    },
    {
      title: "Dashboard",
      href: `/dashboard/hotel/${user?.establishment_id}`, // Dynamically use user ID
      icon: <LayoutDashboard className="ml-3 size-5 flex-none" />,
      label: "LayoutDashboard",
    },
    {
      title: "Manage",
      href: `/dashboard/hotel/${user?.establishment_id}/manage`,
      icon: <Bed className="ml-3 size-5 flex-none" />,
      label: "User",
    },
    
    {
      title: "Orders",
      href: `/dashboard/hotel/${user?.establishment_id}/orders`,
      icon: <ListOrdered className="ml-3 size-5 flex-none" />,
      label: "User",
    },
   
    {
      title: "Setting",
      href: `/dashboard/hotel/${user?.establishment_id}/setting`,
      icon: <Settings className="ml-3 size-5 flex-none" />,
      label: "Setting",
    }, 
    {
      title: "Hotel Page",
      href: `/hotel-detail/${user?.establishment_id}`,
      icon: <Hotel className="ml-3 size-5 flex-none" />,
      label: "User",
    },
  ];
};

export default useHotelNavItems; // Export the function


