"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useAuth } from "../context/auth-context";
import AddRoom from "./add-room";
import RegisterHotel from "./register-hotel";
import { useState, useEffect } from "react";

const CreateHotel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize state from localStorage or default to "register"
    return localStorage.getItem("activeTab") || "register";
  });

  useEffect(() => {
    if (user?.user_type === "hotel") {
      setActiveTab("add-room");
    }
  }, [user]);

  const handleRegistrationComplete = () => {
    setActiveTab("add-room"); // Change to "add-room" tab when registration is complete
  };

  // Update localStorage whenever the active tab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div>
      <Tabs
        className="w-full max-w-2xl mx-auto"
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="register" disabled={activeTab === "add-room"}>
            Register
          </TabsTrigger>
          <TabsTrigger value="add-room" disabled={activeTab === "register"}>
            Rooms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <RegisterHotel onRegistrationComplete={handleRegistrationComplete} />
        </TabsContent>
        <TabsContent value="add-room">
          <AddRoom />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateHotel;