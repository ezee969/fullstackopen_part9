import React from 'react';
// Components/ui
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface Props {
  selectedHealtCheckRating: string;
  handleHealtCheckRatingChange: (event: SelectChangeEvent) => void;
}

const HealthCheckEntryInputs = ({
  selectedHealtCheckRating,
  handleHealtCheckRatingChange,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <FormControl>
        <InputLabel id="demo-multiple-name-label">Healt check rating</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedHealtCheckRating}
          onChange={handleHealtCheckRatingChange}
          label="Healt check rating"
        >
          <MenuItem value={'Healty'}>{'Healty'}</MenuItem>
          <MenuItem value={'Low risk'}>{'Low risk'}</MenuItem>
          <MenuItem value={'High risk'}>{'High risk'}</MenuItem>
          <MenuItem value={'Critical risk'}>{'Critical risk'}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default HealthCheckEntryInputs;
