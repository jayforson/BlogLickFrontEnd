import React, { useEffect } from 'react'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogById, updateBlog, deleteBlog } from '../reducer/blogsReducer'
import { useHistory } from 'react-router'


const DeleteButton = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  const onDeleteButtonClicked = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }
  if (user && blog.user && (blog.user === user.id || blog.user.id === user.id)){
    return (
      <div>
        <button onClick={onDeleteButtonClicked}>delete</button>
      </div>
    )
  }
  return null
}

const Blog = ({ id }) => {
  if (!id) { return null }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlogById(id))
  }, [])

  const blogs = useSelector(state => state.blogs)
  const commentField = useField('comment', 'text')

  if (!blogs || blogs.length !== 1) { return null }
  const blog = blogs[0]

  const onLikeClicked = () => {
    const newBlog = {
      // title: blog.title,
      // author: blog.author,
      // url: blog.url,
      likes: blog.likes + 1,
      // id: blog.id,
      // user: blog.user.id
    }
    dispatch(updateBlog(blog.id, newBlog))
  }

  const onAddCommentClicked = () => {
    const newBlog = {
      comments: blog.comments.concat(commentField.value)
    }
    dispatch(updateBlog(blog.id, newBlog))
    commentField.reset()
  }

  return (
    <div>
      <div className='showDetail'>
        <h2>{blog.title}</h2>
        <div>url: <a href={`http://${blog.url}`}>{blog.url}</a></div>
        <div id='likes'>
          {blog.likes} likes <button onClick={onLikeClicked}>like</button>
        </div>
        <div>author: {blog.author}</div>
        <h3>comments</h3>
        <input
          id={commentField.id}
          type={commentField.type}
          value={commentField.value}
          onChange={commentField.onChange}
        />
        <button onClick={onAddCommentClicked}>add comment</button>
        <ul>
          {blog.comments ? blog.comments.map((comment,index) =>
            <li key={index}>
              {comment}
            </li>) : null}
        </ul>
        <DeleteButton blog={blog}/>
      </div>
    </div>
  )
}
export default Blog