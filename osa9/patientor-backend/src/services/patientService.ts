import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, PublicPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn:_, ...rest }) => rest );
};

const getPublicPatient = (id: string): PublicPatient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const existingPatient: Patient | undefined = patients.find(p => p.id === patientId);
  if (!existingPatient) {
    throw new Error(`Patient with id '${patientId}' not found`);
  }
  existingPatient.entries.push(newEntry);
  return existingPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPublicPatient,
  addEntry
};