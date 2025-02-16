import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

import CookieConsentBar from '@/app/components.v2/ui/cookie-consent';
import Header from '@/app/components.v2/common/header';
import { constants } from '@/constants';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { unstable_cache } from 'next/cache';
import BsImport from './bs-import';
import Hero from '@/app/components.v2/common/hero';
import Destination from '@/app/components.v2/destinations';
import BlockGuide from '@/app/components.v2/common/block-guide';
import AdBanners from '@/app/components.v2/common/ad-banners';
import Footer from '@components.v2/footer';
import { gql } from '@apollo/client';
import DestinationsWeLove from './components.v2/ui/destinations-we-love';
import { getContentData } from '@/lib/apollo/common-api-funcs';

export const metadata: Metadata = getPageMeta(
  'Home',
  'Make your travel plans easier'
);

/***
 * Strategy
 * 1. Get all data in home page
 * 2. Call client side functions, pass data to them
 * 3. Render the client side components w/ hooks
 * 4. Set the initial state on the zustand store from parent (check how)
 * 5. ApolloWrapper sits inside at this level
 * 6. Data Provider also sits here
 * 7. Optimize Apollo client for ssr (use experimental)
 */

// Only getContentData is processed here since it is required by more than one component

const DestinationWeLoveQuery = gql`
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

const getDestinationsWeLove = unstable_cache(
  async () => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: DestinationWeLoveQuery,
      });
      return data;
    } catch (error) {
      console.error('Error fetching DestinationWeLoveQuery CONTENT:', error);
      return { data: null };
    }
  },
  ['GET_DESTINATION_WE_LOVE_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

const HomePage = async () => {
  const [contentData, dwl] = await Promise.all([
    getContentData(),
    getDestinationsWeLove(),
  ]);

  const { getContent } = contentData.data;
  const destinationsWeLove = dwl.data.getDestinations;

  const bokunChannelID = getContent.bokunChannelId;

  return (
    <>
      <CookieConsentBar />
      <Header />
      <BsImport />
      <Hero contentData={getContent} />
      <main>
        <Destination
          filter={{
            activeValues: [true],
            continent: ['Europe'],
          }}
          bokunChannelID={bokunChannelID}
        />
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row y-gap-20 justify-between">
              <BlockGuide />
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <div className="row y-gap-20">
              <AdBanners contentData={getContent} />
            </div>
          </div>
        </section>
        <Destination
          filter={{
            activeValues: [true],
            continent: ['Asia'],
            country: ['India'],
          }}
          bokunChannelID={bokunChannelID}
        />
        <Destination
          filter={{
            activeValues: [true],
            continent: ['Asia'],
          }}
          bokunChannelID={bokunChannelID}
        />
      </main>
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Destinations we love</h2>
              </div>
            </div>
          </div>

          <div className="tabs -pills pt-40 js-tabs">
            <DestinationsWeLove destinations={destinationsWeLove} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
