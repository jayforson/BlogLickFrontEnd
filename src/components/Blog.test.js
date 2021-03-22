import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component test', () => {
  let component
  const likeHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'title testing',
      author: 'author testing',
      url: 'url testing',
      likes: 0,
      id : 0
    }
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        onUpdateBlog={likeHandler}
        onDeleteBlog={jest.fn()}
        user={null}
      />
    )
  })

  test("displaying a blog renders the blog by default's title and author", () => {
    const briefDiv = component.container.querySelector('.showBrief')
    const detailDiv = component.container.querySelector('.showDetail')
    expect(briefDiv).not.toHaveStyle('display: none')
    expect(detailDiv).toHaveStyle('display: none')
    expect(briefDiv).toHaveTextContent('title testing')
  })

  test("url and number of likes are shown when the button controlling the shown details has been clicked", () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const briefDiv = component.container.querySelector('.showBrief')
    const detailDiv = component.container.querySelector('.showDetail')
    expect(briefDiv).toHaveStyle('display: none')
    expect(detailDiv).not.toHaveStyle('display: none')
    expect(detailDiv).toHaveTextContent('title testing')
    expect(detailDiv).toHaveTextContent('author testing')
    expect(detailDiv).toHaveTextContent('url testing')
    expect(detailDiv).toHaveTextContent('like')
  })

  test(' ensures that if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})

