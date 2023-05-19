/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
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

export default router;
