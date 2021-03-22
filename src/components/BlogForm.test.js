import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(titleInput, {
    target: { value: 'Form Title input test' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Form author input test' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'Form url input test' }
  })

  fireEvent.submit(form)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toBe('Form Title input test')
  expect(addBlog.mock.calls[0][1]).toBe('Form author input test')
  expect(addBlog.mock.calls[0][2]).toBe('Form url input test')

})