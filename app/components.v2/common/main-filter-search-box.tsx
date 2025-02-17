'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from './search-bar';

interface MainFilterSearchBoxProps {
  locations: string[];
  initialSearchValue?: string;
  currentPage: string;
  onSearch: (value: string) => void;
}

const MainFilterSearchBox: React.FC<MainFilterSearchBoxProps> = ({
  locations,
  initialSearchValue = '',

  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  useEffect(() => {
    setSearchValue(initialSearchValue);
  }, [initialSearchValue]);

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <>
      <div className="col-12">
        <SearchBar
          locations={locations}
          searchValue={searchValue}
          onLocationSelect={setSearchValue}
        />
      </div>
      <div className="col-12">
        <div className="button-item h-full">
          <button
            className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-pink-1 text-white"
            onClick={handleSearch}
          >
            <i className="icon-search text-20 mr-10" />
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
