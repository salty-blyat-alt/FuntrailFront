import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical, PenIcon, Trash } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

const Reply = ({ reply, onDelete, handleEdit, setContext, context }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div key={reply.id} className="space-y-1 group relative">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{reply.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">{reply.username}</h4>

            <Popover>
              <PopoverTrigger asChild>
                <EllipsisVertical className="rounded-full p-1   cursor-pointer transition-all duration-200 ease-in-out" />
              </PopoverTrigger>
              <PopoverContent className="w-28 p-2 border rounded-lg shadow-lg   space-y-1">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start px-2 py-1 text-sm rounded   transition-colors duration-200 ease-in-out"
                  onClick={() => {
                    setContext(reply.comment);
                    setIsEditing(true);
                  }}
                >
                  <PenIcon className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start px-2 py-1 text-sm rounded  transition-colors duration-200 ease-in-out"
                  onClick={onDelete}
                >
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <span className="text-xs text-muted-foreground">
            {reply.commented_at}
          </span>
          {isEditing ? (
            <div>
              <Input
                type="text"
                className="shadcnui-input" // Apply Shadcnui styles as needed
                defaultValue={reply.context}
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
              <Button
                variant={"ghost"}
                onClick={() => {
                  setIsEditing(false); // Change editing state on submit
                }}
              >
                Cancel
              </Button>
              {/* Submit Button to save changes and toggle editing state */}
              <Button
                onClick={() => {
                  handleEdit(reply.id);
                  setIsEditing(false);
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <p>{reply.context}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
