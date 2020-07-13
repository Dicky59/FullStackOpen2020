const notificationReducer = (state = 'Welcome to Anecdotes!', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
  }
}

export default notificationReducer