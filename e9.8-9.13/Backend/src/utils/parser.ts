/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Gender } from '../types/patients';

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
