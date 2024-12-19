import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Scrollbar } from "swiper";
import { destinations2 } from "../../data/desinations";
import { GET_DESTINATIONS_QUERY } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import { createSlug } from "../../utils/slugify";
import { useData } from "../../lib/datacontext";
const AllDestinations = () => {
  // const { loading, error, data } = useQuery(GET_DESTINATIONS_QUERY);
  const { destinationData, destinationLoading, destinationError } = useData();
  if (destinationLoading) return <p>Loading destinations...</p>;
  if (destinationError) return <p>Error loading destinations</p>;
  return (
    <>
      <div className="relative overflow-hidden pt-40 sm:pt-20">
        <div className="row y-gap-30">
          {/* <Swiper
        spaceBetween={30}
        className="overflow-visible"
        scrollbar={{
          el: ".js-popular-destination-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
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
      > */}
          {destinationData?.getDestinations.map((item) => (
            // <SwiperSlide key={item.id}>
            <div
              className="col-xl-3 col-lg-3 col-sm-6"
              key={item?.id}
              data-aos="fade"
              data-aos-delay="100"
            >
              <Link
                href={{
                  pathname: `/destinations/${createSlug(item.destinationName)}`,
                  query: { id: item.id }, // passing the ID as a query parameter
                }}
                className="citiesCard -type-1 d-block rounded-4"
                key={item.id}
              >
                <div className="citiesCard__image ratio ratio-3:4">
                  <Image
                    width={300}
                    height={400}
                    src={item.bannerImage}
                    alt="image"
                    className="js-lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="citiesCard__content d-flex flex-column justify-between text-center pt-30 pb-20 px-20">
                  <div className="citiesCard__bg" />
                  <div className="citiesCard__top">
                    <div className="text-14 text-white">
                      {item.destinationName}
                    </div>
                  </div>
                  <div className="citiesCard__bottom">
                    <h4 className="text-26 md:text-20 lh-13 text-white mb-20">
                      {item.destinationName}
                    </h4>
                    <button className="button col-12 h-60 -blue-1 bg-white text-dark-1">
                      Discover
                    </button>
                  </div>
                </div>
              </Link>
              {/* </SwiperSlide> */}
            </div>
          ))}
          {/* </Swiper> */}
        </div>
      </div>
      {/* 
      <div>
        <button className="section-slider-nav  -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-prev">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-next">
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div className="slider-scrollbar bg-light-2 mt-40  js-popular-destination-scrollbar" />
      </div> */}
    </>
  );
};

export default AllDestinations;
