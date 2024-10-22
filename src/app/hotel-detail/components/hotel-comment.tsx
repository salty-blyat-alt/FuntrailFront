import { Textarea } from "@/app/components/ui/textarea";
import CommentCard from "./comment-card";
import useAxios from "@/app/hooks/use-axios";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { toast } from "@/app/hooks/use-toast";

export interface CommentProps {
  id: number;
  username: string;
  context: string;
  star: number;
  user_id: number;
  hotel_id: number;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
  commented_at: string;
  replies?: ReplyProps[];
}

export interface ReplyProps {
  id: number;
  context: string;
  star: number;
  user_id: number;
  hotel_id: number;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
  commented_at: string;
  username: string;
  profile_img: string | null;
}

const HotelComment = ({ hotel_id }: { hotel_id: string }) => {
  const [newRating, setNewRating] = useState(0);

  const { triggerFetch: fetchComments, responseData: comments } = useAxios<
    CommentProps[],
    undefined
  >({
    endpoint: `/api/comment/show/${hotel_id}`,
    config: {},
    method: "GET",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    context: string;
    star: number;
    hotel_id: number;
  }>();

  const {
    triggerFetch: addComment,
    responseData: success,
    finished,
  } = useAxios<
    any,
    {
      context: string;
      star: number;
      hotel_id: number;
    }
  >({
    endpoint: `/api/comment/create`,
    config: {},
    method: "POST",
  });

  useEffect(() => {
    fetchComments?.();
  }, [finished]);

  useEffect(() => {
    if (finished) {
      reset();
      setNewRating(0);
      toast({
        title: "Success",
        description: "Comment added successfully",
        variant: "success",
      });
    }
  }, [finished]);
  console.count();
  const onSubmit: SubmitHandler<{
    context: string;
    star: number;
    hotel_id: number;
  }> = async (data) => {
    const formData = {
      context: data.context,
      star: newRating, // Use the newRating state
      hotel_id: Number(hotel_id),
    };

    addComment?.(formData); // Call the addComment function with the form data
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Guest Comments ({comments?.length || 0})
      </h2>
      <div className="space-y-4 mb-6">
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            refetchComments={fetchComments}
            comment={comment}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-semibold mb-2">Leave a comment</h3>
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                star <= newRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
              onClick={() => setNewRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Write your comment here..."
          {...register("context", { required: "Comment cannot be blank" })}
          className="mb-2"
        />
        {errors.context && (
          <p className="text-red-500 text-sm">{errors.context.message}</p>
        )}
        <Button type="submit" disabled={newRating === 0}>
          Comment
        </Button>
      </form>
    </div>
  );
};

export default HotelComment;
