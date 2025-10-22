import React from "react"
import { Link } from "react-router-dom"

export default function WomenCategory() {
  return (
    <Link to="/products/women" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-lg h-64 md:h-80 group">
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop"
          alt="Women"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* <h2 className="text-2xl md:text-3xl font-bold">Women</h2> */}
          <p className="mt-2 text-sm md:text-base">
            Dresses, tops, casual & more
          </p>
          <button className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-teal-700">
            Shop Women
          </button>
        </div>
      </div>
    </Link>
  )
}
