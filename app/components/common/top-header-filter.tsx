'use client';

interface TopHeaderFilterProps {
  totalResult: number;
  currentPage: string;
}

const TopHeaderFilter: React.FC<TopHeaderFilterProps> = ({
  totalResult,
  currentPage,
}) => {
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          {totalResult > 0 && (
            <div className="text-18">
              <span className="fw-500">
                {totalResult} {currentPage} available
              </span>
            </div>
          )}
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeaderFilter;
