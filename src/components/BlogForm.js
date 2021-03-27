/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { addBlog } from '../reducer/blogsReducer'
import { sendNotification } from '../reducer/notificationReducer'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}))

const BlogForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const reset = (event) => {
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    dispatch(addBlog(
      newBlog,
      () => {
        dispatch(sendNotification('success', `a new blog ${event.target.title.value} by ${event.target.author.value} added`, 5))
        history.push('/')
      },
      () => {
        dispatch(sendNotification('error', 'Please Login to add new post', 5))
      })
    )
  }

  return (
    <div className='blogFormDiv'>
      <h3>create new blog</h3>
      <form className={classes.form} noValidate onSubmit={handleNewBlog} onReset={reset}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows="10"
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="url"
          label="Url"
          id="url"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
            Add Blog
        </Button>
        <Button
          type="reset"
          fullWidth
          variant="contained"
          color="secondary"
        >
          Reset
        </Button>
      </form>
    </div>
  )
}

export default BlogForm