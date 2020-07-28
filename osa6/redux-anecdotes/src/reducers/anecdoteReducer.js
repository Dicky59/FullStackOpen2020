import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
    
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT',
    data: anecdotes,
    })
  }
}

export default reducer