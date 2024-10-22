"use client";

import { useEffect, useState } from "react";
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
import { deleteCookie } from "cookies-next";
import { useAuth } from "@/app/context/auth-context";

export function Navbar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { setUser, user } = useAuth();
  const { toast } = useToast();

  const {
    triggerFetch: triggerLogout,
    error,
    responseData: response
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
  useEffect(() => {
    if (response) {
      setUser(null);
      toast({
        title: "Logged out successfully",
        variant: "success",
      });
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong during logout",
        variant: "destructive",
      });
    }
  }, [error]);

  const confirmLogout = async () => {
    const formData = new FormData();

    // Trigger the logout with FormData
    await triggerLogout?.(formData);

    // Delete the necessary cookies
    deleteCookie("access_token", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    deleteCookie("establishment_id", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    deleteCookie("user", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    // Check response status

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
            {user?.user_type !== "hotel" && (
              <Button>
                <Link href="/register-hotel">Join Us</Link>
              </Button>
            )}

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user?.profile_img ? (
                  <Image
                    width={300}
                    height={300}
                    src={process.env.NEXT_PUBLIC_BASE_URL + user.profile_img}
                    alt="User profile"
                    className="size-8 rounded-md hover:cursor-pointer"
                  />
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuLabel>Setting</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    {/* Login */}
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                    {/* Register */}
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user?.user_type === "hotel" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/hotel/id">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                {user && (
                  <DropdownMenuItem onSelect={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                )}
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
