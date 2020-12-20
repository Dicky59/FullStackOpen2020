import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patient && !patient['ssn']) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patient.id}`
          );
          dispatch(updatePatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, patient]);

  if (!patient || !patient['ssn']) return (
    <div>Loading patient information...</div>
  );

  if (!patient) {
    return <div>No patient found</div>;
  }
  const genderIcon =
    patient.gender === Gender.Female
      ? "venus"
      : patient.gender === Gender.Male
      ? "mars"
      : "venus mars";

interface EntryDataProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimitated union member: ${JSON.stringify(value)}`
  );
};

const EntryData: React.FC<EntryDataProps> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>{code}</li>
            )}
          </ul>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>{code}</li>
            )}
          </ul>
        </div>
      );
    case 'Hospital':
     return (
        <div>
          <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>{code}</li>
            )}
          </ul>
       </div>
     );
     default:
      return assertNever(entry);
  }
};

return (
  <Container>
    <Header as='h2'>
      {patient.name}
      <Icon name={genderIcon} />
    </Header>

    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>

    <Header as='h3'>entries</Header>
    {patient.entries?.map(entry =>
      <EntryData key={entry.id} entry={entry}/>
    )}
  </Container>
  );
};

export default PatientPage;