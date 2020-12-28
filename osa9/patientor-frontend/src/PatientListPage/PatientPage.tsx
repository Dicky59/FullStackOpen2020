import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';


const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (!updatePatient) throw new Error(`Patient with id ${id} not found`);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

    <Header as='h3'>Entries</Header>

    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      
    {patient.entries?.map(entry =>
      <EntryDetails key={entry.id} entry={entry}/>
    )}
  </Container>
  );
};

export default PatientPage;