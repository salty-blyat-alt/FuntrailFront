
import { BentoGrid } from "./home/components/bento-grid";
import GridCard from "./home/components/grid-card";
import { Hero } from "./home/components/hero";
import Slide from "./home/components/slide";
import SearchGroup from "./home/components/search-group";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <SearchGroup />
      </div>
      <main className="container relative mx-auto space-y-8 px-6 md:px-16">
        <BentoGrid className="mt-12" />
        <Slide
          title={"Affordable options"}
          subtitle={"Find the best deals that won't break the bank."}
        />
        
        <GridCard />
        <Slide
          title={"Eat with us for small cost"}
          subtitle={"Delicious meals at prices you'll love."}
        />
      </main>
    </>
  );
}
