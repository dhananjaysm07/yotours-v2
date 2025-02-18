'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPage: number;
  currentPage: number; // Page starts from 1
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage }) => {
  const searchParams = useSearchParams();

  // Function to generate the URL for a specific page
  const getPageUrl = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];
    
    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 || // First page
        i === totalPage || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        range.push(i);
      } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
        range.push('...');
      }
    }
    
    return range;
  };

  // Render a single page number or ellipsis
  const renderPageItem = (item: number | string, index: number) => {
    if (item === '...') {
      return (
        <div key={`ellipsis-${index}`} className="col-auto">
          <div className="size-40 flex-center rounded-full">...</div>
        </div>
      );
    }

    const pageNumber = item as number;
    const isActive = pageNumber === currentPage;
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? 'bg-dark-1 text-white' : ''
    }`;

    return (
      <div key={pageNumber} className="col-auto">
        <Link href={getPageUrl(pageNumber)}>
          <div className={className}>{pageNumber}</div>
        </Link>
      </div>
    );
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <Link
            href={getPageUrl(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              disabled={currentPage === 1}
            >
              <i className="icon-chevron-left text-12" />
            </button>
          </Link>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {getPageNumbers().map((item, index) => renderPageItem(item, index))}
          </div>

          {/* Mobile view */}
          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {getPageNumbers().map((item, index) => renderPageItem(item, index))}
          </div>

          <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              {currentPage} – {totalPage} of {totalPage}
            </div>
          </div>
        </div>

        <div className="col-auto md:order-2">
          <Link
            href={getPageUrl(currentPage + 1)}
            aria-disabled={currentPage === totalPage}
          >
            <button
              className="button -blue-1 size-40 rounded-full border-light"
              disabled={currentPage === totalPage}
            >
              <i className="icon-chevron-right text-12" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagination;