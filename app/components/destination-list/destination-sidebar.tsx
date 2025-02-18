'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CountryContinentFilter from '../common/country-continent-filter';
import MainFilterSearchBox from '../common/main-filter-search-box';
import { CountriesContinentsData } from '@/types';



interface DestinationSidebarProps {
  countriesContinentsData: CountriesContinentsData;
  uniqueDestinations: string[];
}

const DestinationSidebar: React.FC<DestinationSidebarProps> = ({
  countriesContinentsData,
  uniqueDestinations,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const continents = searchParams.get('continent')?.split(',') || [];
    const countries = searchParams.get('country')?.split(',') || [];
    const location = searchParams.get('location') || '';

    setSelectedContinents(continents);
    setSelectedCountries(countries);
    setSearchValue(location);
  }, [searchParams]);

  const updateSearchParams = (
    continents: string[],
    countries: string[],
    location: string = ''
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

    if (location) {
      current.set('location', location);
    } else {
      current.delete('location');
    }

    current.delete('page');

    const search_string = current.toString();
    const query = search_string ? `?${search_string}` : '';

    router.push(`/destinations${query}`);
  };

  const handleContinentChange = (category: string) => {
    const newContinents = selectedContinents.includes(category)
      ? selectedContinents.filter((item) => item !== category)
      : [...selectedContinents, category];
    setSearchValue('');
    setSelectedContinents(newContinents);
    setSelectedCountries([]); // Clear selected countries when selecting a continent
    updateSearchParams(newContinents, [], '');
  };

  const handleCountryChange = (category: string) => {
    const newCountries = selectedCountries.includes(category)
      ? selectedCountries.filter((item) => item !== category)
      : [...selectedCountries, category];
    setSearchValue('');
    setSelectedCountries(newCountries);
    updateSearchParams(selectedContinents, newCountries, '');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSelectedContinents([]); // Clear continents when a location is entered
    setSelectedCountries([]); // Clear countries when a location is entered
    updateSearchParams([], [], value); // Update URL with only the location
  };

  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Search Destinations</h5>
          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox
              currentPage="destinations"
              locations={uniqueDestinations}
              initialSearchValue={searchValue}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Continent Filter */}
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

      {/* Country Filter */}
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
    </>
  );
};

export default DestinationSidebar;
