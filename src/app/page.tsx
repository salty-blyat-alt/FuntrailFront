import { BentoGrid } from "./components/bento-grid";
import GridCard from "./components/grid-card";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import Slide from "./components/slide";
import { ComboBox } from "./components/ui/combo-box";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <ComboBox className="absolute container -translate-x-1/2 -bottom-5 left-1/2 right-1/2" />
      </div>
      <main className="container relative mx-auto space-y-8 px-6 md:px-16">
        <BentoGrid className="mt-12" />
        <Slide />
        <GridCard />
      </main>
    </>
  );
}
