"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import SearchGroup from "./components/search-group";
import { Hero } from "./components/hero";
import GridCard from "./components/grid-card";
import Slide from "./components/slide";
import { BentoGrid } from "./components/bento-grid";

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
          observer.unobserve(ref.current); // Stop observing once animated
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} // Start slightly below and transparent
      animate={controls} // Control the animation
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <SearchGroup />
      </div>
      <main className="container relative mx-auto space-y-16 px-6 md:px-16">
        {/* Popular section */}
        <AnimatedSection>
          <GridCard />
        </AnimatedSection>

        <AnimatedSection>
          <Slide
            title={"Affordable options"}
            subtitle={"Find the best deals that won't break the bank."}
          />
        </AnimatedSection>

        {/* Genius card section */}
        <AnimatedSection>
          <BentoGrid className="mt-12" />
        </AnimatedSection>

        <AnimatedSection>
          <Slide
            title={"Eat with us for small cost"}
            subtitle={"Delicious meals at prices you'll love."}
          />
        </AnimatedSection>
      </main>
    </>
  );
}