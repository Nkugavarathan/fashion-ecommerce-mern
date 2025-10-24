import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/apiCalls"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { isFetching, currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(dispatch, { username, password })
      if (!data) throw new Error("No data returned")

      if (data.user?.isAdmin) {
        const token = data.token
        window.open(`http://localhost:5174/?token=${token}`, "_blank")

        // Redirect current tab to homepage
        navigate("/")
      } else {
        navigate("/")
      }
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        <button
          onClick={() => navigate("/")}
          className="border-2 border-teal-600 text-teal-600 px-4 py-2 rounded-md font-medium mb-6 w-full hover:bg-teal-600 hover:text-white transition-all"
        >
          Back to Home
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <label className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <button
            type="submit"
            disabled={isFetching}
            className="w-full bg-teal-600 text-white py-2 rounded-md font-medium hover:bg-teal-700 transition-all disabled:opacity-50"
          >
            {isFetching ? "Logging in..." : "Login"}
          </button>

          <Link
            to="/register"
            className="text-sm text-teal-600 mt-4 underline cursor-pointer text-center"
          >
            Create a new account
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
