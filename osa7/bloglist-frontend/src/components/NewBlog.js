import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const dispatch = useDispatch()

  const addBlog = async(event) => {
    event.preventDefault()
    const content = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value
    }
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''
    dispatch(createBlog(content))
    dispatch(setNotification(`A new blog '${content.title}' by ${content.author} added!`))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          author
          <input name='author'/>
        </div>
        <div>
          title
          <input name='title' />
        </div>
        <div>
          url
          <input name='url' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default NewBlog