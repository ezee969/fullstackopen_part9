import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';

interface Props {
  entry: Entry;
}

const EntryData = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const getDianosisName = (code: string) => {
    const diagnosis = Object.values(diagnoses).find(
      (diagnosis: Diagnosis) => diagnosis.code === code
    );
    if (diagnosis) {
      return diagnosis.name;
    }

    return null;
  };
  return (
    <div>
      <h4>{entry.date}</h4>
      <h4>{entry.description}</h4>
      {entry.type === 'HealthCheck' && <h4>{entry.healthCheckRating}</h4>}
      {entry.type === 'Hospital' && (
        <h4>
          {entry.discharge.date} {entry.discharge.criteria}
        </h4>
      )}
      {entry.type === 'OccupationalHealthcare' && (
        <>
          <h4>{entry.employerName}</h4>
          <h4>
            {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
          </h4>
        </>
      )}
      {entry.diagnosisCodes?.map((diagnosisCode, i) => (
        <h5 key={i}>
          {diagnosisCode}
          {getDianosisName(diagnosisCode)}
        </h5>
      ))}
    </div>
  );
};

export default EntryData;
