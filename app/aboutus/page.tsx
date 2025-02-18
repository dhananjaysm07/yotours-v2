import parse from 'html-react-parser';
import styles from './about.module.scss';
import Footer from '../components/footer';
import getPageMeta from '@/lib/get-page-meta';
import { Metadata } from 'next';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import InvertedHeader from '../components/inverted-header';

export const metadata: Metadata = getPageMeta(
  'About Us',
  'Make your travel plans easier'
);

const AboutUs = async () => {
  const [contentData] = await Promise.all([getContentData()]);

  return (
    <>
      <div className="header-margin" />
      <InvertedHeader />
      <div className={styles.container}>
        <h1>About Us</h1>
        <div className={styles.content}>
          <div>{parse(contentData.data.getContent.about || '')}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
