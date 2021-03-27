import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return(
    <div className="container">
      {(notification &&
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
      )}
    </div>
  )
}

export default Notification