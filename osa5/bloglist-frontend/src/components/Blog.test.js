import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders author and title', () => {
  const blog = {
    title: 'this is the blog title',
    author: 'this is the blog author',
    url:'www.blogurl.com',
    likes: 123,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('this is the blog title')
  expect(component.container).toHaveTextContent('this is the blog author')
  expect(component.container).not.toHaveTextContent('www.blogurl.com')
  expect(component.container).not.toHaveValue(123)
})

test('renders all content when clicked', async () => {
  const blog = {
    title: 'this is again the blog title',
    author: 'this is again the blog author',
    url:'www.blogurl.com',
    likes: 321,
    user: {
      name: 'Pekka Laine'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.blogurl.com')
  expect(component.container).toHaveTextContent(321)
})

test('liked twice', async () => {
  const blog = {
    title: 'this is again the blog title',
    author: 'this is again the blog author',
    url:'www.blogurl.com',
    likes: 666,
    user: {
      name: 'Pekka Laine'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})