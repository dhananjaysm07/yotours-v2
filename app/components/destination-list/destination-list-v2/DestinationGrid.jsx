import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import toursData from "../../../data/tours";
import isTextMatched from "../../../utils/isTextMatched";
import { useData } from "../../../lib/datacontext";
import {
  useDestinationFilterStore,
  useDestinationPaginationStore,
  useTourPaginationStore,
} from "../../../lib/store";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_DESTINATION } from "../../../graphql/query";
import { createSlug } from "../../../utils/slugify";
import LoadingCard from "../../Loading/LoadingCard";
const DestinationGrid = ({ filter }) => {
  const { contentData } = useData();
  const {
    loading: destinationFilteredLoading,
    error: destinationFilteredError,
    refetch: refetchFilteredDestination,
  } = useQuery(GET_FILTERED_DESTINATION, {
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
  const {
    setDestinationPaginationData,
    currentPage,
    dataPerPage,
    loadCount,
    totalPageLoaded,
    setCurrentPage,
    setDestinationData,
    destinationList,
    totalResult,
  } = useDestinationPaginationStore();

  const handleRefetchData = async () => {
    try {
      setIsLoading(true);
      const pageToBeLoaded =
        Math.floor(currentPage / (loadCount / dataPerPage)) + 1;
      const dataNew = await refetchFilteredDestination({
        page: pageToBeLoaded,
        loadCount,
        filter,
      });
      setDestinationData(
        dataNew?.data?.getFilteredDestination?.destinations,
        pageToBeLoaded
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefetchDataForFirstTime = async () => {
    try {
      setIsLoading(true);
      const dataNew = await refetchFilteredDestination({
        page: 1,
        loadCount,
        filter,
      });
      // console.log("filter---", filter);
      // console.log("new data", dataNew?.data?.getFilteredTours?.tours);
      // console.log("data new", dataNew);
      setIsLoading(dataNew.loading);
      setDestinationPaginationData(
        Math.ceil(
          dataNew?.data?.getFilteredDestination?.totalCount / dataPerPage
        ),
        0, ///current page
        1, ////page loaded from api
        dataNew?.data?.getFilteredDestination?.totalCount,
        dataNew?.data?.getFilteredDestination?.destinations
      );
    } catch (err) {
      setErr("Unable to fetch destination");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (currentPage == 0) {
      // console.log("called for the first tiime😚", filter);
      handleRefetchDataForFirstTime();
    } else if (!destinationList[currentPage * dataPerPage]) {
      handleRefetchData();
    }
  }, [currentPage, filter]);

  React.useEffect(() => {
    setDestinationPaginationData(0, 0, 0, 0, []);
  }, [filter]);
  // console.log("tour list", destinationList);
  React.useEffect(() => {
    const bokunChannelId = contentData?.getContent.bokunChannelId;
    if (bokunChannelId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }

    console.error("Bokun Channel ID is not available.");
  }, [contentData?.getContent.bokunChannelId]);

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
  if (destinationFilteredError || err) return <p>Error loading destination</p>;
  // console.log("Destination list", destinationList);
  return (
    <>
      {destinationList
        ?.slice(currentPage * dataPerPage, (currentPage + 1) * dataPerPage)
        .map((item, index) => (
          <div
            className="col-lg-4 col-sm-6"
            key={item?.id}
            data-aos="fade"
            data-aos-delay={(index + 1) * 100}
          >
            <Link
              href={{
                pathname: `/destinations/${createSlug(
                  item?.destinationName || ""
                )}`,
                query: { city: item?.destinationName }, // passing the ID as a query parameter
              }}
              key={item?.id}
              className="tourCard -type-1 rounded-4 position-relative"
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
                        <Image
                          width={300}
                          height={300}
                          className="rounded-4 col-12 js-lazy"
                          src={item?.bannerImage || ""}
                          alt="image"
                        />
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
                      }`}
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
                <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                  {item?.destinationName}
                </h4>
                {/* <p className="text-light-1 lh-14 text-14 mt-5">
                
               {item?.bannerHeading}
               </p> */}

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
                  <div className="col-auto">
                    {/* <div className="text-14 text-light-1">
                      From
                      <span className="text-16 fw-500 text-dark-1">
                        {" "}
                        {item?.currency} {item?.price}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default DestinationGrid;
