export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};
export type NewPatient = Omit<Patient, 'id'>;
// export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
