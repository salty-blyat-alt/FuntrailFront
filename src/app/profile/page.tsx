"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Edit2, Save } from "lucide-react";
import ProfileNav from "./components/profile-nav";
import Account from "./components/account";
import Profile from "./components/profile";
import RecentActivity from "./components/recent-activity";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileNav
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
              <Button variant="outline" size="icon" onClick={toggleEdit}>
                {isEditing ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isEditing ? "Save changes" : "Edit profile"}
                </span>
              </Button>
            </div>
            <CardDescription>
              Manage your profile information and settings
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeSection === "profile" && (
                <Profile isEditing={isEditing} toggleEdit={toggleEdit} />
              )}
              {activeSection === "account" && <Account />}
              {activeSection === "activity" && <RecentActivity />}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
