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
  employerNameField: UseFieldType;
  handleSickLeaveStartDateChange: (date: dayjs.Dayjs | null) => void;
  handleSickLeaveEndDateChange: (date: dayjs.Dayjs | null) => void;
  selectedSickLeaveStartDate: string;
  selectedSickLeaveEndDate: string;
}

const OccupationalHealthcareEntryInputs = ({
  employerNameField,
  selectedSickLeaveStartDate,
  selectedSickLeaveEndDate,
  handleSickLeaveStartDateChange,
  handleSickLeaveEndDateChange,
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
          value={
            selectedSickLeaveStartDate ? dayjs(selectedSickLeaveStartDate) : null
          }
          onChange={handleSickLeaveStartDateChange}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Discharge Date"
          value={selectedSickLeaveEndDate ? dayjs(selectedSickLeaveEndDate) : null}
          onChange={handleSickLeaveEndDateChange}
        />
      </LocalizationProvider>
      <TextField
        variant="filled"
        {...employerNameField.fieldProps}
        label="Discharge criteria"
      />
    </Box>
  );
};

export default OccupationalHealthcareEntryInputs;
