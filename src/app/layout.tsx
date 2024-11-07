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
  // const noLayoutPages =  ["/auth/login", "/auth/register"];
  const noLayoutPages = [""];

  const isDynamicHotelRoute = pathname.startsWith("/dashboard/hotel/");
  const isLayoutRequired =
    !noLayoutPages.includes(pathname) && !isDynamicHotelRoute;

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
                  {isLayoutRequired && <Navbar />}
                  <main className={isLayoutRequired ? "mt-12" : ""}>
                    {children}
                  </main>
                  {isLayoutRequired && <Footer className="mt-32" />}
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
