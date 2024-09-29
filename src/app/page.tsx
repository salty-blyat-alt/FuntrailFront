import { BentoGrid } from "./components/bento-grid";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import Slide from "./components/slide";

export default function Home() { 
  return (
    <>
      <Navbar />
      <Hero />
      <main className="container mx-auto space-y-8 px-6 md:px-16">
        
        <BentoGrid className="mt-4" />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
      </main>
    </>
  );
}
