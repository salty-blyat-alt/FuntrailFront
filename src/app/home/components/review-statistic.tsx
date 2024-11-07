import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Star } from "lucide-react";
import useAxios from "@/app/hooks/use-axios";
import { ANY } from "@/app/components/custom-table/custom-table";
import { useEffect } from "react";

interface RatingDistributionProps {
  stars: number;
  count: number;
  percentage: number;
}

export default function ReviewStatistic({ hotel_id }: { hotel_id: number }) {
  const {
    triggerFetch: fetchHotelStat,
    responseData: stats, 
  } = useAxios<ANY, { hotel_id?: number }>({
    endpoint: hotel_id ? `/api/hotel/stat/${hotel_id}` : '',
    method: "GET",
    config: {},
  });

  useEffect(() => {
    fetchHotelStat?.();
  }, [hotel_id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4  mb-4">
          <div className="text-4xl font-bold">{stats?.averageRating ?? 0}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(stats?.averageRating ?? 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="text-sm text-gray-500 ml-auto">
            Based on {stats?.totalReviews} reviews
          </div>
        </div>
        <div className="space-y-2">
          {stats?.ratingDistribution.map((rating: RatingDistributionProps) => (
            <div key={rating?.stars ?? 0} className="flex items-center gap-2">
              <span className="w-12 text-sm">{rating?.stars ?? 0} stars</span>
              <Progress value={rating?.percentage ?? 0} className="flex-1" />
              <span className="w-12 text-sm text-right">
                {rating?.percentage ?? 0}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
