import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { HotelProps } from "@/app/constant/constant";

const List = ({ item }: { item: HotelProps }) => {
  const {
    thumbnail,
    average_stars,
    name,
    address,
    rating_label,
    total_comments,
    description,
  } = item;

  const imageUrl = thumbnail?.startsWith("https://via.placeholder.com")
    ? thumbnail
    : thumbnail
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${thumbnail}`
    : "https://placehold.co/600x400";

  return (
    <Card>
      <CardContent className="p-4 flex flex-row sm:flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Image
            width={300}
            height={300}
            src={imageUrl}
            alt={name}
            className="size-64 aspect-square object-cover rounded"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg md:text-xl font-bold">{name}</h2>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <MapPinIcon className="mr-1 h-4 w-4" /> {address}
              </div>
            </div>
            <div className="text-right">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">
                {average_stars ?? "Unrated"}
              </span>{" "}
              <br />
              <span className="text-xs md:text-sm text-nowrap">
                {rating_label ?? "Unrated"}
              </span>
              <br />
              <span className="text-xs md:text-sm text-muted-foreground">
                {total_comments ?? "Unavailable"} reviews
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm md:text-base">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default List;
