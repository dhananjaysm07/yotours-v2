"use client";

import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { createRoot } from "react-dom/client";
import { useSearchParams } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BokunScriptLoader from "../common/bokun-loader";

const SocialShareLink = lazy(() => import("../common/social-share-link"));

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

const TourProperties = ({ tours, bokunChannelId }: TourPropertiesProps) => {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  // Ensure client-side rendering only (avoids hydration errors)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ─── Auto-open modal if URL contains bokunId ──────────────────────────────
  useEffect(() => {
    const bokunId = searchParams.get("bokunId");
    if (!bokunId) return;

    const matchedTour = tours.find((tour) => tour.tourBokunId === bokunId);
    if (!matchedTour) return;

    const dataSrc = `https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${bokunId}?partialView=1`;

    const triggerBokunModal = () => {
      const matchingButton = document.querySelector(
        `.bokunButton[data-src="${dataSrc}"]`,
      ) as HTMLElement | null;

      if (matchingButton) {
        matchingButton.click();
        return true;
      }
      return false;
    };

    let attempts = 0;
    const maxAttempts = 30;

    const interval = setInterval(() => {
      attempts++;
      const success = triggerBokunModal();
      if (success || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [searchParams, bokunChannelId, tours]);

  // ─── Build share URL preserving existing params ───────────────────────────
  const buildShareUrl = useCallback((tour: Tour): string => {
    const url = new URL(window.location.href);

    // Preserve all existing params, only set/overwrite these two
    url.searchParams.set("product_name", tour.tourTitle);
    url.searchParams.set("bokunId", tour.tourBokunId);

    return url.toString();
  }, []);

  // ─── Click handler with share URL integration ───────────────────────────
  const handleBokunClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, tour: Tour) => {
      const dataSrc = event.currentTarget.getAttribute("data-src");
      const widgetContainer = document.getElementById("bokun-modal-container");

      if (widgetContainer && dataSrc) {
        const existing = widgetContainer.querySelector(".socialurl");
        if (existing) widgetContainer.removeChild(existing);

        const socialDiv = document.createElement("div");
        socialDiv.className = "socialurl";
        widgetContainer.appendChild(socialDiv);

        const root = document.createElement("div");
        socialDiv.appendChild(root);

        const shareUrl = buildShareUrl(tour);

        createRoot(root).render(
          <Suspense fallback={<div>Loading...</div>}>
            <SocialShareLink bokunWidgetUrl={dataSrc} shareUrl={shareUrl} />
          </Suspense>,
        );
      }
    },
    [buildShareUrl],
  );

  const getBadgeClasses = useCallback((tagName: string) => {
    const base =
      "py-5 px-15 relative rounded-right-4 text-12 lh-16 fw-500 uppercase";
    const themes: Record<string, string> = {
      "Big Sale": "bg-dark-1 text-white",
      "Top Selling Tours": "bg-blue-1 text-white",
      "top rated": "bg-yellow-1 text-dark-1",
      default: "bg-pink-1 text-white",
    };
    const match = Object.entries(themes).find(([k]) =>
      tagName.toLowerCase().includes(k.toLowerCase()),
    );
    return `${base} ${match ? match[1] : themes.default}`;
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Load Bokun Script Once */}
      <BokunScriptLoader bokunChannelId={bokunChannelId} />
      {tours.map((tour, index) => (
        <div
          key={tour.id}
          className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={(index + 1) * 100}
          data-src={`https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${tour.tourBokunId}?partialView=1`}
          onClick={(e) => handleBokunClick(e, tour)}
        >
          <div className="tourCard__image" style={{ position: "relative" }}>
            <div className="cardImage ratio ratio-2:1">
              <div className="cardImage__content">
                <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                  <Swiper
                    className="mySwiper"
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation
                  >
                    {tour.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          width={300}
                          height={300}
                          src={img.imageUrl || "/img/placeholder-img.webp"}
                          alt={`${tour.tourTitle} - Image ${i + 1}`}
                          className="rounded-4 col-12 js-lazy"
                          priority={i === 0 && index < 4}
                          loading={i === 0 && index < 4 ? "eager" : "lazy"}
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
