import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react'
import { initializeBlog } from '../reducer/blogsReducer'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const BlogList = () => {
  const sorter = (a, b) => {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1
    return 0
  }
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort(sorter))

  useEffect(() => {
    dispatch(initializeBlog())
  }, [])

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Blogs</TableCell>
            <TableCell align="right">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                  <br />
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

export default BlogList