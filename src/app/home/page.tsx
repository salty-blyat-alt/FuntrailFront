"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import SearchGroup from "./components/search-group";
import { Hero } from "./components/hero";
import GridCard from "./components/grid-card";
import Slide from "./components/slide";
import { BentoGrid } from "./components/bento-grid";

 

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <SearchGroup />
      </div>
      <main className="container relative mx-auto space-y-16 px-6 md:px-16">
        {/* Popular section */} 
          <GridCard /> 
 
          <Slide
            title={"Affordable options"}
            subtitle={"Find the best deals that won't break the bank."}
          /> 

        {/* Genius card section */}
 
          <BentoGrid className="mt-12" />
     

 
          <Slide
            title={"Eat with us for small cost"}
            subtitle={"Delicious meals at prices you'll love."}
          />
  
      </main>
    </>
  );
}