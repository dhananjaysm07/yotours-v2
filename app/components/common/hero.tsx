import Image from 'next/image';
import FadeUpAnimation from './fade-up';
import AppSearch from '../app-search/app-search';
import { GetDestinations } from '@/types';

interface ContentData {
  heroImage?: string;
  heroHeading?: string;
  heroSubheading?: string;
}

const Hero = ({
  contentData,
  destinations,
}: {
  contentData: ContentData;
  destinations: GetDestinations;
}) => {
  if (!contentData) return <></>;
  return (
    <section className="masthead -type-1 relative">
      <div className="hero__bg">
        <Image
          alt="YoTours Hero Section Image"
          fill
          placeholder="empty"
          src={contentData?.heroImage || '/img/01-landingpage.jpg'}
          priority
        />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <FadeUpAnimation delay={0.1}>
                <h1 className="text-60 lg:text-40 md:text-30 text-white">
                  {contentData?.heroHeading || 'Find Next Place To Visit'}
                </h1>
              </FadeUpAnimation>

              <FadeUpAnimation delay={0.3}>
                <p className="text-white mt-6 md:mt-10 text-25">
                  {contentData?.heroSubheading ||
                    'Discover amazing places at exclusive deals'}
                </p>
              </FadeUpAnimation>
            </div>

            <FadeUpAnimation delay={0.4}>
              <div className="tabs -underline mt-60 js-tabs">
                <AppSearch destinations={destinations} />
              </div>
            </FadeUpAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
