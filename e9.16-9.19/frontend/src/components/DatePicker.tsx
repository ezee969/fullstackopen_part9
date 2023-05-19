import React from 'react';

interface DatePickerProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <>
      <label>Start date:</label>
      <input type="date" value={value} onChange={onChange} />
    </>
  );
};

export default DatePicker;
