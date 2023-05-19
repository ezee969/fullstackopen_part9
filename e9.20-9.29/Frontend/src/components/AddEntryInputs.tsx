import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
// Hooks
import useField from '../hooks/useField';
// Types
import {
  EntryType,
  NewBaseEntry,
  Patient,
  Diagnosis,
  HealthCheckRating,
  Entry,
} from '../types';
// Components/ui
import { Alert } from '@material-ui/lab';
import HealthCheckEntryInputs from './HealthCheckEntryInputs';
import HospitalEntryInputs from './HospitalEntryInputs';
import OccupationalHealthcareEntryInputs from './OccupationalHealthcareEntryInputs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from '@mui/material';

interface Props {
  patient: Patient;
}

const AddEntryInputs = ({ patient }: Props) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const descriptionField = useField('text');
  const specialistField = useField('text');
  const dischargeCriteriaField = useField('text');
  const [selectedDischargeDate, setSelectedDischargeDate] =
    React.useState<string>('');
  const [selectedSickLeaveStartDate, setSelectedSickLeaveStartDate] =
    React.useState<string>('');
  const [selectedSickLeaveEndDate, setSelectedSickLeaveEndDate] =
    React.useState<string>('');
  const employerNameField = useField('text');
  const [selectedHealtCheckRating, setSelectedHealtCheckRating] = useState('Healty');
  const [error, setError] = React.useState<string>();

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedDate(formattedDate);
    } else {
      setSelectedDate('');
    }
  };
  const handleEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setEntryType(event.target.value as EntryType);
  };
  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof selectedDiagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };
  const handleDischargeDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedDischargeDate(formattedDate);
    } else {
      setSelectedDischargeDate('');
    }
  };
  const handleSickLeaveStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedSickLeaveStartDate(formattedDate);
    } else {
      setSelectedSickLeaveStartDate('');
    }
  };
  const handleSickLeaveEndDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setSelectedSickLeaveEndDate(formattedDate);
    } else {
      setSelectedSickLeaveEndDate('');
    }
  };
  const handleHealtCheckRatingChange = (event: SelectChangeEvent) => {
    setSelectedHealtCheckRating(event.target.value);
  };

  const getHealtCheckRating = (rating: string): HealthCheckRating => {
    switch (rating) {
      case 'Healty':
        return HealthCheckRating.Healthy;
        break;
      case 'Low risk':
        return HealthCheckRating.LowRisk;
        break;
      case 'High risk':
        return HealthCheckRating.HighRisk;
        break;
      case 'Critical risk':
        return HealthCheckRating.CriticalRisk;
        break;
      default:
        return HealthCheckRating.Healthy;
        break;
    }
  };

  const formatNewEntry = (newBaseEntry: NewBaseEntry) => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return {
          ...newBaseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating: getHealtCheckRating(selectedHealtCheckRating),
        };
        break;
      case EntryType.Hospital:
        return {
          ...newBaseEntry,
          type: EntryType.Hospital,
          discharge: {
            date: selectedDischargeDate,
            criteria: dischargeCriteriaField.fieldProps.value,
          },
        };
        break;
      case EntryType.OccupationalHealthcare:
        return {
          ...newBaseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName: employerNameField.fieldProps.value,
          sickLeave: {
            startDate: selectedSickLeaveStartDate,
            endDate: selectedSickLeaveEndDate,
          },
        };
        break;
      default:
        break;
    }
  };
  const handleAddEntry = async () => {
    try {
      const newBaseEntry: NewBaseEntry = {
        description: descriptionField.fieldProps.value,
        date: selectedDate,
        specialist: specialistField.fieldProps.value,
        diagnosisCodes: selectedDiagnosisCodes,
      };
      const formattedNewEntry = formatNewEntry(newBaseEntry);

      console.log(formattedNewEntry);

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        formattedNewEntry
      );
      const newPatient = {
        ...patient,
        entries: [...patient.entries, newEntry],
      };

      dispatch({
        type: 'ADD_ENTRY',
        payload: newPatient,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    setDiagnosisCodes(Object.keys(diagnoses));
  }, [diagnoses]);

  return (
    <Box
      sx={{
        border: '2px solid blue',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <h2 style={{ color: 'blue' }}>Add new entry</h2>
      <TextField {...descriptionField.fieldProps} label="Description" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Entry Date"
          onChange={handleDateChange}
          value={selectedDate ? dayjs(selectedDate) : null}
        />
      </LocalizationProvider>
      <TextField {...specialistField.fieldProps} label="Specialist" />
      <FormControl>
        <InputLabel id="demo-multiple-name-label">Diagnosis code</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedDiagnosisCodes}
          onChange={handleDiagnosisCodeChange}
          label="Diagnosis code"
        >
          {diagnosisCodes.map((diagnosis, i) => (
            <MenuItem key={i} value={diagnosis}>
              {diagnosis}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-label">Entry type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={entryType}
          label="Entry type"
          onChange={handleEntryTypeChange}
        >
          <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
          <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>
      {entryType === EntryType.Hospital && (
        <HospitalEntryInputs
          selectedDischargeDate={selectedDischargeDate}
          handleDischargeDateChange={handleDischargeDateChange}
          dischargeCriteriaField={dischargeCriteriaField}
        />
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <OccupationalHealthcareEntryInputs
          employerNameField={employerNameField}
          selectedSickLeaveStartDate={selectedSickLeaveStartDate}
          selectedSickLeaveEndDate={selectedSickLeaveEndDate}
          handleSickLeaveEndDateChange={handleSickLeaveEndDateChange}
          handleSickLeaveStartDateChange={handleSickLeaveStartDateChange}
        />
      )}
      {entryType === EntryType.HealthCheck && (
        <HealthCheckEntryInputs
          selectedHealtCheckRating={selectedHealtCheckRating}
          handleHealtCheckRatingChange={handleHealtCheckRatingChange}
        />
      )}
      <Button
        sx={{
          mt: 4,
          alignSelf: 'flex-end',
          width: '130px',
          fontWeight: 'bold',
        }}
        variant="contained"
        color="primary"
        onClick={handleAddEntry}
      >
        add
      </Button>
    </Box>
  );
};

export default AddEntryInputs;
