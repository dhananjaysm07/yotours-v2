// app/components.v2/attractions/attraction-properties.tsx
'use client';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

import { Attraction } from '@/types';
import SocialShareLink from '../common/social-share-link';
import { createRoot } from 'react-dom/client';

interface AttractionPropertiesProps {
  attractions: Attraction[];
  bokunChannelId: string;
  currentPage: number;
  dataPerPage: number;
}

const AttractionProperties = ({
  attractions,
  bokunChannelId,
  currentPage,
  dataPerPage,
}: AttractionPropertiesProps) => {
  const [clickedDataSrc, setClickedDataSrc] = useState<string | null>(null);

  useEffect(() => {
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
              <SocialShareLink bokunWidgetUrl={clickedDataSrc!} />
            );
            if (socialLink.props.bokunWidgetUrl) {
              const root = createRoot(socialDiv);
              root.render(socialLink);
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
  }, [bokunChannelId, clickedDataSrc]);

  const handleBokunButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const dataSrc = event.currentTarget.getAttribute('data-src');
    setClickedDataSrc(dataSrc);
  };

  console.log('attractions', attractions);
  console.log('bokunChannelId: ', bokunChannelId);

  return (
    <>
      {attractions.map((item, index) => (
        <div
          key={item?.id}
          // data-aos="fade"
          // data-aos-delay={(index + 1) * 100}
          style={{ cursor: 'pointer' }}
          className="bokunButton -type-1 rounded-4 hover-inside-slider col-lg-4 col-sm-6"
          data-src={`https://widgets.bokun.io/online-sales/${bokunChannelId}/experience/${item?.attractionBokunId}?partialView=1`}
          onClick={handleBokunButtonClick}
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
                          src={slide.imageUrl}
                          alt="image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            <div className="cardImage__wishlist">
              <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                <i className="icon-heart text-12" />
              </button>
            </div>

            {item?.tag?.name && (
              <div className="cardImage__leftBadge">
                <div
                  className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                    item?.tag?.name === 'Big Sale'
                      ? 'bg-dark-1 text-white'
                      : item?.tag?.name === 'Top Selling Tours'
                      ? 'bg-blue-1 text-white'
                      : item?.tag?.name === 'top rated'
                      ? 'bg-yellow-1 text-dark-1'
                      : item?.tag?.name.toLowerCase().includes('sale')
                      ? 'bg-yellow-1 text-white'
                      : 'bg-pink-1 text-white'
                  }`}
                >
                  {item?.tag?.name}
                </div>
              </div>
            )}
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex items-center lh-14 mb-5">
              <div className="text-14 text-light-1">
                {/* {item?.duration}+ hours */}
              </div>
              <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
              {/* <div className="text-14 text-light-1">{item?.tourType}</div> */}
            </div>
            <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
              <span> {item?.attractionTitle}</span>
            </h4>
            <p className="text-light-1 lh-14 text-14 mt-5">{item?.location}</p>

            <div className="row justify-between items-center pt-15">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  From
                  <span className="text-16 fw-500 text-dark-1">
                    {' '}
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

export default AttractionProperties;
