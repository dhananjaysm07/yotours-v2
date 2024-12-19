const CategoryTypes = ({ categories, handleChange }) => {
  return (
    <>
      {categories?.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between"
          key={category}
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                onChange={(event) => handleChange(event, category)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{category}</div>
            </div>
          </div>
          <div className="col-auto">
            {/* <div className="text-15 text-light-1">{category.count}</div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryTypes;
