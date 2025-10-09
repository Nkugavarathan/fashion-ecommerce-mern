import React from "react"

export default function NewProduct() {
  return (
    <div className="flex-[4] h-[60vh] bg-gray-50 p-6 rounded-lg shadow-md ms-3 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Product</h1>

      <form className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        {/* Image */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Image</label>
          <input
            type="file"
            id="file"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Stock</label>
          <input
            type="text"
            placeholder="123"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Active */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Active</label>
          <select
            name="active"
            id="active"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg mt-4 transition-all duration-200"
        >
          Create
        </button>
      </form>
    </div>
  )
}
