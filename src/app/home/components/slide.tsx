import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const Slide = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className=" text-2xl font-bold leading-none tracking">
          {title || "Explore Cambodia"}
        </h2>
        <p className="muted">
          {subtitle ||
            "Angkor Wat, a magnificent temple complex in Cambodia, is renowned for its intricate architecture and historical significance. Stunning and iconic."}
        </p>
      </div> 
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6 ">
              <Link href="/">
                <Image
                  key={index}
                  className="rounded-md"
                  src="https://via.placeholder.com/300"
                  alt="placeholder"
                  width={300}
                  height={300}
                />
              </Link>
              Typograph
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
