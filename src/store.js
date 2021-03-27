import blogsReducer from './reducer/blogsReducer'
import userReducer from './reducer/userReducer'
import notificationReducer from './reducer/notificationReducer'
import usersInfoReducer from './reducer/usersInfoReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reduce = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  notification: notificationReducer,
  usersInfo: usersInfoReducer
})

const store = createStore(reduce, composeWithDevTools(applyMiddleware(thunk)))

export default store