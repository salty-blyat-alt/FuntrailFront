// components/GeniusCard.js
import { Button } from "../../components/ui/button";

const GeniusCard = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className=" text-2xl font-bold leading-none tracking">
          {title}
        </h2>
        <p className="muted">
          {subtitle}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row bg-gray-50 rounded-lg shadow-md overflow-hidden mx-auto mt-6">
      <div className="flex-1 p-6">
        <h2 className=" text-lg font-semibold">Travel more, spend less</h2>
        <p className="text-gray-700 mt-2">
        Save 10% or more at participating properties – just look for the Green Genius label
        </p>
        <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <Button size="lg">Explore</Button>
        <Button size={"lg"} variant={"secondary"}>Register</Button>
        </div>
      </div>
      <div className="w-full md:w-32 flex items-center justify-center bg-gray-100">
        <img src="/path/to/your/image.png" alt="Genius Label" className="max-w-full h-auto" />
      </div>
    </div>
    </section>
  );
};

export default GeniusCard;
