import React from 'react';
import DatePicker from 'react-multi-date-picker';
import { useSearchStore } from '@/lib/store';

const DateSearch = () => {
  const { dates, setDates } = useSearchStore();
  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={setDates}
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
