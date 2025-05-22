import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchAutoControlled = () => {
    const items = [
        {
            id: 0,
            name: "Cobol",
        },
        {
            id: 1,
            name: "JavaScript",
        },
        {
            id: 2,
            name: "Basic",
        },
        {
            id: 3,
            name: "PHP",
        },
        {
            id: 4,
            name: "Java",
        },
    ];
    const handleOnSearch = (string, results) => {
        console.log("handleOnSearch:::::", string);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        console.log(item);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };
    return (
        <div><ReactSearchAutocomplete
            className="w-[500px]"
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            showIcon={false}
            placeholder='item name'
            
            styling={{ zIndex: 4 }} // To display it on top of the search box below
            autoFocus
        /></div>
    )
}

export default SearchAutoControlled