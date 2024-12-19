const LocationTopBar = ({ props }) => {
  return (
    <section
      data-aos="fade"
      className="d-flex items-center py-15 border-top-light"
    >
      <div className="container">
        <div className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
              <div className="col-auto">
                {props && <div>{props.continent}</div>}
              </div>
              <div className="col-auto">
                <div>&gt;</div>
              </div>
              <div className="col-auto">
                {props && <div>{props.country}</div>}
              </div>
              <div className="col-auto">
                <div>&gt;</div>
              </div>
              <div className="col-auto">
                {props && (
                  <div className="text-dark-1">{props.destinationName}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-auto">
            {props && (
              <a href="#" className="text-14 text-light-1">
                {props.destinationName} Tourism: Top things to do in {props.destinationName}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTopBar;
