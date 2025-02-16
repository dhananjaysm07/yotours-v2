'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Destination } from '@/types';

interface DestinationGridProps {
  destinations: Destination[];
}

const DestinationGrid = ({ destinations }: DestinationGridProps) => {
  return (
    <>
      {destinations.map((item, index) => (
        <div
          className="col-lg-4 col-sm-6"
          key={item.id}
          data-aos="fade"
          data-aos-delay={(index + 1) * 100}
        >
          <Link
            href={`/destinations/${item.destinationName
              .toLowerCase()
              .replace(/ /g, '-')}?city=${item.destinationName}`}
            className="tourCard -type-1 rounded-4 position-relative"
          >
            <div className="tourCard__image">
              <div className="cardImage ratio ratio-2:1">
                <div className="cardImage__content">
                  <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                    <Swiper
                      className="mySwiper"
                      modules={[Pagination, Navigation]}
                      pagination={{ clickable: true }}
                      navigation={true}
                    >
                      <Image
                        width={300}
                        height={300}
                        className="rounded-4 col-12 js-lazy"
                        src={
                          item.bannerImage
                            ? item.bannerImage
                            : '/img/placeholder-img.webp'
                        }
                        alt={item.destinationName}
                      />
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div className="tourCard__content mt-10">
              <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
                {item.destinationName}
              </h4>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default DestinationGrid;
