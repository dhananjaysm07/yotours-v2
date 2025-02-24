'use client';
import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';

// Define the props interface
interface DateSearchProps {
  setSelectedDates: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string } | null>
  >;
  selectedDates: { startDate: string; endDate: string } | null;
}

const DateSearch: React.FC<DateSearchProps> = ({
  setSelectedDates,
  selectedDates,
}) => {
  // Handle date change event
  const handleDateChange = (dates: unknown) => {
    if (Array.isArray(dates) && dates.length === 2) {
      // Ensure dates are formatted correctly
      setSelectedDates({
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD'),
      });
    } else {
      // Reset to null if no valid range is selected
      setSelectedDates(null);
    }
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        {...{ 'aria-label': 'Tour Date Picker' }}
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        onChange={handleDateChange}
        value={
          selectedDates
            ? [
                new DateObject(selectedDates.startDate),
                new DateObject(selectedDates.endDate),
              ]
            : null
        }
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
      />
    </div>
  );
};

export default DateSearch;
