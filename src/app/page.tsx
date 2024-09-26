import { BentoGrid } from "./components/bento-grid";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="container mx-auto">
        <BentoGrid />
      </main>
    </>
  );
}
