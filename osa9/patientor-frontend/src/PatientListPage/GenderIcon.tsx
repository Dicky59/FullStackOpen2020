import React from 'react';
import { Icon } from "semantic-ui-react";
import { Patient, Gender } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const GenderIcon: React.FC<{ patient: Patient }> = ({ patient }) => {
  switch (patient.gender) {
    case Gender.Male:
      return <Icon name='mars' />;
    case Gender.Female:
      return <Icon name='venus' />;
    case Gender.Other:
      return <Icon name='genderless' />;
    default:
      return assertNever(patient.gender);
  }
};

export default GenderIcon;