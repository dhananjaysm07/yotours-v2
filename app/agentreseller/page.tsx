import parse from 'html-react-parser';
import styles from './agent.module.scss';
import getPageMeta from '@/lib/get-page-meta';
import { Metadata } from 'next';
import { getContentData } from '@/lib/apollo/common-api-funcs';
import InvertedHeader from '../components/inverted-header';
import Footer from '../components/footer';
// import { contextType } from "google-map-react";

export const metadata: Metadata = getPageMeta(
  'Agent Reseller',
  'Make your travel plans easier'
);

const AgentReseller = async () => {
  const [contentData] = await Promise.all([getContentData()]);

  return (
    <>
      <div className="header-margin"></div>
      <InvertedHeader />
      <div className={styles.container}>
        <h1>Agent and Reseller</h1>
        <div className={styles.content}>
          <div>{parse(contentData.data.getContent.agent || '')}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AgentReseller;
