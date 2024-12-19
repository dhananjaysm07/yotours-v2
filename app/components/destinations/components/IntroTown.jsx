// import { useData } from "../../../lib/datacontext";
import React, { useState } from 'react';
import parse from 'html-react-parser'

const IntroTown = ({ introduction }) => {
  // const {} = useData();
  const [showFullText, setShowFullText] = useState(false);
  const countParagraphs = (text) => {
    return text.split('<p>').length - 1;
  };

  const extractFirstParagraphs = (text) => {
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
    <>
      <div className="col-xl-12 intro-wrapper">
        <p className="text-15 text-dark-1">{parse(extractFirstParagraphs(introduction))}</p>
        {/* <a
          href="#"
          className="d-block text-14 fw-500 text-blue-1 underline mt-20"
        >
          Show More
        </a> */}
        {truncated && (
        <button  className="readtxt" onClick={handleReadMoreClick}>
          {showFullText ? 'Read Less' : 'Read More'}
        </button>
      )}
      {showFullText && (
              <p className="text-15 text-dark-1">{parse(introduction)}</p>
      )}
      </div>
      {/* End .col */}

      {/* <div className="col-xl-4">
        <div className="relative d-flex ml-35 xl:ml-0">
          <img
            src="/img/pages/destinations/map.png"
            alt="image"
            className="col-12 rounded-4"
          />
          <div className="absolute d-flex justify-center items-end col-12 h-full z-1 px-35 py-20">
            <button className="button h-50 px-25 -blue-1 bg-white text-dark-1 text-14 fw-500 col-12">
              <i className="icon-eye text-18 mr-10" />
              See popular activities on the map
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default IntroTown;
