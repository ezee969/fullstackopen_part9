import { NewPatient } from '../types/patients';
import {
  parseSsn,
  parseDateOfBirth,
  parseName,
  parseOccupation,
  parseGender,
} from './parser';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const newPatient: NewPatient = {
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
