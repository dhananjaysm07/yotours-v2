import { useState } from "react";
import InputRange from "react-input-range";
import {
  useAttractionFilterStore,
  useTourFilterStore,
} from "../../../lib/store";

const PirceSlider = () => {
  // const [price, setPrice] = useState({
  //   value: { min: 0, max: 500 },
  // });
  const { priceMax, priceMin, setPriceMax, setPriceMin } =
    useAttractionFilterStore();
  const handleOnChange = (value) => {
    // setPrice({ value });
    setPriceMax(value.max);
    setPriceMin(value.min);
  };

  const value = {
    min: priceMin,
    max: priceMax,
  };
  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          {/* <span className="js-lower mx-1">${price.value.min}</span>- */}
          <span className="js-lower mx-1">{priceMin}</span>-
          <span className="js-upper mx-1">{priceMax}</span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={100000}
          value={value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
