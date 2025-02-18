import {
  AllTags,
  AttractionCountriesContinentsData,
  CountriesContinentsData,
  UniqueDestinations,
  UniqueTourLocations,
} from '@/types';
import { getApolloClient } from './apollo-client-ssr';
import {
  GET_ALL_TAGS,
  GET_CONTENT_QUERY,
  GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY,
  GET_COUNTRIES_CONTINENTS_QUERY,
  GET_DESTINATION_LOCATIONS,
  GET_TOUR_LOCATIONS,
} from '@/graphql/query';
import { unstable_cache } from 'next/cache';
import { constants } from '@/constants';

export const getUniqueDestinations = unstable_cache(
  async (): Promise<UniqueDestinations> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<UniqueDestinations>({
        query: GET_DESTINATION_LOCATIONS,
      });
      return data;
    } catch (error) {
      console.error('Error fetching unique destinations:', error);
      return { getUniqueDestinationLocations: [] };
    }
  },
  ['GET_UNIQUE_DESTINATION_LOCATIONS'],
  { revalidate: constants.revalidationSeconds }
);

export const getContentData = unstable_cache(
  async () => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GET_CONTENT_QUERY,
      });
      return data;
    } catch (error) {
      console.error('Error fetching CONTENT:', error);
      return { data: null };
    }
  },
  ['GET_CONTENT_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

export const getUniqueTourLocations = unstable_cache(
  async (): Promise<UniqueTourLocations> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<UniqueTourLocations>({
        query: GET_TOUR_LOCATIONS,
      });
      return data;
    } catch (error) {
      console.error('Error fetching unique tour locations:', error);
      return { getUniqueTourLocations: [] };
    }
  },
  ['GET_TOUR_LOCATIONS'],
  { revalidate: constants.revalidationSeconds }
);

export const getCountriesAndContinents = unstable_cache(
  async (): Promise<CountriesContinentsData> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<CountriesContinentsData>({
        query: GET_COUNTRIES_CONTINENTS_QUERY,
      });
      return data;
    } catch (error) {
      console.error('Error fetching countries and continents:', error);
      return { getCountriesAndContinents: [] };
    }
  },
  ['GET_COUNTRIES_CONTINENTS_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

export const getAllTags = unstable_cache(
  async (): Promise<AllTags> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<AllTags>({
        query: GET_ALL_TAGS,
      });
      return data;
    } catch (error) {
      console.error('Error fetching unique tour locations:', error);
      return { getAllTags: [] };
    }
  },
  ['GET_ALL_TAGS'],
  { revalidate: constants.revalidationSeconds }
);

export const getAttractionsCountriesAndContinents = unstable_cache(
  async (): Promise<AttractionCountriesContinentsData> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<AttractionCountriesContinentsData>({
        query: GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY,
      });
      return data;
    } catch (error) {
      console.error('Error fetching countries and continents:', error);
      return { getCountriesAndContinentsForAttractions: [] };
    }
  },
  ['GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY'],
  { revalidate: constants.revalidationSeconds }
);
