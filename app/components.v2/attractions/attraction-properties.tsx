// components.v2/attractions/attraction-properties.tsx
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export interface Attraction {
  id: string;
  attractionTitle: string;
  bannerImage: string;
  location: string;
  price: number;
  currency: string;
  images: { imageUrl: string }[];
  tag: { name: string };
  attractionBokunId: string;
}

export interface GetFilteredAttractionsResponse {
  getFilteredAttractions: {
    attractions: Attraction[];
    totalCount: number;
  };
}

interface AttractionPropertiesProps {
  attractions: Attraction[];
  bokunChannelId: string;
  currentPage: number;
  dataPerPage: number;
  totalCount: number;
}

// Client component wrapper for Bokun widget functionality
const AttractionCard = ({
  attraction,
  bokunChannelId,
}: {
  attraction: Attraction;
  bokunChannelId: string;
}) => {
  const [clickedDataSrc, setClickedDataSrc] = useState<string | null>(null);

  useEffect(() => {
    if (bokunChannelId && typeof window !== 'undefined') {
      const handleBokunButtonClick = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;
        const dataSrc = target.getAttribute('data-src');
        setClickedDataSrc(dataSrc);
      };

      const buttons = document.querySelectorAll('.bokunButton');
      buttons.forEach((button) => {
        button.addEventListener('click', handleBokunButtonClick);
      });

      return () => {
        buttons.forEach((button) => {
          button.removeEventListener('click', handleBokunButtonClick);
        });
      };
    }
  }, [bokunChannelId]);

  return (
    <div
      className="bokunButton -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
      data-src={`https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${attraction.attractionBokunId}?partialView=1`}
    >
      <div className="tourCard__image">
        <div className="cardImage ratio ratio-2:1">
          <div className="cardImage__content">
            <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
              <Swiper
                modules={[SwiperPagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
              >
                {attraction.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      width={300}
                      height={300}
                      className="rounded-4 col-12"
                      src={image.imageUrl}
                      alt={attraction.attractionTitle}
                      priority={index === 0}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {attraction.tag?.name && (
          <div className="cardImage__leftBadge">
            <div
              className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                attraction.tag.name.toLowerCase().includes('sale')
                  ? 'bg-yellow-1 text-white'
                  : 'bg-blue-1 text-white'
              }`}
            >
              {attraction.tag.name}
            </div>
          </div>
        )}
      </div>

      <div className="tourCard__content mt-10">
        <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
          {attraction.attractionTitle}
        </h4>
        <p className="text-light-1 lh-14 text-14 mt-5">{attraction.location}</p>

        <div className="row justify-between items-center pt-15">
          <div className="col-auto">
            <div className="text-14 text-light-1">
              From{' '}
              <span className="text-16 fw-500 text-dark-1">
                {attraction.currency} {attraction.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Share Container */}
      <div id="bokun-modal-container">
        {clickedDataSrc && (
          <div className="socialurl">
            <SocialShareLink bokunWidgetUrl={clickedDataSrc} />
          </div>
        )}
      </div>
    </div>
  );
};

// Main server component
export default function AttractionProperties({
  attractions,
  bokunChannelId,
  currentPage,
  dataPerPage,
}: AttractionPropertiesProps) {
  // Calculate pagination slice
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedAttractions = attractions.slice(startIndex, endIndex);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`}
      />

      {paginatedAttractions.length === 0 ? (
        <div className="col-12 text-center py-5">
          <h3>No attractions found matching your criteria</h3>
        </div>
      ) : (
        paginatedAttractions.map((attraction) => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            bokunChannelId={bokunChannelId}
          />
        ))
      )}
    </>
  );
}
