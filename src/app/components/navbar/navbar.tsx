"use client";

import { ModeToggle } from "@/theme/toggle-theme";
import logo from "@public/logo/logo.svg";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 py-4 px-4 bg-background">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" className="size-9" />
              <span className="text-xl font-bold">Funtrail</span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dropdown for "Join Us" */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">Join Us</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/register-hotel" passHref>
                <DropdownMenuItem>Register Hotel</DropdownMenuItem>
              </Link>
              <Link href="/register-restaurant" passHref>
                <DropdownMenuItem>Register Restaurant</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/auth/login" passHref>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href="/auth/register" passHref>
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mode Toggle Button */}
          <ModeToggle />

          {/* Burger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Join Us dropdown for mobile */}
              <DropdownMenuItem>
                <Link href="/register-hotel" className="w-full">
                  Register Hotel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/register-restaurant" className="w-full">
                  Register Restaurant
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login" className="w-full">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/register" className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
