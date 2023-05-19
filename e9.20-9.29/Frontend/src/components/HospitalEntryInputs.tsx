import React from 'react';
import dayjs from 'dayjs';
// Types
import { UseFieldType } from '../hooks/useField';
// Components/ui
import { Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  selectedDischargeDate: string;
  handleDischargeDateChange: (date: dayjs.Dayjs | null) => void;
  dischargeCriteriaField: UseFieldType;
}
const HospitalEntryInputs = ({
  selectedDischargeDate,
  handleDischargeDateChange,
  dischargeCriteriaField,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Discharge Date"
          value={selectedDischargeDate ? dayjs(selectedDischargeDate) : null}
          onChange={handleDischargeDateChange}
        />
      </LocalizationProvider>
      <TextField
        variant="filled"
        {...dischargeCriteriaField.fieldProps}
        label="Discharge criteria"
      />
    </Box>
  );
};

export default HospitalEntryInputs;
