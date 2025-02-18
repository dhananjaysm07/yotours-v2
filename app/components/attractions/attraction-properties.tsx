"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useRef, useEffect, useCallback } from "react";
import { Attraction } from "@/types";
import { createRoot, Root } from "react-dom/client";
import SocialShareLink from "../common/social-share-link";

interface AttractionPropertiesProps {
  attractions: Attraction[];
  bokunChannelId: string;
  currentPage: number;
  dataPerPage: number;
}

const AttractionProperties = ({
  attractions,
  bokunChannelId,
}: AttractionPropertiesProps) => {
  const [clickedDataSrc, setClickedDataSrc] = useState<string | null>(null);
  const scriptLoaded = useRef(false);
  const socialRootRef = useRef<Root | null>(null);

  // Load Bokun script only once
  useEffect(() => {
    if (bokunChannelId && !scriptLoaded.current) {
      const existingScript = document.querySelector('script[src*="bokun.io"]');

      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
        script.async = true;

        script.onload = () => {
          scriptLoaded.current = true;
        };

        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
          scriptLoaded.current = false;
        };
      } else {
        scriptLoaded.current = true;
      }
    }
  }, [bokunChannelId]);

  // Handle widget container and social share
  useEffect(() => {
    if (scriptLoaded.current && clickedDataSrc) {
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

          // Unmount previous root if it exists
          if (socialRootRef.current) {
            socialRootRef.current.unmount();
          }

          // Create new root and render social link
          socialRootRef.current = createRoot(socialDiv);
          socialRootRef.current.render(
            <SocialShareLink bokunWidgetUrl={clickedDataSrc || ""} />
          );
        }
      };

      // Give the widget time to mount
      const timer = setTimeout(initializeWidget, 1000);
      return () => clearTimeout(timer);
    }
  }, [clickedDataSrc]);

  const handleBokunButtonClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const dataSrc = event.currentTarget.getAttribute("data-src");
      if (dataSrc) {
        setClickedDataSrc(dataSrc);

        // Reset any existing Bokun widgets
        if (window.BokunWidgetLoader) {
          window.BokunWidgetLoader.reset();
        }
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
      {attractions.map((item, index) => (
        <div
          key={item?.id}
          className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={(index + 1) * 100}
          data-src={
            item?.attractionBokunId
              ? `https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${item.attractionBokunId}?partialView=1`
              : undefined
          }
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
                    {item?.images?.map((slide, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          width={300}
                          height={300}
                          src={slide.imageUrl || "/img/placeholder-img.webp"}
                          alt={`${item.attractionTitle} - Image ${i + 1}`}
                          className="rounded-4 col-12 js-lazy"
                          priority={i === 0}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            <div
              className="cardImage__wishlist"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                <i className="icon-heart text-12" />
              </button>
            </div>

            {item?.tag?.name && (
              <div
                className="cardImage__leftBadge"
                style={{ position: "absolute", top: "6px", left: "-8px" }}
              >
                <div className={getBadgeClasses(item.tag.name)}>
                  {item.tag.name}
                </div>
              </div>
            )}
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex items-center lh-14 mb-5">
              <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
            </div>
            <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
              {item?.attractionTitle}
            </h4>
            <p className="text-light-1 lh-14 text-14 mt-5">{item?.location}</p>

            <div className="row justify-between items-center pt-15">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  From
                  <strong className="text-16 fw-500 text-dark-1">
                    {" "}
                    {item?.currency} {item?.price}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AttractionProperties;
