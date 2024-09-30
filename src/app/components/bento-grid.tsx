"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import placeholder from "@public/images/hero.png";
import Image from "next/image";
import Link from "next/link";

interface BentoItemProps {
  title: string;
  description: string;
  imageSrc: string;
}

export function BentoGrid({ className }) {
  const items: BentoItemProps[] = [
    {
      title: "Angkor Wat",
      description: "A magnificent temple complex in Cambodia",
      imageSrc: placeholder.src,
    },
    {
      title: "Royal Palace",
      description: "A golden palace with intricate architecture",
      imageSrc: placeholder.src,
    },
    {
      title: "Tropical Beach",
      description: "A serene beach with clear blue waters",
      imageSrc: placeholder.src,
    },
    {
      title: "Lush Forest",
      description: "A verdant forest with a rushing stream",
      imageSrc: placeholder.src,
    },
    {
      title: "Sandy Shore",
      description: "A peaceful beach with palm trees",
      imageSrc: placeholder.src,
    },
  ];

  return (
    <section className={className}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold leading-none tracking">
          Trending Destination
        </h2>
        <p className="text-muted-foreground">
          Angkor Wat, a magnificent temple complex in Cambodia, is renowned for
          its intricate architecture and historical significance. Stunning and
          iconic.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            className={`overflow-hidden  rounded-md ${
              index === 0 ? "md:col-span-2" : ""
            } `}
          >
            <Link href='/'>
              <Image
                key={index}
                src={item.imageSrc}
                alt={item.title}
                width={500}
                height={300}
                className={`rounded-md w-full hover:scale-110 duration-200 transition-all ease-in object-cover h-full `}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
