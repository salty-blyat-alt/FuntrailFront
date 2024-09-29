import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Image from 'next/image' 
import logo from "@public/images/hero.png"; 

const Slide = () => { 
  return (
    <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold leading-none tracking">
              Explore Cambodia
            </h2>
            <p className="text-muted-foreground">
              Angkor Wat, a magnificent temple complex in Cambodia, is renowned
              for its intricate architecture and historical significance.
              Stunning and iconic.
            </p>
          </div>
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <Image
                        src={logo}
                        alt="placeholder"
                        width={1000}
                        height={1000}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
  )
}

export default Slide
