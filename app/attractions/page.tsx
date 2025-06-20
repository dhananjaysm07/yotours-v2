import { Metadata } from 'next';
import { getApolloClient } from '@/lib/apollo/apollo-client-ssr';
import { GET_FILTERED_ATTRACTIONs } from '@/graphql/query';
import Pagination from '../components/common/pagination';
import InvertedHeader from '../components/inverted-header';
import Footer from '../components/footer';
import TopHeaderFilter from '../components/common/top-header-filter';
import Sidebar from '../components/attractions/attraction-sidebar';
import { GetFilteredAttractionsResponse } from '@/types';
import {
  getAllTags,
  getAttractionsCountriesAndContinents,
  getContentData,
  getUniqueDestinations,
} from '@/lib/apollo/common-api-funcs';
import AttractionProperties from '../components/attractions/attraction-properties';

export const metadata: Metadata = {
  title: 'Attractions | Yo Tours',
  description: 'Explore attractions with Yo Tours.',
};

const getFilteredAttractions = async (
  filter: Record<string, unknown>,
  page: number,
  loadCount: number
): Promise<GetFilteredAttractionsResponse> => {
  const client = getApolloClient();
  try {
    const { data } = await client.query<GetFilteredAttractionsResponse>({
      query: GET_FILTERED_ATTRACTIONs,
      variables: {
        page,
        loadCount,
        filter,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching filtered attractions:', error);
    return { getFilteredAttractions: { attractions: [], totalCount: 0 } };
  }
};

interface SearchParams {
  continent?: string;
  country?: string;
  priceMin?: string;
  priceMax?: string;
  location?: string;
  tagName?: string;
  page?: string;
}

interface AttractionsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function AttractionsPage({
  searchParams,
}: AttractionsPageProps) {
  // Resolve the searchParams promise
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
    filteredAttractions,
    countriesContinentsData,
    tagData,
    contentData,
    uniqueDestinationLocations,
  ] = await Promise.all([
    getFilteredAttractions(filter, currentPage, loadCount),
    getAttractionsCountriesAndContinents(),
    getAllTags(),
    getContentData(),
    getUniqueDestinations(),
  ]);

  const { attractions, totalCount } =
    filteredAttractions.getFilteredAttractions;

  return (
    <>
      <div className="header-margin"></div>
      <InvertedHeader />
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar
                  categories={tagData.getAllTags.map((el) => el.name)}
                  uniqueAttractionLocations={
                    uniqueDestinationLocations.getUniqueDestinationLocations
                  }
                  countriesContinentsData={countriesContinentsData}
                />
              </aside>
            </div>

            <div className="col-xl-9">
              <TopHeaderFilter
                totalResult={totalCount}
                currentPage="Attractions"
              />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <AttractionProperties
                  attractions={attractions}
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
}
