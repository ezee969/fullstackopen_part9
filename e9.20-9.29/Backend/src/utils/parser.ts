/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { EntryType, Gender, HealthCheckRating } from '../types/patients';
import { IDiagnose } from '../types/diagnoses';

export const parseSsn = (ssnFromRequest: unknown): string => {
  if (!ssnFromRequest || !isString(ssnFromRequest)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssnFromRequest;
};
export const parseDateOfBirth = (dateOfBirthFromRequest: unknown): string => {
  if (
    !isString(dateOfBirthFromRequest) ||
    !isDate(dateOfBirthFromRequest) ||
    !dateOfBirthFromRequest
  ) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dateOfBirthFromRequest;
};
export const parseName = (nameFromRequest: unknown): string => {
  if (!nameFromRequest || !isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name');
  }

  return nameFromRequest;
};
export const parseOccupation = (occupationFromRequest: unknown): string => {
  if (!isString(occupationFromRequest) || !occupationFromRequest) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupationFromRequest;
};
export const parseGender = (genderFromRequest: unknown): Gender => {
  if (!isGender(genderFromRequest) || !isString(genderFromRequest)) {
    throw new Error('Incorrect or missing visibility: ' + genderFromRequest);
  }

  return genderFromRequest;
};
export const parseType = (typeFromRequest: unknown): EntryType => {
  if (
    !isString(typeFromRequest) ||
    !typeFromRequest ||
    !isEntryType(typeFromRequest)
  ) {
    throw new Error('Incorrect or missing type');
  }

  return typeFromRequest;
};
export const parseDescription = (descriptionFromRequest: unknown) => {
  if (!isString(descriptionFromRequest) || !descriptionFromRequest) {
    throw new Error('Incorrect or missing description');
  }

  return descriptionFromRequest;
};
export const parseDate = (dateFromRequest: unknown): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest) || !dateFromRequest) {
    throw new Error('Incorrect or missing date');
  }

  return dateFromRequest;
};
export const parseSpecialist = (specialistFromRequest: unknown): string => {
  if (!isString(specialistFromRequest) || !specialistFromRequest) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialistFromRequest;
};
export const parseDiagnosisCodes = (object: unknown): Array<IDiagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<IDiagnose['code']>;
  }

  return object.diagnosisCodes as Array<IDiagnose['code']>;
};
export const parseHealtCheckRating = (
  healtCheckRatingFromRequest: unknown
): HealthCheckRating => {
  if (
    !isHealtCheckRating(healtCheckRatingFromRequest) ||
    !healtCheckRatingFromRequest
  ) {
    throw new Error('Incorrect or missing healt check rating');
  }

  return healtCheckRatingFromRequest;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const isGender = (param: any): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};
export const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType)
    .map((e) => e.toString())
    .includes(param);
};
export const isHealtCheckRating = (param: any): param is number => {
  return param >= 0 && param <= 3;
};
