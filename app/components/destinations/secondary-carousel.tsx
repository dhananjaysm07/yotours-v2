'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigation, Pagination } from 'swiper/modules';
import { TAB_OPTIONS } from './tours-and-attractions';
import SocialShareLink from '../common/social-share-link';

interface ImageData {
  imageUrl: string;
}

interface Tag {
  name: string;
}

interface Destination {
  country: string;
}

interface Item {
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

interface TourAttractionCarouselProps {
  data: Item[];
  bokunChannelID: string;
  filter: string;
}

const TourAttractionCarousel: React.FC<TourAttractionCarouselProps> = ({
  data,
  bokunChannelID,
  filter,
}) => {
  useEffect(() => {
    if (!bokunChannelID) {
      console.error('Bokun Channel ID is not available.');
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelID}`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setTimeout(() => {
        const widgetContainer = document.getElementById(
          'bokun-modal-container'
        );
        if (!widgetContainer) {
          console.error('Widget container not found.');
          return;
        }

        const socialDiv = document.createElement('div');
        socialDiv.className = 'socialurl';
        widgetContainer.appendChild(socialDiv);
        createRoot(socialDiv).render(<SocialShareLink bokunWidgetUrl="" />);
      }, 2000);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [bokunChannelID]);

  const isTour = filter === TAB_OPTIONS.TOUR;

  const getTagClassName = (tagName: string | undefined): string => {
    if (!tagName) return '';

    const lowerTagName = tagName.toLowerCase();
    if (lowerTagName === 'trending') return 'bg-dark-1 text-white';
    if (lowerTagName === 'best seller' || lowerTagName === 'most popular tours')
      return 'bg-blue-1 text-white';
    if (lowerTagName.includes('sale')) return 'bg-yellow-1 text-white';
    return 'bg-pink-1 text-white';
  };

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        className="overflow-visible swiperpagination"
        scrollbar={{
          el: `.js-popular-destination-scrollbar`,
          draggable: true,
        }}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.js-destination-next`,
          prevEl: `.js-destination-prev`,
        }}
        breakpoints={{
          500: { slidesPerView: 1.1, centeredSlides: true },
          768: { slidesPerView: 2, centeredSlides: true },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {data?.slice(0, 8).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="col-12" data-aos="fade" data-aos-delay="100">
              <div
                className="bokunButton hotelsCard -type-1 hover-inside-slider"
                style={{ cursor: 'pointer' }}
                data-src={`https://widgets.bokun.io/online-sales/${bokunChannelID}/experience/${
                  isTour ? item.tourBokunId : item.attractionBokunId
                }?partialView=1`}
              >
                <div className="hotelsCard__image">
                  <div className="cardImage inside-slider">
                    {item?.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content">
                          <Image
                            width={300}
                            height={300}
                            quality={75}
                            className="rounded-4 col-12"
                            src={slide.imageUrl}
                            alt="image"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="cardImage__wishlist">
                      <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                        <i className="icon-heart text-12" />
                      </button>
                    </div>

                    {item.tag && (
                      <div className="cardImage__leftBadge">
                        <div
                          className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${getTagClassName(
                            item.tag.name
                          )}`}
                        >
                          {item.tag.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hotelsCard__content mt-10">
                  <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                    <span>
                      {isTour ? item?.tourTitle : item?.attractionTitle}
                    </span>
                  </h4>
                  <p className="text-light-1 lh-14 text-14 mt-5">
                    {item?.location + ', ' + item?.destination.country}
                  </p>
                  <div className="mt-5">
                    <div className="fw-500">
                      Starting from{' '}
                      <span className="text-blue-1">
                        {item?.currency} {item?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button className="section-slider-nav -prev flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-prev">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-next">
          <i className="icon icon-chevron-right text-12" />
        </button>
      </div>
    </>
  );
};

export default TourAttractionCarousel;
