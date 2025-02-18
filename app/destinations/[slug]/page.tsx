import { getApolloClient } from "@/lib/apollo/apollo-client-ssr";
import {
  GET_DESTINATION,
  GET_TOUR_FOR_DESTINATION,
  GET_THINGS_FOR_DESTINATION,
  GET_ATTRACTION_CARS_FOR_DESTINATION,
} from "@/graphql/single-queries";
import LocationTopBar from "@/app/components/destination-details/location-top-bar";
import LoadingDestinationBanner from "@/app/components/destination-details/loading";
import Banner from "@/app/components/destination-details/banner";
import GeneralInfo from "@/app/components/destination-details/general-info";
import Things from "@/app/components/destination-details/things";
import Tours from "@/app/components/destination-details/tours";
import ActivityCar from "@/app/components/destination-details/activity-car";
import IntroTown from "@/app/components/destination-details/intro-town";
import Footer from "@/app/components/footer";
import InvertedHeader from "@/app/components/inverted-header";
import Categories from "@/app/components/destination-details/categories";
import { SectionTitle } from "@/app/components/destination-details/section-title";
import { ExpandableSection } from "@/app/components/destination-details/expandable-section";
import { GET_CONTENT_QUERY } from "@/graphql/query";

export const metadata = {
  title: "Destinations | Yo Tours",
  description: "Explore destinations with Yo Tours.",
};

type PageProps = {
  searchParams: Promise<{
    city: string;
  }>;
};

async function getDestinationData(city: string) {
  const client = getApolloClient();

  const [
    destinationData,
    tourData,
    thingData,
    attractionCarsData,
    contentData,
  ] = await Promise.all([
    client.query({
      query: GET_DESTINATION,
      variables: { destinationName: city },
    }),
    client.query({
      query: GET_TOUR_FOR_DESTINATION,
      variables: { destinationName: city },
    }),
    client.query({
      query: GET_THINGS_FOR_DESTINATION,
      variables: { destinationName: city },
    }),
    client.query({
      query: GET_ATTRACTION_CARS_FOR_DESTINATION,
      variables: { destinationName: city },
    }),
    client.query({
      query: GET_CONTENT_QUERY,
      variables: {},
    }),
  ]);

  return {
    destination: destinationData.data?.getDestinationByCity,
    tour: tourData.data?.getDestinationByCity,
    thing: thingData.data?.getDestinationByCity,
    attractionCar: attractionCarsData.data?.getDestinationByCity,
    contentData: contentData.data,
  };
}

export default async function DestinationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { destination, tour, thing, attractionCar, contentData } =
    await getDestinationData(params.city);

  return (
    <>
      <div className="header-margin" />
      <InvertedHeader />

      {destination ? (
        <>
          <LocationTopBar props={destination} />
          <section className="layout-pb-sm">
            <div className="container">
              <div className="row">
                <Banner props={destination} />
              </div>

              <div className="row x-gap-20 y-gap-20 items-center pt-20 item_gap-x10 destination_cat">
                <Categories />
              </div>

              {destination?.introduction && (
                <ExpandableSection
                  title={`What to know before visiting ${destination.destinationName}`}
                  className="pt-20"
                >
                  <IntroTown introduction={destination.introduction} />
                </ExpandableSection>
              )}

              <div className="pt-30 mt-45 border-top-light" />

              <ExpandableSection title="General Info">
                <GeneralInfo destination={destination} />
              </ExpandableSection>

              <div className="mt-30 border-top-light" />
            </div>
          </section>

          <section className="layout-pb-sm">
            <div className="container">
              <ExpandableSection title="Best Things">
                <div className="row y-gap-30 pt-0 sm:pt-20 item_gap-x30">
                  <p className="sectionTitle__text mt-5 sm:mt-0">
                    These are the best things available for{" "}
                    {destination.destinationName}
                  </p>
                  {thing?.things ? (
                    <Things things={thing.things} />
                  ) : (
                    <h2 className="text-center">No Things</h2>
                  )}
                </div>
              </ExpandableSection>
            </div>
          </section>

          <section className="layout-pt-sm layout-pb-sm">
            <div className="container">
              <div className="row y-gap-20 justify-between items-end">
                <div className="col-auto">
                  <SectionTitle
                    title="Most Popular Tours"
                    text={`These are the popular tours for ${destination.destinationName}`}
                  />
                </div>
              </div>

              <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30 flex justify-center">
                {tour.tours ? (
                  <Tours tours={tour.tours} contentData={contentData} />
                ) : (
                  <h2 className="text-center">No Tours</h2>
                )}
              </div>
            </div>
          </section>

          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              {attractionCar?.attractions?.length > 0 && (
                <>
                  <div className="row y-gap-20 justify-between items-end">
                    <div className="col-auto">
                      <SectionTitle
                        title="Trending Attraction Tickets"
                        text={`Following are the attraction tickets for ${destination.destinationName}`}
                      />
                    </div>
                  </div>

                  <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30 flex justify-center">
                    <ActivityCar
                      attractions={attractionCar.attractions}
                      contentData={contentData}
                      type={"Attractions"}
                    />
                  </div>
                </>
              )}

              {attractionCar?.cars?.length > 0 && (
                <>
                  <div className="col-auto">
                    <SectionTitle
                      title="Trending Cars"
                      text={`Following are the cars for ${destination.destinationName}`}
                    />
                  </div>

                  <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30 flex justify-center">
                    <ActivityCar
                      attractions={attractionCar.cars}
                      type={"Cars"}
                      contentData={contentData}
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="layout-pb-sm">
          <div className="container">
            <div className="row">
              <LoadingDestinationBanner />
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
