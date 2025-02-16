// main-filter-search-box.tsx
'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './search-bar';

interface MainFilterSearchBoxProps {
  locations: string[];
  initialSearchValue?: string;
  currentPage: string;
}

const MainFilterSearchBox: React.FC<MainFilterSearchBoxProps> = ({
  locations,
  initialSearchValue = '',
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const handleSearch = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete('continent');
    current.delete('country');
    current.delete('page');
    current.delete('location');
    current.delete('tagName')
    

    if (searchValue) current.set('location', searchValue);

    const search_string = current.toString();
    const query = search_string ? `?${search_string}` : '';
    if (searchValue) router.push(`/${currentPage}${query}`);
    else router.push(`/${currentPage}`);
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
