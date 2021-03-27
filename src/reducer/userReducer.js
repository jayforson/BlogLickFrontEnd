import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null , action) => {
  switch(action.type) {
  case 'USER_LOGIN':
    return(action.user)
  case 'USER_LOGOUT':
    return(null)
  default:
    return state
  }
}

export default userReducer

export const userLogin = (username, password, onSuccess, onError) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        user: user
      })
      onSuccess && onSuccess()
    } catch (error) {
      onError && onError()
    }
  }
}

export const userInitialize = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        user: user
      })
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken(null)
    dispatch({
      type: 'USER_LOGOUT',
    })
  }
}
