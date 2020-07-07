import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })

  }, [])

  const personsToShow = persons
    .filter((person) => person
      .name.toLowerCase()
      .includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(person => person.name === newName)
    if (existing) {
      const ok = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`)
      if (ok) {
        personService.update(existing.id, {
          name: existing.name,
          number:newNumber
        }).then(updatedPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person : updatedPerson))
          showNotification(`${updatedPerson.name} updated`)
        }).catch(error => {
            showNotification(`Information of ${newName} has already been removed from server`, 'error')
          })
      }

    } else {
      personService.create({
        name: newName,
        number: newNumber   
      }).then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        showNotification(`${createdPerson.name} added`)
      })
      .catch(error => {
        console.log(error.response.data)
        showNotification(`${error.response.data.error} `, 'error')
      })

    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    const toRemove = persons.find(person => person.id === id)
    const ok = window.confirm(`Delete ${toRemove.name}`)
    if (ok) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`${toRemove.name} deleted`)
        })
        .catch(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`${toRemove.name} has already been removed from server.`, 'error')
        })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showNotification = (message, type='success') => {
    setMessage({message, type})
    setTimeout(() => {setMessage(null)}, 4000)
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={message} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add new number</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      
      <h2>Numbers</h2>
        <Persons persons={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )

}

export default App