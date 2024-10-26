"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X, LogOut, Sun, Moon, ShoppingCart } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";
import { useToast } from "@/app/hooks/use-toast";
import useAxios from "@/app/hooks/use-axios";
import { deleteCookie } from "cookies-next";
import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@components/ui/dialog";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setUser, user } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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

  useEffect(() => {
    if (response) {
      setUser(null);
      toast({
        title: "Logged out successfully",
        variant: "success",
      });
    }
  }, [response, setUser, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong during logout",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const confirmLogout = async () => {
    const formData = new FormData();
    await triggerLogout?.(formData);
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
    setIsLogoutDialogOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const router = useRouter();
  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo/logo.svg"
                alt="Funtrail Logo"
                width={36}
                height={36}
              />
              <span className="text-xl font-bold">Funtrail</span>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/search">Explore</NavLink>

              {user?.user_type === "hotel" && (
                <NavLink href="/dashboard/hotel/id">Dashboard</NavLink>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {user?.user_type !== "hotel" && (
                <Button
                  size="sm"
                  onClick={() => router.push("/register-hotel")}
                >
                  Join Us
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {user && (
                <Button
                  onClick={() => router.push("/order-history")}
                  variant="ghost"
                  size="icon"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              )}

              <UserMenu user={user} handleLogout={handleLogout} />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/logo/logo.svg"
                    alt="Funtrail Logo"
                    width={36}
                    height={36}
                  />
                  <span className="text-xl font-bold">Funtrail</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                <NavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </NavLink>
                {user?.user_type !== "hotel" && (
                  <NavLink
                    href="/register-hotel"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Us
                  </NavLink>
                )}
                {user?.user_type === "hotel" && (
                  <NavLink
                    href="/dashboard/hotel/id"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}
                {user ? (
                  <>
                    <NavLink
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <NavLink
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 mr-2" />
                  ) : (
                    <Moon className="h-5 w-5 mr-2" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

function NavLink({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href || "#"}
      className="text-muted-foreground hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function UserMenu({ user, handleLogout }) {
  return (
    <div className="relative group">
      <Button variant="ghost" className="p-2">
        {user?.profile_img ? (
          <Image
            width={70}
            height={70}
            src={process.env.NEXT_PUBLIC_BASE_URL + user.profile_img}
            alt="User profile"
            className="rounded-full size-7 object-cover object-center"
          />
        ) : (
          <User className="size-5" />
        )}
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg invisible group-hover:visible transition-all duration-300"
      >
        {user ? (
          <div className="py-1">
            <div className="py-1 px-4 border-b  ">
              <p className="text-sm font-semibold  ">
                Logged in as {user.username}
              </p>
              <p className="text-xs  text-muted-foreground">{user.email}</p>
            </div>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm hover:bg-muted"
            >
              Profile
            </Link>
            {user.user_type === "hotel" && (
              <Link
                href="/dashboard/hotel/id"
                className="block px-4 py-2 text-sm hover:bg-muted"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="py-1">
            <Link
              href="/auth/login"
              className="block px-4 py-2 text-sm hover:bg-muted"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="block px-4 py-2 text-sm hover:bg-muted"
            >
              Register
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
