/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.postPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});
router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientsService.postEntry(patient, newEntry);

      res.json(addedEntry);
    } else {
      res.status(400).send('Patient not found');
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
