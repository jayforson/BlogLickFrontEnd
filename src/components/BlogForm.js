import React, { useState } from 'react'

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        await addBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
      } 

    return (
        <div>
        <h3>create new blog</h3>
        <form onSubmit={handleNewBlog}>
          <div>title: <input 
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                      />
          </div>
          <div>author: <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                      />
          </div>
          <div>url: <input
                        value={url}
                        onChange={({target}) => setUrl(target.value)}
                      />
          </div>
          <button type='submit'>create</button>
        </form>        
      </div>
    )
}

export default BlogForm