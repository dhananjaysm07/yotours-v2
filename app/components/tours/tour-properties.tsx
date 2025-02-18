"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { createRoot } from "react-dom/client";
import SocialShareLink from "../common/social-share-link";

// Type definitions
export interface Tour {
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

// Declare global window type
declare global {
  interface Window {
    BokunWidgetLoader?: {
      reset: () => void;
    };
  }
}

const TourProperties = ({ tours, bokunChannelId }: TourPropertiesProps) => {
  const [clickedDataSrc, setClickedDataSrc] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Bokun script only once
  useEffect(() => {
    if (bokunChannelId && !scriptLoaded) {
      const existingScript = document.querySelector('script[src*="bokun.io"]');

      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
        script.async = true;

        script.onload = () => {
          setScriptLoaded(true);
        };

        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
          setScriptLoaded(false);
        };
      } else {
        setScriptLoaded(true);
      }
    }
  }, [bokunChannelId]);

  // Handle widget container and social share
  useEffect(() => {
    if (scriptLoaded && clickedDataSrc) {
      const initializeWidget = () => {
        const widgetContainer = document.getElementById(
          "bokun-modal-container"
        );
        if (widgetContainer) {
          // Remove existing social div if present
          const existingSocialDiv = widgetContainer.querySelector(".socialurl");
          if (existingSocialDiv) {
            widgetContainer.removeChild(existingSocialDiv);
          }

          // Create new social div
          const socialDiv = document.createElement("div");
          socialDiv.className = "socialurl";
          widgetContainer.appendChild(socialDiv);

          const socialLink = (
            <SocialShareLink bokunWidgetUrl={clickedDataSrc} />
          );

          if (socialLink.props.bokunWidgetUrl) {
            createRoot(socialDiv).render(socialLink);
          }
        }
      };

      // Give the widget time to mount
      const timer = setTimeout(initializeWidget, 1000);
      return () => clearTimeout(timer);
    }
  }, [clickedDataSrc, scriptLoaded]);

  const handleBokunButtonClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const dataSrc = event.currentTarget.getAttribute("data-src");
      setClickedDataSrc(dataSrc);

      // Reset any existing Bokun widgets
      if (window.BokunWidgetLoader) {
        window.BokunWidgetLoader.reset();
      }
    },
    []
  );

  const getBadgeClasses = (tagName: string) => {
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
  };

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
                          src={
                            image.imageUrl
                              ? image.imageUrl
                              : "/img/placeholder-img.webp"
                          }
                          alt={`${tour.tourTitle} - Image ${idx + 1}`}
                          className="rounded-4 col-12 js-lazy"
                          priority={idx === 0}
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
