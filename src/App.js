import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const UserAdmission = ({
  user,
  handleLogOut,
  userLogin,
  loginRef }) => {
  if (user) {
    return(
      <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
      </div>
    )
  } else {
    return(
      <div>
        <Togglable buttonLabel='log in' ref={loginRef}>
          <LoginForm userLogin={userLogin}/>
        </Togglable>
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const loginRef = useRef()
  const blogRef = useRef()
  // window.localStorage.removeItem(
  //   'loggedBlogListUser', JSON.stringify(user)
  // )
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const userLogin = (username, password) => {
    loginService
      .login({ username, password })
      .then(user => {
        window.localStorage.setItem(
          'loggedBlogListUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        loginRef.current.toggleVisibility()
        setUser(user)
      })
      .catch(error => {
        console.log(error)
        setNotification({ type: 'error', message: `wrong username or password` })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const addBlog = (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .createBlog(newBlog)
      .then(response => {
        blogRef.current.toggleVisibility()
        setBlogs(blogs.concat(response))
        setNotification({ type: 'info', message: `a new blog ${newBlog.title} by ${newBlog.author} added` })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(() => {
        setNotification({ type: 'error', message: `an error occured when adding ${newBlog.title} by ${newBlog.author}` })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const onUpdateBlog = (id, newBlog) => {
    blogService
      .updateBlog(id, newBlog)
      .then(response => {
        const indexOfBlog = blogs.findIndex(r => r.id === response.id)
        let newBlogs = [...blogs]
        newBlogs[indexOfBlog] = response
        setBlogs(newBlogs.sort((a, b) => {
          if (a.likes < b.likes) return 1
          if (a.likes > b.likes) return -1
          return 0
        }))
      })
  }

  const onDeleteBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>Welcome to Blog Web</h2>
      <Notification notification={notification}/>
      <UserAdmission
        user={user}
        handleLogOut={handleLogOut}
        userLogin={userLogin}
        loginRef={loginRef}
      />
      <h2>Blogs</h2>
      <Togglable buttonLabel='create' ref={blogRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onUpdateBlog={onUpdateBlog}
          onDeleteBlog={onDeleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App