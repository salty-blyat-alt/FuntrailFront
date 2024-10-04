import { Progress } from "@components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
// Define the props type
interface StatsCardProps {
  description: string;
  title: string;
  percentage: number;
  progressValue: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  description,
  title,
  percentage,
  progressValue,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`} from last week
        </div>
      </CardContent>
      <CardFooter>
        <Progress
          value={progressValue}
          aria-label={`${progressValue}% increase`}
        />
      </CardFooter>
    </Card>
  );
};

export default StatsCard;
