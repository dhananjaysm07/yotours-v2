import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { hotelsData } from "../../data/hotels";
import isTextMatched from "../../utils/isTextMatched";
import { useQuery } from "@apollo/client";
import { GET_TOURS_QUERY } from "../../graphql/query";
import { useData } from "../../lib/datacontext";
import { useFilterStore } from "../../lib/store";
import { useEffect } from "react";
const FilterTabContent = ({
  tourData,
  tourLoading,
  tourError,
  attractionData,
  attractionLoading,
  attractionError,
  contentData,
}) => {
  const { filterOption } = useFilterStore();
  // console.log(filterOption);
  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log("tourData", tourData);

  // console.log("contentData", contentData);
  useEffect(() => {
    const bokunChannelId = contentData?.getContent.bokunChannelId;

    console.log("Bokun Channel ID:", bokunChannelId);

    if (bokunChannelId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
      script.async = true;

      console.log("Bokun Widget Script URL:", script.src);

      document.body.appendChild(script);

      return () => {
        // Cleanup script when the component unmounts
        document.body.removeChild(script);
      };
    }

    // Log a message if Bokun Channel ID is not available
    console.error("Bokun Channel ID is not available.");
  }, [contentData?.getContent.bokunChannelId]);

  // custom navigation
  function ArrowSlick(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  if (tourLoading || attractionLoading) return <p>Loading...</p>;
  if (tourError || attractionError) return <p>Error loading:</p>;
  // Determine the dataset based on the filterOption
  let dataToRender, isTour;
  if (filterOption === "tour") {
    dataToRender = tourData?.getTours;
    isTour = true;
  } else if (filterOption === "attractiontickets") {
    dataToRender = attractionData?.getAttractions; // Replace with actual property name for attractions
    isTour = false;
  }
  return (
    <>
      {dataToRender?.map((item) => (
        <div
          className="col-xl-3 col-lg-3 col-sm-6"
          key={item?.id}
          data-aos="fade"
          data-aos-delay="100"
        >
          <div
            style={{ cursor: "pointer" }}
            className="bokunButton hotelsCard -type-1 hover-inside-slider"
            //  data-src={`https://widgets.bokun.io/online-sales/3bdde112-69ab-4048-8c0e-db68a5080978/experience/795431`}
            data-src={`https://widgets.bokun.io/online-sales/${
              contentData?.getContent.bokunChannelId
            }/experience/${
              isTour ? item.tourBokunId : item.attractionBokunId
            }?partialView=1`}
            //  target="_blank"
            //  rel="noopener noreferrer"
            //  href={isTour ? item?.tourHyperlink || "#" : item?.attractionHyperlink || "#"}
            //   className="hotelsCard -type-1 hover-inside-slider"
          >
            <div className="hotelsCard__image">
              <div className="cardImage inside-slider">
                <Slider
                  {...itemSettings}
                  arrows={true}
                  nextArrow={<ArrowSlick type="next" />}
                  prevArrow={<ArrowSlick type="prev" />}
                >
                  {item?.images?.map((slide, i) => (
                    <div className="cardImage ratio ratio-1:1" key={i}>
                      <div className="cardImage__content ">
                        <Image
                          width={300}
                          height={300}
                          className="rounded-4 col-12 js-lazy"
                          src={slide.imageUrl}
                          alt="image"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>

                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>

                <div className="cardImage__leftBadge">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500   uppercase ${
                      isTextMatched(item?.tag?.name, "trending")
                        ? "bg-dark-1 text-white"
                        : ""
                    } 
                    ${
                      isTextMatched(item?.tag?.name, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    } 

                    ${
                      isTextMatched(item?.tag?.name, "Most Popular Tours")
                        ? "bg-blue-1 text-white"
                        : ""
                    } 
                    
                 
                    ${
                      item?.tag?.name &&
                      typeof item.tag?.name === "string" &&
                      item.tag.name.toLowerCase().includes("sale")
                        ? "bg-yellow-1 text-white"
                        : ""
                    }
                    ${item.tag && "bg-blue-1 text-white"} 
                             
                     `}
                  >
                    {item?.tag?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{isTour ? item?.tourTitle : item?.attractionTitle}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {item?.location + "," + item?.destination.destinationName}
              </p>
              {/* <div className="d-flex items-center mt-20">
                <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                  {item?.ratings}
                </div>
                <div className="text-14 text-dark-1 fw-500 ml-10">
                  Exceptional
                </div>
                <div className="text-14 text-light-1 ml-10">
                  {item?.numberOfReviews} reviews
                </div>
              </div> */}
              <div className="mt-5">
                <div className="fw-500">
                  Starting from{" "}
                  <span className="text-blue-1">
                    {/* {item?.currency === "USD" && "$"}
                    {item?.currency === "EUR" && "€"}
                    {item?.currency === "GBP" && "£"}
                    {item?.currency === "INR" && "₹"} */}
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

export default FilterTabContent;
