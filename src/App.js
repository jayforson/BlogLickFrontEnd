import React from 'react'
import BlogList from './components/BlogList'
import UsersView from './components/UsersView'
import IndividualUserView from './components/IndividualUserView'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Blog from './components/Blog'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

const App = () => {
  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedUserId = userMatch ? userMatch.params.id : null
  const matchedBlogId = blogMatch ? blogMatch.params.id : null
  return (
    <Container>
      <NavigationBar />
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <Blog id={matchedBlogId} />
        </Route>
        <Route path="/users/:id">
          <IndividualUserView id={matchedUserId}/>
        </Route>
        <Route path="/users">
          <UsersView />
        </Route>
        <Route path="/blogs">
          <BlogList />
        </Route>
        <Route path="/create">
          <BlogForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </Container>
  )
}

export default App