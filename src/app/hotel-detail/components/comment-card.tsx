import { useEffect, useRef, useState } from "react";
import { Card } from "@components/ui/card";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { EllipsisVertical, PenIcon, StarIcon, Trash } from "lucide-react";
import { CommentProps } from "./hotel-comment";
import { useAuth } from "@/app/context/auth-context";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/app/hooks/use-axios";
import { toast } from "@/app/hooks/use-toast";
import Reply from "./reply";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

const CommentCard = ({
  comment,
  refetchComments,
}: {
  comment: CommentProps;
  refetchComments: ((data?: undefined) => void) | undefined;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReply, setIsEditingReplying] = useState(false);
  const [replyContext, setReplyContext] = useState("");
  const [context, setContext] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const {
    triggerFetch: addReply,
    responseData: successReply,
    finished: finishedReply,
    responseDataWithStat: errorCreateStat,
    error,
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
    responseDataWithStat: errorDeleteStat,
    error: errorDelete,
    finished: deleteFinished,
  } = useAxios<any, any>({
    endpoint: `/api/comment/delete`,
    method: "POST",
    config: {},
  });

  const {
    triggerFetch: editComment,
    responseData: editSuccess,
    responseDataWithStat: errorEditStat,
    error: errorEdit,
    finished: editFinished,
  } = useAxios<any, any>({
    endpoint: `/api/comment/update`,
    method: "POST",
    config: {},
  });

  const handleEdit = (id: number) => {
    if (id) {
      editComment?.({ id: id, context: context });
      refetchComments?.();
    }
  };

  const handleEditReply = (id: number) => {
    if (id) {
      editComment?.({ id: id, context: replyContext });
      refetchComments?.();
    }
  };

  useEffect(() => {
    if (editSuccess && editFinished) {
      toast({
        title: "Success",
        description: "Comment edit successfully.",
        variant: "success",
      });
      refetchComments?.();
    }
  }, [editSuccess, editFinished]);

  useEffect(() => {
    if (errorEditStat && errorEdit && editFinished) {
      toast({
        title: "Success",
        description: "Comment edit successfully.",
        variant: "success",
      });
      refetchComments?.();
    }
  }, [errorEditStat, errorEdit, editFinished]);

  useEffect(() => {
    if (successDelete && deleteFinished) {
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
        variant: "success",
      });
      refetchComments?.();
    }
  }, [successDelete, deleteFinished]);

  const handleDelete = () => {
    const id = comment?.id;
    if (id) {
      deleteComment?.({ id: id });
    }
  };

  const handleDeleteReply = (id: number) => {
    if (id) {
      deleteComment?.({ id: id });
      refetchComments?.();
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

  const truncatedText = comment.context.slice(0, 100);
  const isLongText = comment.context.length > 100;

  useEffect(() => {
    if (errorCreateStat && error) {
      toast({
        title: "Failed to comment",
        description:
          errorCreateStat?.result_message +
          ". code: " +
          errorCreateStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorCreateStat, error]);

  useEffect(() => {
    if (errorDeleteStat && errorDelete) {
      toast({
        title: "Failed to delete",
        description:
          errorDeleteStat?.result_message +
          ". code: " +
          errorDeleteStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorDeleteStat, errorDelete]);

  useEffect(() => {
    reset();
    refetchComments?.();
  }, [successReply, finishedReply]);
  useEffect(() => {
    refetchComments?.();
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
      <div className="p-4">
        {/* <CardContent > */}

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
                <Popover>
                  <PopoverTrigger asChild>
                    <EllipsisVertical className="rounded-full p-1   cursor-pointer transition-all duration-200 ease-in-out" />
                  </PopoverTrigger>
                  <PopoverContent className="w-28 p-2 border rounded-lg shadow-lg   space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start px-2 py-1 text-sm rounded   transition-colors duration-200 ease-in-out"
                      onClick={() => {
                        setContext(comment.context)
                        setIsEditing(true)}}
                    >
                      <PenIcon className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start px-2 py-1 text-sm rounded   transition-colors duration-200 ease-in-out"
                      onClick={handleDelete}
                    >
                      <Trash className="mr-2 h-4 w-4 text-red-500" />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
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
            {isEditing ? (
              <div>
                {/* Shadcnui Text Input with comment context as the initial value */}
                <Input
                  type="text"
                  className="shadcnui-input" // Apply Shadcnui styles as needed
                  value={context} // Prefilled with current comment context
                  onChange={(e) => setContext(e.target.value)}
                />

                {/* Submit Button to save changes and toggle editing state */}
                <div className="flex gap-x-2 mt-2">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setIsEditing(false); // Change editing state on submit
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleEdit(comment.id);
                      setIsEditing(false); // Change editing state on submit
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
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
            )}

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
                    comment.replies?.map((reply) => (
                      <Reply
                        key={reply.id}
                        reply={reply}
                        context={replyContext}
                        handleEdit={() => handleEditReply(reply.id)}
                        setContext={setReplyContext} 
                        onDelete={() => handleDeleteReply(reply.id)}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No replies yet.
                    </p>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.profile_img ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <Input
                          type="text"
                          {...register("context", {
                            required: "Comment cannot be empty.",
                          })}
                          placeholder="Write a reply..."
                        />
                        {errors.context && (
                          <span className="text-red-500 text-xs">
                            {errors.context.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        onClick={() => setShowReplies(false)}
                        className="text-red-500"
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Reply</Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <Button
              size={"sm"}
              variant="link"
              onClick={() => {
                setShowReplies(true);
              }}
              className="px-0 text-sm text-blue-500 hover:underline"
            >
              Reply
            </Button>
          </div>
        </div>
        {/* </CardContent> */}
      </div>
    </Card>
  );
};

export default CommentCard;
