'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CountryContinentFilter from '../common/country-continent-filter';
import MainFilterSearchBox from '../common/main-filter-search-box';
import PriceSlider from '../common/price-slider';
import TagFilter from '../common/tag-filter';

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
  categories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  uniqueAttractionLocations,
  countriesContinentsData,
  categories,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100000,
  });

  useEffect(() => {
    const continents = searchParams.get('continent')?.split(',') || [];
    const countries = searchParams.get('country')?.split(',') || [];
    const categoryList = searchParams.get('tagName')?.split(',') || [];
    const location = searchParams.get('location') || '';
    const priceMin = parseInt(searchParams.get('priceMin') || '0');
    const priceMax = parseInt(searchParams.get('priceMax') || '100000');

    setSelectedContinents(continents);
    setSelectedCountries(countries);
    setSelectedCategories(categoryList);
    setSearchValue(location);
    setPriceRange({ min: priceMin, max: priceMax });
  }, [searchParams]);

  const updateSearchParams = (
    continents: string[],
    countries: string[],
    categories: string[],
    location: string = '',
    newPriceMin: number = priceRange.min,
    newPriceMax: number = priceRange.max
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (continents.length > 0) {
      current.set('continent', continents.join(','));
    } else {
      current.delete('continent');
    }

    if (countries.length > 0) {
      current.set('country', countries.join(','));
    } else {
      current.delete('country');
    }

    if (categories.length > 0) {
      current.set('tagName', categories.join(','));
    } else {
      current.delete('tagName');
    }

    if (location) {
      current.set('location', location);
    } else {
      current.delete('location');
    }

    // Only update price params if they differ from defaults
    if (newPriceMin > 0 || newPriceMax < 100000) {
      current.set('priceMin', newPriceMin.toString());
      current.set('priceMax', newPriceMax.toString());
    } else {
      current.delete('priceMin');
      current.delete('priceMax');
    }

    current.delete('page');

    const search_string = current.toString();
    const query = search_string ? `?${search_string}` : '';

    router.push(`/attractions${query}`);
  };

  // Other handlers remain the same...
  const handleContinentChange = (category: string) => {
    const newContinents = selectedContinents.includes(category)
      ? selectedContinents.filter((item) => item !== category)
      : [...selectedContinents, category];
    setSearchValue('');
    setSelectedContinents(newContinents);
    setSelectedCountries([]);
    updateSearchParams(newContinents, [], selectedCategories, '');
  };

  const handleCountryChange = (category: string) => {
    const newCountries = selectedCountries.includes(category)
      ? selectedCountries.filter((item) => item !== category)
      : [...selectedCountries, category];
    setSearchValue('');
    setSelectedCountries(newCountries);
    updateSearchParams(
      selectedContinents,
      newCountries,
      selectedCategories,
      ''
    );
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    updateSearchParams(
      selectedContinents,
      selectedCountries,
      newCategories,
      searchValue
    );
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSelectedContinents([]);
    setSelectedCountries([]);
    setSelectedCategories([]);
    updateSearchParams([], [], [], value);
  };

  // Updated price change handler
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    updateSearchParams(
      selectedContinents,
      selectedCountries,
      selectedCategories,
      searchValue,
      min,
      max
    );
  };

  // Calculate counts remain the same...
  const continentCounts =
    countriesContinentsData.getCountriesAndContinentsForAttractions.reduce(
      (acc, item) => {
        acc[item.continent] = (acc[item.continent] || 0) + item.attractionCount;
        return acc;
      },
      {} as Record<string, number>
    );

  const countryCounts =
    countriesContinentsData.getCountriesAndContinentsForAttractions.reduce(
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
              currentPage="attractions"
              locations={uniqueAttractionLocations}
              initialSearchValue={searchValue}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Category Types</h5>
        <div className="sidebar-checkbox">
          <TagFilter
            tags={categories}
            selectedTags={selectedCategories}
            onSelectionChange={handleCategoryChange}
          />
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
          initialMin={priceRange.min}
          initialMax={priceRange.max}
          onChange={handlePriceChange}
        />
      </div>
    </>
  );
};

export default Sidebar;
