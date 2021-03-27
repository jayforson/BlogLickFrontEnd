const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SEND_NOTIFICATION':
    if (state && state.timerId) {
      clearTimeout(state.timerId)
    }
    return(action.notification)
  case 'CLEAR_NOTIFICATION':
    if (state && state.timerId) {
      clearTimeout(state.timerId)
    }
    return(null)
  default:
    return state
  }
}

export default notificationReducer

export const sendNotification = (type, message, duration) => {
  return dispatch => {
    const timerID = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
    dispatch({
      type: 'SEND_NOTIFICATION',
      notification: {
        type: type,
        message: message,
        timerId: timerID
      }
    })
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}