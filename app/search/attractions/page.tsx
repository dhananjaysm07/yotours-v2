import Footer from '@/app/components/footer';
import InvertedHeader from '@/app/components/inverted-header';
import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import { GET_TOUR_FOR_DESTINATION } from '@/graphql/single-queries';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import Tours from '@/app/components/destination-details/tours';
import { ToursByDestinationCity } from '@/types';

export const metadata: Metadata = getPageMeta(
  'Attractions Search',
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
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching filtered attractions:', error);
    return { getDestinationByCity: { tours: [] } };
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
      <section className="layout-pt-md layout-pb-md" data-aos="fade-up">
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
      <Footer />
    </>
  );
};

export default SearchedAttractions;
