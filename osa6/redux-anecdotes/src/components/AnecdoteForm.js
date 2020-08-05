import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`New anecdote '${content}'`, 5)
}

return (
  <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)