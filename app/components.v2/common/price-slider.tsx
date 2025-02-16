// components/common/price-slider.tsx
'use client';
import React, { useState } from 'react';
import InputRange, { Range } from 'react-input-range';
import { debounce } from 'lodash';

interface PriceSliderProps {
  initialMin?: number;
  initialMax?: number;
  onChange?: (min: number, max: number) => void; // Callback for parent
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  initialMin = 0,
  initialMax = 100000,
  onChange,
}) => {
  // Internal state for instant updates
  const [value, setValue] = useState({ min: initialMin, max: initialMax });

  // Debounce the onChange callback
  const debouncedOnChange = debounce((min: number, max: number) => {
    if (onChange) {
      onChange(min, max); // Notify parent of changes
    }
  }, 300); // 300ms debounce delay

  // Handle slider change
  const handleChange = (newValue: Range | number) => {
    // Handle range value
    if (typeof (newValue === Range)) {
      setValue(newValue);
      debouncedOnChange(newValue.min, newValue.max);
    }
  };

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedOnChange.cancel(); // Cancel any pending debounced calls
    };
  }, [debouncedOnChange]);

  return (
    <div className="js-price-rangeSlider">
      <div className="px-5">
        <InputRange
          minValue={0}
          maxValue={100000}
          value={value}
          onChange={handleChange} // Pass the corrected handleChange function
        />
      </div>
    </div>
  );
};

export default PriceSlider;
