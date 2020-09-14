import React, { useState, useEffect } from 'react'
import { userLogin } from '../reducers/userReducer'
import storage from '../utils/storage'
import { useDispatch } from 'react-redux'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification />
    </div>
  )
}

export default LoginForm