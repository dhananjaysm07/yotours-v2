'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createSlug } from '../../../utils/slugify';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query GetDestinations {
    getDestinations {
      id
      destinationName
      country
      continent
      tours {
        id
        active
      }
    }
  }
`;

const DestinationsWeLove = () => {
  const [filterOption, setFilterOption] = useState('india');
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useQuery(query);
  // const { destinationData, destinationLoading, destinationError } = useData();
  const filterOptions = [
    { label: 'India', value: 'india' },
    { label: 'Asia', value: 'asia' },
    { label: 'Europe', value: 'europe' },
    // add more options as needed
  ];

  const filteredDestinations = destinationData?.getDestinations?.filter(
    (destination) => {
      if (filterOption === 'india') {
        return destination.country.toLowerCase() === filterOption;
      } else if (filterOption === 'asia') {
        return (
          destination.continent.toLowerCase() == 'asia' &&
          destination.country.toLowerCase() !== 'india'
        );
      } else {
        // Otherwise, filter based on the selected continent
        return destination.continent.toLowerCase() === filterOption;
      }
    }
  );
  console.log('filtered destination Data', filteredDestinations);
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
            {filteredDestinations &&
              filteredDestinations.slice().map((item) => (
                <div className="w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2" key={item.id}>
                  <Link
                    href={{
                      pathname: `/destinations/${createSlug(
                        item.destinationName
                      )}`,
                      query: { city: item.destinationName }, // passing the ID as a query parameter
                    }}
                    className="d-block"
                  >
                    <div className="text-15 fw-500">{item.destinationName}</div>
                    <div className="text-14 text-light-1">
                      {
                        item.tours?.filter((tour) => tour.active).length || 0
                        // (item.attractions?.filter(
                        //   (attraction) => attraction.active
                        // ).length || 0)
                      }{' '}
                      tours
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* End .tabs__content */}
    </>
  );
};

export default DestinationsWeLove;
