import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BsImport from './bs-import';
import CookieConsentBar from '@/app/components/ui/cookie-consent';
import Header from '@/app/components/common/header';
import { constants } from '@/constants';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { unstable_cache } from 'next/cache';
import Hero from '@/app/components/common/hero';
import Destination from '@/app/components/destinations';
import BlockGuide from '@/app/components/common/block-guide';
import AdBanners from '@/app/components/common/ad-banners';
import Footer from '@/app/components/footer';
import { gql } from '@apollo/client';
import DestinationsWeLove from './components/ui/destinations-we-love';
import { getContentData } from '@/lib/apollo/common-api-funcs';

export const metadata: Metadata = getPageMeta(
  'Home',
  'Make your travel plans easier'
);

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

const DestinationQuery = gql`
  query GetDestinations {
    getDestinations {
      id
      destinationName
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

const getDestinations = unstable_cache(
  async () => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: DestinationQuery,
      });
      return data;
    } catch (error) {
      console.error('Error fetching DestinationQuery CONTENT:', error);
      return { data: null };
    }
  },
  ['GET_DESTINATIONS_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

const HomePage = async () => {
  const [contentData, dwl, destinations] = await Promise.all([
    getContentData(),
    getDestinationsWeLove(),
    getDestinations(),
  ]);

  const { getContent } = contentData.data;
  const destinationsWeLove = dwl.data.getDestinations;
  const bokunChannelID = getContent.bokunChannelId;

  return (
    <>
      <Header />
      <BsImport />
      <Hero contentData={getContent} destinations={destinations.data} />
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
      <CookieConsentBar />
    </>
  );
};

export default HomePage;
