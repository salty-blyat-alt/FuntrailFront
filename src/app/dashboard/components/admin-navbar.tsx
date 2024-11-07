import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { NavLink, UserMenu } from "@/app/components/navbar/navbar";
import Image from "next/image";

export function AdminNavbar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setUser, user } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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

  const handleLogout = () => setIsLogoutDialogOpen(true);

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
    await triggerLogout?.(new FormData());
    deleteCookie("access_token");
    deleteCookie("establishment_id");
    deleteCookie("user");
    setIsLogoutDialogOpen(false);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50"
      >
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            {user?.user_type !== "hotel" && (
              <Button size="sm" onClick={() => router.push("/register-hotel")}>
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
                    href={`/dashboard/hotel/${user?.establishment_id}`}
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
