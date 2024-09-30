import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import hero from "@public/images/hero.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tab";
// Correct import for Next.js Link
import Link from "next/link";

const GridCard = () => {
  const items = [
    { image: "/path/to/image1.jpg", alt: "Image 1" },
    { image: "/path/to/image2.jpg", alt: "Image 2" },
    { image: "/path/to/image3.jpg", alt: "Image 3" },
  ];

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold leading-none tracking">
        Popular searches
      </h2>
      <Tabs defaultValue="hotel">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          value="hotel"
        >
         {items.map((item, index) => (
            <div key={index} className="w-full h-auto rounded-md overflow-hidden">
              <Link href="/"   passHref>
                <Image
                  src={hero} // Use item.image if available, otherwise default to hero
                  width={1000}
                  height={1000}
                  className="object-cover object-center hover:scale-110 duration-200 transition-all ease-in w-full h-auto" // Ensure the image covers the div while maintaining aspect ratio
                  alt={item.alt || "placeholder"} // Meaningful alt text fallback
                />
              </Link>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          value="restaurant"
        >
          {items.map((item, index) => (
            <div key={index} className="w-full h-auto rounded-md overflow-hidden">
              <Link href="/"   passHref>
                <Image
                  src={hero} // Use item.image if available, otherwise default to hero
                  width={1000}
                  height={1000}
                  className="object-cover object-center rounded-md hover:scale-110 duration-200 transition-all ease-in w-full h-auto" // Ensure the image covers the div while maintaining aspect ratio
                  alt={item.alt || "placeholder"} // Meaningful alt text fallback
                />
              </Link>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default GridCard;
