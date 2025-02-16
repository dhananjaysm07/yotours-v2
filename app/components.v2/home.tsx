import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

import CookieConsentBar from '@/app/components.v2/ui/cookie-consent';
import Header from '@/app/components.v2/common/header';
import { constants } from '@/constants';
import { GET_CONTENT_QUERY } from '@/graphql/query';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { unstable_cache } from 'next/cache';
import Hero from './common/hero';
import Destination from './destinations';
import BlockGuide from './common/block-guide';
import AdBanners from './common/ad-banners';
import BsImport from '../bs-import';
import Footer from './footer';

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

const getContentData = unstable_cache(
  async () => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GET_CONTENT_QUERY,
      });
      return data;
    } catch (error) {
      console.error('Error fetching HERO CONTENT:', error);
      return { data: null };
    }
  },
  ['GET_CONTENT_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

const HomePage = async () => {
  const {
    data: { getContent },
  } = await getContentData();

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
      <Footer />
    </>
  );
};

export default HomePage;
