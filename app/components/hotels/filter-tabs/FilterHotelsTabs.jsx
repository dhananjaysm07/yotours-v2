import { useState } from "react";
import {useFilterStore} from "../../../lib/store";

const FilterTabsHotels3 = () => {
 const {filterOption,setFilterOption} = useFilterStore()
  const filterOptions = [
    { label: "Tour", value: "tour" },
    { label: "Attraction Tickets", value: "attractiontickets" },
  ];



  return (
    <div className="tabs__controls row x-gap-10 y-gap-10">
      {filterOptions.map((option) => (
        <div className="col-auto" key={option.value}>
          <button
            className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
              filterOption === option.value ? "is-tab-el-active" : ""
            }`}
            onClick={() => setFilterOption(option.value)}
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTabsHotels3;
