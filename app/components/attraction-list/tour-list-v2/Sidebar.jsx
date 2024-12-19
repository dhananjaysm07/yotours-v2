import CategoryTypes from '../sidebar/CategoryTypes';
import OthersFilter from '../sidebar/OthersFilter';
import Duration from '../sidebar/Duration';
import Languages from '../sidebar/Languages';
import PirceSlider from '../sidebar/PirceSlider';
import MainFilterSearchBox from './MainFilterSearchBox';
import { useData } from '../../../lib/datacontext';
import React from 'react';
import { countryData } from '../../../utils/country';
import { useAttractionFilterStore } from '../../../lib/store';
import CountryContinentFilter from '../sidebar/CountryContinentFilter';
import {
  GET_ALL_TAGS,
  GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY,
} from '../../../graphql/query';
import { useQuery } from '@apollo/client';

const Sidebar = () => {
  const { data: attCCData, loading: attCCLoading } = useQuery(
    GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY
  );
  const { data: tagNameList } = useQuery(GET_ALL_TAGS);
  const [categories, setCategories] = React.useState([]);
  const {
    setTag,
    setLocation,
    removeTag,
    setContinent,
    removeContinent,
    setCountry,
    removeCountry,
    country: selectedCountry,
    continent: selectedContinents,
    tagName,
  } = useAttractionFilterStore();
  // const [category,setCategory]=React.useState("")
  const continent = countryData.map((el) => el.continent);
  React.useEffect(() => {
    setCategories(tagNameList?.getAllTags?.map((tag) => tag.name));
  }, [tagNameList]);
  function handleChangeTag(event, category) {
    if (event.target.checked) {
      setTag(category);
    } else {
      removeTag(category);
    }
  }
  if (attCCLoading) return <div>Loading...</div>;
  // Extract unique countries and continents using a Set
  const uniqueCountries = [
    ...new Set(
      attCCData?.getCountriesAndContinentsForAttractions.map(
        (item) => item.country
      )
    ),
  ].sort();
  const uniqueContinents = [
    ...new Set(
      attCCData?.getCountriesAndContinentsForAttractions.map(
        (item) => item.continent
      )
    ),
  ].sort();

  function handleChangeContinent(event, category) {
    if (event.target.checked) {
      setContinent(category);
    } else {
      removeContinent(category);
    }
  }

  function handleChangeCountry(event, category) {
    if (event.target.checked) {
      setCountry(category);
    } else {
      removeCountry(category);
    }
  }

  // Filter countries based on the selected continents
  const filteredCountries = attCCData?.getCountriesAndContinentsForAttractions
    .filter((item) =>
      selectedContinents.length
        ? selectedContinents.includes(item.continent)
        : true
    )
    .map((item) => item.country);

  const countsByContinent = {};
  const countsByCountry = {};

  attCCData?.getCountriesAndContinentsForAttractions.forEach((item) => {
    countsByContinent[item.continent] =
      item.attractionCount + (countsByContinent[item.continent] || 0);
    countsByCountry[item.country] =
      item.attractionCount + (countsByCountry[item.country] || 0);
  });
  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10">Search Attractions</h5>

          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox />
          </div>
        </div>
      </div>
      {/* End search tours */}

      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Category Types</h5>
        <div className="sidebar-checkbox">
          <CategoryTypes
            categories={categories}
            handleChange={handleChangeTag}
          />
        </div>
      </div>
      {uniqueContinents && (
        <div className="sidebar__item -no-border">
          <h5 className="text-18 fw-500 mb-10">Continents</h5>
          <div className="sidebar-checkbox">
            <CountryContinentFilter
              categories={uniqueContinents}
              handleChange={handleChangeContinent}
              continentCounts={countsByContinent}
              selectedList={selectedContinents}
            />
          </div>
        </div>
      )}
      {filteredCountries && (
        <div className="sidebar__item -no-border">
          <h5 className="text-18 fw-500 mb-10">Countries</h5>
          <div className="sidebar-checkbox">
            <CountryContinentFilter
              categories={filteredCountries}
              handleChange={handleChangeCountry}
              countryCounts={countsByCountry}
              selectedList={selectedCountry}
            />
          </div>
        </div>
      )}
      {/* End popular filter */}
      {/* 
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Other</h5>
        <div className="sidebar-checkbox">
          <OthersFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>
      {/* End Nightly priceslider */}
      {/* 
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Duration</h5>
        <div className="sidebar-checkbox">
          <Duration />
        </div>
      </div> */}
      {/* End style filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Languages</h5>
        <div className="sidebar-checkbox">
          <Languages />
        </div>
      </div> */}
      {/* End Aminities filter */}
    </>
  );
};

export default Sidebar;
