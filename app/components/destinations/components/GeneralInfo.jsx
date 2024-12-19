const GeneralInfo = ({destination}) => {

  
const fromDate = new Date(destination.fromDate);
const toDate = new Date(destination.toDate);

// Extract abbreviated month name
const fromMonthAbbreviation = fromDate.toLocaleString('default', { month: 'long' });
const toMonthAbbreviation = toDate.toLocaleString('default', { month: 'long' });

  return (
    <>
      {/* <div className="col-xl-3 col-6">
        <div className="text-15">Time Zone</div>
        <div className="fw-500">GMT +00:00</div>
        <div className="text-15 text-light-1">3 hours behind</div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-xl-3 col-6">
        <div className="text-15">Currency</div>
        <div className="fw-500">British Pound</div>
        <div className="text-15 text-light-1">1USD = 0.76GBP</div>
      </div> */}

      <div className="col-xl-3 lg:col-6">
        <div className="text-15">Best time to visit</div>
        <div className="row y-gap-10">
          <div className="col-auto">
            <div className="fw-500">{fromMonthAbbreviation || "All Year"}</div>
            
            <div className="text-15 text-light-1">
            {destination.fromOccasion || ""}
            </div>
          </div>
          {/* End .col */}
          <div className="col-auto">
            <div className="fw-500">to</div>
           
          </div>
          <div className="col-auto">
            <div className="fw-500">{toMonthAbbreviation || "All Year"}</div>
            <div className="text-15 text-light-1">
            {destination.toOccasion || ""}
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}
    </>
  );
};

export default GeneralInfo;
