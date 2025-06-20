'use client';

import React, { useState, useCallback, lazy, Suspense } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { createRoot } from 'react-dom/client';
import { Tour } from '@/types';

// Lazy load the social share component
const SocialShareLink = lazy(() => import('../common/social-share-link'));

interface ToursProps {
  tours: Tour[];
  contentData: {
    getContent: {
      bokunChannelId: string;
    };
  };
}

// Memoized Arrow component
const Arrow = React.memo(({ type }: { type: 'next' | 'prev' }) => {
  const baseClasses =
    'slick_arrow-between slick_arrow arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none';
  const className = `${baseClasses} -${type} js-${type} arrow`;

  return (
    <button className={className} aria-label={`Arrow Controls ${type}`}>
      {type === 'next' ? (
        <i className="icon icon-chevron-right text-12" />
      ) : (
        <span className="icon icon-chevron-left text-12" />
      )}
    </button>
  );
});

Arrow.displayName = 'Arrow';

const Tours = ({ tours, contentData }: ToursProps) => {
  const [visibleTours, setVisibleTours] = useState(8);
  const [loading, setLoading] = useState(false);

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

  // Handle load more functionality
  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleTours((prev) => prev + 8);
      setLoading(false);
    }, 500);
  }, []);

  // Memoized tag class name function
  const getTagClassName = useCallback((tagName?: string) => {
    const baseClasses =
      'py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase';

    if (!tagName) return `${baseClasses} bg-blue-1 text-white`;

    const specialCases = {
      trending: 'bg-dark-1 text-white',
      'best seller': 'bg-blue-1 text-white',
      'most popular': 'bg-blue-1 text-white',
      sale: 'bg-yellow-1 text-white',
      default: 'bg-pink-1 text-white',
    };

    const match = Object.entries(specialCases).find(([key]) =>
      tagName.toLowerCase().includes(key)
    );

    return `${baseClasses} ${match ? match[1] : specialCases.default}`;
  }, []);

  // Memoized slider settings
  const sliderSettings = React.useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <Arrow type="next" />,
      prevArrow: <Arrow type="prev" />,
    }),
    []
  );

  // Filter active tours
  const activeTours = React.useMemo(
    () => tours?.filter((tour) => tour.active) || [],
    [tours]
  );

  if (activeTours.length === 0) {
    return (
      <div className="col-12 text-center">
        <h2 className="text-22 fw-500">No Tours Available</h2>
      </div>
    );
  }

  return (
    <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30">
      {activeTours.slice(0, visibleTours).map((tour, index) => (
        <div
          key={tour.id}
          className="col-xl-3 col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={100 + index * 50}
        >
          <div
            className="bokunButton tourCard -type-1 rounded-4 hover-inside-slider"
            style={{ cursor: 'pointer' }}
            data-src={`https://widgets.bokun.io/online-sales/${contentData?.getContent.bokunChannelId}/experience/${tour.tourBokunId}?partialView=1`}
            onClick={handleBokunButtonClick}
          >
            <div className="tourCard__image position-relative">
              <div className="inside-slider">
                <Slider {...sliderSettings}>
                  {tour.images?.map((slide, i) => (
                    <div
                      className="cardImage ratio ratio-1:1"
                      key={slide.imageUrl}
                    >
                      <div className="cardImage__content">
                        <Image
                          width={300}
                          height={300}
                          className="col-12 js-lazy"
                          src={slide.imageUrl || '/img/default-tour.jpg'}
                          alt={tour.tourTitle}
                          style={{ objectFit: 'cover' }}
                          priority={i === 0 && index < 4}
                          loading={i === 0 && index < 4 ? 'eager' : 'lazy'}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>

                {tour.tag && (
                  <div className="cardImage__leftBadge">
                    <div className={getTagClassName(tour.tag.name)}>
                      {tour.tag.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="tourCard__content mt-10">
              <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{tour.tourTitle}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">{tour.location}</p>

              {tour.price && (
                <div className="row justify-between items-center pt-15">
                  <div className="col-auto">
                    <div className="text-14 text-light-1">
                      From
                      <span className="text-16 fw-500 text-dark-1">
                        {' '}
                        {tour.currency || 'US$'} {tour.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {activeTours.length > visibleTours && (
        <div className="col-12 text-center mt-30">
          <button
            aria-label="Load More"
            className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Tours;
