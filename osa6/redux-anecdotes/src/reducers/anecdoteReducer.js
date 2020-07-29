import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'VOTE':
      const voted = action.data
      return state.map(a => a.id===voted.id ? voted : a)
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const vote = {...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(vote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}


export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
    type: 'INIT',
    data
    })
  }
}

export default reducer