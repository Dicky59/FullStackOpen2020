import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

test('new blog form callback test', () => {
  const addBlog = jest.fn()

  const component = render(
    <NewBlog addBlog={addBlog} />
  )

  const blog = {
    author: 'Keijo Kaarisade',
    title: 'Poliisikin on ihminen',
    url: 'https://kaarisade.home.blog/'
  }

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls.length).toBe(1)

  expect(addBlog.mock.calls[0][0]).toEqual(blog)
})