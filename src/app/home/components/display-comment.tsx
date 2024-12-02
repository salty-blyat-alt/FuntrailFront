import { ANY } from "@/app/components/custom-table/custom-table";
import useAxios from "@/app/hooks/use-axios";
import { useEffect } from "react";
import { CardStack } from "@components/ui/card-stack";

const DisplayComments = () => {
  const {
    triggerFetch: fetchRecentComments,
    responseData: comments,
    error,
    loading,
    finished,
  } = useAxios<ANY, undefined>({
    endpoint: "/api/comment/recent",
    method: "GET",
    config: {},
  });

  useEffect(() => {
    fetchRecentComments?.();
  }, []);

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2  mx-auto">
      <div className="pb-12 md:pb-0">
        <h2 className=" text-2xl font-bold leading-none tracking">What Our Guests Say</h2>
        <p className="text-muted-foreground text-sm">
          {" "}
          "Authentic experiences shared by our valued guests", "Discover why our
          guests keep coming back", "Real stories from real travelers"
        </p>
        <p className="max-w-md text-balance">
          We take pride in providing exceptional experiences for our guests.
          Read through these reviews to see what makes our service stand out.
        </p>
      </div>

     
        {!comments || loading ? (
          <p>Loading...</p>
        ) : (
          <CardStack loading={loading} items={comments?.items ?? []} />
        )} 
    </div>
  );
};

export default DisplayComments;
