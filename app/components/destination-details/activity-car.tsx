'use client';

import Image from 'next/image';
import Slider from 'react-slick';

interface ActivityCarProps {
  attractions: {
    id: string;
    carTitle: string;
    images: { id: string; imageUrl: string }[];
    location: string;
    price: number;
    currency: string;
    tag: { name: string };
  }[];
}

export default function ActivityCar({ attractions }: ActivityCarProps) {
  const settings = {
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

  return (
    <div className="relative overflow-hidden pt-40 sm:pt-20">
      <div className="row y-gap-30">
        {attractions.map((item) => (
          <div className="col-xl-3 col-lg-3 col-sm-6" key={item.id}>
            <div className="tourCard -type-1 rounded-4 hover-inside-slider">
              <div className="activityCard__image position-relative">
                <div className="inside-slider">
                  <Slider {...settings}>
                    {item.images.map((slide, i) => (
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
                </div>
              </div>
              <div className="activityCard__content mt-10">
                <h4 className="activityCard__title lh-16 fw-500 text-dark-1 text-18">
                  <span>{item.carTitle}</span>
                </h4>
                <p className="text-light-1 text-14 lh-14 mt-5">
                  {item.location}
                </p>
                <div className="row justify-between items-center pt-10">
                  {item.price && (
                    <div className="col-auto">
                      <div className="text-14 text-light-1">
                        From{' '}
                        <span className="text-16 fw-500 text-dark-1">
                          {item.currency || 'US$'} {item.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
