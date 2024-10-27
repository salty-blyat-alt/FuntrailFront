import Image from "next/image";
import { Button } from "../../components/ui/button";
import img from "public/images/genius_labeljpg.jpg";

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
        <h2 className=" text-2xl font-bold leading-none tracking">{title}</h2>
        <p className="muted">{subtitle}</p>
      </div>

      <div className="bg-foreground/10 p-6 flex flex-col md:flex-row rounded-lg shadow-md overflow-hidden mx-auto mt-6">
        <div className="flex-1 ">
          <h2 className=" text-lg font-semibold">Travel more, spend less</h2>
          <p className="text-muted-foreground mt-2">
            Save 10% or more at participating properties - just look for the
            Green Genius label
          </p>
          <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Button size="lg">Explore</Button>
            <Button size={"lg"} variant={"secondary"}>
              Register
            </Button>
          </div>
        </div>
        <div className="w-full md:w-32 flex items-center justify-center">
          <Image
            src={img}
            width={200}
            height={200}
            alt="Genius Label"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default GeniusCard;
