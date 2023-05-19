import { ChangeEvent, useState } from 'react';

export interface UseFieldType {
  actions: {
    resetValue: () => void;
  };
  fieldProps: {
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}

const useField = (type: 'text' | 'number' | 'date'): UseFieldType => {
  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  return {
    actions: {
      resetValue,
    },
    fieldProps: {
      type,
      value,
      onChange,
    },
  };
};

export default useField;
