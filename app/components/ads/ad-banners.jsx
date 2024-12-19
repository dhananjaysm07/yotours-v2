'use client';

import Image from 'next/image';
import { useData } from '@/lib/datacontext';

const AdBanners = () => {
  const { contentData, contentLoading, contentError } = useData();

  if (contentLoading) return <p>Loading content...</p>;
  if (contentError) return <p>Error loading content</p>;

  const rightImage = contentData.getContent.rightDiscountImage;
  const leftImage = contentData.getContent.leftDiscountImage;

  return (
    <>
      {rightImage && leftImage && (
        <>
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={0}>
            <div className="ctaCard -type-1 rounded-4 ">
              <div className="ctaCard__image ratio ratio-63:55">
                <Image
                  width={636}
                  height={555}
                  className="img-ratio js-lazy loaded"
                  src={leftImage}
                  alt="image"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={100}>
            <div className="ctaCard -type-1 rounded-4 ">
              <div className="ctaCard__image ratio ratio-63:55">
                <Image
                  width={636}
                  height={555}
                  className="img-ratio js-lazy loaded"
                  src={rightImage}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdBanners;
