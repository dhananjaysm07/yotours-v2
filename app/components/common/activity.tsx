'use client';

import { useCallback, lazy, Suspense } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { createRoot } from 'react-dom/client';
import { Attraction, ContentData } from '@/types';
import { motion } from 'framer-motion';
import BokunScriptLoader from './bokun-loader';

// Lazy load the social share component
const SocialShareLink = lazy(() => import('./social-share-link'));

interface ActivityProps {
  contentData: ContentData;
  attractions: Attraction[];
}

interface ArrowProps {
  type: 'next' | 'prev';
  onClick?: () => void;
}

// Memoized Arrow component
const Arrow = ({ type, onClick }: ArrowProps) => {
  const className = `slick_arrow-between slick_arrow -${type} arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-${type} arrow`;

  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={`Arrow Controls ${type}`}
    >
      {type === 'next' ? (
        <i className="icon icon-chevron-right text-12" />
      ) : (
        <span className="icon icon-chevron-left text-12" />
      )}
    </button>
  );
};

const Activity = ({ contentData, attractions }: ActivityProps) => {
  // Handle Bokun button click with loading script
  const handleBokunButtonClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const dataSrc = event.currentTarget.getAttribute('data-src');
      const widgetContainer = document.getElementById('bokun-modal-container');

      if (widgetContainer && dataSrc) {
        const existing = widgetContainer.querySelector('.socialurl');
        if (existing) widgetContainer.removeChild(existing);

        const socialDiv = document.createElement('div');
        socialDiv.className = 'socialurl';
        widgetContainer.appendChild(socialDiv);

        const root = document.createElement('div');
        socialDiv.appendChild(root);

        createRoot(root).render(
          <Suspense fallback={<div>Loading...</div>}>
            <SocialShareLink bokunWidgetUrl={dataSrc} />
          </Suspense>
        );
      }
    },
    []
  );

  // Memoized function to get tag class names
  const getTagClassName = useCallback((tagName: string | undefined): string => {
    if (!tagName) return '';

    const baseClasses =
      'py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase';
    const specialCases = {
      trending: 'bg-dark-1 text-white',
      'best seller': 'bg-blue-1 text-white',
      'most popular tours': 'bg-blue-1 text-white',
      sale: 'bg-yellow-1 text-white',
      default: 'bg-pink-1 text-white',
    };

    const match = Object.entries(specialCases).find(([key]) =>
      tagName.toLowerCase().includes(key)
    );

    return `${baseClasses} ${match ? match[1] : specialCases.default}`;
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
  };

  const activeAttractions = attractions.filter(
    (attraction) => attraction.active
  );

  return (
    <div className="relative overflow-hidden pt-40 sm:pt-20">
      <BokunScriptLoader bokunChannelId={contentData.bokunChannelId || ''} />
      <div className="row y-gap-30">
        {activeAttractions.map((item, index) => (
          <motion.div
            className="col-xl-3 col-lg-3 col-sm-6"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider"
              style={{ cursor: 'pointer' }}
              data-src={`https://widgets.bokun.io/online-sales/${contentData?.bokunChannelId}/experience/${item.attractionBokunId}?partialView=1`}
              onClick={handleBokunButtonClick}
            >
              <div className="activityCard__image position-relative">
                <div className="inside-slider">
                  <Slider {...sliderSettings}>
                    {item.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content">
                          <Image
                            width={300}
                            height={300}
                            className="col-12 js-lazy"
                            src={slide.imageUrl || '/img/placeholder-img.webp'}
                            alt={`${item.attractionTitle} - Image ${i + 1}`}
                            priority={i === 0}
                            loading={i === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>

                  {item.tag && (
                    <div className="cardImage__leftBadge">
                      <div className={getTagClassName(item.tag.name)}>
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
                        From{' '}
                        <span className="text-16 fw-500 text-dark-1">
                          {item.currency || 'US$'} {item.price}
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
