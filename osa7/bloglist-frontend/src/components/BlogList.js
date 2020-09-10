import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import storage from '../utils/storage'

const BlogList = () => {
  const blogs = useSelector(state => state.blog).sort((a,b) => b.votes-a.votes)
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes, user: blog.user.id }
    dispatch(likeBlog(likedBlog))
    dispatch(setNotification(`You voted '${blog.title}'`, 5))
  }

  const handleRemove = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username===blog.user.username}
          />
        </div>
      )}
    </div>
  )
}

export default BlogList