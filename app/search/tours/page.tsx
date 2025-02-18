import Footer from '@/app/components/footer';
import InvertedHeader from '@/app/components/inverted-header';
import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import { GET_TOUR_FOR_DESTINATION } from '@/graphql/single-queries';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import Tours from '@/app/components/destination-details/tours';
import { ToursByDestinationCity } from '@/types';
import FadeUpAnimation from '@/app/components/common/fade-up';

export const metadata: Metadata = getPageMeta(
  'Tours Search',
  'Make your travel plans easier'
);

const getToursByDestination = async (
  destinationName: string
): Promise<ToursByDestinationCity> => {
  const client = getApolloClient();
  try {
    const { data } = await client.query<ToursByDestinationCity>({
      query: GET_TOUR_FOR_DESTINATION,
      variables: {
        destinationName: destinationName,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching filtered attractions:', error);
    return { getDestinationByCity: { tours: [] } };
  }
};

const SearchedTours = async ({
  searchParams,
}: {
  searchParams: Promise<{ destinationName: string }>;
}) => {
  const params = await searchParams;
  const [contentData, tours] = await Promise.all([
    getContentData(),
    getToursByDestination(params.destinationName),
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
                    These popular Tours have a lot to offer
                  </p>
                </div>
              </div>
            </div>

            {tours?.getDestinationByCity?.tours.length > 0 ? (
              <div className="relative pt-40 sm:pt-20">
                <Tours
                  tours={tours.getDestinationByCity.tours}
                  contentData={contentData.data}
                />
              </div>
            ) : (
              <div className="relative pt-40 text-black sm:pt-20">
                <h1>No Tours Found </h1>
              </div>
            )}
          </div>
        </section>
      </FadeUpAnimation>

      <Footer />
    </>
  );
};

export default SearchedTours;
