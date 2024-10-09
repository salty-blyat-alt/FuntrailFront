"use client";

import { Button } from "@/app/components/ui/button"; 
import PageContainer from "@/app/dashboard/components/page-container";
import DashboardLayout from "@/app/dashboard/dashboard-layout";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { restaurantNavItem } from "../page";
import AddRestaurantDialog from "./components/add-restaurant-dialog"; // Import Add Restaurant dialog component
import AddMenuDialog from "./components/add-menu-dialog"; // Import Add Menu dialog component
import CustomTable, { HeaderProps } from "@/app/components/custom-table/custom-table";

const Manage = () => {
  // States for the Restaurant and Menu Dialogs
  const [openRestaurantDialog, setOpenRestaurantDialog] = useState<boolean>(false);
  const [openMenuDialog, setOpenMenuDialog] = useState<boolean>(false);

  // Example restaurant data (replace with your dynamic data from an API or state)
  const restaurantData = [
    {
      id: 1,
      restaurant_name: "Le Tonle", // Name of the restaurant
      location: "Kratie, Cambodia", // Restaurant location
      contact: "012-345-6789", // Contact number
      status: "Active", // Status of the restaurant
    },
    {
      id: 2,
      restaurant_name: "Khmer Delight",
      location: "Phnom Penh, Cambodia",
      contact: "098-765-4321",
      status: "Draft",
    },
  ];

  // Example menu data (replace with your dynamic data from an API or state)
  const menuData = [
    {
      id: 1,
      menu_name: "Breakfast Menu", // Name of the menu
      items: "Pancakes, Coffee, Eggs", // Sample items in the menu
      status: "Active", // Status of the menu
    },
    {
      id: 2,
      menu_name: "Lunch Menu",
      items: "Burger, Salad, Soup",
      status: "Draft",
    },
  ];

  // Headers for restaurant and menu tables
  const restaurantHeaders: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "restaurant_name", label: "Restaurant Name", hidden: false },
    { key: "location", label: "Location", hidden: false },
    { key: "contact", label: "Contact", hidden: false },
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ];

  const menuHeaders: HeaderProps[] = [
    { key: "id", label: "ID", hidden: true },
    { key: "menu_name", label: "Menu Name", hidden: false },
    { key: "items", label: "Items", hidden: false },
    { key: "status", label: "Status", hidden: false },
    { key: "actions", label: "Actions", hidden: false },
  ];

  // Handlers for edit and delete actions (restaurants and menus)
  const handleEditRestaurant = (restaurantId: number) => {
    console.log(`Edit restaurant with ID: ${restaurantId}`);
    // Logic for editing the restaurant
  };

  const handleDeleteRestaurant = (restaurantId: number) => {
    console.log(`Delete restaurant with ID: ${restaurantId}`);
    // Logic for deleting the restaurant
  };

  const handleEditMenu = (menuId: number) => {
    console.log(`Edit menu with ID: ${menuId}`);
    // Logic for editing the menu
  };

  const handleDeleteMenu = (menuId: number) => {
    console.log(`Delete menu with ID: ${menuId}`);
    // Logic for deleting the menu
  };

  return (
    <DashboardLayout navItems={restaurantNavItem}>
      <PageContainer scrollable={true}>

        {/* Restaurant Management Section */}
        <div className="flex mb-2 justify-between">
          <h2>Restaurant Management</h2>
          <Button
            onClick={() => setOpenRestaurantDialog(true)} // Open restaurant dialog
            variant="outline"
          >
            <PlusIcon className="mr-2" /> Add Restaurant {/* Optional icon */}
          </Button>
          {/* Add Restaurant Dialog */}
          <AddRestaurantDialog
            isOpen={openRestaurantDialog}
            onClose={() => setOpenRestaurantDialog(false)}
          />
        </div>
        <CustomTable
          title="Restaurants"
          subtitle="Manage your restaurants"
          data={restaurantData}
          onEdit={handleEditRestaurant}
          onDelete={handleDeleteRestaurant}
          headers={restaurantHeaders}
        />

        {/* Menu Management Section */}
        <div className="flex mb-2 justify-between mt-6">
          <h2>Menu Management</h2>
          <Button
            onClick={() => setOpenMenuDialog(true)} // Open menu dialog
            variant="outline"
          >
            <PlusIcon className="mr-2" /> Add Menu {/* Optional icon */}
          </Button>
          {/* Add Menu Dialog */}
          <AddMenuDialog
            isOpen={openMenuDialog}
            onClose={() => setOpenMenuDialog(false)}
          />
        </div>
        <CustomTable
          title="Menus"
          subtitle="Manage your menus"
          data={menuData}
          onEdit={handleEditMenu}
          onDelete={handleDeleteMenu}
          headers={menuHeaders}
        />
      </PageContainer>
    </DashboardLayout>
  );
};

export default Manage;
