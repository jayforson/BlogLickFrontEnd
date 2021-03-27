import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userInitialize, userLogout } from '../reducer/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Box, IconButton, Button } from '@material-ui/core'

const NavigationBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(userInitialize())
  }, [])

  const handleUserLogout = () => {
    dispatch(userLogout())
  }

  return(
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color="inherit" component={Link} to="/">
            Home
            </Button>
            <Button color="inherit" component={Link} to="/create">
            Create
            </Button>
            <Button color="inherit" component={Link} to="/users">
            users
            </Button>
          </Box>
          {user
            ? <em>Welcome! {user.name}<Button color="secondary" onClick={handleUserLogout}>Logout</Button></em>
            : <Button
              color="inherit"
              component={Link} to="/login"
            >
              login
            </Button>
          }
        </Toolbar>
      </AppBar><br />
    </div>
  )
}

export default NavigationBar