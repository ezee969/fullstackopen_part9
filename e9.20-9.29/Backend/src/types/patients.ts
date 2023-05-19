import { IDiagnose } from './diagnoses';

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: IDiagnose['code'][];
}
export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface NewOccupationalHealthcareEntry extends NewBaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
export interface NewHealthCheckEntry extends NewBaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export interface NewHospitalEntry extends NewBaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
