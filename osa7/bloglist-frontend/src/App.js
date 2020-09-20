import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import UserPage from './components/UserPage'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { initializeUsers } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const user = useSelector((state) => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(getUsers())
  }, [dispatch])

  const handleLogout = () => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT',
    })
  }

  const match = useRouteMatch('/user/:id')
  const userView = match ? users.find(user => user.id === match.params.id) : null

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <Router>
        <Switch>
          <Route path="/users/:id" >
            <UserPage user={userView} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <BlogList />
          </Route>
          <Route path="/login">
            {LoginForm}
          </Route>
          <Route path="/blogs">
            <h2>Blogs</h2>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App