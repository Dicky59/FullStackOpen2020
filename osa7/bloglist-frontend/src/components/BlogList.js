import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import storage from '../utils/storage'

const BlogList = () => {
  const blogs = useSelector((state) => state.blog).sort(
    (a, b) => b.votes - a.votes
  )
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes, user: blog.user.id }
    dispatch(likeBlog(likedBlog))
    dispatch(setNotification(`You voted '${blog.title}'`, 5))
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            key={blog.id}
            title={blog.title}
            blog={blog}
            handleLike={handleLike}
            user={user}
          />
        </div>
      ))}
    </div>
  )
}

export default BlogList
