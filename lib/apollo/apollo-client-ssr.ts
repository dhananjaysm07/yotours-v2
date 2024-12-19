import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import https from 'https';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const getApolloClient = () => {
  if (!apolloClient) {
    // console.log('Creating apollo SSR client');
    // if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // }
    apolloClient = new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri: 'https://server.yo.tours/graphql',
        fetchOptions: {
          agent: new https.Agent({
            rejectUnauthorized: true,
          }),
        },
      }),
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
};
