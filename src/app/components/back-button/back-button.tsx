import React from "react";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({
  path,
  className = "",
}: {
  path?: string;
  className?: string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (path) {
      router.push(path); // Navigate to the specified path
    } else {
      router.back(); // Go back to the previous page
    }
  };
  return (
    <Button
      className={className}
      variant="outline"
      size="sm"
      onClick={handleBack}
    >
      <ArrowBigLeft />
    </Button>
  );
};

export default BackButton;
