import React, { useState } from "react"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../../firebase"
import { addProduct } from "../../redux/apiCalls"
import { useDispatch } from "react-redux"

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (!file) {
      alert("Please upload an image!")
      return
    }

    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        console.error("Upload failed:", error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat }
          addProduct(product, dispatch)
          alert("✅ Product added successfully!")
          // Optional: reset form
          setInputs({})
          setFile(null)
          setCat([])
        })
      }
    )
  }

  return (
    <div className="flex-[4] h-[70vh] bg-gray-50 p-6 rounded-lg shadow-md ms-3 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

      <form
        className="flex flex-col sm:flex-row sm:flex-wrap gap-6"
        onSubmit={handleClick}
      >
        {/* Image Upload */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Title */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">
            Description
          </label>
          <input
            name="desc"
            type="text"
            placeholder="Product description..."
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Price ($)</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Categories</label>
          <input
            type="text"
            placeholder="jeans,skirts"
            onChange={handleCat}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Stock</label>
          <select
            name="inStock"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
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
