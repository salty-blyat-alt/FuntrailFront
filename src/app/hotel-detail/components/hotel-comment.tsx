import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/app/components/ui/textarea'
import { StarIcon } from 'lucide-react'
import React, { useState } from 'react'
import CommentCard from './comment-card'

const HotelComment = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "John D.",
            content: "Great location and friendly staff!",
            rating: 5,
        },
        {
            id: 2,
            author: "Sarah M.",
            content: "Clean rooms and beautiful view of the river.",
            rating: 4,
        },
    ]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && newRating > 0) {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    author: "You",
                    content: newComment,
                    rating: newRating,
                },
            ]);
            setNewComment("");
            setNewRating(0);
        }
    };
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Guest Comments</h2>
            <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
            <form onSubmit={handleSubmitComment}>
                <h3 className="text-lg font-semibold mb-2">Leave a comment</h3>
                <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${star <= newRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                            onClick={() => setNewRating(star)}
                        />
                    ))}
                </div>
                <Textarea
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                />
                <Button type="submit">Submit Comment</Button>
            </form>
        </div>
    )
}

export default HotelComment
