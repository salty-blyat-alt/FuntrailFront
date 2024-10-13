"use client";

import { useState } from "react";
import { ModeToggle } from "@/theme/toggle-theme";
import logo from "@public/logo/logo.svg";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAxios from "@/app/hooks/use-axios";
import { useToast } from "@/app/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";

export function Navbar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { toast } = useToast();

  const {
    triggerFetch: triggerLogout,
    error,
    responseData: response,
  } = useAxios<any, any>({
    endpoint: "/api/auth/logout",
    method: "POST",
    config: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = async () => {
    await triggerLogout?.();

    if (response) {
      toast({
        title: "Logged out successfully",
        variant: "success",
      });
    } else if (error) {
      toast({
        title: "Something went wrong during logout",
        variant: "destructive",
      });
    }

    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] py-4 px-4 shadow bg-background">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src={logo} alt="Logo" width={36} height={36} />
                <span className="text-xl font-bold">Funtrail</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="flex items-center space-x-2">
            {/* Dropdown for "Join Us" */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">Join Us</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/register-hotel">Register Hotel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register-restaurant">Register Restaurant</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden"
                >
                  <User className="h-4 w-4" />
                  {/* Uncomment for production */}
                  {/* <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  /> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/hotel/id">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </div>
      </nav>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogFooter>
            <Button
              onClick={() => setIsLogoutDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={confirmLogout}>Confirm Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
