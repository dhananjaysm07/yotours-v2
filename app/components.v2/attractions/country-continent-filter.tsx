import React from 'react';

interface CountryContinentFilterProps {
  categories: string[];
  selectedList: string[];
  counts: Record<string, number>;
  onSelectionChange: (category: string) => void;
}

const CountryContinentFilter: React.FC<CountryContinentFilterProps> = ({
  categories,
  selectedList,
  counts,
  onSelectionChange,
}) => {
  return (
    <>
      {categories.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between"
          key={category}
        >
          <div className="col-auto">
            <div
              className="form-checkbox d-flex items-center cursor-pointer"
              onClick={() => onSelectionChange(category)}
            >
              <input
                type="checkbox"
                checked={selectedList.includes(category)}
                readOnly
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">
                {category} ({counts[category] || 0})
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CountryContinentFilter;
