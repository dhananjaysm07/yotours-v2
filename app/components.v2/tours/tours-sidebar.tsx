'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CountryContinentFilter from '../common/country-continent-filter';
import MainFilterSearchBox from '../common/main-filter-search-box';
import TagFilter from '../common/tag-filter';
import PriceSlider from '../common/price-slider';

interface CountriesContinentsData {
  getCountriesAndContinents: {
    country: string;
    continent: string;
    destinationCount: number;
  }[];
}

interface SidebarProps {
  allTags: string[];
  uniqueTourLocations: string[];
  countriesContinentsData: CountriesContinentsData;
  initialContinents?: string[];
  initialCountries?: string[];
  initialSearchValue?: string;
  initialTags?: string[];
  initialPriceMin?: number;
  initialPriceMax?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  allTags,
  uniqueTourLocations,
  countriesContinentsData,
  initialContinents = [],
  initialCountries = [],
  initialSearchValue = '',
  initialTags = [],
  initialPriceMin = 0,
  initialPriceMax = 100000,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: initialPriceMin,
    max: initialPriceMax,
  });

  const [selectedContinents, setSelectedContinents] =
    useState<string[]>(initialContinents);
  const [selectedCountries, setSelectedCountries] =
    useState<string[]>(initialCountries);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max }); // Update local state
    updateSearchParams(
      selectedContinents,
      selectedCountries,
      selectedTags,
      min,
      max
    ); // Update URL
  };

  const updateSearchParams = (
    continents: string[],
    countries: string[],
    tags: string[],
    priceMin: number,
    priceMax: number
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (continents.length > 0) {
      current.set('continent', continents.join(','));
      current.delete('country');
    } else {
      current.delete('continent');
    }

    if (countries.length > 0) {
      current.set('country', countries.join(','));
    } else {
      current.delete('country');
    }

    if (tags.length > 0) {
      current.set('tagName', tags.join(','));
    } else {
      current.delete('tagName');
    }

    if (priceMin > 0 || priceMax < 100000) {
      current.set('priceMin', priceMin.toString());
      current.set('priceMax', priceMax.toString());
    } else {
      current.delete('priceMin');
      current.delete('priceMax');
    }

    current.delete('location');
    current.delete('page');

    const search_string = current.toString();
    const query = search_string ? `?${search_string}` : '';

    router.push(`/tours${query}`);
  };

  const handleContinentChange = (category: string) => {
    const newContinents = selectedContinents.includes(category)
      ? selectedContinents.filter((item) => item !== category)
      : [...selectedContinents, category];

    setSelectedContinents(newContinents);
    setSelectedCountries([]);
    updateSearchParams(
      newContinents,
      [],
      selectedTags,
      priceRange.min,
      priceRange.max
    );
  };

  const handleCountryChange = (category: string) => {
    const newCountries = selectedCountries.includes(category)
      ? selectedCountries.filter((item) => item !== category)
      : [...selectedCountries, category];

    setSelectedCountries(newCountries);
    updateSearchParams(
      selectedContinents,
      newCountries,
      selectedTags,
      priceRange.min,
      priceRange.max
    );
  };

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    updateSearchParams(
      selectedContinents,
      selectedCountries,
      newTags,
      priceRange.min,
      priceRange.max
    );
  };

  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Search Tours</h5>
          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox
              currentPage="tours"
              locations={uniqueTourLocations}
              initialSearchValue={initialSearchValue}
            />
          </div>
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Category Types</h5>
        <div className="sidebar-checkbox">
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onSelectionChange={handleTagChange}
          />
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Continents</h5>
        <div className="sidebar-checkbox">
          <CountryContinentFilter
            categories={[
              ...new Set(
                countriesContinentsData.getCountriesAndContinents.map(
                  (item) => item.continent
                )
              ),
            ].sort()}
            selectedList={selectedContinents}
            counts={countriesContinentsData.getCountriesAndContinents.reduce(
              (acc, item) => {
                acc[item.continent] =
                  (acc[item.continent] || 0) + item.destinationCount;
                return acc;
              },
              {} as Record<string, number>
            )}
            onSelectionChange={handleContinentChange}
          />
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Countries</h5>
        <div className="sidebar-checkbox">
          <CountryContinentFilter
            categories={countriesContinentsData.getCountriesAndContinents
              .filter((item) =>
                selectedContinents.length
                  ? selectedContinents.includes(item.continent)
                  : true
              )
              .map((item) => item.country)}
            selectedList={selectedCountries}
            counts={countriesContinentsData.getCountriesAndContinents.reduce(
              (acc, item) => {
                acc[item.country] =
                  (acc[item.country] || 0) + item.destinationCount;
                return acc;
              },
              {} as Record<string, number>
            )}
            onSelectionChange={handleCountryChange}
          />
        </div>
      </div>
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Price Range</h5>
        <div className="sidebar-checkbox">
          <PriceSlider
            initialMin={initialPriceMin}
            initialMax={initialPriceMax}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
