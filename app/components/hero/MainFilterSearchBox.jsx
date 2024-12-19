'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useHeroStore } from '@/lib/stores/hero-store';
import { useSearchStore } from '@/lib/store';
import DateSearch from './DateSearch';
import LocationSearch from './LocationSearch';

const MainFilterSearchBox = () => {
  const router = useRouter();
  const { tabs, currentTab, setCurrentTab } = useHeroStore();
  const { setFilterOption, filterOption } = useSearchStore();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <div className="tabs__controls d-flex x-gap-30 y-gap-20 justify-center sm:justify-start js-tabs-controls">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`tabs__button text-15 fw-500 text-white pb-4 js-tabs-button ${
              tab?.name === currentTab ? 'is-tab-el-active' : ''
            }`}
            onClick={() => {
              setFilterOption(tab?.name.toLocaleLowerCase());
              setCurrentTab(tab?.name);
            }}
          >
            {tab?.name}
          </button>
        ))}
      </div>

      <div className="position-relative mt-30 md:mt-20 js-tabs-content mobile-search">
        <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="button-grid items-center mob-search">
            <LocationSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">Travel Date</h4>
                <DateSearch />
              </div>
            </div>

            <div className="button-item">
              <button
                className="web-icon mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-pink-1 text-white"
                onClick={() => {
                  if (filterOption === 'tour') {
                    router.push('/search/tours');
                  } else {
                    router.push('/search/attractions');
                  }
                }}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
