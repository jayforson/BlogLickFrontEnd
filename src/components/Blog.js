import React, { useState } from 'react'

const DeleteButton = ({ blog, user, deleteBlog }) => {
  if (user && blog.user && blog.user.username === user.username){
    return (
      <div>
        <button onClick={deleteBlog}>delete</button>
      </div>
    )
  }
  return null
}

const Blog = ({blog, onUpdateBlog, onDeleteBlog, user}) => {
  
  const [viewDetail, setViewDetail] = useState(false)

  const showBrief = { display: viewDetail ? 'none' : '' }
  const showDetail = { display: viewDetail ? '' : 'none' }

  const onLikeClicked = () => {
    const newBlog = {
      // title: blog.title,
      // author: blog.author,
      // url: blog.url,
      likes: blog.likes + 1,
      // id: blog.id,
      // user: blog.user.id
    }
    onUpdateBlog(blog.id, newBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onDeleteBlog(blog.id)
    }
  }

  return (
    <div className='blog'>
      <div style={showBrief}>
        {blog.title} <button onClick={() => {setViewDetail(!viewDetail)}}>view</button>
      </div>
      <div style={showDetail}>
        <div>title: {blog.title} <button onClick={() => {setViewDetail(!viewDetail)}}>hide</button></div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={onLikeClicked}>like</button>
        </div>
        <div>author: {blog.author}</div>
        <DeleteButton 
          blog={blog}
          user={user}
          deleteBlog={deleteBlog}
        />
      </div>
    </div>  
  )
}
export default Blog