import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import PatientItem from './PatientItem';
import { Patient } from '../types';
import patientService from '../service/patientService';

const PatientPage = () => {
  const [{ patients }] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatient(id);
          setPatient(patient);
        }
      } catch (e) {
        console.error(e.message);
      }
    };

    void getPatient();
  }, [id, patients]);

  return <div>{patient && <PatientItem data={patient} />}</div>;
};

export default PatientPage;
