'use client';

const FilterTabsHotelsForContinent = ({ setFilter, filter }) => {
  // const { filterOption, setFilterOption } = useFilterStore();
  const filterOptions = [
    { label: 'Tour', value: 'tour' },
    { label: 'Attraction Tickets', value: 'attractiontickets' },
  ];
  return (
    <div className="tabs__controls row x-gap-10 y-gap-10">
      {filterOptions.map((option) => (
        <div className="col-auto" key={option.value}>
          <button
            className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
              filter === option.value ? 'is-tab-el-active' : ''
            }`}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTabsHotelsForContinent;
