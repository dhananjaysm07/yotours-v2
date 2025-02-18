"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { createRoot } from "react-dom/client";
import SocialShareLink from "../common/social-share-link";

interface ActivityCarProps {
  attractions: {
    id: string;
    carTitle?: string; // For Car type
    attractionTitle?: string; // For Attraction type
    images: { id: string; imageUrl: string }[];
    location: string;
    price: number | null;
    currency: string | null;
    tag: { name: string } | null;
    carBokunId?: string; // For Car type
    attractionBokunId?: string; // For Attraction type
    __typename: "Car" | "Attraction";
  }[];
  contentData: {
    getContent: {
      bokunChannelId: string;
    };
  };
  type: "Attractions" | "Cars";
}

function Arrow(props: { type: "next" | "prev" }) {
  const className =
    props.type === "next"
      ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
      : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";

  const char =
    props.type === "next" ? (
      <i className="icon icon-chevron-right text-12"></i>
    ) : (
      <span className="icon icon-chevron-left text-12"></span>
    );

  return <button className={`${className} arrow`}>{char}</button>;
}

export default function ActivityCar({
  attractions,
  contentData,
  type,
}: ActivityCarProps) {
  const [clickedDataSrc, setClickedDataSrc] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Bokun script only once
  useEffect(() => {
    const bokunChannelId = contentData?.getContent.bokunChannelId;
    if (!bokunChannelId) {
      console.error("Bokun Channel ID is not available.");
      return;
    }

    const existingScript = document.querySelector('script[src*="bokun.io"]');
    if (!existingScript && !scriptLoaded) {
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
  }, [contentData?.getContent.bokunChannelId, scriptLoaded]);

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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const getTagClassName = (tagName?: string) => {
    if (!tagName) return "bg-blue-1 text-white";

    const lowerTagName = tagName.toLowerCase();
    if (lowerTagName.includes("trending")) return "bg-dark-1 text-white";
    if (
      lowerTagName.includes("best seller") ||
      lowerTagName.includes("most popular")
    )
      return "bg-blue-1 text-white";
    if (lowerTagName.includes("sale")) return "bg-yellow-1 text-white";
    return "bg-pink-1 text-white";
  };

  return (
    <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30">
      {attractions.length > 0 ? (
        <>
          {attractions.map((item) => (
            <div
              key={item.id}
              className="col-xl-3 col-lg-4 col-sm-6"
              data-aos="fade"
              data-aos-delay="100"
            >
              <div
                className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider"
                style={{ cursor: "pointer" }}
                data-src={
                  type === "Cars"
                    ? `https://widgets.bokun.io/online-sales/${contentData?.getContent.bokunChannelId}/experience/${item.carBokunId}?partialView=1`
                    : `https://widgets.bokun.io/online-sales/${contentData?.getContent.bokunChannelId}/experience/${item.attractionBokunId}?partialView=1`
                }
                onClick={handleBokunButtonClick}
              >
                <div className="tourCard__image position-relative">
                  <div className="inside-slider">
                    <Slider
                      {...sliderSettings}
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
                              src={slide.imageUrl || "/img/default-tour.jpg"}
                              alt={
                                type === "Cars"
                                  ? item.carTitle || "Car"
                                  : item.attractionTitle || "Attraction"
                              }
                              style={{ objectFit: "cover" }}
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

                <div className="tourCard__content mt-10">
                  <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                    <span>
                      {type === "Cars" ? item.carTitle : item.attractionTitle}
                    </span>
                  </h4>
                  <p className="text-light-1 lh-14 text-14 mt-5">
                    {item.location}
                  </p>

                  <div className="row justify-between items-center pt-15">
                    {item.price && (
                      <div className="col-auto">
                        <div className="text-14 text-light-1">
                          From
                          <span className="text-16 fw-500 text-dark-1">
                            {" "}
                            {item.currency || "US$"} {item.price}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col-12 text-center">
          <h2 className="text-22 fw-500">No {type} Available</h2>
        </div>
      )}
    </div>
  );
}
