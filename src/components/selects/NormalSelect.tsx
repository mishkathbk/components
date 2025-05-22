import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// const selectItems = ["Profile", "Billing", "Settings"];
type Props = {
  options: string[]
  value: string;
  setValue: (value: any) => void
}
export function NormalSelect({ options=[], value, setValue }: Props) {
  console.log("value::::", value)
  return (
    <Select>
      <SelectTrigger className="w-fit !text-gray-700">
        <SelectValue placeholder={value} className="text-[1rem]"   />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{value ? value : "Choose"}</SelectLabel>
          {options.map((items, i) => (
            <SelectItem key={i} value={items} defaultValue={value} onChange={(newValue) => setValue(newValue)}>
              {items}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
