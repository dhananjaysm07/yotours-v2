'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const catContent = [
  { id: 1, icon: 'icon-destination', catName: 'Tour' },
  { id: 2, icon: 'icon-ski', catName: 'Attraction Tickets' },
  { id: 3, icon: 'icon-car', catName: 'Car' },
];

export default function Categories() {
  return (
    <div className="row x-gap-20 y-gap-20 items-center pt-20 item_gap-x10 destination_cat">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {catContent.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="col">
              <button className="d-flex flex-column justify-center px-20 py-15 rounded-4 border-light text-16 lh-14 fw-500 col-12">
                <i className={`${item.icon} text-25 mb-10`} />
                {item.catName}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
