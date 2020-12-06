import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  let patient = patients[id];

  useEffect(() => {
    if (patient && !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/api/patients/${patient.id}`
          );
          dispatch(updatePatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [id, patient, dispatch]);

  if (!patient) {
    return <div>No patient found</div>;
  }
  const genderIcon =
    patient.gender === Gender.Female
      ? "venus"
      : patient.gender === Gender.Male
      ? "mars"
      : "venus mars";

  return (
    <div className="App">
      <Container>
        <h2>
        {patient.name} <Icon name={genderIcon} />
        </h2>
        <p>ssn: {patient.ssn} </p>
        <p>occupation: {patient.occupation} </p>
        <p>Birth date: {patient.dateOfBirth}</p>
      </Container>
    </div>
  );
};

export default PatientPage;