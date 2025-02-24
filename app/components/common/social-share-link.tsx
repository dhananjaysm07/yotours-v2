'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { FaFacebook, FaWhatsapp, FaCopy } from 'react-icons/fa';
import Link from 'next/link';

const SocialShareLink = ({ bokunWidgetUrl }: { bokunWidgetUrl: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!bokunWidgetUrl) {
    return null; // Return null if bokunWidgetUrl is not provided
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bokunWidgetUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const url = bokunWidgetUrl;
  const title = url;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    title
  )}`;

  return (
    <div>
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
      </Head>

      <Link href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </Link>
      <Link href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </Link>
      <button onClick={copyToClipboard} aria-label="Copy To Clipboard">
        <FaCopy />
        {copySuccess ? <span>Link Copied!</span> : <span>Copy Link</span>}
      </button>
    </div>
  );
};

export default SocialShareLink;
