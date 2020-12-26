import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';

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



return (
  <Container>
    <Header as='h2'>
      {patient.name}
      <GenderIcon patient={patient} />
    </Header>

    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>

    <Header as='h3'>entries</Header>
    {patient.entries?.map(entry =>
      <EntryDetails key={entry.id} entry={entry}/>
    )}
  </Container>
  );
};

export default PatientPage;