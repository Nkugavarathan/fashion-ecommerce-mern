import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../redux/apiCalls"

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      })
      alert("Registration successful. Please login.")
      navigate("/login")
    } catch (err) {
      alert("Register failed: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-1/4 p-6 sm:w-3/5 xs:w-11/12 rounded-lg shadow-md">
        <h1 className="text-2xl font-light text-center mb-4">
          Create An Account
        </h1>

        <button
          onClick={() => navigate("/")}
          className="border-2 border-teal-600 text-teal-600 font-semibold py-2 px-4 rounded-md mb-5 mx-auto block hover:bg-teal-600 hover:text-white transition duration-200"
        >
          Back to Home
        </button>

        <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-col">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="flex-1 min-w-[40%] m-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 sm:min-w-full sm:m-1"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="flex-1 min-w-[40%] m-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 sm:min-w-full sm:m-1"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="flex-1 min-w-[40%] m-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 sm:min-w-full sm:m-1"
            required
          />
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            className="flex-1 min-w-[40%] m-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 sm:min-w-full sm:m-1"
            required
          />

          <span className="text-sm mt-3 mb-3 block text-gray-700">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>Privacy Policy</b>.
          </span>

          <button
            type="submit"
            disabled={loading}
            className="border-2 border-teal-600 text-teal-600 font-medium py-2 px-4 w-2/5 mx-auto rounded-md hover:bg-teal-600 hover:text-white transition duration-200 sm:w-full"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
