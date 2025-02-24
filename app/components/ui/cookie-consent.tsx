'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBar = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="yotours-analytics-cookies"
      style={{ background: 'rgb(227, 24, 85)' }}
      buttonStyle={{ color: '#282923', fontSize: '13px' }}
      expires={150}
      buttonClasses="tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button"
      enableDeclineButton={true}
      declineButtonClasses="tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button"
      declineButtonStyle={{ color: 'red', fontSize: '13px' }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentBar;
