import parse from 'html-react-parser';
import styles from './privacy.module.scss';
import getPageMeta from '@/lib/get-page-meta';
import { Metadata } from 'next';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import InvertedHeader from '../components/inverted-header';
import Footer from '../components/footer';

export const metadata: Metadata = getPageMeta(
  'Privacy Policy',
  'Make your travel plans easier'
);

const PrivacyPolicy = async () => {
  const [contentData] = await Promise.all([getContentData()]);

  return (
    <>
      <div className="header-margin"></div>
      <InvertedHeader />
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <div className={styles.content}>
          <div>{parse(contentData.data.getContent.privacy || '')}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
