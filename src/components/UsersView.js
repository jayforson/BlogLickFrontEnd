import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducer/usersInfoReducer'
import { sendNotification } from '../reducer/notificationReducer'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const UsersView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers(), (error) => {
      dispatch(sendNotification('error', error.toString(),5))
    })
  },[])
  const sorter = (a, b) => {
    if (a.blogs.length < b.blogs.length) return 1
    if (a.blogs.length > b.blogs.length) return -1
    return 0
  }
  const users = useSelector(state => state.usersInfo.sort(sorter))

  return(
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell align="right">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default UsersView