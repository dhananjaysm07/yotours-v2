'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import debounce from 'lodash/debounce';

interface PriceSliderProps {
  initialMin: number;
  initialMax: number;
  onChange: (min: number, max: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  initialMin,
  initialMax,
  onChange,
}) => {
  // Internal state for the slider values
  const [localValue, setLocalValue] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);

  // Reset local state when props change
  useEffect(() => {
    setLocalValue([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  // Debounced callback for parent updates
  const debouncedOnChange = useCallback(
    debounce((values: [number, number]) => {
      onChange(values[0], values[1]);
    }, 500),
    [onChange]
  );

  // Handle slider change (updates local state immediately)
  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalValue([value[0], value[1]]);
    }
  };

  // Handle slider after change (when user finishes dragging)
  const handleAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      debouncedOnChange([value[0], value[1]]);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  // Format price for display
  const formatPrice = (value: number) => {
    return `${value.toLocaleString()}`;
  };

  return (
    <div className="w-full px-4 py-2 text-purple-700">
      <div className="mb-4 flex justify-between text-sm font-semibold">
        <span>{formatPrice(localValue[0])}</span>
        <span>&nbsp;-&nbsp;</span>
        <span>{formatPrice(localValue[1])}</span>
      </div>
      <Slider
        range
        min={0}
        max={100000}
        value={localValue}
        onChange={handleChange}
        onChangeComplete={handleAfterChange}
        className="my-4"
        styles={{
          track: { backgroundColor: '#4f1fa2', height: 6 },
          handle: {
            borderColor: '#7B1FA2',
            backgroundColor: '#ffffff',
            opacity: 1,
            borderWidth: 1.5,
            scale: 1.15,
          },
          rail: { backgroundColor: '#D1C4E9', height: 6 },
        }}
        // trackStyle={[{ backgroundColor: '#7B1FA2', height: 6 }]} // Purple track
        // handleStyle={[
        //   { borderColor: '#7B1FA2', backgroundColor: '#9C27B0' },
        //   { borderColor: '#7B1FA2', backgroundColor: '#9C27B0' },
        // ]} // Purple handles
        // railStyle={{ backgroundColor: '#D1C4E9', height: 6 }} // Light purple rail
      />
    </div>
  );
};

export default PriceSlider;
