"use client";

import Image from "next/image";
import Slider from "react-slick";
import { createRoot } from "react-dom/client";
import { JSX, useEffect } from "react";
import { Attraction, ContentData } from "@/types";
import SocialShareLink from "./social-share-link";
import { motion } from "framer-motion";
interface ActivityProps {
  contentData: ContentData;
  attractions: Attraction[];
}

interface ArrowProps {
  type: "next" | "prev";
  onClick?: () => void;
}

const itemSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Arrow = ({ type, onClick }: ArrowProps): JSX.Element => {
  const className = `slick_arrow-between slick_arrow -${type} arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-${type} arrow`;
  const icon =
    type === "next" ? (
      <i className="icon icon-chevron-right text-12" />
    ) : (
      <span className="icon icon-chevron-left text-12" />
    );

  return (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
};

const getTagClassName = (tagName: string | undefined): string => {
  if (!tagName) return "";

  const lowerTagName = tagName.toLowerCase();
  if (lowerTagName === "trending") return "bg-dark-1 text-white";
  if (lowerTagName === "best seller" || lowerTagName === "most popular tours")
    return "bg-blue-1 text-white";
  if (lowerTagName.includes("sale")) return "bg-yellow-1 text-white";
  return "bg-pink-1 text-white";
};

const Activity = ({ contentData, attractions }: ActivityProps): JSX.Element => {
  useEffect(() => {
    const bokunChannelId = contentData?.bokunChannelId;
    if (!bokunChannelId) {
      console.error("Bokun Channel ID is not available.");
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setTimeout(() => {
        const widgetContainer = document.getElementById(
          "bokun-modal-container"
        );
        if (!widgetContainer) {
          console.error("Widget container not found.");
          return;
        }

        const socialDiv = document.createElement("div");
        socialDiv.className = "socialurl";
        widgetContainer.appendChild(socialDiv);
        createRoot(socialDiv).render(<SocialShareLink bokunWidgetUrl="" />);
      }, 2000);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [contentData?.bokunChannelId]);

  const activeAttractions = attractions.filter(
    (attraction) => attraction.active
  );

  return (
    <div className="relative overflow-hidden pt-40 sm:pt-20">
      <div className="row y-gap-30">
        {activeAttractions.map((item) => (
          <motion.div
            className="col-xl-3 col-lg-3 col-sm-6"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider"
              style={{ cursor: "pointer" }}
              data-src={`https://widgets.bokun.io/online-sales/${contentData?.bokunChannelId}/experience/${item.attractionBokunId}?partialView=1`}
            >
              <div className="activityCard__image position-relative">
                <div className="inside-slider">
                  <Slider
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
                    {item.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content">
                          <Image
                            width={300}
                            height={300}
                            className="col-12 js-lazy"
                            src={slide.imageUrl}
                            alt="image"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>

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

              <div className="activityCard__content mt-10">
                <h4 className="activityCard__title lh-16 fw-500 text-dark-1 text-18">
                  <span>{item.attractionTitle}</span>
                </h4>
                <p className="text-light-1 text-14 lh-14 mt-5">
                  {item.location}
                </p>

                {item.price && (
                  <div className="row justify-between items-center pt-10">
                    <div className="col-auto">
                      <div className="text-14 text-light-1">
                        From{" "}
                        <span className="text-16 fw-500 text-dark-1">
                          {item.currency || "US$"} {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
