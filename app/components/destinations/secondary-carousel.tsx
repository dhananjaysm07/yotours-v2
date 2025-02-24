"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TAB_OPTIONS } from "./tours-and-attractions";
import { createRoot } from "react-dom/client";

// Lazy load the social share component
const SocialShareLink = lazy(() => import("../common/social-share-link"));

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

declare global {
  interface Window {
    BokunWidgetLoader?: {
      reset: () => void;
    };
  }
}

const TourAttractionCarousel: React.FC<TourAttractionCarouselProps> = ({
  data,
  bokunChannelID,
  filter,
}) => {
  const uniqueId = data[0]?.id;
  const isTour = filter === TAB_OPTIONS.TOUR;

  // Load Bokun script only when needed
  const loadBokunScript = useCallback(async () => {
    if (!bokunChannelID) {
      console.error("Bokun Channel ID is not available.");
      return;
    }

    if (!document.querySelector('script[src*="bokun.io"]')) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelID}`;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }
  }, [bokunChannelID]);

  const handleBokunButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      const dataSrc = event.currentTarget.getAttribute("data-src");
      if (!dataSrc) return;

      // Load Bokun script only when user clicks
      await loadBokunScript();

      // Reset any existing Bokun widgets
      if (window.BokunWidgetLoader) {
        window.BokunWidgetLoader.reset();
      }

      // Initialize social share after modal opens
      setTimeout(() => {
        const widgetContainer = document.getElementById(
          "bokun-modal-container"
        );
        if (widgetContainer && dataSrc) {
          const socialDiv = document.createElement("div");
          socialDiv.className = "socialurl";
          widgetContainer.appendChild(socialDiv);

          const root = document.createElement("div");
          socialDiv.appendChild(root);

          createRoot(root).render(
            <Suspense fallback={<div>Loading...</div>}>
              <SocialShareLink bokunWidgetUrl={dataSrc} />
            </Suspense>
          );
        }
      }, 1000);
    },
    [loadBokunScript]
  );

  const getTagClassName = useCallback((tagName: string | undefined): string => {
    if (!tagName) return "";

    const lowerTagName = tagName.toLowerCase();
    if (lowerTagName === "trending") return "bg-dark-1 text-white";
    if (lowerTagName === "best seller" || lowerTagName === "most popular tours")
      return "bg-blue-1 text-white";
    if (lowerTagName.includes("sale")) return "bg-yellow-1 text-white";
    return "bg-pink-1 text-white";
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        className="overflow-visible swiperpagination"
        scrollbar={{
          el: `.js-popular-destination-scrollbar_${uniqueId}`,
          draggable: true,
        }}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.js-destination-next_${uniqueId}`,
          prevEl: `.js-destination-prev_${uniqueId}`,
        }}
        breakpoints={{
          500: { slidesPerView: 1.1, centeredSlides: true },
          768: { slidesPerView: 2, centeredSlides: true },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => {
          requestAnimationFrame(() => {
            swiper.navigation.update();
          });
        }}
      >
        {data?.slice(0, 8).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="col-12" data-aos="fade" data-aos-delay="100">
              <div
                className="bokunButton hotelsCard -type-1 hover-inside-slider"
                style={{ cursor: "pointer" }}
                data-src={`https://widgets.bokun.io/online-sales/${bokunChannelID}/experience/${
                  isTour ? item.tourBokunId : item.attractionBokunId
                }?partialView=1`}
                onClick={handleBokunButtonClick}
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
                            alt={
                              isTour
                                ? item.tourTitle || ""
                                : item.attractionTitle || ""
                            }
                            style={{ objectFit: "cover" }}
                            priority={i === 0}
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="cardImage__wishlist">
                      <button
                        className="button -blue-1 bg-white size-30 rounded-full shadow-2"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                    {item?.location && item?.destination?.country
                      ? `${item.location}, ${item.destination.country}`
                      : item?.location || item?.destination?.country}
                  </p>
                  <div className="mt-5">
                    <div className="fw-500">
                      Starting from{" "}
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
        <button
          className={`section-slider-nav -prev flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-prev_${uniqueId}`}
        >
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button
          className={`section-slider-nav -next flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full js-destination-next_${uniqueId}`}
        >
          <i className="icon icon-chevron-right text-12" />
        </button>
      </div>
    </>
  );
};

export default TourAttractionCarousel;
