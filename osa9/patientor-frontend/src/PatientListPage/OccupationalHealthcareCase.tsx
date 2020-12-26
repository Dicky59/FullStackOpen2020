import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import DiagnosisCodes from './DiagnosisCodes';

const OccupationalHealthcareCase: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='stethoscope' />{entry.employerName}
      </Header>
      <span style={{fontStyle: 'italic'}}>{entry.description}</span>
      <DiagnosisCodes entry={entry}/>
    </Segment>
  );
};


export default OccupationalHealthcareCase;