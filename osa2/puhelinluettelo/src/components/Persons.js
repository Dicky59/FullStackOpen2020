import React from 'react'

const Persons = ({persons, removePerson}) => (
  <>
      {persons.map(person =>
          <p key={person.id}>{person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>Delete</button>
          </p>
      )}
  </>
)

export default Persons