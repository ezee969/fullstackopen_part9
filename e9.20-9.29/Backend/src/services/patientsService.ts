import patientsData from '../data/patients';
import type { NewPatient, Patient, Entry, NewEntry } from '../types/patients';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const postPatient = (patientData: NewPatient): Patient => {
  const patient = {
    id: String(patientsData.length + 1),
    ...patientData,
  };
  patientsData.push(patient);

  return patient;
};

const postEntry = (patient: Patient, newEntry: NewEntry): Entry => {
  const entry: Entry = {
    id: String(patient.entries.length + 1),
    ...newEntry,
  };
  patient.entries.push(entry);

  return entry;
};

export default { getPatients, postPatient, getPatientById, postEntry };
