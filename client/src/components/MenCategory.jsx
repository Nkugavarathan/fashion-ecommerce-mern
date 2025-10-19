import React from "react"
import { Link } from "react-router-dom"
import image from "../../public/images/men.jpg"

export default function MenCategory() {
  return (
    <Link to="/products/men" className="block">
      <div className="relative overflow-hidden rounded-lg shadow-lg h-64 md:h-80 group">
        <img
          src={image}
          alt="Men"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* <h2 className="text-2xl md:text-3xl font-bold">Men</h2> */}
          <p className="mt-2 text-sm md:text-base">
            Shirts, jackets, casual & more
          </p>
          <button className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-md font-medium">
            Shop Men
          </button>
        </div>
      </div>
    </Link>
  )
}
