"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import useAxios from "@/app/hooks/use-axios";
import CommentCard from "./comment-card";
import CustomPagination from "@/app/components/custom-pagination/custom-pagination";
import { useToast } from "@/app/hooks/use-toast";
import { useAuth } from "@/app/context/auth-context";
import Image from "next/image";
import { Input } from "@/app/components/ui/input";

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

export interface PaginationProps {
  total: number;
  per_page: number;
  current_page: number;
  next_page_url: string | null;
}

export interface CommentResponseProps {
  items?: CommentProps[];
  paginate?: PaginationProps[];
}

export default function HotelComment({ hotel_id }: { hotel_id: string }) {
  const [newRating, setNewRating] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

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
    triggerFetch: fetchComments,
    loading,
    responseData: response,
  } = useAxios<any, undefined>({
    endpoint: `/api/comment/show/${hotel_id}`,
    config: {
      params: {
        page: page,
      },
    },
    method: "GET",
  });

  const {
    triggerFetch: addComment,
    responseData: success,
    error,
    finished,
    responseDataWithStat: errorStat,
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
    if (errorStat && error) {
      toast({
        title: "Failed",
        description:
          errorStat?.result_message + ". code: " + errorStat.result_code,
        variant: "destructive",
      });
    }
  }, [errorStat, error, toast]);

  useEffect(() => {
    fetchComments?.();
  }, [hotel_id, page]);

  useEffect(() => {
    if (finished && success) {
      reset();
      setNewRating(0);
      setShouldRefetch(true);
      setIsExpanded(false);
      toast({
        title: "Success",
        description: "Comment added successfully",
        variant: "default",
      });
    }
  }, [finished, success, reset, toast]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchComments?.();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, fetchComments]);

  const onSubmit: SubmitHandler<{
    context: string;
    star: number;
    hotel_id: number;
  }> = async (data) => {
    const formData = {
      context: data.context,
      star: newRating,
      hotel_id: Number(hotel_id),
    };
    addComment?.(formData);
  };

  const handleRefetch = useCallback(() => {
    setShouldRefetch(true);
  }, []);

  const comments = response?.items;
  const pagination = response?.paginate;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const { user } = useAuth();
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Guest Comments ({pagination?.total ?? 0})
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex  items-start space-x-4">
          <Avatar className="w-10 h-10">
            {user?.profile_img ? (
              <Image
                width={70}
                height={70}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_img}`}
                alt="User profile"
                className="rounded-full object-cover object-center w-full h-full"
              />
            ) : (
              <AvatarFallback>UN</AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col flex-grow">
            {" "}
            {/* Added relative positioning for the container */}
            <div className="relative">
              <input
                {...register("context", {
                  required: "Comment cannot be blank",
                })}
                placeholder="Add a comment..."
                onFocus={() => setIsExpanded(true)}
                onBlur={() => {
                  // Delay the collapse to allow click event on buttons
                  setTimeout(() => setIsExpanded(false), 300);
                }}
                className="w-full min-h-[40px] h-auto px-2 pb-2 border-none bg-transparent resize-none 
              focus:outline-none focus:ring-0"
              />
              <motion.div
                className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isExpanded ? 1 : 0 }} // Animate based on isExpanded state
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  backgroundColor: isExpanded ? "#3b82f6" : "#gray-300",
                }}
              />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between mt-2"
                >
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 cursor-pointer ${
                          star <= newRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                        onClick={() => setNewRating(star)}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsExpanded(false);
                        reset();
                        setNewRating(0);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={newRating === 0}>
                      Comment
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {errors.context && (
          <p className="text-red-500 text-sm mt-2">{errors.context.message}</p>
        )}
      </form>

      <div className="space-y-6">
        {comments && pagination?.total > 0 ? (
          comments.map((comment: CommentProps, index: number) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <CommentCard refetchComments={handleRefetch} comment={comment} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <div className="mt-8">
        <CustomPagination
          currentPage={response?.paginate.current_page}
          totalPages={Math.ceil(response?.paginate.total / 10)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
