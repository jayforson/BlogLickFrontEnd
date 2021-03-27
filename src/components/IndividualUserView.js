import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../reducer/usersInfoReducer'
import { sendNotification } from '../reducer/notificationReducer'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const IndividualUserView = ({ id }) => {

  if (!id) { return null }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserById(id), (error) => {
      dispatch(sendNotification('error', error.toString(),5))
    })
  },[])
  const users = useSelector(state => state.usersInfo)
  if (users.length !== 1) {
    return null
  }

  return(
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>blogs added by {users[0].name}</TableCell>
            <TableCell align="right">author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users[0].blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell align="right">{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default IndividualUserView