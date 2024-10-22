import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { EllipsisVertical, StarIcon, Trash } from "lucide-react";
import { CommentProps } from "./hotel-comment";
import { useAuth } from "@/app/context/auth-context";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/app/hooks/use-axios";
import { toast } from "@/app/hooks/use-toast";

const CommentCard = ({
  comment,
  refetchComments,
}: {
  comment: CommentProps;
  refetchComments: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // State to handle options popup visibility
  // use for deletion
  const optionsRef = useRef(null);

  const toggleOptions = () => setShowOptions((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    triggerFetch: addReply,
    responseData: successReply,
    finished: finishedReply,
  } = useAxios<
    any,
    {
      context: string;
      hotel_id: number;
      parent_id: number;
    }
  >({
    endpoint: "/api/comment/create",
    method: "POST",
    config: {},
  });

  const {
    triggerFetch: deleteComment,
    responseData: successDelete,
    finished: deleteFinished,
  } = useAxios<any, any>({
    endpoint: `/api/comment/delete`, // Use a dynamic endpoint with the ID
    method: "POST",
    config: {},
  });

  const handleDelete = () => {
    const id = comment?.id; // Get the comment ID
    if (id) {
      deleteComment?.({ id: id });
      setShowOptions(false); // Close the options popup after deletion
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    context: string;
    hotel_id: number;
    parent_id: number;
  }>();
  const { user } = useAuth();

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleReplies = () => setShowReplies(!showReplies);

  // Determine whether to show the full comment or a truncated version
  const truncatedText = comment.context.slice(0, 100); // Show first 100 characters
  const isLongText = comment.context.length > 100;

  useEffect(() => {
    reset();
    refetchComments();
  }, [successReply, finishedReply]);

  useEffect(() => {
    refetchComments();
    toast({
      title: "Success",
      description: "Comment deleted successfully",
      variant: "success",
    });
  }, [successDelete, deleteFinished]);

  const onSubmit: SubmitHandler<{
    context: string;
    hotel_id: number;
    parent_id: number;
  }> = async (data) => {
    const formData = {
      context: data.context,
      hotel_id: comment?.hotel_id,
      parent_id: comment?.id,
    };
    addReply?.(formData);
  };

  return (
    <Card key={comment.id} className="shadow-lg rounded-lg mb-4 group relative">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg">{comment.username}</h4>
              <div className="flex items-center gap-x-2 relative">
                <span className="text-sm text-muted-foreground">
                  {comment.commented_at}
                </span>
                <EllipsisVertical
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-full transition-all duration-200 ease-in-out
             hover:bg-slate-100 cursor-pointer"
                  onClick={toggleOptions} // Toggle options popup on click
                />
                {/* Options popup */}
                {showOptions && (
                  <div className="absolute top-8 right-0 w-24 bg-white border rounded shadow-lg z-10">
                    <Button
                      ref={optionsRef}
                      variant="ghost"
                      className="w-full text-left p-2 text-sm hover:bg-gray-100"
                      onClick={handleDelete}
                    >
                      <Trash className="mr-2 h-4 w-4 text-red-500" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < comment.star
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>

            <p>
              {isExpanded ? comment.context : truncatedText}
              {isLongText && (
                <span
                  onClick={toggleExpand}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  {isExpanded ? "See Less" : "See More"}
                </span>
              )}
            </p>

            {/* Replies Section */}
            <div className="">
              {comment.replies?.length > 0 && (
                <Button
                  variant="link"
                  onClick={toggleReplies}
                  size={"sm"}
                  className="px-0 text-sm text-blue-500 hover:underline"
                >
                  {showReplies
                    ? "Hide Replies"
                    : `View Replies (${comment.replies?.length})`}
                </Button>
              )}

              {showReplies && (
                <div className="mt-2 pl-6 border-l-2 border-gray-200 space-y-4">
                  {comment.replies.length > 0 ? (
                    comment.replies.map((reply) => (
                      <div key={reply.id} className="space-y-1">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {reply.username.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-sm">
                              {reply.username}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {reply.commented_at}
                            </span>
                            <p className="text-gray-600">{reply.context}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No replies yet.
                    </p>
                  )}

                  {/* Reply Input */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.profile_img ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Input
                          type="text"
                          {...register("context", {
                            required: "Comment cannot be empty.",
                          })}
                          placeholder="Write a reply..."
                          className="w-full"
                        />
                        {errors.context && (
                          <span className="text-red-500 text-xs">
                            {errors.context.message}
                          </span>
                        )}
                      </div>
                      <Button type="submit">Reply</Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* New Reply Button */}
            <Button
              size={"sm"}
              variant="link"
              onClick={() => {
                setShowReplies(true); // Optionally show replies
              }}
              className="px-0 text-sm text-blue-500 hover:underline"
            >
              Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
