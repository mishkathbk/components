import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
// const dropdownItems = ["Profile", "Billing", "Settings"];
type Props = {
  title?: string;
  dataArray: any[];
  selected: string[];
  setSelected: (value: string[] | ((prev: string[]) => string[])) => void;
};
export function DropdownMultiSelect({
  title,
  dataArray,
  selected,
  setSelected,
}: Props) {
  // const [selected, setSelected] = useState<string[]>(dataArray || []);
  const handleToggle = (itemName: string) => {
    setSelected((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[0.3rem] h-full rounded-md  border-2">
        <p className="text-gray-700 text-[0.9rem] px-[0.2rem]">{title ? title : "title"}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {dataArray?.map((item, i) => (
          <DropdownMenuCheckboxItem
            checked={selected.includes(item)}
            onCheckedChange={() => handleToggle(item)}
            key={i}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
