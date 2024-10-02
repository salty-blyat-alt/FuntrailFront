import { ComboBox } from "./components/ui/combo-box";
import { BentoGrid } from "./home/components/bento-grid";
import GridCard from "./home/components/grid-card";
import { Hero } from "./home/components/hero";
import Slide from "./home/components/slide";

 

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <ComboBox className="absolute  px-6 container -translate-x-1/2 -bottom-5 left-1/2 right-1/2" />
      </div>
      <main className="container relative mx-auto space-y-8 px-6 md:px-16">
        
        {/* show popular provinces */}
        <BentoGrid className="mt-12" />

        {/* affordable option for hotels */}
        <Slide
          title={"Afforable options"}
          subtitle={"Find the best deals that won't break the bank."}
        />

        {/* show popular hotels / restaurant */}
        <GridCard />

        {/* affordable option for restaurant */}
        <Slide
          title={"Eat with us for small cost"}
          subtitle={"Delicious meals at prices you'll love."}
        />
      </main>
    </>
  );
}
