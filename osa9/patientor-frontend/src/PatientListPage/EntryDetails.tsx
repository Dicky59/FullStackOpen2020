import React from 'react';
import { Entry } from '../types';
import HealthCheckCase from './HealthCheckCase';
import OccupationalHealthcareCase from './OccupationalHealthcareCase';
import HospitalCase from './HospitalCase';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckCase entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareCase entry={entry} />;
    case 'Hospital':
      return <HospitalCase entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;