// search-bar.tsx
import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  destinationLocations: string[];
  searchValue: string;
  onLocationSelect: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  destinationLocations,
  searchValue,
  onLocationSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLocations = destinationLocations.filter((location) =>
    location.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = (location: string) => {
    setInputValue(location);
    onLocationSelect(location);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onLocationSelect(value); // Notify parent component of the new value
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Optionally, you can add logic here to handle when the input loses focus
  };

  return (
    <div
      className="searchMenu-loc px-20 py-10 bg-white rounded-4"
      ref={dropdownRef}
    >
      <div className="d-flex">
        <i className="icon-location-2 text-20 text-light-1 mt-5"></i>
        <div className="ml-10 flex-grow-1">
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus w-full"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="shadow-2 dropdown-menu min-width-400 show">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul
              className="y-gap-5 js-results"
              style={{ maxHeight: '300px', overflowY: 'auto' }}
            >
              {filteredLocations.map((location, index) => (
                <li
                  className="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 cursor-pointer hover:bg-light-2"
                  key={index}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {location}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {filteredLocations.length === 0 && (
                <li className="px-20 py-15 text-15">No locations found</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
