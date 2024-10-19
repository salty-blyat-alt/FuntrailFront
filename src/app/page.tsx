"use client";
import { useEffect, useState } from "react";
import { BentoGrid } from "./home/components/bento-grid";
import GridCard from "./home/components/grid-card";
import { Hero } from "./home/components/hero";
import Slide from "./home/components/slide";
import SearchGroup from "./home/components/search-group";
import Loading from "./components/loader/loading";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a 2-second loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (loading) {
    // Show loading screen while content is loading
    return <Loading />;
  }

  return (
    <>
      <div className="relative">
        <Hero />
        <SearchGroup />
      </div>
      <main className="container relative mx-auto space-y-16 px-6 md:px-16">
        {/* popular */}
        <GridCard />

        <Slide
          title={"Affordable options"}
          subtitle={"Find the best deals that won't break the bank."}
        />
        {/* genuius card */}

        <BentoGrid className="mt-12" />
        <Slide
          title={"Eat with us for small cost"}
          subtitle={"Delicious meals at prices you'll love."}
        />
      </main>
    </>
  );
}
