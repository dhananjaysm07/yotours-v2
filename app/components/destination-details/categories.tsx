"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const catContent = [
  { id: 1, icon: "icon-destination", catName: "Tour" },
  { id: 2, icon: "icon-ski", catName: "Attraction Tickets" },
  { id: 3, icon: "icon-car", catName: "Car" },
];

export default function Categories() {
  return (
    <div className="row x-gap-20 y-gap-20 items-center pt-20 item_gap-x10 destination_cat">
      <div className="position-relative w-100">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          modules={[Pagination]}
          breakpoints={{
            320: { slidesPerView: 1 },
            520: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
        >
          {catContent.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="col">
                <button className="d-flex flex-column justify-content-center px-3 py-3 rounded-4 border-light text-16 lh-14 fw-500 w-100">
                  <i className={`${item.icon} text-25 mb-2`} />
                  {item.catName}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination d-flex justify-content-center mt-3"></div>
      </div>
    </div>
  );
}
