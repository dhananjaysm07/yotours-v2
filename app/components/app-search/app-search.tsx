"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHeroStore } from "@/lib/stores/hero-store";
import LocationSearch from "./location-search";
import DateSearch from "./date-search";
import { GetDestinations } from "@/types";
import { DateObject } from "react-multi-date-picker";
import Link from "next/link";
import { createSlug } from "@/utils/slugify";

const AppSearch = ({ destinations }: { destinations: GetDestinations }) => {
  const router = useRouter();
  const defaultStartDate = new DateObject()
    .subtract(12, "days")
    .format("YYYY-MM-DD");
  const defaultEndDate = new DateObject().add(26, "days").format("YYYY-MM-DD");
  const { tabs, currentTab, setCurrentTab } = useHeroStore();
  const [searchValue, setSearchValue] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<{
    id: number;
    destinationName: string;
  } | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    startDate: string;
    endDate: string;
  } | null>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  // const handleSearch = () => {
  //   const destinationQuery = selectedDestination
  //     ? `?destinationName=${encodeURIComponent(
  //         selectedDestination.destinationName
  //       )}`
  //     : "";
  //   const datesQuery = selectedDates
  //     ? `&startDate=${selectedDates.startDate}&endDate=${selectedDates.endDate}`
  //     : "";
  //   const query = `${destinationQuery}${datesQuery}`;

  //   if (currentTab.toLowerCase() === "tour") {
  //     router.push(`/search/tours${query}`);
  //   } else {
  //     router.push(`/search/attractions${query}`);
  //   }
  // };

  return (
    <>
      <div className="tabs__controls d-flex x-gap-30 y-gap-20 justify-center sm:justify-start">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`tabs__button text-15 fw-500 text-white pb-4 ${
              tab?.name === currentTab ? "is-tab-el-active" : ""
            }`}
            aria-label="Toggle Tabs/Attractions"
            onClick={() => setCurrentTab(tab?.name)}
          >
            {tab?.name}
          </button>
        ))}
      </div>

      <div className="position-relative mt-30 md:mt-20 mobile-search">
        <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="button-grid items-center mob-search">
            <LocationSearch
              destinations={destinations}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setSelectedDestination={setSelectedDestination}
            />

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 ">
              <h4 className="text-15 fw-500 ls-2 lh-16">Travel Date</h4>
              <DateSearch
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
              />
            </div>

            <div className="button-item">
              <Link
                href={{
                  pathname: `/destinations/${createSlug(
                    selectedDestination?.destinationName || ""
                  )}`,
                  query: { city: selectedDestination?.destinationName },
                }}
              >
                <button
                  className="web-icon mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-pink-1 text-white"
                  aria-label="Search"
                  // onClick={handleSearch}
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSearch;
