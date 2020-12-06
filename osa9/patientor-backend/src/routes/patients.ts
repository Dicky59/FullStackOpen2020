import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientService.getPublicPatient(req.params.id));
  } catch (e) {
    console.log(e);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;