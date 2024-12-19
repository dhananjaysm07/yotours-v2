import React, { useState, useEffect } from "react";

const Pagination = ({
  setCurrentPage,
  totalPage,
  currentPage,
  dataPerPage,
}) => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scroll animation
    });
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber - 1); // Adjust page number to 0-based index
  };

  const renderPage = (pageNumber) => {
    const isActive = pageNumber === currentPage + 1;
    const isClickable = pageNumber <= totalPage;

    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }${isClickable ? ' clickable' : ''}`;

    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };
  const renderPages = () => {
    const pageNumbers = [];
  
    // Logic to determine the range of page numbers to display
    let startPage, endPage;
    if (totalPage <= 10) {
      startPage = 1;
      endPage = totalPage;
    } else {
      if (currentPage + 1 <= 7) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 1 >= totalPage - 4) {
        startPage = totalPage - 9;
        endPage = totalPage;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 3;
      }
    }
  
    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage + 1)
    );
  
    // Add ellipse if needed
    if (totalPage > 10 && currentPage + 1 <= totalPage - 5) {
      if (currentPage + 1 <= 7) {
        pages.push(
          <div
            key="ellipse"
            className="col-auto"
            onClick={() => setCurrentPage(currentPage + 7)}
          >
            <div className="size-40 flex-center rounded-full">...</div>
          </div>
        );
      } else {
        pages.push(
          <div
            key="ellipse"
            className="col-auto"
            onClick={() => setCurrentPage(currentPage + 7)}
          >
            <div className="size-40 flex-center rounded-full">...</div>
          </div>
        );
      }
    }
  
    // Add the last 5 page numbers if the total page count is more than 10 and the current page is not already within the last 5 pages
    if (totalPage > 10 && currentPage + 1 <= totalPage - 5) {
      for (let i = totalPage - 4; i <= totalPage; i++) {
        pages.push(renderPage(i, i === currentPage + 1));
      }
    }
  
    return pages;
  };
  

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>

          <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              {/* 1 – {totalPage} of 300+  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
