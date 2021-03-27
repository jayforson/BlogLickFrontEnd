import usersService from '../services/users'

const usersInfoReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_ALL_USERS':
    return(action.users)
  case 'GET_USER_BY_ID':
    return(action.user)
  default:
    return state
  }
}

export default usersInfoReducer

export const getAllUsers = (onError) => {
  return async dispatch => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'GET_ALL_USERS',
        users: users
      })
    } catch (error) {
      onError && onError(error)
    }
  }
}

export const getUserById = (id, onError) => {
  return async dispatch => {
    try{
      const user = await usersService.getById(id)
      dispatch({
        type: 'GET_USER_BY_ID',
        user: [].concat(user)
      })
    } catch (error) {
      onError && onError(error)
    }
  }
}
