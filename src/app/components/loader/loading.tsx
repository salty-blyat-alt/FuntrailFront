"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import logo from "@public/logo/logo.svg";

const Loading = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100); // Delay the fade-in effect slightly for smoothness
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col bg-primary text-primary-foreground  justify-center items-center fixed top-0 left-0 right-0 bottom-0 h-screen z-[100] transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Logo and brand */}
        <div className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <div className="flex flex-col">
            <span className="text-2xl   font-bold tracking-wide">
              Funtrail
            </span>
            <p className="text-  text-sm flex items-baseline">
              Please wait while we load your experience{" "}
              <PulseLoader size={2} color="rgba(107, 114, 128, 1)" />
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loading;
