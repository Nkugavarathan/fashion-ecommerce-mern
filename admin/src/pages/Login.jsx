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
    <div className="h-screen w-screen flex items-center justify-center ">
      <form
        onSubmit={handleClick}
        className="bg-gray p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md font-medium hover:bg-teal-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
