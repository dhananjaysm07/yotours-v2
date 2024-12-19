import {
  GetToursInHome,
  GetAttractionsInHome,
  GetDestinationsInHome,
} from '@/graphql/destination-queries';

import { unstable_cache } from 'next/cache';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { constants } from '@/constants';
import PopularDestinations from './popular-destinations';
import ToursAndAttractions from './tours-and-attractions';
import { DestinationFilterType } from '@/types';

const getTours = unstable_cache(
  async (filter: DestinationFilterType) => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GetToursInHome,
        variables: {
          page: 1,
          loadCount: 8,
          filter,
        },
      });
      return data;
    } catch (error) {
      console.error(
        `Error fetching Tours in GET TOURS w/ ${
          filter.country ? filter.country : filter.continent
        }:`,
        error
      );
      return null;
    }
  },
  ['GetTours'],
  { revalidate: constants.revalidationSeconds }
);

const getAttractions = unstable_cache(
  async (filter: DestinationFilterType) => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GetAttractionsInHome,
        variables: {
          page: 1,
          loadCount: 30,
          filter,
        },
      });
      return data;
    } catch (error) {
      console.error(
        `Error fetching Tours in Get Attractions w/ ${
          filter.country ? filter.country : filter.continent
        }:`,
        error
      );
      return null;
    }
  },
  ['GetAttractionsInHome'],
  { revalidate: constants.revalidationSeconds }
);

const getDestinations = unstable_cache(
  async (filter: DestinationFilterType) => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GetDestinationsInHome,
        variables: {
          page: 1,
          loadCount: 30,
          filter: {
            ...filter,
            ispopular: true,
          },
        },
      });
      return data;
    } catch (error) {
      console.error(
        `Error fetching Tours in Get Destinations w/ ${
          filter.country ? filter.country : filter.continent
        }:`,
        error
      );
      return null;
    }
  },
  ['GetDestinationsInHome'],
  { revalidate: constants.revalidationSeconds }
);

const Destination = async ({
  filter,
  bokunChannelID,
}: {
  filter: DestinationFilterType;
  bokunChannelID: string;
}) => {
  const place = filter.country ? filter.country[0] : filter.continent[0]; // Destination is either country or continent for which we are rendering cards
  //   const isCountry = filter.country ? true : false;
  const popularDestinations = await getDestinations(filter); // Destination is the popular destinations for the place
  const attractions = await getAttractions(filter); // Attractions are the popular attractions for the place
  const tours = await getTours(filter); // Tours are the popular tours for the place
  if (
    popularDestinations?.error ||
    attractions?.error ||
    tours?.error ||
    !popularDestinations?.data?.getFilteredDestination?.destinations ||
    !attractions?.data?.getFilteredAttractions?.attractions ||
    !tours?.data?.getFilteredTours?.tours
  )
    return <></>;
  return (
    <>
      <PopularDestinations
        destinationData={
          popularDestinations.data.getFilteredDestination.destinations
        }
        destinationName={place}
      />
      <ToursAndAttractions
        attractionData={attractions.data.getFilteredAttractions.attractions}
        tourData={tours.data.getFilteredTours.tours}
        destinationName={place}
        bokunChannelID={bokunChannelID}
        isCountry={filter.country ? true : false}
      />
    </>
  );
};

export default Destination;
