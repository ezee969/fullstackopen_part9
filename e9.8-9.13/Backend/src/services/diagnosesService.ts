import diagnosesData from '../data/diagnoses';
import { IDiagnose } from '../types/diagnoses';

const getDiagnoses = (): IDiagnose[] => {
  return diagnosesData;
};

export default { getDiagnoses };
