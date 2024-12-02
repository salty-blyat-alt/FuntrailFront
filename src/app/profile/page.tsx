"use client";

import { useState } from "react";
import ProfileNav from "./components/profile-nav";
import Account from "./components/account";
import Profile from "./components/profile";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 h-[50rem]">
      <ProfileNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "profile" && <Profile activeSection={activeSection} />}
      {activeSection === "account" && <Account activeSection={activeSection} />}
    </div>
  );
}
