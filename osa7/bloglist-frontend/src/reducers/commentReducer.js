import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_COMMENTS':
    return action.data
  case 'ADD_COMMENT':
    return [...state, action.data]
  default:
    return state
  }
}

export const initComments = () => {
  return async dispatch => {
    const comments = await commentService.getComment()
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const postComment = (id, content) => {
  return async dispatch => {
    const comment = await commentService.postComment(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      data: comment
    })
  }
}



export default commentReducer