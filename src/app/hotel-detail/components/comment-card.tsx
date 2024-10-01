import { Card, CardContent } from "@/app/components/ui/card";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { StarIcon } from "lucide-react";
 
interface CommentCardProps {
  comment: {
    id: number;
    author: string;
    rating: number;
    content: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card key={comment.id}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-semibold">{comment.author}</h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < comment.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <p>{comment.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
