'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import isTextMatched from '@/utils/is-text-matched';
import { useData } from '@/lib/datacontext';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SocialShareLink from '../../components/common/socialShare';

const FilterTabContentContinent = ({
  dataToRender,
  filter,
  loading,
  error,
}) => {
  const data = useData();
  if (!data) return;
  const { contentData } = data;
  const [clickedDataSrc, setClickedDataSrc] = useState(null);
  useEffect(() => {
    const bokunChannelId = contentData?.getContent.bokunChannelId;

    if (bokunChannelId) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        setTimeout(() => {
          const widgetContainer = document.getElementById(
            'bokun-modal-container'
          );
          if (widgetContainer) {
            const socialDiv = document.createElement('div');
            socialDiv.className = 'socialurl';
            widgetContainer.appendChild(socialDiv);
            const socialLink = (
              <SocialShareLink bokunWidgetUrl={clickedDataSrc} />
            );
            if (socialLink.props.bokunWidgetUrl) {
              ReactDOM.createRoot(socialDiv).render(socialLink);
            } else {
              widgetContainer.removeChild(socialDiv);
            }
          } else {
            console.error('Widget container not found.');
          }
        }, 2000);
      };
      return () => {
        document.body.removeChild(script);
      };
    }

    console.error('Bokun Channel ID is not available.');
  }, [contentData?.getContent.bokunChannelId, clickedDataSrc]);

  const handleBokunButtonClick = (event) => {
    const dataSrc = event.currentTarget.getAttribute('data-src');
    setClickedDataSrc(dataSrc);
  };

  function ArrowSlick(props) {
    let className =
      props.type === 'next'
        ? 'slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next'
        : 'slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev';
    className += ' arrow';
    const char =
      props.type === 'next' ? (
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading:</p>;
  // Determine the dataset based on the filterOption
  let isTour;
  if (filter === 'tour') {
    // dataToRender = tourData?.getTours;
    isTour = true;
  } else if (filter === 'attractiontickets') {
    // dataToRender = attractionData?.getAttractions; // Replace with actual property name for attractions
    isTour = false;
  }

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        className="overflow-visible swiperpagination"
        scrollbar={{
          el: `.js-popular-destination-scrollbar`,
          draggable: true,
        }}
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: `.js-destination-next`,
          prevEl: `.js-destination-prev`,
        }}
        breakpoints={{
          500: {
            slidesPerView: 1.1,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {dataToRender?.slice(0, 8).map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="col-12"
              key={item?.id}
              data-aos="fade"
              data-aos-delay="100"
            >
              <div
                style={{ cursor: 'pointer' }}
                className="bokunButton hotelsCard -type-1 hover-inside-slider"
                //  data-src={`https://widgets.bokun.io/online-sales/3bdde112-69ab-4048-8c0e-db68a5080978/experience/795431`}
                data-src={`https://widgets.bokun.io/online-sales/${
                  contentData?.getContent.bokunChannelId
                }/experience/${
                  isTour ? item.tourBokunId : item.attractionBokunId
                }?partialView=1`}
                onClick={handleBokunButtonClick}
                //  target="_blank"
                //  rel="noopener noreferrer"
                //  href={isTour ? item?.tourHyperlink || "#" : item?.attractionHyperlink || "#"}
                //   className="hotelsCard -type-1 hover-inside-slider"
              >
                <div className="hotelsCard__image">
                  <div className="cardImage inside-slider">
                    {item?.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content ">
                          <Image
                            width={300}
                            height={300}
                            quality={75}
                            className="rounded-4 col-12"
                            src={slide.imageUrl}
                            alt="image"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    ))}
                    {/* </Slider> */}

                    <div className="cardImage__wishlist">
                      <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                        <i className="icon-heart text-12" />
                      </button>
                    </div>

                    <div className="cardImage__leftBadge">
                      <div
                        className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500   uppercase ${
                          isTextMatched(item?.tag?.name, 'trending')
                            ? 'bg-dark-1 text-white'
                            : ''
                        } 
                        ${
                          isTextMatched(item?.tag?.name, 'best seller')
                            ? 'bg-blue-1 text-white'
                            : ''
                        } 

                        ${
                          isTextMatched(item?.tag?.name, 'Most Popular Tours')
                            ? 'bg-blue-1 text-white'
                            : ''
                        } 
                        
                    
                        ${
                          item?.tag?.name &&
                          typeof item.tag?.name === 'string' &&
                          item.tag.name.toLowerCase().includes('sale')
                            ? 'bg-yellow-1 text-white'
                            : ''
                        }
                        ${item.tag && 'bg-pink-1 text-white'} 
                                
                        `}
                      >
                        {item?.tag?.name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hotelsCard__content mt-10">
                  <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                    <span>
                      {isTour ? item?.tourTitle : item?.attractionTitle}
                    </span>
                  </h4>
                  <p className="text-light-1 lh-14 text-14 mt-5">
                    {item?.location + ', ' + item?.destination.country}
                  </p>
                  <div className="mt-5">
                    <div className="fw-500">
                      Starting from{' '}
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
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button
          className={`section-slider-nav  -prev flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full  js-destination-prev`}
        >
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button
          className={`section-slider-nav -next flex-center button -pink-1 bg-white shadow-1 size-40 rounded-full  js-destination-next`}
        >
          <i className="icon icon-chevron-right text-12" />
        </button>
      </div>
    </>
  );
};

export default FilterTabContentContinent;
