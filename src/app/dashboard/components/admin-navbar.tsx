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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 right-0 z-50 w-full md:w-1/5 h-16 bg-background "
      >
        <div className="mx-auto px-6 h-full flex items-center justify-end">
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-700" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>
            {user && (
              <>
                <Button
                  onClick={() => router.push("/order-history")}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsUserMenuOpen((prev) => !prev);
                    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu if open
                  }}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Button>

                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                      >
                        <LogOut className="h-5 w-5 inline mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100 transition duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 bg-background md:hidden max-w-xs w-full h-full"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                {user?.user_type !== "hotel" && (
                  <Link href="/register-hotel" onClick={() => setIsMobileMenuOpen(false)}>Join Us</Link>
                )}
                {user?.user_type === "hotel" && (
                  <Link href="/dashboard/hotel/id" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                )}
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                    <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                      <LogOut className="h-5 w-5 mr-2" />Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                  </>
                )}
                <Button variant="ghost" className="justify-start" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogFooter>
            <Button onClick={() => setIsLogoutDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={confirmLogout}>Confirm Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
