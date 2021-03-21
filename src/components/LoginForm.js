import React, { useState } from 'react'

const LoginForm = ({ userLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = (event) => {
    event.preventDefault()
    userLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>username <input 
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value) } 
                          />
            </div>
            <div>password <input 
                            type="text"
                            value={password}
                            onChange={({ target }) => setPassword(target.value) }
                          />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      )
}

export default LoginForm