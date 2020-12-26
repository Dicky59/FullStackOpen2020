import React from 'react';
import { HealthCheckRating } from '../types';
import { HealthCheckEntry } from '../types';
import { Icon } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const HealthIcon: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      return <Icon name='heart' color='green' />;
    case HealthCheckRating.LowRisk:
      return <Icon name='heart' color='yellow' />;
    case HealthCheckRating.HighRisk:
      return <Icon name='heart' color='orange' />;
    case HealthCheckRating.CriticalRisk:
      return <Icon name='heart' color='red' />;
    default:
      return assertNever(entry.healthCheckRating);
  }
};

export default HealthIcon;