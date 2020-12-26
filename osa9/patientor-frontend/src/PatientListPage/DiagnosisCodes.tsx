import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const DiagnosisCodes: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();

  return (
    <ul>
      {entry.diagnosisCodes?.map(code =>
        <li key={code}>
          {code} {diagnosis && diagnosis[code].name}
        </li>
      )}
    </ul>
  );
};

export default DiagnosisCodes;