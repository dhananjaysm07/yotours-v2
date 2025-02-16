// components.v2/attractions/sidebar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CountryContinentFilter from '../common/country-continent-filter';
import MainFilterSearchBox from '../common/main-filter-search-box';
import PriceSlider from '../common/price-slider';


interface CountriesContinentsData {
  getCountriesAndContinentsForAttractions: {
    country: string;
    continent: string;
    attractionCount: number;
  }[];
}

interface SidebarProps {
  uniqueAttractionLocations: string[];
  countriesContinentsData: CountriesContinentsData;
  categories: string[]; // List of categories (tags)
  initialContinents?: string[];
  initialCountries?: string[];
  initialCategories?: string[];
  initialSearchValue?: string;
  initialPriceMin?: number;
  initialPriceMax?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  uniqueAttractionLocations,
  countriesContinentsData,
  categories,
  initialContinents = [],
  initialCountries = [],
  initialCategories = [],
  initialSearchValue = '',
  initialPriceMin = 0,
  initialPriceMax = 1000,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Internal state for selected filters
  const [selectedContinents, setSelectedContinents] =
    useState<string[]>(initialContinents);
  const [selectedCountries, setSelectedCountries] =
    useState<string[]>(initialCountries);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [priceRange, setPriceRange] = useState({
    min: initialPriceMin,
    max: initialPriceMax,
  });

  // Update URL query parameters when filters change
  const updateSearchParams = (
    continents: string[],
    countries: string[],
    categories: string[],
    priceMin?: number,
    priceMax?: number,
    resetPage: boolean = true
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (continents.length > 0) {
      newSearchParams.set('continent', continents.join(','));
    } else {
      newSearchParams.delete('continent');
    }

    if (countries.length > 0) {
      newSearchParams.set('country', countries.join(','));
    } else {
      newSearchParams.delete('country');
    }

    if (categories.length > 0) {
      newSearchParams.set('category', categories.join(','));
    } else {
      newSearchParams.delete('category');
    }

    if (priceMin !== undefined && priceMax !== undefined) {
      newSearchParams.set('priceMin', priceMin.toString());
      newSearchParams.set('priceMax', priceMax.toString());
    }

    if (resetPage) {
      newSearchParams.delete('page'); // Reset to first page on filter change
    }

    router.push(`/attractions?${newSearchParams.toString()}`);
  };

  // Handle continent selection
  const handleContinentChange = (continent: string) => {
    const newContinents = selectedContinents.includes(continent)
      ? selectedContinents.filter((c) => c !== continent)
      : [...selectedContinents, continent];

    setSelectedContinents(newContinents);
    setSelectedCountries([]); // Reset countries when continents change
    updateSearchParams(newContinents, [], selectedCategories);
  };

  // Handle country selection
  const handleCountryChange = (country: string) => {
    const newCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];

    setSelectedCountries(newCountries);
    updateSearchParams(selectedContinents, newCountries, selectedCategories);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    updateSearchParams(selectedContinents, selectedCountries, newCategories);
  };

  // Handle price range change
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    updateSearchParams(
      selectedContinents,
      selectedCountries,
      selectedCategories,
      min,
      max,
      false
    );
  };

  // Calculate counts for continents and countries
  const continentCounts = countriesContinentsData.getCountriesAndContinentsForAttractions.reduce(
    (acc, item) => {
      acc[item.continent] = (acc[item.continent] || 0) + item.attractionCount;
      return acc;
    },
    {} as Record<string, number>
  );

  const countryCounts = countriesContinentsData.getCountriesAndContinentsForAttractions.reduce(
    (acc, item) => {
      acc[item.country] = (acc[item.country] || 0) + item.attractionCount;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Search Attractions</h5>
          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox
              locations={uniqueAttractionLocations}
              currentPage="attractions"
              initialSearchValue={initialSearchValue}
            />
          </div>
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Categories</h5>
        <div className="sidebar-checkbox">
          {/* <CategoryTypes
            categories={categories}
            selectedList={selectedCategories}
            onSelectionChange={handleCategoryChange}
          /> */}
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Continents</h5>
        <div className="sidebar-checkbox">
          <CountryContinentFilter
            categories={[
              ...new Set(
                countriesContinentsData.getCountriesAndContinentsForAttractions.map(
                  (item) => item.continent
                )
              ),
            ].sort()}
            selectedList={selectedContinents}
            counts={continentCounts}
            onSelectionChange={handleContinentChange}
          />
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Countries</h5>
        <div className="sidebar-checkbox">
          <CountryContinentFilter
            categories={countriesContinentsData.getCountriesAndContinentsForAttractions
              .filter((item) =>
                selectedContinents.length
                  ? selectedContinents.includes(item.continent)
                  : true
              )
              .map((item) => item.country)}
            selectedList={selectedCountries}
            counts={countryCounts}
            onSelectionChange={handleCountryChange}
          />
        </div>
      </div>

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price</h5>
        <PriceSlider
          initialMin={initialPriceMin}
          initialMax={initialPriceMax}
          onChange={handlePriceChange}
        />
      </div>
    </>
  );
};

export default Sidebar;