import React, { useEffect, useState } from "react";
import { DropdownMultiSelect } from "./dropdowns/DropdownMultiSelect";
import { DropdownRadio } from "./dropdowns/DropdownRadio";
import DropdownCalendar from "./dropdowns/DropdownCalendar";
import { DropdownSearch } from "./dropdowns/DropdownSearch";
import DropzoneUploads from "./uploads/DropzoneUploads";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import AgGrid from "./tables/DynamicAgGrid";
import FormExample from "./forms/FormExample";
import { LoginApi } from "@/services/login/authServices";
import { startTokenRefreshInterval } from "@/api-config/tokenManager";
import { RowGrid } from "./tables/RowGrid";
import SearchAutoControlled from "./dropdowns/SearchAutoControlled";

const Home = () => {


  const multiSelectArray = ["one", "two"]
  const [selected, setSelected] = useState<string[]>([]);
  const rowData = [
    { No: 1, col1: "aa", col2: "a", col3: 100, checked: true, status: "approved" },
    { No: 2, col1: "bb", col2: "b", col3: 200, checked: true, status: "reject" },
    { No: 3, col1: "cc", col2: "c", col3: 100, checked: true, status: "approved" },
    { No: 4, col1: "dd", col2: "d", col3: 200, checked: false, status: "approved" },
    { No: 5, col1: "ee", col2: "e", col3: 100, checked: true, status: "approved" },
    { No: 6, col1: "ff", col2: "f", col3: 200, checked: true, status: "approved" },
  ]

  // useEffect(() => {
  //   startTokenRefreshInterval();
  // }, []);
  
  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="flex gap-[1rem] flex-wrap">
        <DropdownMultiSelect dataArray={multiSelectArray} selected={selected} setSelected={setSelected} />
        {/* <DropdownSearch /> */}
        <SearchAutoControlled/>
        <DropdownRadio />
        {/* <NormalSelect /> */}
        <DropdownCalendar />
      </div>
      <DropzoneUploads />
      <hr />
      <FormExample />
      <hr />
      <RowGrid />
      {/* <AgGrid rowData={rowData}  /> */}
    </div>
  );
};

export default Home;
