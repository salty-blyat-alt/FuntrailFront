"use client";

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
        <h2>
          Trending Destination
        </h2>
        <p className="muted">
          Angkor Wat, a magnificent temple complex in Cambodia, is renowned for
          its intricate architecture and historical significance. Stunning and
          iconic.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Link
            className={`overflow-hidden h-52 rounded-md ${
              index === 0 ? "col-span-2" : ""
            } `}
            href="/"
          >
            <Image
              key={index}
              src='https://via.placeholder.com/300'
              alt={item.title}
              width={500}
              height={300}
              className={`rounded-md h-full w-full object-cover`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
