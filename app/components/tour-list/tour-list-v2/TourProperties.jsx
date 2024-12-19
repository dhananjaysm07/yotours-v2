import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import toursData from "../../../data/tours";
import isTextMatched from "../../../utils/isTextMatched";
import { useData } from "../../../lib/datacontext";
import { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import SocialShareLink from "../../../components/common/socialShare";

import {
  useFilterStore,
  useTourFilterStore,
  useTourPaginationStore,
} from "../../../lib/store";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_TOURS } from "../../../graphql/query";
import { useRouter } from "next/router";
import LoadingCard from "./../../Loading/LoadingCard";
const TourProperties = ({ filter, setFilter }) => {
  // const {
  //   contentData,
  //   refetch,
  //   tourFilteredData,
  //   tourFilteredError,
  //   tourFilteredLoading,
  // } = useData();
  const { contentData } = useData();
  const [clickedDataSrc, setClickedDataSrc] = useState(null);

  const {
    loading: tourFilteredLoading,
    error: tourFilteredError,
    data: tourFilteredData,
    refetch,
  } = useQuery(GET_FILTERED_TOURS, {
    variables: {
      page: 0,
      loadCount: 0,
      filter: {
        priceMin: null,
        startDate: null,
        priceMax: null,
        location: null,
        endDate: null,
        tagName: [],
        continent: [],
      },
    },
    skip: true,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const router = useRouter();
  const { continent } = router.query;
  // const { setContinent } = useTourFilterStore();
  React.useEffect(() => {
    if (continent)
      setFilter({
        priceMin: null,
        startDate: null,
        priceMax: null,
        location: null,
        endDate: null,
        continent: [continent],
        tagName: [],
      });
  }, [continent]);
  // console.log("filter-------------", filter, continent);
  const {
    setTourPaginationData,
    currentPage,
    dataPerPage,
    loadCount,
    totalPageLoaded,
    setCurrentPage,
    setTourData,
    tourList,
    totalResult,
  } = useTourPaginationStore();

  const handleRefetchData = async () => {
    try {
      setIsLoading(true);
      const pageToBeLoaded =
        Math.floor(currentPage / (loadCount / dataPerPage)) + 1;
      const dataNew = await refetch({
        page: pageToBeLoaded,
        loadCount,
        filter,
      });
      setTourData(dataNew?.data?.getFilteredTours?.tours, pageToBeLoaded);
    } catch (err) {
      setErr("Unable to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefetchDataForFirstTime = async () => {
    try {
      setIsLoading(true);
      const dataNew = await refetch({
        page: 1,
        loadCount,
        filter,
      });
      // console.log("new data", dataNew?.data?.getFilteredTours?.tours);
      // setIsLoading(dataNew.loading);
      setTourPaginationData(
        Math.ceil(dataNew?.data?.getFilteredTours?.totalCount / dataPerPage),
        0, ///current page
        1, ////page loaded from api
        dataNew?.data?.getFilteredTours?.totalCount,
        dataNew?.data?.getFilteredTours?.tours
      );
    } catch (err) {
      setErr("Unable to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (currentPage == 0) {
      handleRefetchDataForFirstTime();
    } else if (!tourList[currentPage * dataPerPage]) {
      handleRefetchData();
    }
  }, [currentPage, filter]);

  React.useEffect(() => {
    setTourPaginationData(0, 0, 0, 0, []);
  }, [filter]);
  // console.log("tour list", tourList);
  React.useEffect(() => {
    const bokunChannelId = contentData?.getContent.bokunChannelId;
    if (bokunChannelId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        setTimeout(() => {
          const widgetContainer = document.getElementById('bokun-modal-container');
          if (widgetContainer) {
            const socialDiv = document.createElement('div');
            socialDiv.className = 'socialurl';
            widgetContainer.appendChild(socialDiv);
            const socialLink = <SocialShareLink bokunWidgetUrl={clickedDataSrc} />;
            if (socialLink.props.bokunWidgetUrl) {
              ReactDOM.createRoot(socialDiv).render(socialLink);
            } else {
              widgetContainer.removeChild(socialDiv);
            }
          } else {
            console.error("Widget container not found.");
          }
        }, 2000); 
      };
      return () => {
        document.body.removeChild(script);
      };
    }

    console.error("Bokun Channel ID is not available.");
  }, [contentData?.getContent.bokunChannelId, clickedDataSrc]); 
  const handleBokunButtonClick = (event) => {
    const dataSrc = event.currentTarget.getAttribute('data-src');
    setClickedDataSrc(dataSrc);
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  var itemSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (isLoading)
    return (
      <>
        {new Array(6).fill(0).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </>
    );
  if (tourFilteredError || err) return <p>Error Loading</p>;
  // console.log("tour list", tourList);
  return (
    <>
      {tourList
        ?.slice(currentPage * dataPerPage, (currentPage + 1) * dataPerPage)
        .map((item, index) => (
          <div
            // className="col-lg-4 col-sm-6"
            key={item?.id}
            data-aos="fade"
            data-aos-delay={(index + 1) * 100}
            style={{ cursor: "pointer" }}
            className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
            //  data-src={`https://widgets.bokun.io/online-sales/3bdde112-69ab-4048-8c0e-db68a5080978/experience/795431`}
            data-src={`https://widgets.bokun.io/online-sales/${contentData?.getContent.bokunChannelId}/experience/${item?.tourBokunId}?partialView=1`} onClick={handleBokunButtonClick}
          >
            <div className="tourCard__image">
              <div className="cardImage ratio ratio-2:1">
                <div className="cardImage__content">
                  <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                    <Swiper
                      className="mySwiper"
                      modules={[Pagination, Navigation]}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                    >
                      {item?.images?.map((slide, i) => (
                        <SwiperSlide key={i}>
                          <Image
                            width={300}
                            height={300}
                            className="rounded-4 col-12 js-lazy"
                            src={slide?.imageUrl || ""}
                            alt="image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              {/* <div className="cardImage__wishlist">
                <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                  <i className="icon-heart text-12" />
                </button>
              </div> */}

              {item?.tag?.name ? (
                <div className="cardImage__leftBadge">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                      isTextMatched(item?.tag?.name, "Big Sale")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag?.name, "Top Selling Tours")
                        ? "bg-blue-1 text-white"
                        : ""
                    }  ${
                      isTextMatched(item?.tag?.name, "top rated")
                        ? "bg-yellow-1 text-dark-1"
                        : ""
                    }
                    ${
                      item?.tag?.name &&
                      typeof item.tag?.name === "string" &&
                      item.tag.name.toLowerCase().includes("sale")
                        ? "bg-yellow-1 text-white"
                        : ""
                    }
                    ${item.tag && "bg-pink-1 text-white"} 
                    
                    `}
                  >
                    {item?.tag?.name}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* End .tourCard__image */}

            <div className="tourCard__content mt-10">
              <div className="d-flex items-center lh-14 mb-5">
                <div className="text-14 text-light-1">
                  {/* {item?.duration}+ hours */}
                </div>
                <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
                <div className="text-14 text-light-1">{item?.tourType}</div>
              </div>
              <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                <span> {item?.tourTitle}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {item?.location}
              </p>

              <div className="row justify-between items-center pt-15">
                {/* <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="d-flex items-center x-gap-5">
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                    </div>
                   
                  </div>
                </div> */}
                {/* <div className="col-auto"></div> */}
                <div className="col-auto">
                  <div className="text-14 text-light-1">
                    From
                    <span className="text-16 fw-500 text-dark-1">
                      {" "}
                      {item?.currency} {item?.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TourProperties;
