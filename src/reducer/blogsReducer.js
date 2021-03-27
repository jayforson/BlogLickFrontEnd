import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_BLOG':
    return(state.concat(action.blog))
  case 'UPDATE_BLOG':
    return(state.map(blog => blog.id !== action.blog.id ? blog: action.blog))
  case 'INITIALIZE_BLOGS':
    return(action.blogs)
  case 'DELETE_BLOG':
    return(state.filter(blog => blog.id !== action.id))
  case 'GET_BLOG_BY_ID':
    return(action.blog)
  default:
    return state
  }
}

export default blogsReducer

export const addBlog = (blog, onSuccess, onError) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.createBlog(blog)
      dispatch({
        type: 'ADD_BLOG',
        blog: createdBlog
      })
      onSuccess && onSuccess()
    } catch (error) {
      onError && onError()
    }
  }
}

export const getBlogById = (id) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.getById(id)
      dispatch({
        type: 'GET_BLOG_BY_ID',
        blog: [].concat(returnedBlog)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      blogs: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    })
  }
}
