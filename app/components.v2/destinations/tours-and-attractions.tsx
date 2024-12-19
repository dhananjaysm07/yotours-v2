'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import TabGroup from './tab-group';
import TourAttractionCarousel from './secondary-carousel';

export const TAB_OPTIONS = {
  TOUR: 'TOUR',
  ATTRACTION: 'ATTRACTION',
};

interface ImageData {
  imageUrl: string;
}

interface Tag {
  name: string;
}

interface Destination {
  country: string;
}

interface TourAttractionItem {
  id: string | number;
  tourBokunId?: string;
  attractionBokunId?: string;
  tourTitle?: string;
  attractionTitle?: string;
  location?: string;
  destination: Destination;
  price?: string | number;
  currency?: string;
  images?: ImageData[];
  tag?: Tag;
}

type TourAndAttractionsProps = {
  attractionData: TourAttractionItem[];
  tourData: TourAttractionItem[];
  bokunChannelID: string;
  destinationName: string;
  isCountry: boolean;
};

const ToursAndAttractions = ({
  attractionData,
  tourData,
  destinationName,
  bokunChannelID,
}: //   isCountry,
TourAndAttractionsProps) => {
  const [filterTab, setFilterTab] = useState(TAB_OPTIONS.TOUR);

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                Best Tours and Attraction Tickets in {destinationName}
              </h2>
              <div className="sectionTitle__text mt-5 sm:mt-0">
                {/* Our best selling {filterOption} */}
                <div className="col-4 md:d-none ml-auto">
                  <Link
                    href={
                      filterTab == TAB_OPTIONS.TOUR
                        ? '/tours?continent={destinationName}'
                        : '/attractions?continent={destinationName}'
                    }
                    className="button -md -pink-1 bg-pink-1-05 text-pink-1"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    View All{' '}
                    {filterTab == TAB_OPTIONS.TOUR ? 'Tours' : 'Attractions'}
                    <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End .col-auto */}

          <div className="col-auto tabs -pills-2 ">
            <TabGroup filter={filterTab} setFilter={setFilterTab} />
          </div>
          {/* End .col-auto */}
        </div>
        {/* End .row */}
        <div className="relative tourattaraction pt-40 sm:pt-20">
          <div className="row y-gap-30">
            <TourAttractionCarousel
              data={filterTab === TAB_OPTIONS.TOUR ? tourData : attractionData}
              filter={filterTab}
              bokunChannelID={bokunChannelID}
            />
          </div>
        </div>
        {/* End relative */}
      </div>
      <div className="d-none sm:d-block sectionTitle__text mt-5 sm:mt-0">
        {/* Our best selling {filterOption} */}
        <div className="col-auto ml-auto">
          <Link
            href={
              filterTab == 'tour'
                ? '/tours?continent={destinationName}'
                : '/attractions?continent={destinationName}'
            }
            className="button -md  bg-pink-1 text-white"
          >
            View All{' '}
            {filterTab == 'tour'
              ? `Tours in ${destinationName}`
              : `Attractions in ${destinationName}`}
            <div className="icon-arrow-top-right ml-15" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursAndAttractions;
