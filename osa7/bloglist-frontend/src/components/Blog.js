import React from 'react'
const Blog = ({ blog }) => {

  if(!blog)
    return null

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog