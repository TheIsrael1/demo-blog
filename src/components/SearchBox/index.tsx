import React, { useMemo } from "react";
import "./searchBox.css";
import { debounce } from "lodash";

type KeyboardEventHTML = React.KeyboardEvent<HTMLInputElement>

interface SearchBoxInterface{
search: (i: string)=> void
fallback: ()=>void
handleKeySearchUp: (e: KeyboardEventHTML)=> void
}

const SearchBox = ({fallback, handleKeySearchUp, search}: SearchBoxInterface ) => {

  const debouncedSearch = useMemo(
		() => debounce((value: string) => search(value), 3000),
		[]
	);

  const handleSearch = (value: string) => {
		if (value) debouncedSearch(value);
		else {
			debouncedSearch.cancel();
			fallback();
		}
	};


  return (
    <div className="searchBox">
      <input  
      className="searchBoxInput" 
      placeholder="Search by username/title/keyword..."
      onChange={(e)=> handleSearch(e.target.value)}
      onKeyUp={(e)=> handleKeySearchUp(e)}
      />
    </div>
  );
};

export default SearchBox;
