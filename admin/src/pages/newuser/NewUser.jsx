import React from "react"
// import "./newUser.css"

function NewUser() {
  return (
    <div
      className="flex-[4] p-6 bg-gray-50 rounded-lg shadow-md ms-3 h-[70vh]"
      style={{ flex: 4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">New User</h2>
      <form className="flex flex-wrap gap-4">
        {/* Username */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Full Name */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Full Name</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Password</label>
          <input
            type="password"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Phone</label>
          <input
            type="text"
            placeholder="0775019194"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Address</label>
          <input
            type="text"
            placeholder="Jaffna"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <label className="mb-2 text-gray-500 font-semibold">Gender</label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="male"
                className="accent-blue-500"
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="female"
                className="accent-pink-500"
              />
              Female
            </label>
          </div>
        </div>

        {/* Active */}
        <div className="flex flex-col flex-1 w-[200px] ">
          <label className="mb-2 text-gray-500 font-semibold">Active</label>
          <select className="h-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="w-full mt-4">
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewUser
