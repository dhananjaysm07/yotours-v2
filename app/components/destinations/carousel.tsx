'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { createSlug } from '@/utils/slugify';
import { Destination } from '@/types';

interface DestinationCarouselProps {
  popularDestinations: Destination[];
  id: string | number;
}

const DestinationCarousel: React.FC<DestinationCarouselProps> = ({
  popularDestinations,
  id,
}) => {
  return (
    <>
      <Swiper
        spaceBetween={25}
        slidesPerView={1.1}
        className="overflow-visible swiperpagination"
        scrollbar={{
          el: `.js-popular-destination-scrollbar_${id}`,
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: `.js-destination-next_${id}`,
          prevEl: `.js-destination-prev_${id}`,
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {popularDestinations?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={{
                pathname: `/destinations/${createSlug(item?.destinationName)}`,
                query: { city: item?.destinationName }, // passing the destinationName as a query parameter
              }}
              className="citiesCard -type-1 d-block rounded-4"
            >
              <div className="citiesCard__image ratio ratio-3:4">
                <Image
                  width={800} // Increased from 200
                  height={1000} // Increased from 200
                  quality={100}
                  src={item.bannerImage}
                  alt={item.destinationName}
                  style={{ objectFit: 'cover' }}
                  className="rounded-4" // Added for consistency with card design
                />
              </div>
              <div className="citiesCard__content d-flex flex-column justify-between text-center pt-30 pb-20 px-20">
                <div className="citiesCard__bg" />
                <div className="citiesCard__top">
                  <div className="text-14 text-white">
                    {item.tours?.filter((el) => el.active).length || 0}{' '}
                    {' Tours'}{' '}
                    {item.attractions?.filter((el) => el.active).length || 0}{' '}
                    {' Attractions'}
                  </div>
                </div>
                <div className="citiesCard__bottom">
                  <h4 className="text-26 md:text-20 lh-13 text-white mb-20">
                    {item.destinationName}
                  </h4>
                  <button
                    aria-label="Discover"
                    className="button col-12 h-60 -pink-1 bg-white text-dark-1"
                  >
                    Discover
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button
          aria-label="Previous slide"
          className={`section-slider-nav -prev flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-prev_${id}`}
        >
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button
          aria-label="Next slide"
          className={`section-slider-nav -next flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-next_${id}`}
        >
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div
          className={`slider-scrollbar bg-light-2 mt-40 js-popular-destination-scrollbar_${id}`}
        />
      </div>
    </>
  );
};

export default DestinationCarousel;
