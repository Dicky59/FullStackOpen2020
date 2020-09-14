import loginService from '../services/login'
import { saveUser } from '../utils/storage'
import { setNotification } from '../reducers/notificationReducer'


const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const userLogin = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      if (user) {
        saveUser(user)
        dispatch ({ type: 'LOGIN', data: user })
        dispatch(setNotification(`Welcome back! ${user.name}`))
      }
    }catch (error) {
      dispatch(setNotification('wrong username/password'))
    }
  }
}

export const userLogout = () => (
  { type: 'LOGOUT' }
)

export default userReducer