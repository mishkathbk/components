import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";

const DropdownCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <Popover>
      <PopoverTrigger className="p-[0.3rem] rounded-md border-2">
        <p className="text-gray-700 text-[0.9rem]">{date ? format(date, "PPP") : "Select Date"}</p>
      </PopoverTrigger>
      <PopoverContent className="">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DropdownCalendar;
