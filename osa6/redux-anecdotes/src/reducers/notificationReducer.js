const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const message = action.data.message
      return state = message
    case 'CLEAR_NOTIFICATION':
      return state = null
    default:
      return state
  }
}



export const setNotification = (content) => {
  return {
      type: 'SET_NOTIFICATION',
      data: {message:content }   
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer