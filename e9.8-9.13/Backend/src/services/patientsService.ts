import patientsData from '../data/patients';
import type { NewPatient, Patient } from '../types/patients';

const getPatients = (): Patient[] => {
  return patientsData;
};

const postPatient = (patientData: NewPatient): Patient => {
  const patient = {
    id: String(patientsData.length + 1),
    ...patientData,
  };
  patientsData.push(patient);

  return patient;
};

export default { getPatients, postPatient };
