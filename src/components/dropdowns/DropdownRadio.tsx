import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
const dropdownItems = [
  { name: "Profile" },
  { name: "Billing" },
  { name: "Settings" },
];
export function DropdownRadio() {
  const [selected, setSelected] = useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[0.3rem] rounded-md  border-2">
        <h1 className="text-gray-700 text-[0.9rem]">Radio select dropdown</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
          {dropdownItems.map((item, i) => (
            <DropdownMenuRadioItem value={item.name} key={i}>
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
