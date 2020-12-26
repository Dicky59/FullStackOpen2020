import React from 'react';
import { HospitalEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import DiagnosisCodes from './DiagnosisCodes';

const HospitalCase: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='hospital' />
      </Header>
      <span style={{fontStyle: 'italic'}}>{entry.description}</span>
      <DiagnosisCodes entry={entry}/>
    </Segment>
  );
};

export default HospitalCase; 