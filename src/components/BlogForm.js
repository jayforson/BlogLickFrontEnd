import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    addBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='blogFormDiv'>
      <h3>create new blog</h3>
      <form onSubmit={handleNewBlog}>
        <div>title: <input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>author: <input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>url: <input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm