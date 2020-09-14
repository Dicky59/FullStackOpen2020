import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT',
    })
  }

  if ( !user ) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='Create new blog'  ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App