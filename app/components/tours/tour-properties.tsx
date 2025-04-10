"use client";

import { useCallback, lazy, Suspense } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createRoot } from "react-dom/client";

// Lazy load the social share component
const SocialShareLink = lazy(() => import("../common/social-share-link"));

// Types remain the same
interface Tour {
  id: string;
  tourTitle: string;
  location: string;
  price: number;
  currency: string;
  tourType: string;
  images: { imageUrl: string }[];
  tag?: { name: string };
  tourBokunId: string;
}

interface TourPropertiesProps {
  tours: Tour[];
  bokunChannelId: string;
}

declare global {
  interface Window {
    BokunWidgetLoader?: {
      reset: () => void;
    };
  }
}

const TourProperties = ({ tours, bokunChannelId }: TourPropertiesProps) => {
  // Load Bokun script only when needed
  const loadBokunScript = useCallback(async () => {
    if (!document.querySelector('script[src*="bokun.io"]')) {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }
  }, [bokunChannelId]);

  console.log("Tours Data", tours);

  const handleBokunButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      const dataSrc = event.currentTarget.getAttribute("data-src");

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

  const getBadgeClasses = useCallback((tagName: string) => {
    const baseClasses =
      "py-5 px-15 relative rounded-right-4 text-12 lh-16 fw-500 uppercase";
    const specialCases = {
      "Big Sale": "bg-dark-1 text-white",
      "Top Selling Tours": "bg-blue-1 text-white",
      "top rated": "bg-yellow-1 text-dark-1",
      default: "bg-pink-1 text-white",
    };

    const match = Object.entries(specialCases).find(([key]) =>
      tagName.toLowerCase().includes(key.toLowerCase())
    );

    return `${baseClasses} ${match ? match[1] : specialCases.default}`;
  }, []);

  return (
    <>
      {tours.map((tour, index) => (
        <div
          key={tour.id}
          className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={(index + 1) * 100}
          data-src={`https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${tour?.tourBokunId}?partialView=1`}
          onClick={handleBokunButtonClick}
        >
          <div
            className="tourCard__image"
            style={{ position: "relative", overflow: "visible" }}
          >
            <div className="cardImage ratio ratio-2:1">
              <div className="cardImage__content">
                <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                  <Swiper
                    className="mySwiper"
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                  >
                    {tour.images.map((image, idx) => (
                      <SwiperSlide key={idx}>
                        <Image
                          width={300}
                          height={300}
                          src={image.imageUrl || "/img/placeholder-img.webp"}
                          alt={`${tour.tourTitle} - Image ${idx + 1}`}
                          className="rounded-4 col-12 js-lazy"
                          priority={idx === 0}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {tour.tag?.name && (
              <div
                className="cardImage__leftBadge"
                style={{ position: "absolute", top: "6px", left: "-8px" }}
              >
                <div className={getBadgeClasses(tour.tag.name)}>
                  {tour.tag.name}
                </div>
              </div>
            )}
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex items-center lh-14 mb-5">
              <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
              <span className="text-14 text-light-1">{tour.tourType}</span>
            </div>
            <h3 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
              {tour.tourTitle}
            </h3>
            <p className="text-light-1 lh-14 text-14 mt-5">{tour.location}</p>

            <div className="row justify-between items-center pt-15">
              <div className="col-auto">
                <span className="text-14 text-light-1">
                  From{" "}
                  <strong className="text-16 fw-500 text-dark-1">
                    {tour.currency} {tour.price}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TourProperties;
