import { CalendarIcon, SearchIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const SearchGroup = ({ className }: { className: string }) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Input
        placeholder="Eilat"
        className="flex-grow bg-background text-foreground"
      />
      <Button
        variant="outline"
        className="flex-grow sm:flex-grow-0 bg-background text-foreground"
      >
        <CalendarIcon className="mr-2 h-4 w-4" /> Check-in — Check-out
      </Button> 

      
      <Button className="w-full sm:w-auto  ">
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchGroup;
