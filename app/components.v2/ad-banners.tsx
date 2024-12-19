import Image from 'next/image';

interface ContentData {
  heroImage?: string;
  heroHeading?: string;
  heroSubheading?: string;
  rightDiscountImage: string;
  leftDiscountImage: string;
}

const AdBanners = ({ contentData }: { contentData: ContentData }) => {
  const rightImage = contentData.rightDiscountImage;
  const leftImage = contentData.leftDiscountImage;

  return (
    <>
      {rightImage && leftImage && (
        <>
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={0}>
            <div className="ctaCard -type-1 rounded-4 ">
              <div className="ctaCard__image ratio ratio-63:55">
                <Image
                  width={512}
                  height={512}
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
                  width={512}
                  height={512}
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
