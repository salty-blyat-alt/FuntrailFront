"use client";

import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

interface CalendarDateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange; // Optional date range injected from parent
  onDateChange?: (newDate: DateRange) => void; // Callback to notify parent of changes
}

export function CalendarDateRangePicker({
  className,
  date: parentDate, // Injected date from parent (optional)
  onDateChange, // Callback to notify parent of date change
  ...props
}: CalendarDateRangePickerProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Use the date passed from the parent or default to today and tomorrow
  const [date, setDate] = React.useState<DateRange>(
    parentDate || {
      from: today,
      to: tomorrow,
    }
  );

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate!); // Update local state
              if (onDateChange) onDateChange(newDate!); // Notify parent of date change
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
