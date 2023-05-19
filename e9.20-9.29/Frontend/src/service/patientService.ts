import axios from 'axios';
import { apiBaseUrl } from '../constants';

import { Patient } from '../types';

const getAll = async (): Promise<Patient[]> => {
  const { data: patients } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return patients;
};

const getPatient = async (id: string): Promise<Patient> => {
  const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return patient;
};

export default {
  getAll,
  getPatient,
};
