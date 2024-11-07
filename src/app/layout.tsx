"use client";

import { ThemeProvider } from "@/theme/theme-provider";
import "../app/globals.css";
import { Navbar } from "./components/navbar/navbar";
import { Toaster } from "@components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/auth-context";
import Footer from "./components/footer/footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./components/loader/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();
  const dashboardPage = pathname.startsWith("/dashboard/hotel/");
  const authPages = ["/auth/register", "/auth/login"];
  
  // Check if `pathname` matches any of the `authPages`
  const showNoFooter = dashboardPage || authPages.includes(pathname);
  
  // Define `showNoNavbar` as `dashboardPage` if needed
  const showNoNavbar = dashboardPage;
  

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Funtrail</title>
        <link rel="icon" href="/logo/logo.svg" />
        <meta name="description" content="Explore fun trails and adventures." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            themes={["light", "dark", "purple"]}
          >
            <TooltipProvider>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {!showNoNavbar && <Navbar />}
                  <main className={!showNoNavbar ? "mt-12" : ""}>
                    {children} 
                  </main>
                  {!showNoFooter && <Footer className="mt-32" />}
                </>
              )}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
