import React from 'react';
import { HealthCheckEntry } from '../types';
import { Segment, Header, Icon } from "semantic-ui-react";
import HealthIcon from './HealthIcon';
import DiagnosisCodes from './DiagnosisCodes';

const HealthCheckCase: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as='h3'>
        {entry.date} <Icon name='doctor' />
      </Header>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      <HealthIcon entry={entry} />
      <DiagnosisCodes entry={entry}/>
    </Segment>
  );
};

export default HealthCheckCase;