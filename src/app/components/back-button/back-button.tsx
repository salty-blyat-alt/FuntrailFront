import React from "react";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ className = "" }) => {
  const router = useRouter();
  return (
    <Button
      className={className}
      variant="outline"
      size="sm"
      onClick={() => router.back()}
    >
      <ArrowBigLeft />
    </Button>
  );
};

export default BackButton;
