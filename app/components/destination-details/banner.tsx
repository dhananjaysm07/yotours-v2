import Image from 'next/image';

interface BannerProps {
  props: {
    bannerImage: string;
    destinationName: string;
    bannerHeading: string;
  };
}

export default function Banner({ props }: BannerProps) {
  return (
    <div className="col-12">
      <div className="relative d-flex">
        <Image
          src={
            props.bannerImage ? props.bannerImage : '/img/placeholder-img.webp'
          }
          alt="image"
          className="col-12 rounded-4"
          style={{ minHeight: '300px' }}
          width={1200}
          height={300}
        />
        <div className="absolute z-2 px-50 py-60 md:py-20 md:px-30">
          <h1 className="text-50 fw-600 text-white lg:text-40 md:text-30">
            Explore {props.destinationName}
          </h1>
          <div
            className="text-white"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {props.bannerHeading}
          </div>
        </div>
      </div>
    </div>
  );
}
