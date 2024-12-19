import React from "react";
import DateSearch from "../common/DateSearch";
import LocationSearch from "./LocationSearch";
import { useAttractionFilterStore } from "../../../lib/store";

const MainFilterSearchBox = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const { setLocation } = useAttractionFilterStore();
  return (
    <>
      <div className="col-12">
        <LocationSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {/* End Location */}
      </div>
      {/* End .col-12 */}

      {/* <div className="col-12">
        <div className="searchMenu-date px-20 py-10 bg-white rounded-4 -left js-form-dd js-calendar">
          <div className="d-flex">
            <i className="icon-calendar-2 text-20 text-light-1 mt-5"></i>
            <div className="ml-10 flex-grow-1">
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch />
            </div>
          </div>
        </div>
      </div> */}
      {/* End .col-12 */}

      <div className="col-12">
        <div className="button-item h-full">
          <button
            className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-pink-1 text-white"
            onClick={() => {
              setLocation(searchValue);
              // setSearchValue("");
            }}
          >
            <i className="icon-search text-20 mr-10" />
            Search
          </button>
        </div>
        {/* End search button_item */}
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default MainFilterSearchBox;
