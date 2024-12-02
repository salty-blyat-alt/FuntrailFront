"use client";
import SearchGroup from "./components/search-group";
import { Hero } from "./components/hero";
import GridCard from "./components/grid-card"; 
import { BentoGrid } from "./components/bento-grid";
import GeniusCard from "./components/genius-card";
import Amenities from "./components/amenities";
import DisplayComments from "./components/display-comment";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <SearchGroup />
      </div>
      <main className="container relative mx-auto space-y-16 px-6 md:px-16">
        <Amenities />

        <GridCard />

        <DisplayComments /> 

        <BentoGrid className="mt-12" />

        {/* <GeniusCard title={""} subtitle={""} /> */}
      </main>
    </>
  );
}
