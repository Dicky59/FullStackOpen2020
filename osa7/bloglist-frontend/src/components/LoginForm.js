import React, { useState, useEffect } from 'react'
import { userLogin } from '../reducers/userReducer'
import storage from '../utils/storage'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { Button, Title, Page, Footer, Input, Form, Label } from '../styledComponents'

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
      <Page>
        <div>
          <Title>Login</Title>
          <Notification />
          <Form onSubmit={handleLogin}>
            <div>
              <Label>username</Label>
              <Input
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <Label>password</Label>
              <Input
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button type="submit" primary=''>login</Button>
          </Form>
        </div>
      </Page>
    )
  }

  return (
    <div>
      <Notification />
      <Footer>
        <em>Note app, Department of Computer Science 2020</em>
      </Footer>
    </div>
  )
}

export default LoginForm