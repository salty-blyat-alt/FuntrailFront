"use client";

import { ThemeProvider } from "@/theme/theme-provider";
import localFont from "next/font/local";
import "../app/globals.css";
import { Navbar } from "./components/navbar/navbar";
import { Toaster } from "@components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./context/auth-context";
import Footer from "./components/footer/footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./components/loader/loading";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  // Simulate a loading time for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this duration as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const pathname = usePathname();
  const noLayoutPages = ["/auth/login", "/auth/register"];

  // Add pattern matching for dynamic hotel route
  const isDynamicHotelRoute = pathname.startsWith("/dashboard/hotel/");
  const isLayoutRequired =
    !noLayoutPages.includes(pathname) && !isDynamicHotelRoute;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Funtrail</title>
        <link rel="icon" href="/logo/logo.svg" />
        {/* Additional meta tags for better SEO */}
        <meta name="description" content="Explore fun trails and adventures." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
                  {isLayoutRequired && <Footer className="mt-32"/>}
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
