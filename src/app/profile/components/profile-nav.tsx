"use client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Settings, User } from "lucide-react";

const ProfileNav = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "account", icon: Settings, label: "Account" }, 
  ];
  return (
    <Card className="w-full md:w-64 h-fit">
      <CardHeader>
        <CardTitle>Navigation</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ProfileNav;
