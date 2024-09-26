"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@components/ui/card'
import placeholder from "@public/images/hero.png";
import Image from "next/image";

interface BentoItemProps {
    title: string;
    description: string;
    imageSrc: string;
}

export function BentoGrid() {
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
        <section>
            <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <Card key={index} className={index === 0 ? 'md:col-span-2' : ''}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={item.imageSrc}
                                alt={item.title}
                                width={500}
                                height={300}
                                className="rounded-md object-cover w-full h-auto md:h-[200px]"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
