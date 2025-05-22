"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  searchData: string[]
  selected: string
  onSelect: ((value: string) => void)
  placeholder:string
}
export function DropdownSearchForGrid({ searchData, onSelect, selected,placeholder }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger  className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-[0.9rem] !min-h-8 !py-0"
        >
          <p className="capitalize">
            {selected
              ? searchData.find((data) => data === selected)
              : placeholder}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search here..." className="" onValueChange={(value)=>{

          }} />
          <CommandList>
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup>
              {searchData?.map((data) => (
                <CommandItem
                  key={data}
                  value={data}
                  onSelect={() => {
                    onSelect(data);
                    setOpen(false);
                  }}
                >
                  <p className="capitalize">{data}</p>
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === data ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
