import React from 'react';
// Types
import { Patient } from '../types';
// Components/ui
import Entries from './Entries';

interface Props {
  data: Patient;
}

const PatientItem = ({ data }: Props) => {
  return (
    <div>
      <h3>{data.dateOfBirth}</h3>
      <h3>{data.gender}</h3>
      <h3>{data.name}</h3>
      <h3>{data.occupation}</h3>
      <Entries patient={data} entries={data.entries} />
    </div>
  );
};

export default PatientItem;
