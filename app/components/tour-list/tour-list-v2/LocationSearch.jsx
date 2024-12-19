import React, { useState } from "react";
import { countryData } from "../../../utils/country";
import { GET_DESTINATION_LOCATIONS } from "../../../graphql/query";
import { useQuery } from "@apollo/client";

const SearchBar = ({ searchValue, setSearchValue }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, error, loading } = useQuery(GET_DESTINATION_LOCATIONS);
  const [searchList, setSearchList] = useState([]);
  React.useEffect(() => {
    // console.log(data?.getUniqueDestinationLocations);
    setSearchList(
      data?.getUniqueDestinationLocations?.filter((el) => {
        if (!searchValue) return true;
        else return el.toLowerCase().includes(searchValue.toLowerCase());
      }) || []
    );
  }, [data, searchValue]);
  // let locationData = [];
  // countryData.forEach((data) => {
  //   const newArray = data.countries.map((el, index) => ({
  //     id: index + Math.random(),
  //     name: el.name,
  //     address: data.continent,
  //   }));
  //   // console.log("neww array", newArray);
  //   locationData = [...locationData, ...newArray];
  // });
  // console.log("locaiion array", locationData);
  // const locationSearchContent = [...locationData];
  // console.log("location array", locationSearchContent);
  const handleOptionClick = (item) => {
    setSearchValue(item);
    setSelectedItem(item);
  };
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="searchMenu-loc px-20 py-10 bg-white rounded-4 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
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
                  className="js-search js-dd-focus"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            {/* End ml-10 */}
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul
              className="y-gap-5 js-results"
              style={{ overflowY: "scroll", height: "30rem" }}
            >
              {searchList
                ?.filter((el) => (el ? true : false))
                ?.map((item, index) => (
                  <li
                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                      selectedItem && selectedItem === item ? "active" : ""
                    }`}
                    key={index}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <div className="icon-location-2 text-light-1 text-20 pt-4" />
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500 js-search-option-target">
                          {item}
                        </div>
                        {/* <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div> */}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
