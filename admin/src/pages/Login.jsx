import React from "react"
import { useState } from "react"
import { login } from "../redux/apiCalls"
import { useDispatch } from "react-redux"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login
