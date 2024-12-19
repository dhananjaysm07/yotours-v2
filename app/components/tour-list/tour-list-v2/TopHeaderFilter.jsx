import { useData } from "../../../lib/datacontext";
import { useTourPaginationStore } from "../../../lib/store";

const TopHeaderFilter = () => {
  const { totalResult } = useTourPaginationStore();
  const { tourFilteredLoading } = useData();
  console.log("total result", tourFilteredLoading, totalResult);
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          {!tourFilteredLoading && totalResult ? (
            <div className="text-18">
              <span className="fw-500">{totalResult} Tours available</span>{" "}
              {/* in europe */}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            {/* <div className="col-auto">
              <button className="button -pink-1 h-40 px-20 rounded-100 bg-pink-1-05 text-15 text-pink-1">
                <i className="icon-up-down text-14 mr-10" />
                Sort
              </button>
            </div> */}
            {/* End .col */}

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
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
