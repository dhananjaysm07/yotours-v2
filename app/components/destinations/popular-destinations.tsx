import Link from 'next/link';
import DestinationCarousel from './carousel';
import { Destination } from '@/types';

type PopularDestinationsProps = {
  destinationData: Destination[];
  destinationName: string;
  // isCountry?: boolean;
  // Currently no use of isCountry hence commented
};

const PopularDestinations = ({
  destinationData,
  destinationName,
}: // isCountry
PopularDestinationsProps) => {
  return (
    <>
      <section className="layout-pt-lg layout-pb-md" data-aos="fade-up">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Popular Destinations In {destinationName}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations in {destinationName} have a lot to
                  offer
                </p>
              </div>
            </div>
            <div className="col-auto">
              <Link
                href="/destinations"
                className="button -md -pink-1 bg-pink-1-05 text-pink-1"
              >
                View All Destinations
                <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          <div className="relative pt-40 sm:pt-20">
            {destinationData ? (
              <DestinationCarousel
                popularDestinations={destinationData}
                id={100140929}
              />
            ) : (
              `No Destinations in ${destinationName}`
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularDestinations;
