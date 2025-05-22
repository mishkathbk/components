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

  const searchData = [
    "singapore",
    "india",
    "china",
    "america",
    "japan",
    "korea",
    "australia",
    "malaysia",
    "thailand",
  ];
  type Props = {
    searchData: string[]
    onSelect: ((value: string) => void)
  }
  export function DropdownSearch({ searchData, onSelect }: Props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    console.log("value:::::::", value)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-[0.9rem] "
          >
            <p className="capitalize">
              {value
                ? searchData.find((data) => data === value)
                : "Choose your country..."}
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search here..." className="h-9" />
            <CommandList>
              <CommandEmpty>No match found.</CommandEmpty>
              <CommandGroup>
                {searchData?.map((data) => (
                  <CommandItem
                    key={data}
                    value={data}
                    onSelect={(currentValue) => {
                      const selectedValue = currentValue === value ? "" : currentValue;
                      setValue(selectedValue);
                      onSelect(selectedValue);
                      setOpen(false);
                    }}
                  >
                    <p className="capitalize">{data}</p>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === data ? "opacity-100" : "opacity-0"
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
