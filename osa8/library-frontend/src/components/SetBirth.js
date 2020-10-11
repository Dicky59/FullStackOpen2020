import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirth = () => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [selectedName, setSelectedName] = useState(null)
  const authors = useQuery(ALL_AUTHORS)

  const options = authors.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name }
  })

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleNameChange = (event) => {
    setName(event.value);
    setSelectedName({
      value: event.value,
      label: event.label,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <Select
            value={selectedName}
            onChange={handleNameChange}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirth
