'use client';

import Script from 'next/script';
import React, { useCallback } from 'react';

function BokunScriptLoader({ bokunChannelId }: { bokunChannelId: string }) {
  const handleScriptLoad = useCallback(() => {
    if (window.BokunWidgetLoader?.loadWidgets) {
      window.BokunWidgetLoader.loadWidgets();
    }
  }, []);
  console.log('Bokun Script Loader Reporting: ', bokunChannelId);
  return (
    <Script
      src={`https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bokunChannelId}`}
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
    />
  );
}

export default BokunScriptLoader;
