// app/destinations/page.tsx
import { Metadata } from 'next';
import InvertedHeader from '../components/inverted-header';
import Pagination from '../components/common/pagination';
import Footer from '../components/footer';
import DestinationGrid from '../components/destination-list/destination-grid';
import { GET_FILTERED_DESTINATION } from '@/graphql/query';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import DestinationSidebar from '../components/destination-list/destination-sidebar';
import TopHeaderFilter from '../components/common/top-header-filter';
import { GetFilteredDestinationResponse } from '@/types';
import {
  getCountriesAndContinents,
  getUniqueDestinations,
} from '@/lib/apollo/common-api-funcs';

export const metadata: Metadata = {
  title: 'Destinations | Yo Tours',
  description: 'Explore destinations with Yo Tours.',
};

const getFilteredDestinations = async (
  filter: Record<string, unknown>,
  page: number, // Page starts from 1
  loadCount: number
): Promise<GetFilteredDestinationResponse> => {
  const client = getApolloClient();
  try {
    const { data } = await client.query<GetFilteredDestinationResponse>({
      query: GET_FILTERED_DESTINATION,
      variables: {
        page: page, // No subtraction here
        loadCount,
        filter,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching filtered destinations:', error);
    return { getFilteredDestination: { destinations: [], totalCount: 0 } };
  }
};

interface DestinationSearchParams {
  continent?: string;
  country?: string;
  priceMin?: string;
  priceMax?: string;
  location?: string;
  tagName?: string;
  page?: string;
}

interface DestinationPageProps {
  searchParams: Promise<DestinationSearchParams>;
}

const DestinationPage = async ({ searchParams }: DestinationPageProps) => {
  const params = await searchParams;
  // Ensure page is at least 1
  const currentPage = Math.max(1, params.page ? parseInt(params.page) : 1);
  const dataPerPage = 9; // Number of items per page
  const loadCount = 9; // Fixed loadCount

  // Parse searchParams into a filter object
  const filter = {
    priceMin: params.priceMin ? parseInt(params.priceMin) : null,
    priceMax: params.priceMax ? parseInt(params.priceMax) : null,
    location: params.location || null,
    continent: params.continent ? params.continent.split(',') : [],
    country: params.country ? params.country.split(',') : [],
    tagName: params.tagName ? params.tagName.split(',') : [],
  };

  // Fetch filtered destinations and countries/continents on the server
  const [filteredDestinations, countriesContinentsData, uniqueDestinations] =
    await Promise.all([
      getFilteredDestinations(filter, currentPage, loadCount),
      getCountriesAndContinents(),
      getUniqueDestinations(),
    ]);

  const { destinations, totalCount } =
    filteredDestinations.getFilteredDestination;

  return (
    <>
      <div className="header-margin"></div>
      <InvertedHeader />
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <DestinationSidebar
                  uniqueDestinations={
                    uniqueDestinations.getUniqueDestinationLocations
                  }
                  countriesContinentsData={countriesContinentsData}
                />
              </aside>
              <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Destinations
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40 xl:d-block">
                    <DestinationSidebar
                      uniqueDestinations={
                        uniqueDestinations.getUniqueDestinationLocations
                      }
                      countriesContinentsData={countriesContinentsData}
                    />
                  </aside>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <TopHeaderFilter
                totalResult={totalCount}
                currentPage="Destinations"
              />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <DestinationGrid destinations={destinations} />
              </div>
              <Pagination
                totalPage={Math.ceil(totalCount / dataPerPage)}
                currentPage={currentPage} // Page starts from 1
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DestinationPage;
