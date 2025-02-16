'use client';
import Link from 'next/link';
import { useState } from 'react';
import { createSlug } from '@/utils/slugify';

interface Tour {
  id: string;
  active: boolean;
}

interface Destination {
  id: string;
  destinationName: string;
  country: string;
  continent: string;
  tours: Tour[];
}

interface DestinationsWeLoveProps {
  destinations: Destination[];
}

const DestinationsWeLove: React.FC<DestinationsWeLoveProps> = ({
  destinations,
}) => {
  const [filterOption, setFilterOption] = useState<string>('india');

  const filterOptions = [
    { label: 'India', value: 'india' },
    { label: 'Asia', value: 'asia' },
    { label: 'Europe', value: 'europe' },
  ];

  const filteredDestinations = destinations?.filter((destination) => {
    if (filterOption === 'india') {
      return destination.country.toLowerCase() === 'india';
    } else if (filterOption === 'asia') {
      return (
        destination.continent.toLowerCase() === 'asia' &&
        destination.country.toLowerCase() !== 'india'
      );
    } else {
      return destination.continent.toLowerCase() === filterOption;
    }
  });

  return (
    <>
      <div className="tabs__controls d-flex js-tabs-controls">
        {filterOptions.map((option) => (
          <div key={option.value}>
            <button
              className={`tabs__button fw-500 text-15 px-30 py-15 rounded-4 js-tabs-button ${
                filterOption === option.value ? 'is-tab-el-active' : ''
              }`}
              onClick={() => setFilterOption(option.value)}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>

      <div className="tabs__content pt-30 js-tabs-content">
        <div className="tabs__pane -tab-item-1 is-tab-el-active">
          <div className="row y-gap-10">
            {filteredDestinations?.map((item) => (
              <div className="w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2" key={item.id}>
                <Link
                  href={{
                    pathname: `/destinations/${createSlug(
                      item.destinationName
                    )}`,
                    query: { city: item.destinationName },
                  }}
                  className="d-block"
                >
                  <div className="text-15 fw-500">{item.destinationName}</div>
                  <div className="text-14 text-light-1">
                    {item.tours?.filter((tour) => tour.active).length || 0}{' '}
                    tours
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationsWeLove;
