import React from 'react';
import styles from './loading.module.scss';
function LoadingDestinationBanner() {
  return (
    <div className="col-12">
      <div className="relative d-flex">
        <div
          role="status"
          className={`col-12 rounded-4 hover-inside-slider  animate-pulse card ${styles.card}`}
          style={{ minHeight: ' 500px' }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingDestinationBanner;
