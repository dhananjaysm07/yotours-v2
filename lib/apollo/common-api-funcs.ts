import { UniqueDestinations } from '@/types';
import { getApolloClient } from './apollo-client-ssr';
import { GET_CONTENT_QUERY, GET_DESTINATION_LOCATIONS } from '@/graphql/query';
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

