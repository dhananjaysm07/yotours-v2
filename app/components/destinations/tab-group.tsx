import { TAB_OPTIONS } from './tours-and-attractions';

type TabGroupProps = {
  setFilter: (s: string) => void;
  filter: string;
};

const TabGroup = ({ setFilter, filter }: TabGroupProps) => {
  const tabOptions = [
    { label: 'Tour', value: TAB_OPTIONS.TOUR },
    {
      label: 'Attraction Tickets',
      value: TAB_OPTIONS.ATTRACTION,
    },
  ];
  return (
    <div className="tabs__controls row x-gap-10 y-gap-10">
      {tabOptions.map((option) => (
        <div className="col-auto" key={option.value}>
          <button
            aria-label="Toggle Tabs/Attractions"
            className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button bg-pink-400 ${
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

export default TabGroup;
