import Footer from '@/app/components/footer';
import InvertedHeader from '@/app/components/inverted-header';
import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import Activity from '@/app/components/common/activity';
import { GetDestinationByCityResponse } from '@/types';
import { GET_ATTRACTION_CARS_FOR_DESTINATION } from '@/graphql/single-queries';
import FadeUpAnimation from '@/app/components/common/fade-up';

export const metadata: Metadata = getPageMeta(
  'Attractions Search',
  'Make your travel plans easier'
);

const getToursByDestination = async (
  destinationName: string
): Promise<GetDestinationByCityResponse> => {
  const client = getApolloClient();
  try {
    const { data } = await client.query<GetDestinationByCityResponse>({
      query: GET_ATTRACTION_CARS_FOR_DESTINATION,
      variables: {
        destinationName: destinationName,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching filtered attractions:', error);
    return { getDestinationByCity: { attractions: [], cars: [] } };
  }
};

const SearchedAttractions = async ({
  searchParams,
}: {
  searchParams: { destinationName: string };
}) => {
  const [contentData, tours] = await Promise.all([
    getContentData(),
    getToursByDestination(searchParams.destinationName),
  ]);

  return (
    <>
      <div className="header-margin" />
      <InvertedHeader />
      <FadeUpAnimation delay={0}>
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row y-gap-20 justify-between items-end">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title">Best Matches</h2>
                  <p className="sectionTitle__text mt-5 sm:mt-0">
                    These popular Attractions have a lot to offer
                  </p>
                </div>
              </div>
            </div>

            {tours?.getDestinationByCity?.attractions.length > 0 ? (
              <div className="relative pt-40 sm:pt-20">
                <Activity
                  attractions={tours.getDestinationByCity.attractions}
                  contentData={contentData.data.getContent}
                />
              </div>
            ) : (
              <div className="relative pt-40 text-black sm:pt-20">
                <h1>No Attractions Found </h1>
              </div>
            )}
          </div>
        </section>
      </FadeUpAnimation>

      <Footer />
    </>
  );
};

export default SearchedAttractions;
