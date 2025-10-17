import React from "react"
import { useState } from "react"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <h3>Login page</h3>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login
