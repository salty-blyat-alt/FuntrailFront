"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Image from "next/image";
import { Badge } from "./badge";
import { Skeleton } from "./skeleton";

let interval: any;

type Card = {
  id: number;
  context: string;
  profile_img?: string;
  star?: number;
  user_id: number;
  hotel_id: number;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
  parent_id?: number | null;
  username: string;
  commented_at: string;
};

const CardStack = ({
  items,
  loading,
  offset,
  scaleFactor,
}: {
  items?: Card[];
  offset?: number;
  loading: boolean;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-full md:h-60">   
     {!cards || loading || cards.length === 0 ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] rounded-xl" /> 
        </div>
      ) : (
        cards?.map((card, index) => {
          if (!card) return null;
          return (
            <motion.div
              key={card.id}
              className="absolute dark:bg-black bg-white h-60 md:h-60 w-full rounded-3xl shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                zIndex: cards.length - index, // decrease z-index for the cards that are behind
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Featured Review</span>
                  <Badge variant="secondary">Most Recent</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      src={
                        card?.profile_img
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}${card.profile_img}`
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F508699%2Flandscape-placeholder&psig=AOvVaw0Qsr-gXg0s8vgvmuLubeB3&ust=1732184912751000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJizv8fZ6okDFQAAAAAdAAAAABAI" // Fallback image if no profile image is available
                      }
                      alt={card?.username}
                    />
                    <AvatarFallback>{card?.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{card?.username}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (card?.star ?? 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <Quote className="w-5 h-5 inline mr-1 text-gray-400" />
                      {card?.context}
                    </p>
                    <p className="text-sm text-gray-500">
                      Reviewed on {card?.commented_at}
                    </p>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          );
        })
      )}
    </div>
  );
};
const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

export { CardStack, Highlight };
