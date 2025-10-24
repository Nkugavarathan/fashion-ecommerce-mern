import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import Products from "../components/Products"
import Footer from "../components/Footer"

function ProductList() {
  const { category } = useParams()
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest")

  const handleFilters = (e) => {
    const value = e.target.value
    setFilters({ ...filters, [e.target.name]: value })
  }

  const handleClearFilters = () => {
    setFilters({})
    setSort("newest")
    document.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0
    })
  }

  return (
    <div className="pt-28 px-6 md:px-12">
      <Navbar />

      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Products:
          </h2>

          {/* Color Filter */}
          <select
            name="color"
            defaultValue=""
            onChange={handleFilters}
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled>
              Color
            </option>
            <option>red</option>
            <option>blue</option>
            <option>green</option>
            <option>black</option>
            <option>white</option>
          </select>

          {/* Size Filter */}
          <select
            name="size"
            defaultValue=""
            onChange={handleFilters}
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled>
              Size
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Sort Products:
          </h2>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <Products category={category} filters={filters} sort={sort} />

      <Footer />
    </div>
  )
}

export default ProductList
