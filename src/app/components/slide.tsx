import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import logo from "@public/images/hero.png";
import Link from "next/link";

const Slide = () => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-2xl font-bold leading-none tracking">
          Explore Cambodia
        </h2>
        <p className="text-muted-foreground">
          Angkor Wat, a magnificent temple complex in Cambodia, is renowned for
          its intricate architecture and historical significance. Stunning and
          iconic.
        </p>
      </div>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem className="basis-1/3 md:basis-1/4 lg:basis-1/5 ">
              <Link href="/">
                <Image
                  key={index}
                  className="rounded-md"
                  src={logo}
                  alt="placeholder"
                  width={1000}
                  height={1000}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Slide;
