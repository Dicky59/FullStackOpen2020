import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Input, Title, Form, Label } from '../styledComponents'

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
      <Title>Create new</Title>
      <Form onSubmit={addBlog}>
        <Label>author</Label>
        <Input name='author'/>
        <Label>title</Label>
        <Input name='title' />
        <Label>url</Label>
        <Input name='url' />
        <br></br>
        <Button>create</Button>
      </Form>
    </div>
  )
}

export default NewBlog