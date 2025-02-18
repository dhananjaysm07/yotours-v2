import { Metadata } from "next";
import { getApolloClient } from "@/lib/apollo/apollo-client-ssr";
import {
  GET_FILTERED_ATTRACTIONs,
  GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY,
  GET_ALL_TAGS,
} from "@/graphql/query";
import Pagination from "../components/common/pagination";
import InvertedHeader from "../components/inverted-header";
import Footer from "../components/footer";
import TopHeaderFilter from "../components/common/top-header-filter";
import { unstable_cache } from "next/cache";
import { constants } from "@/constants";
import Sidebar from "../components/attractions/attraction-sidebar";
import {
  AttractionCountriesContinentsData,
  GetFilteredAttractionsResponse,
  TagData,
} from "@/types";
import {
  getContentData,
  getUniqueDestinations,
} from "@/lib/apollo/common-api-funcs";
import AttractionProperties from "../components/attractions/attraction-properties";

export const metadata: Metadata = {
  title: "Attractions | Yo Tours",
  description: "Explore attractions with Yo Tours.",
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
    console.error("Error fetching filtered attractions:", error);
    return { getFilteredAttractions: { attractions: [], totalCount: 0 } };
  }
};

const getCountriesAndContinents = unstable_cache(
  async (): Promise<AttractionCountriesContinentsData> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<AttractionCountriesContinentsData>({
        query: GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY,
      });
      return data;
    } catch (error) {
      console.error("Error fetching countries and continents:", error);
      return { getCountriesAndContinentsForAttractions: [] };
    }
  },
  ["GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY"],
  { revalidate: constants.revalidationSeconds }
);

const getAllTags = unstable_cache(
  async (): Promise<TagData> => {
    const client = getApolloClient();
    try {
      const { data } = await client.query<TagData>({
        query: GET_ALL_TAGS,
      });
      return data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      return { getAllTags: [] };
    }
  },
  ["GET_ALL_TAGS"],
  { revalidate: constants.revalidationSeconds }
);

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AttractionsPage({ searchParams }: PageProps) {
  const currentPage = Math.max(
    1,
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1
  );
  const dataPerPage = 9;
  const loadCount = 9;

  const filter = {
    priceMin:
      typeof searchParams.priceMin === "string"
        ? parseInt(searchParams.priceMin)
        : null,
    priceMax:
      typeof searchParams.priceMax === "string"
        ? parseInt(searchParams.priceMax)
        : null,
    location:
      typeof searchParams.location === "string" ? searchParams.location : null,
    continent:
      typeof searchParams.continent === "string"
        ? searchParams.continent.split(",")
        : [],
    country:
      typeof searchParams.country === "string"
        ? searchParams.country.split(",")
        : [],
    tagName:
      typeof searchParams.tagName === "string"
        ? searchParams.tagName.split(",")
        : [],
  };

  const [
    filteredAttractions,
    countriesContinentsData,
    tagData,
    contentData,
    uniqueDestinationLocations,
  ] = await Promise.all([
    getFilteredAttractions(filter, currentPage, loadCount),
    getCountriesAndContinents(),
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
                  currentPage={currentPage}
                  dataPerPage={dataPerPage}
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
