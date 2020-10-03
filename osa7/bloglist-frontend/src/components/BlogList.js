import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, StyledBlogList } from '../styledComponents'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} className='blog'>
          <StyledBlogList>
            <NavLink to={`/blogs/${blog.id}`}>
              {blog.title}
            </NavLink>
          </StyledBlogList>
        </div>
      ))}
    </div>
  )
}

export default BlogList