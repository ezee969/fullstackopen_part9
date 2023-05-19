import {
  // NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewBaseEntry,
} from '../types/patients';
import {
  parseType,
  parseDescription,
  parseDate,
  parseSpecialist,
  parseDiagnosisCodes,
  parseHealtCheckRating,
} from './parser';

const toNewEntry = (
  object: unknown
): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'type' in object &&
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object
  ) {
    const newEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };
    console.log(object);
    if (parseType(object.type)) {
      if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
        console.log('entro!!');
        const newHealthCheckEntry: NewHealthCheckEntry = {
          ...newEntry,
          type: 'HealthCheck',
          healthCheckRating: parseHealtCheckRating(object.healthCheckRating),
        };
        console.log(newHealthCheckEntry);
        return newHealthCheckEntry;
      }
      if (object.type === 'Hospital' && 'discharge' in object) {
        const newHospitalEntry: NewHospitalEntry = {
          ...newEntry,
          type: 'Hospital',
          discharge: {
            date: parseDate(
              (object as { discharge: { date: unknown } }).discharge.date
            ),
            criteria: parseDescription(
              (object as { discharge: { criteria: unknown } }).discharge.criteria
            ),
          },
        };
        return newHospitalEntry;
      }
      if (
        object.type === 'OccupationalHealthcare' &&
        'employerName' in object &&
        'sickLeave' in object
      ) {
        const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: parseDescription(object.employerName),
          sickLeave: {
            startDate: parseDate(
              (object as { sickLeave: { startDate: unknown } }).sickLeave.startDate
            ),
            endDate: parseDate(
              (object as { sickLeave: { endDate: unknown } }).sickLeave.endDate
            ),
          },
        };
        return newOccupationalHealthcareEntry;
      }
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;
