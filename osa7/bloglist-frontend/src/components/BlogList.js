import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog => {
        return (
          <div key={blog.id} className='blog' style={blogStyle}>
            <div>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList