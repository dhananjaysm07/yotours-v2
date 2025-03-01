import { Metadata } from 'next';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { GET_FILTERED_TOURS } from '@/graphql/query';
import Pagination from '../components/common/pagination';
import InvertedHeader from '../components/inverted-header';
import Footer from '../components/footer';
import Sidebar from '../components/tours/tours-sidebar';
import TourProperties from '../components/tours/tour-properties';
import TopHeaderFilter from '../components/common/top-header-filter';
import {
  getAllTags,
  getContentData,
  getCountriesAndContinents,
  getUniqueTourLocations,
} from '@/lib/apollo/common-api-funcs';

export const metadata: Metadata = {
  title: 'Tours | Yo Tours',
  description: 'Explore tours with Yo Tours.',
};

interface Tour {
  id: string;
  tourTitle: string;
  bannerImage: string;
  location: string;
  price: number;
  currency: string;
  tourType: string;
  images: { imageUrl: string }[];
  tag: { name: string };
  tourBokunId: string;
}

interface GetFilteredToursResponse {
  getFilteredTours: {
    tours: Tour[];
    totalCount: number;
  };
}

const getFilteredTours = async (
  filter: Record<string, unknown>,
  page: number,
  loadCount: number
): Promise<GetFilteredToursResponse> => {
  const client = getApolloClient();
  try {
    const { data } = await client.query<GetFilteredToursResponse>({
      query: GET_FILTERED_TOURS,
      variables: {
        page,
        loadCount,
        filter,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching filtered tours:', error);
    return { getFilteredTours: { tours: [], totalCount: 0 } };
  }
};

interface ToursPageProps {
  searchParams: Promise<{
    continent?: string;
    country?: string;
    priceMin?: string;
    priceMax?: string;
    location?: string;
    tagName?: string;
    page?: string;
  }>;
}

const ToursPage = async ({ searchParams }: ToursPageProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, params.page ? parseInt(params.page) : 1);
  const dataPerPage = 9;
  const loadCount = 9;

  const filter = {
    priceMin: params.priceMin ? parseInt(params.priceMin) : null,
    priceMax: params.priceMax ? parseInt(params.priceMax) : null,
    location: params.location || null,
    continent: params.continent ? params.continent.split(',') : [],
    country: params.country ? params.country.split(',') : [],
    tagName: params.tagName ? params.tagName.split(',') : [],
  };

  const [
    filteredTours,
    countriesContinentsData,
    uniqueTourLocations,
    contentData,
    tags,
  ] = await Promise.all([
    getFilteredTours(filter, currentPage, loadCount),
    getCountriesAndContinents(),
    getUniqueTourLocations(),
    getContentData(),
    getAllTags(),
  ]);

  const { tours, totalCount } = filteredTours.getFilteredTours;

  const allTags = tags.getAllTags.map((el) => el.name);

  return (
    <>
      <div className="header-margin" />
      <InvertedHeader />
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar
                  allTags={allTags}
                  uniqueTourLocations={
                    uniqueTourLocations.getUniqueTourLocations
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
                    Filter Tours
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
                    <Sidebar
                      uniqueTourLocations={
                        uniqueTourLocations.getUniqueTourLocations
                      }
                      allTags={allTags}
                      countriesContinentsData={countriesContinentsData}
                    />
                  </aside>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <TopHeaderFilter totalResult={totalCount} currentPage="Tours" />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <TourProperties
                  tours={tours}
                  bokunChannelId={contentData.data.getContent.bokunChannelId}
                />
              </div>
              <Pagination
                totalPage={Math.ceil(totalCount / dataPerPage)}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ToursPage;
