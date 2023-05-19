import React from 'react';
import EntryData from './EntryData';
import AddEntryInputs from './AddEntryInputs';
import { Entry, Patient } from '../types';

interface Props {
  entries: Entry[];
  patient: Patient;
}

const Entries = ({ entries, patient }: Props) => {
  return (
    <div>
      <h3 style={{ color: 'blue' }}>Entries</h3>
      <AddEntryInputs patient={patient} />
      {entries.map((entry, i) => (
        <EntryData entry={entry} key={i} />
      ))}
    </div>
  );
};

export default Entries;
