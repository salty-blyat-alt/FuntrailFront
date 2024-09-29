"use client";

import Image from "next/image";
import Link from "next/link";
import hero from "public/images/hero.png";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="relative h-[37rem] overflow-hidden">
      <Image
        src={hero}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        alt="Angkor Wat temple ruins with tree roots"
        className="backdrop-blur-sm backdrop-brightness-75"
        priority
      />

      <div className="absolute inset-0 bg-black/40">
        <div className="container mx-auto h-full px-4 py-8">
          <div className="flex h-full flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold text-white">
                Angkor Wat, magnificent temple complex in Cambodia
              </h1>
              <p className="mb-8 text-base text-white/80">
                Angkor Wat, a magnificent temple complex in Cambodia, stands as
                a testament to the architectural brilliance of the Khmer Empire.
                Its intricate designs and massive structures continue to awe
                visitors from around the world.
              </p>
              <Button size="lg">
                <Link href='/'>
                  Explore
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
