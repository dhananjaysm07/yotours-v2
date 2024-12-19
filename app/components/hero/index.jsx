// import MainFilterSearchBox from './MainFilterSearchBox';
import { GET_CONTENT_QUERY } from '@/graphql/query';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import Image from 'next/image';
import { constants } from '@/constants';
import { unstable_cache } from 'next/cache';

const getDestinationsData = unstable_cache(
  async () => {
    const client = getApolloClient();
    try {
      const data = await client.query({
        query: GET_CONTENT_QUERY,
      });
      return data;
    } catch (error) {
      console.error('Error fetching HERO CONTENT:', error);
      return null;
    }
  },
  ['GET_CONTENT_QUERY'],
  { revalidate: constants.revalidationSeconds }
);

const Hero = async () => {
  const data = await getDestinationsData();
  const contentData = data?.data;

  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <Image
          alt="image"
          width={1920}
          height={1080}
          src={contentData?.getContent?.heroImage || '/img/01-landingpage.jpg'}
          priority
        />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {contentData?.getContent
                  ? contentData?.getContent?.heroHeading
                  : 'Find Next Place To Visit'}
              </h1>
              <p
                className="text-white mt-6 md:mt-10 text-25"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {contentData?.getContent
                  ? contentData?.getContent?.heroSubheading
                  : 'Discover amazing places at exclusive deals'}
              </p>
            </div>
            {/* End hero title */}

            <div
              className="tabs -underline mt-60 js-tabs"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* <MainFilterSearchBox /> */}
            </div>
            {/* End tab-filter */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
