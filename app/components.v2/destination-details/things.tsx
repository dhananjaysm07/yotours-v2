'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface ThingsProps {
  things: {
    id: string;
    thingTitle: string;
    thingDescription: string;
    images: { id: string; imageUrl: string }[];
  }[];
}

export default function Things({ things }: ThingsProps) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.js-populars-tour-next',
          prevEl: '.js-populars-tour-prev',
        }}
        pagination={{
          el: '.js-tour-pag_active',
          clickable: true,
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
        {things.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="tourCard -type-1 rounded-4 hover-inside-slider">
              <div className="tourCard__image">
                <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                  <Swiper
                    className="mySwiper"
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={true}
                  >
                    {item.images.map((slide, i) => (
                      <SwiperSlide key={i}>
                        <div className="cardImage ratio ratio-2:1">
                          <div className="cardImage__content">
                            <Image
                              width={300}
                              height={300}
                              className="rounded-4 col-12 js-lazy"
                              src={slide.imageUrl}
                              alt="image"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="tourCard__content mt-5">
                <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                  <span>{item.thingTitle}</span>
                </h4>
                <p className="text-light-1 lh-14 text-14 mt-5">
                  {item.thingDescription}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="d-flex x-gap-15 items-center justify-center pt-0 sm:pt-20">
        <div className="col-auto">
          <button className="d-flex items-center text-24 arrow-left-hover js-populars-tour-prev">
            <i className="icon icon-arrow-left" />
          </button>
        </div>
        <div className="col-auto">
          <div className="pagination -dots text-border js-tour-pag_active" />
        </div>
        <div className="col-auto">
          <button className="d-flex items-center text-24 arrow-right-hover js-populars-tour-next">
            <i className="icon icon-arrow-right" />
          </button>
        </div>
      </div>
    </>
  );
}
