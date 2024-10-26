import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical, PenIcon, Trash } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

const Reply = ({
  reply,
  onDelete,
  setIsEditing,
  handleEdit,
  setContext,
  isEditing,
  context,
}) => {
  const [showOptions, setShowOptions] = useState(false);
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

  return (
    <div key={reply.id} className="space-y-1 group relative">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{reply.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">{reply.username}</h4>
            <EllipsisVertical
              className="opacity-0 group-hover:opacity-100 hover:text-black p-1 rounded-full transition-all duration-200 ease-in-out hover:bg-slate-100 cursor-pointer"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div className="absolute top-8 right-0 w-24 border rounded shadow-lg z-10">
                <Button
                  ref={optionsRef}
                  variant="ghost"
                  className="w-full text-left p-2 text-sm "
                  onClick={onDelete}
                >
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
                  Delete
                </Button>
                <Button
                  ref={optionsRef}
                  variant="ghost"
                  className="w-full text-left p-2 text-sm "
                  onClick={() => setIsEditing(true)}
                >
                  <PenIcon className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {reply.commented_at}
          </span>
          {isEditing ? (
            <div>
              {/* Shadcnui Text Input with comment context as the initial value */}
              <Input
                type="text"
                className="shadcnui-input" // Apply Shadcnui styles as needed
                defaultValue={reply.context}
                value={context} // Prefilled with current comment context
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
                  setIsEditing(false); // Change editing state on submit
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
