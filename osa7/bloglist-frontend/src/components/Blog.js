import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, handleLike }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
    }
  }

  const removeButton = () => {
    if (user.id===blog.user.id || user.username===blog.user.username)
      return (<button id='remove' onClick={() => handleRemove()}>remove</button>)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {removeButton()}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blog