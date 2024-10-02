import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

interface ListProps {
  item: {
    imageSrc: string; // URL of the image
    title: string; // Title of the item
    distance: string; // Distance description
    rating: number; // Rating value
    reviewCount: number; // Number of reviews
    description: string; // Description of the item
  };
}

const List: React.FC<ListProps> = ({ item }) => {
  const { imageSrc, title, distance, rating, reviewCount, description } = item;

  return (
    <Card>
      <CardContent className="p-4 flex flex-row sm:flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Image
            width={300}
            height={300}
            src={imageSrc}
            alt={title}
            className="size-64 aspect-square object-cover rounded"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg md:text-xl font-bold">{title}</h2>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <MapPinIcon className="mr-1 h-4 w-4" /> {distance} from downtown
              </div>
            </div>
            <div className="text-right">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">
                {rating}
              </span>{" "}
              <br />
              <span className="text-xs md:text-sm text-nowrap">Very Good</span>
              <br />
              <span className="text-xs md:text-sm text-muted-foreground">
                {reviewCount} reviews
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm md:text-base">{description}</p>
          <Button className="mt-4">Show prices</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default List;
