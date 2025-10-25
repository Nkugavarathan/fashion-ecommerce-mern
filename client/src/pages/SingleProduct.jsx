import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"

import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"
import { publicRequest } from "../requestMethod"

export default function SingleProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`)
        const prod = res.data
        setProduct(prod)
        if (prod.color?.length) setColor(prod.color[0])
        if (prod.size?.length) setSize(prod.size[0])
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [id])

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  const increaseQuantity = () => setQuantity(quantity + 1)

  const handleAddToCart = () => {
    if (!color || !size) return alert("Please select color and size")
    dispatch(addProduct({ ...product, quantity, color, size }))
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center text-teal-600 text-xl">
          Loading...
        </div>
        <Footer />
      </div>
    )
  }

  // ✅ Extract main gender and subcategories
  const mainGender =
    product.categories && product.categories.length > 0
      ? product.categories[0]
      : "Unisex"
  const subCategories =
    product.categories && product.categories.length > 1
      ? product.categories.slice(1)
      : []

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-24 px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-[67.5vh] object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full md:w-auto">
          <h1 className="text-3xl font-light mb-2">{product.title}</h1>

          {/* Gender */}
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Category:</span>{" "}
            {mainGender.charAt(0).toUpperCase() + mainGender.slice(1)}
          </p>

          {/* Subcategories */}
          {subCategories.length > 0 && (
            <p className="mb-4 text-sm text-gray-500">
              <span className="font-semibold">Subcategories:</span>{" "}
              {subCategories.join(", ")}
            </p>
          )}

          <p className="mb-4 text-gray-600">{product.description}</p>

          <span className="text-2xl font-bold text-teal-700">
            Rs {product.price}
          </span>

          {/* Color & Size Selection */}
          <div className="flex flex-col md:flex-row gap-6 my-6">
            {/* Color */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-light mr-2">Color</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    color === c
                      ? "border-teal-700 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Size */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-light mr-2">Size</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
              >
                {product.size?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 border-2 border-teal-700 text-teal-700 font-medium hover:bg-teal-700 hover:text-white transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
