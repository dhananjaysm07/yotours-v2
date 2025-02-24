'use client';
import React, { useState } from 'react';
import parse from 'html-react-parser';

interface IntroTownProps {
  introduction: string;
}

export default function IntroTown({ introduction }: IntroTownProps) {
  const [showFullText, setShowFullText] = useState(false);

  const countParagraphs = (text: string) => {
    return text.split('<p>').length - 1;
  };

  const extractFirstParagraphs = (text: string) => {
    const paragraphs = text.split('</p>').filter(Boolean);
    const firstParagraphs = paragraphs.slice(0, 3);
    return firstParagraphs.join('</p>') + '</p>';
  };

  const handleReadMoreClick = () => {
    setShowFullText(!showFullText);
  };

  const paragraphCount = countParagraphs(introduction);
  const truncated = paragraphCount > 3;

  return (
    <div className="col-xl-12 intro-wrapper">
      <div className="text-15 text-dark-1">
        {parse(extractFirstParagraphs(introduction))}
      </div>
      {truncated && (
        <button
          className="readtxt"
          onClick={handleReadMoreClick}
          aria-label="Read Text Less/More Control"
        >
          {showFullText ? 'Read Less' : 'Read More'}
        </button>
      )}
      {showFullText && (
        <div className="text-15 text-dark-1">{parse(introduction)}</div>
      )}
    </div>
  );
}
