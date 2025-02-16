import Image from 'next/image';
import Link from 'next/link';
import InvertedHeader from './components.v2/inverted-header';
import BsImport from './bs-import';
import Footer from './components.v2/footer';

const NotFound = () => {
  const data = {
    imageSrc: '/img/general/404.svg',
    title: "Oops! It looks like you're lost.",
    description:
      "The page you're looking for isn't available. Try to search again or use the go to.",
    buttonLabel: 'Go back to homepage',
    buttonUrl: '/',
  };

  return (
    <>
      <BsImport />
      <div className="header-margin"></div>
      <InvertedHeader />
      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-lg-6">
              <Image src={data.imageSrc} alt="image" width={620} height={480} />
            </div>
            <div className="col-lg-5">
              <div className="no-page">
                <div className="no-page__title">
                  40<span className="text-blue-1">4</span>
                </div>
                <h2 className="text-30 fw-600">{data.title}</h2>
                <div className="pr-30 mt-5">{data.description}</div>
                <div className="d-inline-block mt-40 md:mt-20">
                  <Link
                    href={data.buttonUrl}
                    className="button -md -dark-1 bg-blue-1 text-white"
                  >
                    {data.buttonLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
